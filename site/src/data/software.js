const base = [
  { id: 1, name: 'Adobe Premiere Pro', icon: '/assets/icons/premiere-pro.png', color: '#6C3EA3', years: 2, abbr: 'Pr' },
  { id: 2, name: 'After Effects', icon: '/assets/icons/after-effects.png', color: '#4F2A85', years: 2, abbr: 'Ae' },
  { id: 3, name: 'DaVinci Resolve', icon: '/assets/icons/davinci.png', color: '#00A3A3', years: 1, abbr: 'DR' },
  { id: 4, name: 'Adobe Photoshop', icon: '/assets/icons/photoshop.png', color: '#001E36', years: 2, abbr: 'Ps' },
  { id: 5, name: 'Lightroom', icon: '/assets/icons/photoshop-lightroom.png', color: '#31A8FF', years: 3, abbr: 'Lr' },
  { id: 8, name: 'CapCut', icon: '/assets/icons/capcut.png', color: '#00AEEF', years: 2, abbr: 'CC' },
  { id: 9, name: 'AI Tools', icon: '/assets/icons/ai.png', color: '#8E5CFF', years: 1, abbr: 'AI' }
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
