import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'

export default function ModalVideo({ isOpen, videoSrc, videoPoster, title, description, onClose }) {
  const videoRef = useRef(null)
  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement
      // prevent background scrolling
      document.body.style.overflow = 'hidden'
      // focus the close button
      setTimeout(() => closeButtonRef.current?.focus(), 0)
    } else {
      // restore focus and scrolling
      document.body.style.overflow = ''
      if (lastFocused.current && typeof lastFocused.current.focus === 'function') {
        lastFocused.current.focus()
      }
      if (videoRef.current) {
        videoRef.current.pause()
        // remove src and poster to free memory / stop download
        videoRef.current.removeAttribute('src')
        videoRef.current.removeAttribute('poster')
        videoRef.current.load()
      }
    }
  }, [isOpen])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    // attempt to play when videoSrc changes and modal is open
    if (isOpen && videoRef.current && videoSrc) {
      try {
        videoRef.current.load()
        const p = videoRef.current.play()
        if (p && p.catch) p.catch(() => {})
      } catch (err) {}
    }
  }, [isOpen, videoSrc])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <FocusTrap active={isOpen} focusTrapOptions={{ clickOutsideDeactivates: true, initialFocus: () => closeButtonRef.current }}>
            <motion.div
              role="dialog"
              aria-modal="true"
              ref={dialogRef}
              className="relative w-full max-w-4xl mx-auto"
              initial={{ y: 12, opacity: 0, scale: 0.995 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.26 }}
            >
              <div className="absolute -top-10 right-0 flex items-center gap-3">
                {videoSrc ? (
                  <>
                    <a href={videoSrc} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-200 hover:underline">Open</a>
                    <a href={videoSrc} download className="text-sm text-gray-200 hover:underline">Download</a>
                  </>
                ) : null}

                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close video"
                  className="text-gray-200 hover:text-white focus:outline-none"
                >
                  Close
                </button>
              </div>

              <div className="bg-black rounded overflow-hidden">
                <video
                  ref={videoRef}
                  controls
                  preload="none"
                  poster={videoPoster || undefined}
                  className="w-full h-auto bg-black"
                >
                  {videoSrc ? <source src={videoSrc} type="video/mp4" /> : null}
                  Your browser does not support the video tag.
                </video>

                {(title || description) && (
                  <div className="p-4 bg-black">
                    {title ? <h3 className="text-lg font-semibold">{title}</h3> : null}
                    {description ? <p className="text-gray-300 mt-2">{description}</p> : null}
                  </div>
                )}
              </div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
