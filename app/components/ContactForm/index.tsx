'use client';
import React, { useState } from 'react';

// Type definitions for our form state and submission status
interface FormDataState {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  studyLevel: string;
  trainingSought: string;
  consent: boolean;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const initialFormState: FormDataState = {
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    studyLevel: '',
    trainingSought: '',
    consent: false,
  };
  
  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let processedValue: string | boolean;

    if (name === 'phone') {
      processedValue = value.replace(/\D/g, ''); // Only allow numbers for phone
    } else if (type === 'checkbox') {
      processedValue = checked;
    } else {
      processedValue = value;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    // Create FormData object and map to Google Sheet headers
    const submissionData = new FormData();
    
    // Map to exact header names from your Google Sheet
    submissionData.append('nom', formData.fullName);
    submissionData.append('téléphone', formData.phone);
    submissionData.append('email', formData.email);
    submissionData.append('Date de naissance', formData.dob);
    submissionData.append("niveau d'étude", formData.studyLevel);
    submissionData.append('formation', formData.trainingSought);

    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxEhkrBkoFdGDJ_y01cmW34PCvGenXL38XPK-216PpUINEFe8j1XH_6Po584w_BSLdaoA/exec';

    try {
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Scripts
        body: submissionData,
      });

      console.log('Submission successful');
      setStatus('success');
      setFormData(initialFormState); // Reset form on success
      
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
    }
  };


  const labelClasses = "block text-sm font-semibold leading-6 text-gray-300";
  const inputClasses = "block w-full rounded-md border-0 bg-slate-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-[#0875B5] sm:text-sm sm:leading-6 disabled:opacity-50";
  const requiredMark = <span className="text-[#8AC14B]">*</span>;

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-slate-700 p-8 ">
      <h3 className="text-xl font-semibold leading-7 text-white mb-8">Le Formulaire De Pré-Inscription</h3>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label htmlFor="fullName" className={labelClasses}>Votre nom complet {requiredMark}</label>
          <div className="mt-2.5">
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              placeholder="Nom complet" 
              className={inputClasses} 
              required 
              disabled={status === 'submitting'} 
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className={labelClasses}>Votre numéro de téléphone {requiredMark}</label>
          <div className="mt-2.5">
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Téléphone" 
              className={inputClasses} 
              required 
              disabled={status === 'submitting'} 
            />
          </div>
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelClasses}>Votre Adresse email {requiredMark}</label>
          <div className="mt-2.5">
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Adresse email" 
              className={inputClasses} 
              required 
              disabled={status === 'submitting'} 
            />
          </div>
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="dob" className={labelClasses}>Date de naissance {requiredMark}</label>
          
          <div className="mt-2.5">
            <input 
              type="text" 
              id="dob" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              placeholder="jj/mm/aaaa" 
              onFocus={(e) => (e.target.type = 'date')} 
              onBlur={(e) => (e.target.type = 'text')} 
              className={inputClasses} 
              required 
              disabled={status === 'submitting'} 
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="studyLevel" className={labelClasses}>Votre niveau d'étude {requiredMark}</label>
          <div className="mt-2.5">
            <select 
              id="studyLevel" 
              name="studyLevel" 
              value={formData.studyLevel} 
              onChange={handleChange} 
              className={inputClasses} 
              required 
              disabled={status === 'submitting'}
            >
              <option value="" disabled>Sélectionner...</option>
              <option value="Baccalauréat">Baccalauréat</option>
              <option value="Niveau Bac">Niveau Bac</option>
              <option value="3ème Année collège">3ème Année collège</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="trainingSought" className={labelClasses}>Souhait de formation {requiredMark}</label>
          <div className="mt-2.5">
            <select 
              id="trainingSought" 
              name="trainingSought" 
              value={formData.trainingSought} 
              onChange={handleChange} 
              className={inputClasses} 
              required 
              disabled={status === 'submitting'}
            >
              <option value="" disabled>Sélectionner...</option>
              <option value="Infirmier(ère) Polyvalent(e)">Infirmier(ère) Polyvalent(e)</option>
              <option value="Infirmier(ère) Auxiliaire">Infirmier(ère) Auxiliaire</option>
              <option value="Assistant(e) Infirmier(ère)">Assistant(e) Infirmier(ère)</option>
            </select>
          </div>
        </div>
        
        <div className="sm:col-span-2 flex items-center gap-x-3">
          <input 
            type="checkbox" 
            id="consent" 
            name="consent" 
            checked={formData.consent} 
            onChange={handleChange} 
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 bg-slate-900/50" 
            required 
            disabled={status === 'submitting'} 
          />
          <label htmlFor="consent" className="text-sm leading-6 text-gray-400">
            Je souhaite recevoir des conseils d'orientation et des informations par téléphone.
          </label>
        </div>
      </div>
      
     <div className="mt-10">
        <button 
          type="submit" 
          className="block w-full rounded-md bg-[#0875B5] px-3.5 py-2.5 text-center uppercase text-sm font-semibold text-white shadow-sm hover:bg-[#3BA9DF] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#0875B5] disabled:bg-gray-500 disabled:cursor-not-allowed" 
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer votre candidature'}
        </button>
      </div>
      
      {status === 'success' && (
        <p className="mt-4 text-center text-green-400">Merci! Votre candidature a été envoyée avec succès.</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-center text-red-400">Une erreur est survenue. Veuillez réessayer.</p>
      )}
    </form>
  );
}