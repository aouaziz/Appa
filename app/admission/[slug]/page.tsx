// app/admission/[slug]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { programsData } from '@/app/data/programs';

// Import icons
import { 
    BookOpenIcon, 
    AcademicCapIcon, 
    ClockIcon, 
    ChevronRightIcon, 
    PencilSquareIcon 
} from '@heroicons/react/24/solid';

export async function generateStaticParams() {
  return programsData.map((program) => ({
    slug: program.slug,
  }));
}

export default function ProgramDetailPage({ params }: { params: { slug:string } }) {
  const { slug } = params;
  const program = programsData.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="bg-slate-50 mt-9 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h1 className="text-4xl font-bold font-serif tracking-tight text-slate-800 sm:text-5xl">
            {program.pageTitle}
          </h1>
          
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-3">
            <div className="space-y-10">
              {/* Description */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  Description
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </div>

              {/* Admission Conditions */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                  Conditions d'Admission
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Card 1: Access Level */}
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 text-center hover:shadow-md transition-shadow">
                    <BookOpenIcon className="h-8 w-8 mx-auto text-teal-500 mb-3" />
                    <strong className="block text-base font-semibold text-slate-700">Niveau d'accès</strong>
                    <ul className="mt-2 text-sm text-slate-600 space-y-1">
                      {program.accessLevel.map(level => <li key={level}>{level}</li>)}
                    </ul>
                  </div>
                  {/* Card 2: Diploma Type */}
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 text-center hover:shadow-md transition-shadow">
                    <AcademicCapIcon className="h-8 w-8 mx-auto text-teal-500 mb-3" />
                    <strong className="block text-base font-semibold text-slate-700">Type de diplôme</strong>
                    <p className="mt-2 text-sm text-slate-600">{program.diplomaType}</p>
                  </div>
                  {/* Card 3: Duration */}
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 text-center hover:shadow-md transition-shadow">
                    <ClockIcon className="h-8 w-8 mx-auto text-teal-500 mb-3" />
                    <strong className="block text-base font-semibold text-slate-700">Durée</strong>
                    <p className="mt-2 text-sm text-slate-600">{program.trainingDuration}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image and Opportunities */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="relative w-full  sm:h-150 md:h-100 overflow-hidden rounded-lg">
                <Image
                  src={program.imageSrc}
                  alt={program.imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Débouchés Professionnels</h3>
                <ul className="space-y-2.5">
                  {program.professionalOutlets.map(outlet => (
                    <li key={outlet} className="flex items-start text-slate-600">
                      <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-teal-500 mt-0.5 mr-2" />
                      <span>{outlet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl p-10 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-white">Prêt à démarrer votre carrière?</h2>
            <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">
                Faites le premier pas vers un avenir enrichissant dans le secteur paramédical.
            </p>
            <div className="mt-8">
                <Link href="/Form" passHref>
                    <button className="inline-flex items-center gap-x-2 rounded-lg bg-white px-8 py-3.5 text-lg font-semibold text-teal-600 shadow-md hover:bg-slate-50 transition-all hover:scale-[1.02]">
                    <PencilSquareIcon className="h-5 w-5" />
                      Pré-Inscription
                    </button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}