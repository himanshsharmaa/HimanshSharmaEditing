import React from 'react'
import { motion } from 'framer-motion'

export default function CTA(){
  return (
    <section className="container py-12">
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-content text-center">
        <p className="text-lg text-gray-200">Ready to start a project or need a creative edit?</p>
        <p className="mt-4"><a href="#contact" className="font-semibold text-white hover:underline">Let's talk</a></p>
      </motion.div>
    </section>
  )
}
