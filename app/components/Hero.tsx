"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  const hero = "/hero-background.webp"
  return (
  <section className="relative min-h-screen w-full max-w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden ">
        <Image
          src={ hero || "/placeholder.svg"}
          alt="Medical professional"
          fill
          priority
          className="object-cover object-right"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl z-10"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-32 w-48 h-48 bg-teal-400/10 rounded-full blur-xl z-10"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid md:grid-cols-1 gap-12 items-center py-20">
          {/* Left Content - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Année académique 2025/2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              African Paramedical
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300">
                Private Academy
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-white/90 mt-2">APPA</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Transformer la passion du soin en un véritable impact sociétal
            </motion.p>

             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
          <Button
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-6 rounded-full text-[20px] font-bold shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center gap-2"
                onClick={() => scrollToSection("contact")}
              >
                Pré-Inscription
                <ArrowRight className="h-7 w-7 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-10 py-6 rounded-full text-[20px] font-bold transition-all duration-300 group bg-transparent flex items-center justify-center gap-2"
                onClick={() => scrollToSection("about")}
              >
                <Play className="h-7 w-7 group-hover:scale-110 transition-transform" />
                En Savoir Plus
              </Button>
            </motion.div>
          </motion.div>


        </div>
      </div>
    </section>
  )
}
