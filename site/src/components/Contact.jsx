import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  // read endpoint from environment (Vite: VITE_CONTACT_ENDPOINT)
  const FORM_ENDPOINT = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CONTACT_ENDPOINT) || 'https://formspree.io/f/your-form-id'

  async function handleSubmit(e){
    e.preventDefault()
    // basic client-side validation
    if (!name || name.length < 2) return setStatus('Please enter your name')
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRe.test(email)) return setStatus('Please enter a valid email')
    if (!message || message.length < 10) return setStatus('Please include a short message')

    setStatus('pending')
    const endpoint = FORM_ENDPOINT

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('message', message)
      // include honeypot field for Netlify/Formspree
      formData.append('bot-field', '')

      // if endpoint still the placeholder, fallback to mailto to avoid lost messages
      if (endpoint.includes('your-form-id')) {
        window.location.href = `mailto:${encodeURIComponent(email || 'hello@example.com')}?subject=${encodeURIComponent('Website contact')}&body=${encodeURIComponent(`Name: ${name}\n\n${message}`)}`
        setStatus('fallback-mailto')
        return
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section id="contact" className="container py-16">
      <div className="max-w-content">
        <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold">Contact</motion.h2>
        <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-gray-400 mt-2">For rates, availability and project inquiries, send a short note below.</motion.p>

        <motion.form 
          name="contact" 
          method="POST" 
          data-netlify="true" 
          onSubmit={handleSubmit} 
          className="mt-6 grid gap-4 max-w-2xl" 
          aria-live="polite"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={formVariants}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
          <motion.label className="flex flex-col" variants={fieldVariants}>
            <span className="text-sm text-gray-300">Name</span>
            <input name="name" required value={name} onChange={e => setName(e.target.value)} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all" placeholder="Your name" />
          </motion.label>

          <motion.label className="flex flex-col" variants={fieldVariants}>
            <span className="text-sm text-gray-300">Email</span>
            <input name="email" required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all" placeholder="you@email.com" />
          </motion.label>

          <motion.label className="flex flex-col" variants={fieldVariants}>
            <span className="text-sm text-gray-300">Message</span>
            <textarea name="message" required value={message} onChange={e => setMessage(e.target.value)} rows={6} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all" placeholder="Tell me about your project" />
          </motion.label>

          <motion.div variants={fieldVariants}>
            <motion.button 
              type="submit" 
              className="inline-block bg-accent text-black px-5 py-3 rounded font-medium transition-all"
              whileHover={{ scale: 1.05, backgroundColor: '#e8b949' }}
              whileTap={{ scale: 0.98 }}
            >
              Send
            </motion.button>
            <span className="ml-4 text-sm text-gray-300">{status === 'pending' ? 'Sending...' : status === 'success' ? 'Message sent — thanks!' : status === 'error' ? 'Error sending, try again.' : status === 'fallback-mailto' ? 'Opening mail client...' : (typeof status === 'string' && status ? status : '')}</span>
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}
