"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "Appa – 168 Bd Oued Oum Rabia, Casablanca 20250, Maroc",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "+212 665 721 081",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@appa.ma",
  },
]

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/p/African-Paramedical-Academy-61569553811526/",
    color: "hover:text-blue-600",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/appa.academy/",
    color: "hover:text-pink-600",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@Appa_academy",
    color: "hover:text-red-600",
  },
]

export default function ContactInfo({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="lg:order-1 space-y-8"
    >
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Contactez-nous</h3>
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <info.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                <p className="text-white/80 text-sm">{info.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
        <div className="flex space-x-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/80 ${social.color} transition-colors duration-300`}
            >
              <social.icon className="h-6 w-6" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
} 