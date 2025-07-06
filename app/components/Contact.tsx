"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { MapPin, Phone, Mail, Send, Facebook, Instagram, Youtube, CheckCircle } from "lucide-react"

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

// Define the type for validation errors
type ValidationErrors = {
  fullName?: boolean;
  phone?: boolean;
  email?: boolean;
  dob?: boolean;
  studyLevel?: boolean;
  trainingSought?: boolean;
  consent?: boolean;
};

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    studyLevel: "",
    trainingSought: "",
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  // State to track validation errors for specific fields
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleInputChange = (name: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear the specific error when the user interacts with the field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: false }));
    }
  }

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = true;
    }
    if (!formData.phone.trim()) {
      errors.phone = true;
    }
    // Assuming empty string means no level/training selected
    if (!formData.studyLevel) {
      errors.studyLevel = true;
    }
    if (!formData.trainingSought) {
      errors.trainingSought = true;
    }
    if (!formData.consent) {
      errors.consent = true;
    }
    return errors;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- Validation Step ---
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Update state with errors
      // Optionally, show a general alert or scroll to the first error
      // alert('Veuillez remplir tous les champs requis.');
      return; // Stop submission
    }
    // --- End Validation Step ---

    setValidationErrors({}); // Clear any previous validation errors
    setIsSubmitting(true);

    try {
      const formElement = e.target as HTMLFormElement;
      const formDataObj = new FormData(formElement);

      // Ensure consent value is explicitly added if not handled by checkbox name
      // The checkbox has name="Consentement", which is good, but if you want
      // a specific "Oui"/"Non" string representation regardless of checkbox name,
      // you could add this back. However, with the validation check above,
      // we know formData.consent is true if we reach this point.
      // formDataObj.set('Consentement', formData.consent ? 'Oui' : 'Non');

      const response = await fetch('https://formsubmit.co/ayoubouaziz5@gmail.com', {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form state
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          dob: "",
          studyLevel: "",
          trainingSought: "",
          consent: false,
        });
      } else {
        let errorMessage = 'Erreur lors de l\'envoi du formulaire. Veuillez réessayer.';
         try {
             const errorData = await response.json();
             if (errorData && errorData.message) {
                 errorMessage = `Erreur: ${errorData.message}`;
             }
         } catch (jsonError) {
             console.error('Could not parse error response:', jsonError);
         }
         console.error('Form submission failed', response.status, response.statusText);
         alert(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur inattendue s\'est produite. Veuillez vérifier votre connexion et réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
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
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                Envoyer une autre candidature
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-teal-800 via-green-800 to-emerald-700 relative overflow-hidden -mt-32 pt-56"
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contactez-nous</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
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
              transition={{ duration: 0.6, delay: 0.8 }}
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

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Formulaire de Pré-Inscription</CardTitle>
                <CardDescription className="text-white/80">
                  Remplissez ce formulaire pour commencer votre inscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden FormSubmit fields */}
                  <input type="hidden" name="_subject" value="Nouvelle pré-inscription - APPA" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white">
                        Nom complet <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        name="Nom complet"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Votre nom complet"
                        className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${validationErrors.fullName ? 'border-red-500' : ''}`}
                        required // Use required for browser validation fallback
                      />
                       {validationErrors.fullName && (
                        <p className="text-red-400 text-sm mt-1">Le nom complet est requis.</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Téléphone <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="Téléphone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="06 XX XX XX XX"
                        className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${validationErrors.phone ? 'border-red-500' : ''}`}
                        required // Use required for browser validation fallback
                      />
                       {validationErrors.phone && (
                        <p className="text-red-400 text-sm mt-1">Le numéro de téléphone est requis.</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="votre@email.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-white">
                        Date de naissance
                      </Label>
                      <Input
                        id="dob"
                        name="Date de naissance"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleInputChange("dob", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">
                        Niveau d'étude <span className="text-red-400">*</span>
                      </Label>
                      <Select
                        value={formData.studyLevel}
                        onValueChange={(value) => handleInputChange("studyLevel", value)}
                        required // Use required for browser validation fallback
                      >
                        <SelectTrigger className={`bg-white/10 border-white/20 text-white ${validationErrors.studyLevel ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Sélectionner votre niveau" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          <SelectItem value="baccalaureat" className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">
                            Baccalauréat
                          </SelectItem>
                          <SelectItem value="niveau-bac" className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">
                            Niveau Bac
                          </SelectItem>
                          <SelectItem value="3eme-college" className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">
                            3ème Année collège
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {/* Hidden input to ensure FormSubmit gets the value */}
                      <input type="hidden" name="Niveau d'étude" value={formData.studyLevel} />
                       {validationErrors.studyLevel && (
                        <p className="text-red-400 text-sm mt-1">Votre niveau d'étude est requis.</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">
                        Formation souhaitée <span className="text-red-400">*</span>
                      </Label>
                      <Select
                        value={formData.trainingSought}
                        onValueChange={(value) => handleInputChange("trainingSought", value)}
                        required // Use required for browser validation fallback
                      >
                        <SelectTrigger className={`bg-white/10 border-white/20 text-white ${validationErrors.trainingSought ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Choisir une formation" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          <SelectItem value="infirmier-polyvalent" className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">
                            Infirmier(e) Polyvalent(e)
                          </SelectItem>
                          <SelectItem value="infirmier-auxiliaire" className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">
                            Infirmier(e) Auxiliaire
                          </SelectItem>
                          <SelectItem value="aide-soignant" className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">
                            Aide Soignant
                          </SelectItem>
                        </SelectContent>
                      </Select>
                       {/* Hidden input to ensure FormSubmit gets the value */}
                      <input type="hidden" name="Formation souhaitée" value={formData.trainingSought} />
                       {validationErrors.trainingSought && (
                        <p className="text-red-400 text-sm mt-1">Veuillez choisir une formation.</p>
                      )}
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
                      <Checkbox
                        id="consent"
                        name="Consentement"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                        className={`border-white/40 data-[state=checked]:bg-green-500 ${validationErrors.consent ? 'border-red-500' : ''}`}
                      />
                      <Label htmlFor="consent" className={`text-sm text-white/90 leading-relaxed ${validationErrors.consent ? 'text-red-400' : ''}`}>
                        J'accepte de recevoir des informations d'orientation et des conseils par téléphone pour m'aider
                        dans mon parcours professionnel. <span className="text-red-400">*</span>
                      </Label>
                    </div>
                    {validationErrors.consent && (
                      <p className="text-red-400 text-sm text-center mt-1">
                        Veuillez accepter les conditions pour continuer.
                      </p>
                    )}
                  </div>


                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}