"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Facebook, Instagram, Youtube, ChevronUp } from "lucide-react"

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/p/African-Paramedical-Academy-61569553811526/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/appa.academy/",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@Appa_academy",
  },
]

const programs = ["INFIRMIER(E) POLYVALENT(E)", "INFIRMIER(E) AUXILIAIRE", "AIDE SOIGNANT"]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const logo = "/logo.webp"
  return (
    <footer className="bg-gray-50 text-gray-800 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="mb-4">
              <Image src={ logo || "/placeholder.svg"}  
                alt="APPA Logo" 
                width={120} 
                height={60} 
                className="h-12 w-auto" 
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">Bienvenue à l&apos;African Paramedical Private Academy</p>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Social Media :</h3>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors duration-300"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Nos formations</h3>
            <div className="space-y-2">
              {programs.map((program) => (
                <div key={program} className="text-sm text-gray-600">
                  {program}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Address</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Appa – 168 Bd Oued Oum Rabia,</p>
              <p>Casablanca 20250</p>
              <p className="mt-4 font-medium">+212 665 721 081</p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border-t border-gray-200 mt-12 pt-8 text-center"
        >
          <p className="text-sm text-gray-500">Copyright © 2025 APPA All rights reserved.</p>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp className="h-6 w-6 group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </footer>
  )
}
