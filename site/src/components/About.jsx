import React from 'react'
import { motion } from 'framer-motion'

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
      </div>
    </section>
  )
}
