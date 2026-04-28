const fs = require('fs')
const path = require('path')

const mediaPath = path.join(__dirname, 'assets', 'media.json')
if (!fs.existsSync(mediaPath)) {
  console.error('media.json not found at', mediaPath)
  process.exit(1)
}
const media = JSON.parse(fs.readFileSync(mediaPath, 'utf8'))
if (!Array.isArray(media.projects)) {
  console.error('media.json does not contain a projects array')
  process.exit(1)
}
media.projects = media.projects.map(p => {
  if (!p.video) return p
  const name = path.parse(p.video).name
  p.poster = `${name}.webp`
  return p
})
fs.writeFileSync(mediaPath, JSON.stringify(media, null, 2), 'utf8')
console.log('Updated media.json posters for', media.projects.length, 'projects')
