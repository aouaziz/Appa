"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import dynamic from "next/dynamic"

const ContactForm = dynamic(() => import("./ContactForm"), { ssr: false })
const ContactInfo = dynamic(() => import("./ContactInfo"), { ssr: false })
import ContactSuccess from "./ContactSuccess"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (isSubmitted) {
    return <ContactSuccess />
  }

  return (
    <section
      id="contact"
      className="py-12 bg-gradient-to-br from-teal-800 via-green-800 to-emerald-700 relative overflow-hidden  pt-18"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Pré-inscription en ligne</h2>
          <p className="text-xl text-white/80 mb-2">pour l'année 2025/2026</p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-300 mx-auto rounded-full"></div>
        </motion.div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">
          <ContactForm isInView={isInView} onSuccess={() => setIsSubmitted(true)} />
          <ContactInfo isInView={isInView} />
        </div>
      </div>
    </section>
  )
}