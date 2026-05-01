#!/usr/bin/env node
/**
 * Simple image optimizer script using sharp.
 * Generates WebP full-size plus -400 and -800 variants for posters and profile images.
 * Run from `site` folder with: `npm run optimize-images` (adds devDependency 'sharp').
 */
const fs = require('fs').promises
const path = require('path')

async function safeRequire(pkg) {
  try { return require(pkg) } catch (err) { return null }
}

(async function main(){
  const sharp = await safeRequire('sharp')
  if(!sharp){
    console.error('Missing dependency: sharp. Run `npm install --save-dev sharp` in the site folder and re-run this script.')
    process.exit(1)
  }

  const assetsRoot = path.resolve(__dirname, '..', '..', 'assets')
  const posterDir = path.join(assetsRoot, 'posters')
  const profileDir = path.join(assetsRoot, 'profile')
  const sizes = [400, 800]

  async function exists(p){
    try{ await fs.access(p); return true }catch(e){return false}
  }

  async function processDir(dir){
    try{
      const files = await fs.readdir(dir)
      for(const file of files){
        const ext = path.extname(file).toLowerCase()
        if(!['.png','.jpg','.jpeg','.webp','.svg'].includes(ext)) continue
        const base = file.slice(0, -ext.length)
        const input = path.join(dir, file)

        for(const size of sizes){
          const out = path.join(dir, `${base}-${size}.webp`)
          if(await exists(out)){
            console.log('skip', out)
            continue
          }
          try{
            await sharp(input).resize({ width: size }).webp({ quality: 80 }).toFile(out)
            console.log('written', out)
          }catch(err){
            console.warn('failed to write', out, err.message)
          }
        }

        const outFull = path.join(dir, `${base}.webp`)
        if(!(await exists(outFull))){
          try{
            await sharp(input).webp({ quality: 84 }).toFile(outFull)
            console.log('written', outFull)
          }catch(err){
            console.warn('failed to write full webp', outFull, err.message)
          }
        }
      }
    }catch(err){
      console.error('Error processing dir', dir, err.message)
    }
  }

  console.log('Optimizing posters...')
  await processDir(posterDir)
  console.log('Optimizing profile images...')
  await processDir(profileDir)
  console.log('Done.');
})()
