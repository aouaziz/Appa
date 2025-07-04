import ContactForm from "../ContactForm";
import ContactInfo from "../ContactInfo";

export default function Contact() {
  return (
    <div id="Contact" className="relative isolate bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contactez-Nous
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Prêt à commencer votre carrière dans les soins de santé? Contactez-nous aujourd'hui pour en savoir plus sur nos programmes.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
          {/* Left Column: Contact Info */}
          <ContactInfo />

          {/* Right Column: Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}