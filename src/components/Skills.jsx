import React from 'react'
import { motion } from 'framer-motion'
import software from '../data/software'

const skillsList = [
  'Video Editing',
  'Color Grading',
  'Motion Graphics',
  'Sound Design',
  'Storytelling & Scripting',
  'Cinematography',
  'Compression & Encoding',
  'Social Media Optimization'
]

export default function Skills(){
  return (
    <section id="skills" className="container py-16 glass-alt">
      <div className="max-w-content">
        <div className="flex items-start justify-between gap-6">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold">Skills &amp; Software</motion.h2>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <p className="text-gray-300 max-w-[38rem]">I specialise in delivering high-retention short-form and long-form video edits, motion graphics, and colour grading for brands and creators. Below are my core skills and the software I regularly use.</p>

            <h3 className="mt-6 text-sm font-medium text-gray-200">Core Skills</h3>
            <ul className="mt-3 columns-1 sm:columns-2 gap-4 text-gray-300 list-disc">
              {skillsList.map((s, i) => (
                <li key={i} className="mb-2 break-inside-avoid">{s}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-200">Software</h3>
            <div className="mt-4 flex gap-4 overflow-x-auto snap-x sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible">
              {software.map(s => (
                <div className="min-w-[9rem] snap-start" key={s.id}>
                  <SoftwareTile key={s.id} s={s} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getInitials(name){
  const stopWords = ['Adobe','the','&','and','for','Pro','Final','CC'];
  const parts = name.split(/[\s-]+/).filter(p=>p && !stopWords.includes(p));
  if(parts.length === 0) return name.slice(0,2).toUpperCase();
  if(parts.length === 1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

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

function getLevel(years){
  if(years >= 6) return 'Expert'
  if(years >= 3) return 'Proficient'
  return 'Familiar'
}

function SoftwareTile({s}){
  const [srcIndex, setSrcIndex] = React.useState(0)
  const sources = [s.iconSvg, s.icon].filter(Boolean)
  const imgSrc = sources[srcIndex]
  const label = s.abbr ? s.abbr : getInitials(s.name)
  const textColor = pickTextColor(s.color)
  const micro = `${s.years} yrs — ${getLevel(s.years)}`
  const descId = `software-desc-${s.id}`

  function emitAnalytics(action){
    const payload = { id: s.id, name: s.name, abbr: s.abbr, action, years: s.years, ts: Date.now() }
    try{ if(window.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'software_interaction', ...payload }) }catch(e){}
    try{ window.dispatchEvent(new CustomEvent('software-interaction',{detail: payload})) }catch(e){}
    if(typeof window !== 'undefined' && window.__DEV__) console.log('analytics', payload)
  }

  function onImgError(){
    if(srcIndex + 1 < sources.length) setSrcIndex(i => i + 1)
    else setSrcIndex(sources.length)
  }

  function handleKey(e){
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault()
      emitAnalytics('activate')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="flex flex-col items-center gap-2 text-center p-3 hover:bg-white/5 focus:outline-none rounded ring-1 ring-white/5 shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2"
      role="button"
      data-analytics={`software:${s.id}`}
      aria-label={s.name}
      aria-describedby={descId}
      title={`${s.name} — ${micro}`}
      tabIndex={0}
      onMouseEnter={()=>emitAnalytics('hover')}
      onClick={()=>emitAnalytics('click')}
      onKeyDown={handleKey}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden" style={{backgroundColor: s.color}}>
        {imgSrc && srcIndex < sources.length ? (
          <img src={imgSrc} alt={s.name} className="w-7 h-7 object-contain" onError={onImgError} />
        ) : (
          <span className="text-sm font-semibold" style={{color: textColor}}>{label}</span>
        )}
      </div>
      <div className="text-sm text-gray-200">{s.name}</div>
      <div id={descId} className="text-xs text-gray-400">{micro}</div>
    </motion.div>
  )
}
