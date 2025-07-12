"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function ContactSuccess() {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-teal-800 via-green-800 to-emerald-700 relative overflow-hidden -mt-32 pt-56"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Merci !</h2>
            <p className="text-white/80 mb-6">
              Votre candidature a été envoyée avec succès. Nous vous contacterons bientôt.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 