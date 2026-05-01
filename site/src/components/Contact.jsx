import React, { useState } from 'react'

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

  return (
    <section id="contact" className="container py-16">
      <div className="max-w-content">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-gray-400 mt-2">For rates, availability and project inquiries, send a short note below.</p>

        <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="mt-6 grid gap-4 max-w-2xl" aria-live="polite">
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Name</span>
            <input name="name" required value={name} onChange={e => setName(e.target.value)} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent" placeholder="Your name" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Email</span>
            <input name="email" required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent" placeholder="you@email.com" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Message</span>
            <textarea name="message" required value={message} onChange={e => setMessage(e.target.value)} rows={6} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent" placeholder="Tell me about your project" />
          </label>

          <div>
            <button type="submit" className="inline-block bg-accent text-black px-5 py-3 rounded font-medium">Send</button>
            <span className="ml-4 text-sm text-gray-300">{status === 'pending' ? 'Sending...' : status === 'success' ? 'Message sent — thanks!' : status === 'error' ? 'Error sending, try again.' : status === 'fallback-mailto' ? 'Opening mail client...' : (typeof status === 'string' && status ? status : '')}</span>
          </div>
        </form>
      </div>
    </section>
  )
}
