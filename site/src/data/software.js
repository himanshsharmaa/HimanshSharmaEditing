const base = [
  { id: 1, name: 'Adobe Premiere Pro', icon: '/assets/icons/premiere-pro.png', color: '#6C3EA3', years: 6, abbr: 'Pr' },
  { id: 2, name: 'After Effects', icon: '/assets/icons/after-effects.png', color: '#4F2A85', years: 6, abbr: 'Ae' },
  { id: 3, name: 'DaVinci Resolve', icon: '/assets/icons/davinci.png', color: '#00A3A3', years: 4, abbr: 'DR' },
  { id: 4, name: 'Adobe Photoshop', icon: '/assets/icons/photoshop.png', color: '#001E36', years: 7, abbr: 'Ps' },
  { id: 5, name: 'Lightroom', icon: '/assets/icons/photoshop-lightroom.png', color: '#31A8FF', years: 5, abbr: 'Lr' },
  { id: 6, name: 'Adobe Audition', icon: '/assets/icons/audition.png', color: '#4A8A3B', years: 4, abbr: 'Au' },
  { id: 7, name: 'FFmpeg', icon: '/assets/icons/ffmpeg.png', color: '#F05A28', years: 8, abbr: 'FF' },
  { id: 8, name: 'Final Cut Pro', icon: '/assets/icons/final-cut.png', color: '#0A84FF', years: 3, abbr: 'FC' }
]

function pickTextColor(hex){
  if(!hex) return '#ffffff'
  let h = hex.replace('#','')
  if(h.length === 3) h = h.split('').map(c=>c+c).join('')
  const bigint = parseInt(h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance > 0.55 ? '#000000' : '#ffffff'
}

function makeSvg(label, bg, fg){
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' rx='32' fill='${bg}'/><text x='50%' y='50%' dy='0.35em' font-family='Inter, Arial, sans-serif' font-size='26' font-weight='600' fill='${fg}' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

const software = base.map(s => ({
  ...s,
  iconSvg: makeSvg(s.abbr || s.name.slice(0,2).toUpperCase(), s.color, pickTextColor(s.color))
}))

export default software
