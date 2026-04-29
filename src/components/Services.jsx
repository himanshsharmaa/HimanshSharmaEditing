import React from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Social Reels',
    desc: 'Short-form edits crafted for high retention on Instagram, TikTok, and YouTube Shorts.'
  },
  {
    id: 2,
    title: 'Brand Films',
    desc: 'Cinematic brand films and hero videos that elevate perception and storytelling.'
  },
  {
    id: 3,
    title: 'Ad Edits',
    desc: 'Conversion-focused ad edits optimized for platform delivery and A/B testing.'
  }
]

export default function Services() {
  return (
    <section id="services" className="container py-16 glass-alt">
      <div className="max-w-content">
        <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold">Services</motion.h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {services.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="bg-transparent"
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="text-gray-400 mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
