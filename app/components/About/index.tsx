// components/Vision.tsx

import { CheckCircleIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';

// List of vision points for cleaner code
const visionPoints = [
    "Formation alliant rigueur théorique et excellence pratique",
    "Favoriser une approche globale du soin",
    "Cultiver l'esprit de collaboration",
    "Amélioration de la santé publique",
    "Promotion de l'autonomie et de la responsabilisation",
];

export default function Vision() {
    return (
        <div id="About" className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
                    
                    {/* Left Column: Text content */}
                    <div>
                        <div className="text-left">
                            <h2 className="flex items-center text-base font-semibold leading-7 text-blue-900">
                                <EyeIcon className="h-5 w-5 mr-2 text-teal-500" />
                                NOTRE
                                <span className="ml-2 inline-block bg-teal-500 px-2 py-0.5 rounded text-white">VISION</span>
                            </h2>
                            <p className="mt-4 text-4xl font-serif font-bold tracking-tight text-blue-900 sm:text-5xl">
                                bâtir des carrières solides autour de :
                            </p>

                            {/* List of vision points */}
                            <ul className="mt-8 space-y-4 text-lg text-gray-700">
                                {visionPoints.map((point) => (
                                    <li key={point} className="flex gap-x-3">
                                        <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-teal-500" aria-hidden="true" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Call-to-action button */}
                            <div className="mt-10">
                                <Link href="/contact" passHref>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-2 rounded-full border border-blue-900 px-6 py-3 text-base font-semibold text-blue-900 hover:bg-blue-100 transition-colors duration-300"
                                    >
                                        Rejoindre APPA
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    
                    <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-xl overflow-hidden p-5">
                        <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/-xk5JQVFqnA?si=Y_sB6ut84TSYvqih" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                         </iframe>
                    </div>

                </div>
            </div>
        </div>
    );
}