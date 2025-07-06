"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Users, BookOpen, Heart } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Excellence Académique",
    description: "Formation de haute qualité reconnue par les institutions nationales et internationales",
  },
  {
    icon: Users,
    title: "Encadrement Personnalisé",
    description: "Accompagnement individuel pour garantir la réussite de chaque étudiant",
  },
  {
    icon: BookOpen,
    title: "Programmes Actualisés",
    description: "Cursus adaptés aux besoins actuels du secteur de la santé",
  },
  {
    icon: Heart,
    title: "Vocation Humanitaire",
    description: "Former des professionnels dévoués au service de la santé publique",
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 relative overflow-hidden"
      ref={ref}
    >
 

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Pourquoi Choisir APPA ?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Découvrez les valeurs et l'engagement qui font de notre académie un choix d'excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300"
              >
                <feature.icon className="h-10 w-10 text-white" />
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/80 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
