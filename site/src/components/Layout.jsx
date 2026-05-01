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
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/profile/profile.png"
              onError={(e) => { e.target.onerror = null; e.target.src = '/assets/profile/profile.svg' }}
              alt="Himansh Sharma"
              className="hidden sm:block w-10 h-10 rounded-full object-cover"
            />
            <a href="#" className="text-xl font-display font-bold">Himansh Sharma</a>
          </div>

          <nav className="hidden md:flex gap-6 items-center text-sm text-gray-300" aria-label="Primary navigation">
            <a href="#work" onClick={closeOnNavigate} className="hover:underline">Work</a>
            <a href="#services" onClick={closeOnNavigate} className="hover:underline">Services</a>
            <a href="#about" onClick={closeOnNavigate} className="hover:underline">About</a>
            <a href="#contact" onClick={closeOnNavigate} className="hover:underline">Contact</a>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Resume</a>
            
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="inline-flex items-center justify-center p-2"
              onClick={() => setMobileOpen((s) => !s)}
            >
              <span className={`block w-6 h-0.5 bg-gray-200 transition-transform ${mobileOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-200 my-1 transition-opacity ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-200 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1.5'}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div id="mobile-nav" className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute top-0 right-0 w-64 h-full bg-primary p-6 text-gray-200">
            <nav className="flex flex-col gap-6 mt-6" aria-label="Mobile navigation">
              <a href="#work" onClick={closeOnNavigate} className="text-lg">Work</a>
              <a href="#services" onClick={closeOnNavigate} className="text-lg">Services</a>
              <a href="#about" onClick={closeOnNavigate} className="text-lg">About</a>
              <a href="#contact" onClick={closeOnNavigate} className="text-lg">Contact</a>
              <a href="/Resume.pdf" onClick={closeOnNavigate} target="_blank" rel="noopener noreferrer" className="text-lg">Resume</a>
            </nav>
          </aside>
        </div>
      )}

      {children}

      <footer className="py-12">
        <div className="container flex items-center justify-between text-gray-400 text-sm">
          <div>© {new Date().getFullYear()} Himansh Sharma</div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/himanshsharmaa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.3 8.98h4.4V24H.3V8.98zM8.6 8.98h4.22v2.06h.06c.59-1.12 2.04-2.3 4.2-2.3 4.49 0 5.32 2.96 5.32 6.81V24h-4.4v-7.53c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.9 1.97-2.9 4v7.65H8.6V8.98z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/himansh.films/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.98.25 2.44.416a4.92 4.92 0 0 1 1.78 1.04c.5.5.78 1.06 1.04 1.78.166.46.36 1.27.415 2.44.058 1.267.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.25 1.98-.416 2.44a4.92 4.92 0 0 1-1.04 1.78c-.5.5-1.06.78-1.78 1.04-.46.166-1.27.36-2.44.415-1.267.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.98-.25-2.44-.416a4.92 4.92 0 0 1-1.78-1.04 4.92 4.92 0 0 1-1.04-1.78c-.166-.46-.36-1.27-.415-2.44C2.212 15.586 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.25-1.98.416-2.44a4.92 4.92 0 0 1 1.04-1.78A4.92 4.92 0 0 1 5.46 1.686c.46-.166 1.27-.36 2.44-.415C8.416 1.22 8.8 1.2 12 1.2zM12 0C8.736 0 8.332.012 7.052.07 5.765.127 4.9.33 4.14.54a6.92 6.92 0 0 0-2.5 1.34A6.92 6.92 0 0 0 .3 4.38c-.21.76-.413 1.625-.47 2.912C-.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.057 1.287.26 2.152.47 2.912a6.92 6.92 0 0 0 1.34 2.5 6.92 6.92 0 0 0 2.5 1.34c.76.21 1.625.413 2.912.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.287-.057 2.152-.26 2.912-.47a6.92 6.92 0 0 0 2.5-1.34 6.92 6.92 0 0 0 1.34-2.5c.21-.76.413-1.625.47-2.912.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.057-1.287-.26-2.152-.47-2.912a6.92 6.92 0 0 0-1.34-2.5 6.92 6.92 0 0 0-2.5-1.34c-.76-.21-1.625-.413-2.912-.47C15.668.012 15.264 0 12 0zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.17 6.17 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 a0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
              </svg>
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M23.5 6.2a2.88 2.88 0 0 0-2.02-2.03C19.84 3.6 12 3.6 12 3.6s-7.84 0-9.48.57A2.88 2.88 0 0 0 .5 6.2C0 7.84 0 12 0 12s0 4.16.5 5.8a2.88 2.88 0 0 0 2.02 2.03c1.64.57 9.48.57 9.48.57s7.84 0 9.48-.57a2.88 2.88 0 0 0 2.02-2.03c.5-1.64.5-5.8.5-5.8s0-4.16-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
