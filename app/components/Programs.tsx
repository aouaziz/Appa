"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Clock, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const programs = [
  {
    id: 1,
    title: "Infirmier(e) Polyvalent(e)",
    description:
      "Formation complète pour devenir infirmier polyvalent avec toutes les compétences nécessaires pour exercer dans tous les services hospitaliers",
    duration: "3 ans",
    level: "Baccalauréat",
    students: "Capacité d&apos;accueil limitée",
    image: "/program-nurse-1.webp",
  },
  {
    id: 2,
    title: "Infirmier(e) Auxiliaire",
    description:
      "Programme spécialisé pour l&apos;assistance infirmière avec focus sur les soins de base et l&apos;accompagnement médical",
    duration: "2 ans",
    level: "Niveau Bac",
    students: "Formation intensive",
    image: "/program-nurse-2.webp",
  },
  {
    id: 3,
    title: "Aide Soignant",
    description: "Formation d&apos;aide soignant pour soutenir l&apos;équipe médicale dans les soins quotidiens aux patients",
    duration: "18 mois",
    level: "3ème Année collège",
    students: "Formation accélérée",
    image: "/program-nurse-3.webp",
  },
]

export default function Programs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="programs" className="py-24 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            NOS FORMATIONS
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Programmes de Formation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos programmes de formation paramédicale conçus pour répondre aux besoins du secteur de la santé
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
                <div className="relative overflow-hidden">
                 <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      width={400}
                      height={300}
                      className="w-full  sm:h-120 md:h-100 lg:h-90 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900">{program.duration}</Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{program.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{program.students}</span>
                    </div>
                  </div>
                </CardContent>

               <CardFooter className="mt-auto">
                  <Link
                    href={`/admission/${program.id === 1 ? "infirmier-polyvalent" : program.id === 2 ? "infirmier-auxiliaire" : "aide-soignant"}`}
                    className="w-full"
                  >
                    <Button className="w-full group/btn bg-transparent" variant="outline">
                      En Savoir Plus
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
