// components/Programs.tsx

import Image from 'next/image';
import { CheckIcon, CalendarDaysIcon, RectangleGroupIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { programsData } from '@/app/data/programs';

export default function Programs() {
  return (
    <div id="Programs" className="bg-teal-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="flex items-center justify-center text-base font-semibold leading-7 text-teal-600">
            <RectangleGroupIcon className="h-5 w-5 mr-2" />
            NOS FORMATIONS
          </h2>
          <p className="mt-2 text-4xl font-serif font-bold tracking-tight text-blue-900 sm:text-5xl">
            L'excellence en formation au service de la santé
          </p>
        </div>

        {/* Grid of Program Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {programsData.map((program) => (
            <article 
              key={program.name}
              className="flex flex-col rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 w-full max-w-sm"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={program.imageSrc}
                  alt={program.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="mt-8 text-2xl font-serif font-semibold leading-8 text-blue-900 text-center">
                {program.name}
              </h3>

              {/* Details */}
              <ul role="list" className="mt-6 flex flex-col gap-y-4 text-sm leading-6 text-gray-700">
                <li className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-teal-500" />
                  <span>
                    <span className="font-semibold">Condition d'accès :</span> {program.cardCondition}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CalendarDaysIcon className="h-6 w-5 flex-none text-teal-500" />
                  <span>
                    <span className="font-semibold">Durée :</span> {program.cardDuration}
                  </span>
                </li>
              </ul>

              <div className="flex-grow" />

              {/* Button */}
              <div className="mt-8">
                <Link href={`/admission/${program.slug}`} passHref>
                  <button
                    type="button"
                    className="w-full rounded-full bg-teal-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-teal-600 transition-colors duration-300"
                  >
                    Savoir Plus
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
