import React from 'react'
import { motion } from 'framer-motion'

const easing = [0.16, 1, 0.3, 1]

export default function Hero(){
  return (
    <section className="relative overflow-hidden hero-grid">
      <div className="container min-h-[72vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/assets/profile/profile.png"
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/profile/profile.svg' }}
                alt="Himansh Sharma"
                className="w-16 h-16 rounded-full object-cover hidden sm:block"
              />
              <p className="text-sm text-gray-300">Himansh Sharma</p>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easing }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold hero-heading tracking-tight leading-tight"
            >
              High-Performing Video Edits That Capture <span className="text-indigo-500">Attention &amp; Convert</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: easing }}
              className="mt-4 text-lg text-gray-300 max-w-2xl"
            >
              I help brands and creators turn ideas into cinematic, high-retention content.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-6 flex gap-4 text-sm items-center"
            >
              <a href="https://www.linkedin.com/in/himanshsharmaa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-200 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.3 8.98h4.4V24H.3V8.98zM8.6 8.98h4.22v2.06h.06c.59-1.12 2.04-2.3 4.2-2.3 4.49 0 5.32 2.96 5.32 6.81V24h-4.4v-7.53c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.9 1.97-2.9 4v7.65H8.6V8.98z" />
                </svg>
              </a>

              <a href="https://www.instagram.com/himansh.films/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-200 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.98.25 2.44.416a4.92 4.92 0 0 1 1.78 1.04c.5.5.78 1.06 1.04 1.78.166.46.36 1.27.415 2.44.058 1.267.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.25 1.98-.416 2.44a4.92 4.92 0 0 1-1.04 1.78c-.5.5-1.06.78-1.78 1.04-.46.166-1.27.36-2.44.415-1.267.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.98-.25-2.44-.416a4.92 4.92 0 0 1-1.78-1.04 4.92 4.92 0 0 1-1.04-1.78c-.166-.46-.36-1.27-.415-2.44C2.212 15.586 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.25-1.98.416-2.44a4.92 4.92 0 0 1 1.04-1.78A4.92 4.92 0 0 1 5.46 1.686c.46-.166 1.27-.36 2.44-.415C8.416 1.22 8.8 1.2 12 1.2zM12 0C8.736 0 8.332.012 7.052.07 5.765.127 4.9.33 4.14.54a6.92 6.92 0 0 0-2.5 1.34A6.92 6.92 0 0 0 .3 4.38c-.21.76-.413 1.625-.47 2.912C-.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.057 1.287.26 2.152.47 2.912a6.92 6.92 0 0 0 1.34 2.5 6.92 6.92 0 0 0 2.5 1.34c.76.21 1.625.413 2.912.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.287-.057 2.152-.26 2.912-.47a6.92 6.92 0 0 0 2.5-1.34 6.92 6.92 0 0 0 1.34-2.5c.21-.76.413-1.625.47-2.912.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.057-1.287-.26-2.152-.47-2.912a6.92 6.92 0 0 0-1.34-2.5 6.92 6.92 0 0 0-2.5-1.34c-.76-.21-1.625-.413-2.912-.47C15.668.012 15.264 0 12 0zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.17 6.17 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
                </svg>
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 lg:w-[380px] lg:h-[380px]">
              <motion.div
                aria-hidden="true"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0], opacity: [0.6, 0.35, 0.6] }}
                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.18), rgba(236,72,153,0.12), rgba(249,115,22,0.09))', filter: 'blur(28px)', zIndex: -1 }}
              />
              <div className="absolute inset-x-0 -bottom-6 flex justify-center">
                <div className="hero-oval"></div>
              </div>
              <img
                src="/assets/profile/profile.png"
                alt="Illustration"
                className="relative w-full h-full object-cover rounded-xl shadow-2xl"
                onError={(e)=>{e.target.onerror=null; e.target.src='/assets/posters/Video-659.webp'}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
