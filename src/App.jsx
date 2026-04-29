import React, { useState } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import WorkList from './components/WorkList'
import ModalVideo from './components/ModalVideo'
import Skills from './components/Skills'
import Workflow from './components/Workflow'
import Services from './components/Services'
import About from './components/About'
import CTA from './components/CTA'
import Contact from './components/Contact'

export default function App(){
  const [isOpen, setIsOpen] = useState(false)
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoPoster, setVideoPoster] = useState(null)
  const [modalTitle, setModalTitle] = useState(null)
  const [modalDesc, setModalDesc] = useState(null)

  const openModal = (video) => {
    if (!video) return
    if (typeof video === 'string') {
      setVideoSrc(video)
      setVideoPoster(null)
      setModalTitle(null)
      setModalDesc(null)
    } else {
      setVideoSrc(video.src || null)
      setVideoPoster(video.poster || null)
      setModalTitle(video.title || null)
      setModalDesc(video.description || null)
    }
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setVideoSrc(null)
    setVideoPoster(null)
  }

  return (
    <Layout>
      <main id="main">
        <Hero />
        <About />
        <WorkList onPlay={openModal} />
        <Skills />
        <Workflow />
        <Services />
        <CTA />
        <Contact />
      </main>
      <ModalVideo isOpen={isOpen} videoSrc={videoSrc} videoPoster={videoPoster} title={modalTitle} description={modalDesc} onClose={closeModal} />
    </Layout>
  )
}
