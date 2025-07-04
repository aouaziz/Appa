// components/Programs.tsx

import Image from 'next/image';
import { CheckIcon, CalendarDaysIcon, RectangleGroupIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Data for the programs. This makes it easy to add or change a program later.
const programs = [
  {
    name: "Infirmier (e) Polyvalent (e)",
    imageSrc: "/program-nurse-1.jpg", // Replace with your actual image path
    imageAlt: "Infirmière polyvalente souriante dans un couloir d'hôpital.",
    condition: "3ème Année collège",
    duration: "Une année de formation",
    href: "/admission/infirmier-polyvalent",
  },
  {
    name: "Infirmier (e) Auxiliaire",
    imageSrc: "/program-nurse-2.jpg", // Replace with your actual image path
    imageAlt: "Infirmière auxiliaire au regard déterminé dans un environnement hospitalier.",
    condition: "3ème Année collège",
    duration: "Une année de formation",
    href: "/admission/infirmier-auxiliaire",
  },
  {
    name: "Aide-Soignant (e)",
    imageSrc: "/program-nurse-3.jpg", // Replace with your actual image path
    imageAlt: "Aide-soignante portant un hijab et souriant avec confiance.",
    condition: "3ème Année collège",
    duration: "Une année de formation",
    href: "/admission/aide-soignant",
  },
];

export default function Programs() {
  return (
    // Section wrapper with a light teal background from your design
    <div id="Programs" className=" flex  bg-teal-50 py-24 sm:py-32">
      <div className=" flex items-center justify-center flex-col mx-auto max-w-7xl px-6 lg:px-8 ">
        {/* Section Header */}
        <div className="  mx-auto max-w-2xl lg:mx-0 text-center ">
            <h2 className="flex items-center justify-center text-base font-semibold leading-7 text-teal-600">
                <RectangleGroupIcon className="h-5 w-5 mr-2" />
                NOS FORMATIONS
            </h2>
            <p className="mt-2 text-4xl font-serif font-bold tracking-tight text-blue-900 sm:text-5xl">
                L'excellence en formation au service de la santé
            </p>
        </div>

        {/* Grid of Program Cards */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {programs.map((program) => (
            <article 
                key={program.name} 
                // Card styling with hover effects for better user experience
                className="flex flex-col rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Program Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={program.imageSrc}
                  alt={program.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  
                />
              </div>

              {/* Program Title */}
              <h3 className="mt-8 text-2xl font-serif font-semibold leading-8 text-blue-900">
                {program.name}
              </h3>

              {/* Program Details */}
              <ul role="list" className="mt-6 flex flex-col gap-y-4 text-sm leading-6 text-gray-700">
                <li className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-teal-500" aria-hidden="true" />
                  <span className="font-semibold">Condition d'accès :</span> {program.condition}
                </li>
                <li className="flex gap-x-3">
                  <CalendarDaysIcon className="h-6 w-5 flex-none text-teal-500" aria-hidden="true" />
                  <span className="font-semibold">Durée :</span> {program.duration}
                </li>
              </ul>
              
              {/* Spacer to push the button to the bottom */}
              <div className="flex-grow" />

              {/* Call-to-action Button */}
              <div className="mt-8">
                <Link href={program.href} passHref>
                    <button
                        type="button"
                        className="w-full rounded-full bg-teal-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-teal-600 transition-colors duration-300"
                    >
                        Rejoindre APPA
                    </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}