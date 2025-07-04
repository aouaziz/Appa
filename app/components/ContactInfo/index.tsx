import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

// Social links data
const socialLinks = [
  { 
    name: 'Facebook', 
    href: 'https://www.facebook.com/p/African-Paramedical-Academy-61569553811526/', 
    icon: (props: any) => (
      <svg {...props} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    )
  },
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/appa.academy/', 
    icon: (props: any) => (
      <svg {...props} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
      </svg>
    )
  },
  { 
    name: 'YouTube', 
    href: 'https://www.youtube.com/@Appa_academy', 
    icon: (props: any) => (
      <svg {...props} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    )
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-10">
      <div className="flex gap-x-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800">
          <MapPinIcon className="h-6 w-6 text-lime-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-semibold leading-7 text-white">Adresse</h3>
          <p className="mt-2 leading-7 text-gray-300">
            Appa – 168 Bd Oued Oum Rabia, <br/>
            Casablanca 20250, Morocco
          </p>
        </div>
      </div>
      
      <div className="flex gap-x-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800">
          <PhoneIcon className="h-6 w-6 text-lime-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-semibold leading-7 text-white">Téléphone</h3>
          <p className="mt-2 leading-7 text-gray-300">+212 665 72 10 81</p>
        </div>
      </div>
      
      <div className="flex gap-x-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800">
          <EnvelopeIcon className="h-6 w-6 text-lime-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-semibold leading-7 text-white">Email</h3>
          <p className="mt-2 leading-7 text-gray-300">contact@appa.ma</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-base font-semibold leading-7 text-white">Suivez-Nous</h3>
        <div className="mt-4 flex space-x-4">
          {socialLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-lime-400 transition-colors bg-slate-800 p-3 rounded-lg"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}