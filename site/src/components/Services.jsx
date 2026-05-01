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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export default function Services() {
  return (
    <section id="services" className="container py-16 glass-alt">
      <div className="max-w-content">
        <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold">Services</motion.h2>

        <motion.div 
          className="mt-6 grid gap-6 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {services.map(s => (
            <motion.div
              key={s.id}
              variants={cardVariants}
              className="bg-transparent p-4 rounded-lg transition-all hover:bg-white/5"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="text-gray-400 mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
