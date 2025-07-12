"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Users, Lightbulb } from "lucide-react"

const highlights = [
  {
    icon: Target,
    title: "Notre Mission",
    description:
      "Former des professionnels de santé compétents et dévoués pour répondre aux besoins croissants du secteur médical au Maroc et en Afrique.",
  },
  {
    icon: Users,
    title: "Notre Approche",
    description:
      "Une pédagogie moderne alliant théorie et pratique, avec un encadrement personnalisé pour chaque étudiant.",
  },
  {
    icon: Lightbulb,
    title: "Notre Vision",
    description:
      "Devenir la référence en formation paramédicale en Afrique, reconnue pour l'excellence de ses programmes et la qualité de ses diplômés.",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-wide inline-flex items-center flex-wrap justify-center"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bienvenue à l'
            <span className="text-blue-600 font-semibold mx-2">African Paramedical</span>
            <span className="text-teal-600 font-semibold">Private Academy</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        {/* Video and Paragraph in the same row with vertical centering */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed text-center max-w-prose"
            >
              APPA s'engage à former la prochaine génération de professionnels de santé avec des standards d'excellence
              reconnus. Notre académie offre des formations spécialisées en soins infirmiers et paramédicaux, adaptées
              aux besoins du secteur de la santé au Maroc et en Afrique.
            </motion.p>
          </motion.div>

          {/* Right Content - YouTube Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* YouTube Video Container */}
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/-xk5JQVFqnA?si=Y_sB6ut84TSYvqih"
                    title="APPA - African Paramedical Private Academy"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-20"
              />

              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-30"
              />
            </div>
          </motion.div>
        </div>

        {/* Mission, Vision, Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24"
        >
          <div className="grid md:grid-cols-3 gap-11">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <highlight.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{highlight.title}</h3>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}