#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const mediaPath = path.join(root, 'assets', 'media.json')
const videosDir = path.join(root, 'assets', 'videos')
const postersDir = path.join(root, 'assets', 'posters')

function readJSON(p) { return JSON.parse(fs.readFileSync(p,'utf8')) }
function writeJSON(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8') }

function toTitleCase(s) {
  return s.replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim().replace(/\b\w/g, c => c.toUpperCase())
}

function cleanName(basename) {
  let s = basename.replace(/\.\w+$/,'')
  s = s.replace(/[\(\[\{].*?[\)\]\}]/g, '')
  s = s.replace(/\b(MP4|HD|720P|1080P|720P_HD|WEBM|MOV|MKV)\b/ig,'')
  s = s.replace(/[_-]+/g, ' ')
  s = s.replace(/\s+/g,' ').trim()
  if (!s) return ''
  return toTitleCase(s)
}

function guessTagsFromName(nameLower) {
  const mapping = [
    {keywords: ['reel','social','instagram','tiktok','short','clip'], tag: 'Social'},
    {keywords: ['promo','ad','advert','spot'], tag: 'Promo'},
    {keywords: ['walkthrough','walk','tour','clinic','clinic'], tag: 'Walkthrough'},
    {keywords: ['testimonial','testimonials','stories','review'], tag: 'Testimonial'},
    {keywords: ['motion','alight','aftereffects','ae'], tag: 'Motion Graphics'},
    {keywords: ['brand','branding','commercial','brand film'], tag: 'Branding'},
    {keywords: ['fashion','couture','collection'], tag: 'Fashion'},
    {keywords: ['editing','creative','edit'], tag: 'Creative'},
    {keywords: ['event','recap'], tag: 'Event'},
  ]
  const tags = new Set()
  for (const m of mapping) {
    for (const kw of m.keywords) {
      if (nameLower.includes(kw)) { tags.add(m.tag); break }
    }
  }
  return Array.from(tags)
}

if (!fs.existsSync(mediaPath)) {
  console.error('media.json not found at', mediaPath)
  process.exit(1)
}
let media
try { media = readJSON(mediaPath) } catch (e) { console.error('Failed to parse media.json', e.message); process.exit(1) }
if (!Array.isArray(media.projects)) media.projects = []

const videoFiles = []
if (fs.existsSync(videosDir)) {
  const files = fs.readdirSync(videosDir)
  for (const f of files) {
    const ext = path.extname(f).toLowerCase()
    if (['.mp4','.mov','.mkv','.webm','.avi','.mpeg','.mpg'].includes(ext)) videoFiles.push(f)
  }
} else {
  console.warn('videos directory not found:', videosDir)
}

const byVideoName = new Map()
for (const p of media.projects) {
  if (p.video) {
    const name = String(p.video).split('/').pop()
    byVideoName.set(name.toLowerCase(), p)
  }
}

const changes = []
let added = 0
let updated = 0
let maxId = media.projects.reduce((m,p)=>Math.max(m,Number(p.id)||0),0)

for (const f of videoFiles) {
  const generatedTitle = cleanName(f)
  const lowerF = f.toLowerCase()
  const posterName = path.basename(f, path.extname(f)) + '.webp'
  const tags = guessTagsFromName(generatedTitle.toLowerCase())
  const existing = byVideoName.get(lowerF) || media.projects.find(p => (p.video && String(p.video).toLowerCase() === lowerF))
  if (existing) {
    const oldTitle = existing.title || ''
    if (!oldTitle || oldTitle.trim() === '' || oldTitle !== generatedTitle) {
      existing.title = generatedTitle
      if ((!existing.tags || existing.tags.length === 0) && tags.length) existing.tags = tags
      changes.push({type:'updated', file: f, oldTitle, newTitle: generatedTitle})
      updated++
    }
  } else {
    const newProject = {
      id: ++maxId,
      title: generatedTitle,
      desc: '',
      video: f,
      poster: posterName,
      tags: tags.length?tags:['Imported']
    }
    media.projects.push(newProject)
    changes.push({type:'added', file: f, title: generatedTitle})
    added++
  }
}

// backup original
const bakPath = mediaPath + '.bak'
fs.copyFileSync(mediaPath, bakPath)
writeJSON(mediaPath, media)

console.log('Processed videos:', videoFiles.length)
console.log('Added:', added, 'Updated:', updated)
if (changes.length) {
  console.log('Changes:')
  changes.forEach(c => {
    if (c.type === 'added') console.log(`+ ${c.file} -> "${c.title}"`)
    else console.log(`~ ${c.file}: "${c.oldTitle}" -> "${c.newTitle}"`)
  })
} else {
  console.log('No changes made.')
}
