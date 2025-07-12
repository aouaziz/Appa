"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Send } from "lucide-react"
import { motion } from "framer-motion"
import { sendContactForm } from "../lib/api"

const EMAIL_SUBJECT = "Nouvelle pré-inscription (Section Contact) - APPA"

export default function ContactForm({ isInView, onSuccess }: { isInView: boolean, onSuccess: () => void }) {
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
  const [validationErrors, setValidationErrors] = useState<any>({});

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev: any) => ({ ...prev, [name]: false }));
    }
  }

  const validateForm = () => {
    const errors: any = {};
    if (!formData.fullName.trim()) errors.fullName = true;
    if (!formData.phone.trim()) errors.phone = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email.trim())) errors.email = true;
    if (!formData.dob) errors.dob = true;
    if (!formData.studyLevel) errors.studyLevel = true;
    if (!formData.trainingSought) errors.trainingSought = true;
    if (!formData.consent) errors.consent = true;
    return errors;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setValidationErrors({});
    setIsSubmitting(true);
    try {
      const apiPayload = {
        name: formData.fullName,
        email: formData.email,
        subject: EMAIL_SUBJECT,
        message: `\nDétails de la pré-inscription (Section Contact):\n\nNom complet: ${formData.fullName}\nTéléphone: ${formData.phone}\nEmail: ${formData.email}\nDate de naissance: ${formData.dob || 'Non spécifié'}\nNiveau d'étude: ${formData.studyLevel || 'Non spécifié'}\nFormation souhaitée: ${formData.trainingSought || 'Non spécifié'}\nConsentement: ${formData.consent ? 'Oui' : 'Non'}`,
      };
      await sendContactForm(apiPayload);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        dob: "",
        studyLevel: "",
        trainingSought: "",
        consent: false,
      });
      onSuccess();
    } catch (error: any) {
      alert(`Échec de l'envoi du formulaire: ${error?.message || 'Une erreur inconnue est survenue.'}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="lg:order-2"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Nom complet <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Votre nom complet"
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${validationErrors.fullName ? 'border-red-500' : ''}`}
                  required
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
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="06 XX XX XX XX"
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${validationErrors.phone ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.phone && (
                  <p className="text-red-400 text-sm mt-1">Le numéro de téléphone est requis.</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="votre@email.com"
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${validationErrors.email ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-400 text-sm mt-1">L'adresse email est requise et doit être valide.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-white">
                  Date de naissance <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className={`bg-white/10 border-white/20 text-white ${validationErrors.dob ? 'border-red-500' : ''}`}
                  required
                />
                {validationErrors.dob && (
                  <p className="text-red-400 text-sm mt-1">La date de naissance est requise.</p>
                )}
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
                >
                  <SelectTrigger id="studyLevel" className={`bg-white/10 border-white/20 text-white ${validationErrors.studyLevel ? 'border-red-500' : ''}`}>
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
                >
                  <SelectTrigger id="trainingSought" className={`bg-white/10 border-white/20 text-white ${validationErrors.trainingSought ? 'border-red-500' : ''}`}>
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
                {validationErrors.trainingSought && (
                  <p className="text-red-400 text-sm mt-1">Veuillez choisir une formation.</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                  className={`border-white/40 data-[state=checked]:bg-green-500 ${validationErrors.consent ? 'border-red-500' : ''}`}
                  required
                />
                <Label htmlFor="consent" className={`text-sm text-white/90 leading-relaxed ${validationErrors.consent ? 'text-red-400' : ''}`}>
                  J'accepte de recevoir des informations d'orientation et des conseils par téléphone pour m'aider
                  dans mon parcours professionnel. <span className="text-red-400">*</span>
                </Label>
              </div>
              {validationErrors.consent && (
                <p className="text-red-400 text-sm text-center">
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
  )
} 