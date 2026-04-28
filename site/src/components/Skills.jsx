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
  { id: 1, name: 'Adobe Premiere Pro', icon: '/assets/icons/premiere-pro.png' },
  { id: 2, name: 'After Effects', icon: '/assets/icons/after-effects.png' },
  { id: 3, name: 'DaVinci Resolve', icon: '/assets/icons/davinci.png' },
  { id: 4, name: 'Adobe Photoshop', icon: '/assets/icons/photoshop.png' },
  { id: 5, name: 'Lightroom', icon: '/assets/icons/photoshop-lightroom.png' },
  { id: 6, name: 'Adobe Audition', icon: '/assets/icons/audition.png' },
  { id: 7, name: 'FFmpeg', icon: '/assets/icons/ffmpeg.png' },
  { id: 8, name: 'Final Cut Pro', icon: '/assets/icons/final-cut.png' }
]

export default function Skills(){
  return (
    <section id="skills" className="container py-16 glass-alt">
      <div className="max-w-content">
        <div className="flex items-start justify-between gap-6">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold">Skills &amp; Software</motion.h2>
          <div className="hidden sm:flex items-center gap-3">
            <a href="https://www.linkedin.com/in/himanshsharmaa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.3 8.98h4.4V24H.3V8.98zM8.6 8.98h4.22v2.06h.06c.59-1.12 2.04-2.3 4.2-2.3 4.49 0 5.32 2.96 5.32 6.81V24h-4.4v-7.53c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.9 1.97-2.9 4v7.65H8.6V8.98z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/himansh.films/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.98.25 2.44.416a4.92 4.92 0 0 1 1.78 1.04c.5.5.78 1.06 1.04 1.78.166.46.36 1.27.415 2.44.058 1.267.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.25 1.98-.416 2.44a4.92 4.92 0 0 1-1.04 1.78c-.5.5-1.06.78-1.78 1.04-.46.166-1.27.36-2.44.415-1.267.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.98-.25-2.44-.416a4.92 4.92 0 0 1-1.78-1.04 4.92 4.92 0 0 1-1.04-1.78c-.166-.46-.36-1.27-.415-2.44C2.212 15.586 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.25-1.98.416-2.44a4.92 4.92 0 0 1 1.04-1.78A4.92 4.92 0 0 1 5.46 1.686c.46-.166 1.27-.36 2.44-.415C8.416 1.22 8.8 1.2 12 1.2zM12 0C8.736 0 8.332.012 7.052.07 5.765.127 4.9.33 4.14.54a6.92 6.92 0 0 0-2.5 1.34A6.92 6.92 0 0 0 .3 4.38c-.21.76-.413 1.625-.47 2.912C-.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.057 1.287.26 2.152.47 2.912a6.92 6.92 0 0 0 1.34 2.5 6.92 6.92 0 0 0 2.5 1.34c.76.21 1.625.413 2.912.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.287-.057 2.152-.26 2.912-.47a6.92 6.92 0 0 0 2.5-1.34 6.92 6.92 0 0 0 1.34-2.5c.21-.76.413-1.625.47-2.912.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.057-1.287-.26-2.152-.47-2.912a6.92 6.92 0 0 0-1.34-2.5 6.92 6.92 0 0 0-2.5-1.34c-.76-.21-1.625-.413-2.912-.47C15.668.012 15.264 0 12 0zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.17 6.17 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
              </svg>
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-300 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M23.5 6.2a2.88 2.88 0 0 0-2.02-2.03C19.84 3.6 12 3.6 12 3.6s-7.84 0-9.48.57A2.88 2.88 0 0 0 .5 6.2C0 7.84 0 12 0 12s0 4.16.5 5.8a2.88 2.88 0 0 0 2.02 2.03c1.64.57 9.48.57 9.48.57s7.84 0 9.48-.57a2.88 2.88 0 0 0 2.02-2.03c.5-1.64.5-5.8.5-5.8s0-4.16-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <p className="text-gray-300">I specialise in delivering high-retention short-form and long-form video edits, motion graphics, and colour grading for brands and creators. Below are my core skills and the software I regularly use.</p>

            <h3 className="mt-6 text-sm font-medium text-gray-200">Core Skills</h3>
            <ul className="mt-3 list-disc list-inside space-y-2 text-gray-300">
              {skillsList.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-200">Software</h3>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {software.map(s => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center gap-2 text-center p-3 bg-white/3 rounded">
                  <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center">
                    <img src={s.icon} alt={s.name} className="w-7 h-7 object-contain" />
                  </div>
                  <div className="text-sm text-gray-200">{s.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
