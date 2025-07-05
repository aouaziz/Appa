'use client';
import React, { useState } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  PencilSquareIcon, 
} from '@heroicons/react/24/solid';

interface ContactItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  lines: string[];
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  studyLevel: string;
  trainingSought: string;
  consent: boolean;
}

const ContactInfo: React.FC = () => {
  const contactItems: ContactItem[] = [
    {
      icon: MapPinIcon,
      label: "Adresse",
      lines: [" Appa – 168 Bd Oued Oum Rabia, Casablanca 20250, Morocco"],
    },
    {
      icon: PhoneIcon,
      label: "Téléphone",
      lines: ["0665 72 10 81"],
    },
    {
      icon: EnvelopeIcon,
      label: "Email",
      lines: ["contact@appa.ma"],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Contactez-nous</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        <p className="mt-4 text-gray-600">Nous sommes là pour vous accompagner dans votre parcours</p>
      </div>
      
      <div className="space-y-6">
        {contactItems.map((item, index) => (
          <div key={index} className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.label}</h3>
                <div className="space-y-1">
                  {item.lines.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-gray-600 text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.1708324601484!2d-7.6754217008025964!3d33.5616031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d300506091eb%3A0xc7d664258114e9b7!2sBoulevard%20oued%20Oum%20Rabia!5e0!3m2!1sen!2sus!4v1751570160476!5m2!1sen!2sus"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </div>
    </div>
  );
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    studyLevel: '',
    trainingSought: '',
    consent: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const inputClass = "block w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 hover:border-gray-300";
  const requiredMark = <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Pré-inscription
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        <p className="mt-4 text-gray-600">Commencez votre parcours professionnel avec nous</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="fullName" className={labelClass}>
              Nom complet{requiredMark}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Votre nom complet"
              className={inputClass}
              required
            />
          </div>
          
          <div className="group">
            <label htmlFor="phone" className={labelClass}>
              Téléphone{requiredMark}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="06 XX XX XX XX"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
              className={inputClass}
            />
          </div>
          
          <div className="group">
            <label htmlFor="dob" className={labelClass}>
              Date de naissance
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="studyLevel" className={labelClass}>
              Niveau d'étude{requiredMark}
            </label>
            <select
              id="studyLevel"
              name="studyLevel"
              value={formData.studyLevel}
              onChange={handleInputChange}
              className={inputClass}
              required
            >
              <option value="">Sélectionner votre niveau</option>
              <option value="bac">Baccalauréat</option>
              <option value="niveau-bac">Niveau Bac</option>
            </select>
          </div>
          
          <div className="group">
            <label htmlFor="trainingSought" className={labelClass}>
              Formation souhaitée{requiredMark}
            </label>
            <select
              id="trainingSought"
              name="trainingSought"
              value={formData.trainingSought}
              onChange={handleInputChange}
              className={inputClass}
              required
            >
              <option value="">Choisir une formation</option>
              <option value="infirmier">Infirmier</option>
              <option value="aide-soignant">Aide-soignant</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start space-x-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
            />
            <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
              J'accepte de recevoir des informations d'orientation et des conseils par téléphone pour m'aider dans mon parcours professionnel.
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center group"
          >
            <PencilSquareIcon className="h-5 w-5 mr-3 group-hover:animate-pulse" />
            <span className="text-lg">Envoyer ma candidature</span>
          </button>
        </div>
      </div>
    </div>
  );
};


const Page: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <header className="text-center mt-10 mb-16">
        
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Pré-inscription en ligne
          </h1>
          <p className="text-xl font-semibold text-gray-600 mb-4">
            Année académique 2025/2026
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
        </header>

        {/* Main Content */}
        <main className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <ContactInfo />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <RegistrationForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;