import React from 'react'
import { motion } from 'framer-motion'

const easing = [0.16, 1, 0.3, 1]

export default function Hero(){
  return (
    <section className="relative overflow-hidden hero-grid">
      <div className="container min-h-[72vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          <div className="lg:col-span-7 space-y-6">

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
              <a href="https://www.linkedin.com/in/himanshsharmaa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition duration-200 hover:brightness-125">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="linkedinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0A66C2" />
                      <stop offset="100%" stopColor="#005E96" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#linkedinGradient)" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.3 8.98h4.4V24H.3V8.98zM8.6 8.98h4.22v2.06h.06c.59-1.12 2.04-2.3 4.2-2.3 4.49 0 5.32 2.96 5.32 6.81V24h-4.4v-7.53c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.9 1.97-2.9 4v7.65H8.6V8.98z" />
                </svg>
              </a>

              <a href="https://www.instagram.com/himansh.films/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition duration-200 hover:brightness-125">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FD5949" />
                      <stop offset="50%" stopColor="#D6249F" />
                      <stop offset="100%" stopColor="#285AEB" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#instagramGradient)" d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.98.25 2.44.416a4.92 4.92 0 0 1 1.78 1.04c.5.5.78 1.06 1.04 1.78.166.46.36 1.27.415 2.44.058 1.267.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.25 1.98-.416 2.44a4.92 4.92 0 0 1-1.04 1.78c-.5.5-1.06.78-1.78 1.04-.46.166-1.27.36-2.44.415-1.267.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.98-.25-2.44-.416a4.92 4.92 0 0 1-1.78-1.04 4.92 4.92 0 0 1-1.04-1.78c-.166-.46-.36-1.27-.415-2.44C2.212 15.586 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.25-1.98.416-2.44a4.92 4.92 0 0 1 1.04-1.78A4.92 4.92 0 0 1 5.46 1.686c.46-.166 1.27-.36 2.44-.415C8.416 1.22 8.8 1.2 12 1.2zM12 0C8.736 0 8.332.012 7.052.07 5.765.127 4.9.33 4.14.54a6.92 6.92 0 0 0-2.5 1.34A6.92 6.92 0 0 0 .3 4.38c-.21.76-.413 1.625-.47 2.912C-.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.057 1.287.26 2.152.47 2.912a6.92 6.92 0 0 0 1.34 2.5 6.92 6.92 0 0 0 2.5 1.34c.76.21 1.625.413 2.912.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.287-.057 2.152-.26 2.912-.47a6.92 6.92 0 0 0 2.5-1.34 6.92 6.92 0 0 0 1.34-2.5c.21-.76.413-1.625.47-2.912.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.057-1.287-.26-2.152-.47-2.912a6.92 6.92 0 0 0-1.34-2.5 6.92 6.92 0 0 0-2.5-1.34c-.76-.21-1.625-.413-2.912-.47C15.668.012 15.264 0 12 0zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.17 6.17 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
                </svg>
              </a>

              <a href="https://wa.me/917678609018?text=Hi%20I%20am%20interested%20in%20your%20video%20editing%20services" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition duration-200 hover:brightness-125">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#25D366" />
                      <stop offset="100%" stopColor="#128C7E" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#whatsappGradient)" d="M12 0C5.373 0 0 5.373 0 12c0 2.168.573 4.209 1.575 5.981L.01 24l6.294-1.953C9.798 23.477 12 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.96c-1.954 0-3.864-.545-5.506-1.554l-.395-.235-4.091 1.267 1.289-4.095-.247-.397c-1.15-1.787-1.786-3.869-1.786-6.046 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
                  <path fill="url(#whatsappGradient)" d="M17.415 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.172.198-.346.223-.643.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.172-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.172-.008-.37-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.172-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
              </a>

              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume" className="text-gray-200 hover:text-indigo-500">
                View My Resume
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-[420px] lg:h-[420px]">
              <motion.div
                aria-hidden="true"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0], opacity: [0.6, 0.35, 0.6] }}
                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.18), rgba(236,72,153,0.12), rgba(249,115,22,0.09))', filter: 'blur(28px)', zIndex: -1 }}
              />
              <img
                src="/assets/profile/profile.png"
                alt="Illustration"
                fetchpriority="high"
                width={420}
                height={420}
                className="relative w-full h-full object-cover rounded-xl shadow-2xl hero-img-mask"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
                onError={(e)=>{e.target.onerror=null; e.target.src='/assets/profile/profile.svg'}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
