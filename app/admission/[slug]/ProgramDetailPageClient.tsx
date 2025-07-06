"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { programsData } from "../../data/programs"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { BookOpen, GraduationCap, Clock, ChevronRight, Send, ArrowLeft } from "lucide-react"


export default function ProgramDetailPageClient({ slug }: { slug: string }) {
  const program = programsData.find((p) => p.slug === slug)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (!program) {
    notFound()
  }

  const scrollToContact = () => {
    window.location.href = "/Form"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 relative overflow-hidden">
   

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">{program.pageTitle}</h1>

            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-300 mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24" ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
                    <CardTitle className="text-2xl font-bold text-gray-900">Description du Programme</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <p className="text-gray-600 leading-relaxed text-lg">{program.description}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Admission Conditions */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="shadow-lg border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                    <CardTitle className="text-2xl font-bold text-gray-900">Conditions d&apos;Admission</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Access Level */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-3">Niveau d&apos;accès</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {program.accessLevel.map((level, index) => (
                            <li key={index} className="leading-relaxed">
                              {level}
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Diploma Type */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-3">Type de diplôme</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{program.diplomaType}</p>
                      </motion.div>

                      {/* Duration */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Clock className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-3">Durée</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{program.trainingDuration}</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column: Image and Opportunities */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="sticky top-32"
              >
                <Card className="shadow-xl border-0 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={program.imageSrc || "/placeholder.svg"}
                      alt={program.imageAlt}
                        width={400}
                      height={300}
                      className="w-full  sm:h-120 md:h-100 lg:h-90 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Débouchés Professionnels</h3>
                    <ul className="space-y-3">
                      {program.professionalOutlets.map((outlet, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                          className="flex items-start text-gray-600 hover:text-teal-600 transition-colors"
                        >
                          <ChevronRight className="h-5 w-5 flex-shrink-0 text-teal-500 mt-0.5 mr-3" />
                          <span className="leading-relaxed">{outlet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20"
          >
            <Card className="bg-gradient-to-r from-teal-600 to-green-600 border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-12 text-center relative">
                <div className="absolute inset-0 bg-[url(&apos;/placeholder.svg?height=100&width=100&apos;)] bg-repeat opacity-5"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Prêt à démarrer votre carrière?</h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Faites le premier pas vers un avenir enrichissant dans le secteur paramédical.
                  </p>
                  <Button
                    onClick={scrollToContact}
                    className="bg-white text-teal-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Commencer l&apos;inscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
