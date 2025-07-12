"use client"

import { motion , useInView} from "framer-motion"
import { useRef } from "react"
import { MapPin } from "lucide-react"

export default function Location() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-gradient-to-b from-blue-600 to-blue-800" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            APPA À CASABLANCA
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Notre Campus</h2>
          <p className="text-xl text-white/80">168 Boulevard Oued Oum Rabia, Casablanca</p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-300 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.1708324601484!2d-7.6754217008025964!3d33.5616031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d300506091eb%3A0xc7d664258114e9b7!2sBoulevard%20oued%20Oum%20Rabia!5e0!3m2!1sen!2sus!4v1751570160476!5m2!1sen!2sus"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
