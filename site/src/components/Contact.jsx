import React, { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('pending')
    // Replace with your Formspree endpoint or server endpoint
    const endpoint = 'https://formspree.io/f/your-form-id'

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('message', message)

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
        // fallback: open mail client
        window.location.href = `mailto:${encodeURIComponent(email || 'hello@example.com')}?subject=${encodeURIComponent('Website contact')}&body=${encodeURIComponent(message || '')}`
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
            <input required value={name} onChange={e => setName(e.target.value)} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent" placeholder="Your name" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Email</span>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent" placeholder="you@email.com" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Message</span>
            <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={6} className="mt-1 p-3 bg-transparent border border-gray-700 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-accent" placeholder="Tell me about your project" />
          </label>

          <div>
            <button type="submit" className="inline-block bg-accent text-black px-5 py-3 rounded font-medium">Send</button>
            <span className="ml-4 text-sm text-gray-300">{status === 'pending' ? 'Sending...' : status === 'success' ? 'Message sent — thanks!' : status === 'error' ? 'Error sending, try again.' : ''}</span>
          </div>
        </form>
      </div>
    </section>
  )
}
