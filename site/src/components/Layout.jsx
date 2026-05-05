import React, { useState, useEffect, useRef } from 'react'

export default function Layout({ children }){
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const setHeaderHeight = () => {
      const h = headerRef.current ? headerRef.current.offsetHeight : 88
      document.documentElement.style.setProperty('--header-height', `${h}px`)
    }
    setHeaderHeight()
    window.addEventListener('resize', setHeaderHeight)
    return () => window.removeEventListener('resize', setHeaderHeight)
  }, [])

  useEffect(() => {
    // prevent body scroll when mobile menu is open
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [mobileOpen])

  const closeOnNavigate = () => setMobileOpen(false)

  return (
    <div className="min-h-screen bg-primary text-white antialiased">
      <a href="#main" className="skip-link">Skip to content</a>

      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm border-b border-white/5">
        <div className="container flex items-center justify-between py-3 md:py-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/assets/profile/profile.png"
              onError={(e) => { e.target.onerror = null; e.target.src = '/assets/profile/profile.svg' }}
              alt="Himansh Sharma"
              width={40}
              height={40}
              className="hidden sm:block w-10 h-10 rounded-full object-cover flex-shrink-0"
              loading="eager"
              decoding="async"
            />
            <a href="#main" className="text-lg sm:text-xl font-display font-bold truncate">Himansh Sharma</a>
          </div>

          <nav className="hidden md:flex gap-8 items-center text-sm text-gray-300" aria-label="Primary navigation">
            <a href="#about" onClick={closeOnNavigate} className="transition-colors hover:text-indigo-500">About</a>
            <a href="#work" onClick={closeOnNavigate} className="transition-colors hover:text-indigo-500">Work</a>
            <a href="#services" onClick={closeOnNavigate} className="transition-colors hover:text-indigo-500">Services</a>
            <a href="#contact" onClick={closeOnNavigate} className="transition-colors hover:text-indigo-500">Contact</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-500">Resume</a>
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="md:hidden inline-flex items-center justify-center p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileOpen((s) => !s)}
          >
            <svg className={`w-6 h-6 transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div id="mobile-nav" className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute top-0 right-0 h-full w-72 bg-gradient-to-b from-primary via-primary to-primary/95 shadow-2xl overflow-y-auto">
            <nav className="flex flex-col gap-1 p-6 mt-20" aria-label="Mobile navigation">
              <a href="#about" onClick={closeOnNavigate} className="block px-4 py-3 text-base rounded-lg transition-colors hover:bg-white/10 hover:text-indigo-400 focus-visible:bg-white/10">About</a>
              <a href="#work" onClick={closeOnNavigate} className="block px-4 py-3 text-base rounded-lg transition-colors hover:bg-white/10 hover:text-indigo-400 focus-visible:bg-white/10">Work</a>
              <a href="#services" onClick={closeOnNavigate} className="block px-4 py-3 text-base rounded-lg transition-colors hover:bg-white/10 hover:text-indigo-400 focus-visible:bg-white/10">Services</a>
              <a href="#contact" onClick={closeOnNavigate} className="block px-4 py-3 text-base rounded-lg transition-colors hover:bg-white/10 hover:text-indigo-400 focus-visible:bg-white/10">Contact</a>
              <a href="/resume.pdf" onClick={closeOnNavigate} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-base rounded-lg transition-colors hover:bg-white/10 hover:text-indigo-400 focus-visible:bg-white/10">Resume</a>
            </nav>
          </aside>
        </div>
      )}

      {children}

      <footer className="py-12">
        <div className="container flex items-center justify-between text-gray-400 text-sm">
          <div>© {new Date().getFullYear()} Himansh Sharma</div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/himanshsharmaa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white hover:text-indigo-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.3 8.98h4.4V24H.3V8.98zM8.6 8.98h4.22v2.06h.06c.59-1.12 2.04-2.3 4.2-2.3 4.49 0 5.32 2.96 5.32 6.81V24h-4.4v-7.53c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.9 1.97-2.9 4v7.65H8.6V8.98z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/himansh.films/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white hover:text-indigo-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.98.25 2.44.416a4.92 4.92 0 0 1 1.78 1.04c.5.5.78 1.06 1.04 1.78.166.46.36 1.27.415 2.44.058 1.267.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.25 1.98-.416 2.44a4.92 4.92 0 0 1-1.04 1.78c-.5.5-1.06.78-1.78 1.04-.46.166-1.27.36-2.44.415-1.267.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.98-.25-2.44-.416a4.92 4.92 0 0 1-1.78-1.04 4.92 4.92 0 0 1-1.04-1.78c-.166-.46-.36-1.27-.415-2.44C2.212 15.586 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.25-1.98.416-2.44a4.92 4.92 0 0 1 1.04-1.78A4.92 4.92 0 0 1 5.46 1.686c.46-.166 1.27-.36 2.44-.415C8.416 1.22 8.8 1.2 12 1.2zM12 0C8.736 0 8.332.012 7.052.07 5.765.127 4.9.33 4.14.54a6.92 6.92 0 0 0-2.5 1.34A6.92 6.92 0 0 0 .3 4.38c-.21.76-.413 1.625-.47 2.912C-.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.057 1.287.26 2.152.47 2.912a6.92 6.92 0 0 0 1.34 2.5 6.92 6.92 0 0 0 2.5 1.34c.76.21 1.625.413 2.912.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.287-.057 2.152-.26 2.912-.47a6.92 6.92 0 0 0 2.5-1.34 6.92 6.92 0 0 0 1.34-2.5c.21-.76.413-1.625.47-2.912.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.057-1.287-.26-2.152-.47-2.912a6.92 6.92 0 0 0-1.34-2.5 6.92 6.92 0 0 0-2.5-1.34c-.76-.21-1.625-.413-2.912-.47C15.668.012 15.264 0 12 0zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.17 6.17 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 a0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
              </svg>
            </a>
            <a href="https://wa.me/917678609018?text=Hi%20I%20am%20interested%20in%20your%20video%20editing%20services" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-white hover:text-indigo-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a8.368 8.368 0 00-8.239 8.312c0 1.452.364 2.869 1.054 4.159L3.1 23.415l4.26-1.408a8.356 8.356 0 004.037.997h.004a8.368 8.368 0 008.239-8.313 8.325 8.325 0 00-2.418-5.954 8.306 8.306 0 00-5.882-2.436M19.268 1.463C17.186.465 14.787 0 12.146 0 5.365 0 .073 5.292.073 12.073c0 2.16.503 4.25 1.455 6.139L0 24l6.352-2.096a11.999 11.999 0 005.794 1.466h.005c6.78 0 12.073-5.293 12.073-12.073 0-3.22-1.25-6.253-3.527-8.527-2.278-2.274-5.31-3.527-8.502-3.527" />
              </svg>
            </a>
            {/* <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M23.5 6.2a2.88 2.88 0 0 0-2.02-2.03C19.84 3.6 12 3.6 12 3.6s-7.84 0-9.48.57A2.88 2.88 0 0 0 .5 6.2C0 7.84 0 12 0 12s0 4.16.5 5.8a2.88 2.88 0 0 0 2.02 2.03c1.64.57 9.48.57 9.48.57s7.84 0 9.48-.57a2.88 2.88 0 0 0 2.02-2.03c.5-1.64.5-5.8.5-5.8s0-4.16-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </a> */}
          </div>
        </div>
      </footer>
    </div>
  )
}
