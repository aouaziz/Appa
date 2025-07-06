"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge" // Badge is imported but not used in the form itself
import { MapPin, Phone, Mail, Send, ArrowLeft, CheckCircle } from "lucide-react" // Add CheckCircle
import Link from "next/link" // Link is imported but not used in the form itself

interface FormData {
  fullName: string
  phone: string
  email: string // Now required for validation
  dob: string // Now required for validation
  studyLevel: string // Required
  trainingSought: string // Required
  consent: boolean // Required
}

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

// Define the type for validation errors
type ValidationErrors = {
  fullName?: boolean;
  phone?: boolean;
  email?: boolean; // Added email to validation errors
  dob?: boolean; // Added dob to validation errors
  studyLevel?: boolean;
  trainingSought?: boolean;
  consent?: boolean;
};

export default function FormPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState<FormData>({
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

  const handleInputChange = (name: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the specific error when the user interacts with the field
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name as keyof ValidationErrors]: false }));
    }
  }

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Check required text/tel inputs
    if (!formData.fullName.trim()) {
      errors.fullName = true;
    }
    if (!formData.phone.trim()) {
      errors.phone = true;
    }
     // Check required email input
     if (!formData.email.trim()) {
        errors.email = true;
     } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
        // Basic email format validation (optional but recommended)
        errors.email = true; // Could add a different error type if needed
     }

     // Check required date input
     if (!formData.dob) { // Date input returns empty string if no date selected
        errors.dob = true;
     }

    // Check required select inputs (empty string means no value selected)
    if (!formData.studyLevel) {
      errors.studyLevel = true;
    }
    if (!formData.trainingSought) {
      errors.trainingSought = true;
    }

    // Check required consent checkbox
    if (!formData.consent) { // Check specifically for false
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
       // Optional: Scroll to the first error field or show a summary message
       const firstErrorField = Object.keys(errors)[0];
       const errorElement = document.getElementById(firstErrorField);
       if (errorElement) {
           errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
       } else if (firstErrorField === 'consent') {
            // Scroll to the consent checkbox if it's the first error
            const consentElement = document.getElementById('consent');
            if (consentElement) {
                 consentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
       }

      return; // Stop submission
    }
    // --- End Validation Step ---

    setValidationErrors({}); // Clear any previous validation errors
    setIsSubmitting(true);

    try {
      const formElement = e.target as HTMLFormElement;
      const formDataObj = new FormData(formElement);

       // Add hidden inputs if not already present or to ensure correct name mapping
       // These are important for Select values if the Select component doesn't handle it.
       // The checkbox's 'name="Consentement"' should handle it, but can be set explicitly too.
       // We rely on the names already added in the JSX for the hidden inputs and checkbox.

      const response = await fetch('https://formsubmit.co/ayoubouaziz5@gmail.com', {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        setIsSubmitted(true); // Show success message
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
                 // Check for specific FormSubmit errors if needed, e.g.,honeypot
                 errorMessage = `Erreur de soumission: ${errorData.message}`;
             }
         } catch (jsonError) {
             console.error('Could not parse error response from FormSubmit:', jsonError);
         }
         console.error('Form submission failed', response.status, response.statusText);
         alert(errorMessage); // Show error message to user
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur inattendue s\'est produite. Veuillez vérifier votre connexion et réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Render success message if submitted
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="pt-32 pb-16 bg-gradient-to-r from-teal-800 via-green-800 to-emerald-700 relative overflow-hidden">
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
                {/* Optional: Button to submit another or go home */}
                 <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  Envoyer une autre candidature
                </Button>
                 <Link href="/" className="block mt-4">
                    <Button variant="outline" className="bg-transparent hover:bg-white/20 text-white border-white/30">
                       <ArrowLeft className="w-4 h-4 mr-2"/> Retour à l'accueil
                    </Button>
                 </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }


  // Render the form if not submitted
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-teal-800 via-green-800 to-emerald-700 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">Pré-inscription en ligne</h1>

            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Commencez votre parcours professionnel avec nous
            </p>

            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-300 mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24" ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Card className="shadow-xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Contactez-nous</CardTitle>
                  <CardDescription className="text-gray-600">
                    Nous sommes là pour vous accompagner dans votre parcours
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={info.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-teal-50 transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{info.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.1708324601484!2d-7.6754217008025964!3d33.5616031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d300506091eb%3A0xc7d664258114e9b7!2sBoulevard%20oued%20Oum%20Rabia!5e0!3m2!1sen!2sus!4v1751570160476!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </motion.div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Formulaire de Pré-Inscription</CardTitle>
                  <CardDescription className="text-gray-600">
                    Remplissez ce formulaire pour commencer votre inscription
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                     {/* Hidden FormSubmit fields */}
                    <input type="hidden" name="_subject" value="Nouvelle pré-inscription - APPA (FormPage)" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-700 font-semibold">
                          Nom complet <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="Nom complet"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Votre nom complet"
                           className={`border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 ${validationErrors.fullName ? 'border-red-500' : ''}`}
                          required
                        />
                        {validationErrors.fullName && (
                          <p className="text-red-500 text-sm mt-1">Le nom complet est requis.</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-semibold">
                          Téléphone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                           name="Téléphone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="06 XX XX XX XX"
                          className={`border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 ${validationErrors.phone ? 'border-red-500' : ''}`}
                          required
                        />
                         {validationErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">Le numéro de téléphone est requis.</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-semibold">
                          Email <span className="text-red-500">*</span> {/* Mark as required */}
                        </Label>
                        <Input
                          id="email"
                           name="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="votre@email.com"
                          className={`border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 ${validationErrors.email ? 'border-red-500' : ''}`}
                          required // Mark as required for browser validation too
                        />
                        {validationErrors.email && (
                          <p className="text-red-500 text-sm mt-1">L'adresse email est requise et doit être valide.</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob" className="text-gray-700 font-semibold">
                          Date de naissance <span className="text-red-500">*</span> {/* Mark as required */}
                        </Label>
                        <Input
                          id="dob"
                           name="Date de naissance"
                          type="date"
                          value={formData.dob}
                          onChange={(e) => handleInputChange("dob", e.target.value)}
                          className={`border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 ${validationErrors.dob ? 'border-red-500' : ''}`}
                          required // Mark as required for browser validation too
                        />
                         {validationErrors.dob && (
                          <p className="text-red-500 text-sm mt-1">La date de naissance est requise.</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">
                          Niveau d'étude <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.studyLevel}
                          onValueChange={(value) => handleInputChange("studyLevel", value)}
                          // Removed 'required' prop from SelectTrigger, validation is handled below
                        >
                          <SelectTrigger id="studyLevel" className={`border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 ${validationErrors.studyLevel ? 'border-red-500' : ''}`}>
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
                          <p className="text-red-500 text-sm mt-1">Votre niveau d'étude est requis.</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">
                          Formation souhaitée <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.trainingSought}
                          onValueChange={(value) => handleInputChange("trainingSought", value)}
                           // Removed 'required' prop from SelectTrigger, validation is handled below
                        >
                          <SelectTrigger id="trainingSought" className={`border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 ${validationErrors.trainingSought ? 'border-red-500' : ''}`}>
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
                          <p className="text-red-500 text-sm mt-1">Veuillez choisir une formation.</p>
                        )}
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <Checkbox
                          id="consent"
                          name="Consentement" // Make sure the name is correct for FormSubmit
                          checked={formData.consent}
                          onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                          className={`border-gray-400 data-[state=checked]:bg-blue-500 ${validationErrors.consent ? 'border-red-500' : ''}`}
                          required // Keep required attribute for browser validation too
                        />
                        <Label htmlFor="consent" className={`text-sm text-gray-700 leading-relaxed ${validationErrors.consent ? 'text-red-500' : ''}`}>
                          J'accepte de recevoir des informations d'orientation et des conseils par téléphone pour m'aider
                          dans mon parcours professionnel. <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      {validationErrors.consent && (
                        <p className="text-red-500 text-sm text-center mt-1">
                          Veuillez accepter les conditions pour continuer.
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl text-lg transition-all duration-300 disabled:opacity-50 hover:scale-[1.02]"
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
    </div>
  )
}