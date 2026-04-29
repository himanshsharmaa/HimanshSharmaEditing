import React from 'react'
import { motion } from 'framer-motion'

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

const software = [
  { id: 1, name: 'Adobe Premiere Pro', icon: '/assets/icons/premiere-pro.png', color: '#6C3EA3', years: 6 },
  { id: 2, name: 'After Effects', icon: '/assets/icons/after-effects.png', color: '#4F2A85', years: 6 },
  { id: 3, name: 'DaVinci Resolve', icon: '/assets/icons/davinci.png', color: '#00A3A3', years: 4 },
  { id: 4, name: 'Adobe Photoshop', icon: '/assets/icons/photoshop.png', color: '#001E36', years: 7 },
  { id: 5, name: 'Lightroom', icon: '/assets/icons/photoshop-lightroom.png', color: '#31A8FF', years: 5 },
  { id: 6, name: 'Adobe Audition', icon: '/assets/icons/audition.png', color: '#4A8A3B', years: 4 },
  { id: 7, name: 'FFmpeg', icon: '/assets/icons/ffmpeg.png', color: '#F05A28', years: 8 },
  { id: 8, name: 'Final Cut Pro', icon: '/assets/icons/final-cut.png', color: '#0A84FF', years: 3 }
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
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {software.map(s => (
                <SoftwareTile key={s.id} s={s} />
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

function SoftwareTile({s}){
  const [imgError, setImgError] = React.useState(false);
  const initials = getInitials(s.name);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="flex flex-col items-center gap-2 text-center p-3 hover:bg-white/5 focus:outline-none rounded"
      role="img"
      aria-label={s.name}
      tabIndex={0}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden" style={{backgroundColor: s.color}}>
        {!imgError ? (
          <img src={s.icon} alt={s.name} className="w-7 h-7 object-contain" onError={(e)=>{ e.currentTarget.onerror = null; setImgError(true); }} />
        ) : (
          <span className="text-white text-sm font-semibold">{initials}</span>
        )}
      </div>
      <div className="text-sm text-gray-200">{s.name}</div>
      <div className="text-xs text-gray-400">{s.years} yrs</div>
    </motion.div>
  )
}
