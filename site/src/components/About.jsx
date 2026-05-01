import React from 'react'
import { motion } from 'framer-motion'

const aboutHighlights = [
  {
    label: 'Role',
    value: 'Video Editor, Filmmaker, Photographer'
  },
  {
    label: 'Experience',
    value: 'Freelance and Remote brand work since 2022'
  },
  {
    label: 'Availability',
    value: 'Open for freelance and contract projects (remote + on-site)'
  },
  {
    label: 'Based In',
    value: 'Faridabad, Haryana'
  },
  {
    label: 'Achievement',
    value: 'Gold Medal - Best Video Content Creation (PTU, 2023)'
  },
  {
    label: 'Direct Contact',
    value: 'himanshsharma046@gmail.com | +91 76786 09018'
  }
]

export default function About() {
  return (
    <section id="about" className="container py-16 glass-alt">
      <div className="max-w-content">
        <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold">About</motion.h2>

        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.5 }} className="mt-6 text-gray-300 max-w-2xl">
          <p>
            Himansh Sharma is a video editor, filmmaker and photographer focused on concise, cinematic edits that drive attention and conversions. He helps brands and creators turn ideas into high-retention content through considered storytelling, refined pacing and clean visual language.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl"
        >
          {aboutHighlights.map((item) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3"
            >
              <p className="text-xs uppercase tracking-wide text-gray-400">{item.label}</p>
              <p className="mt-1 text-sm text-gray-200">{item.value}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
