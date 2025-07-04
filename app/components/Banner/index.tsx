'use client'
import Image from 'next/image';
import { useState } from 'react';

const Banner = () => {
    const handleLinkClick = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="home-section" className="relative isolate min-h-screen overflow-hidden">
            {/* Background Image with proper sizing */}
            <div className="absolute inset-0 w-full h-full -z-10">
                <Image
                    src="/hero-background.webp"
                    alt="Medical training background"
                    fill
                    priority
                    quality={95}
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-teal-500/20"></div>
            </div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center'>
                    {/* Left Content */}
                    <div className='flex flex-col justify-center space-y-8'>
                        {/* Top Badge */}
                        <div className='flex items-center gap-3 mx-auto lg:mx-0'>
                            <div className="relative w-5 h-5 flex-shrink-0">
                                <Image 
                                    src="/check.svg" 
                                    alt="check-image" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className='text-green-600 text-sm font-semibold text-center lg:text-start'>
                                Transformez Votre Passion en Impact
                            </h3>
                        </div>
                        
                        {/* Main Content */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                                Formez vous aux métiers para-médicaux de demain
                            </h1>
                            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/90 max-w-2xl mx-auto lg:mx-0">
                                Construire des carrières solides dans le domaine de la santé grâce à la rigueur théorique et l'excellence pratique.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <button
                                    className="w-full sm:w-auto rounded-lg bg-green-500 px-8 py-4 text-base font-semibold text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    onClick={() => handleLinkClick("programs-section")}
                                >
                                    Faire la pré-inscription
                                </button>
                                <button
                                    className="w-full sm:w-auto rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white hover:text-teal-600 transition-all duration-300"
                                    onClick={() => handleLinkClick("about-section")}
                                >
                                    En Savoir Plus
                                </button>
                            </div>
                        </div>
                    </div>

                </div>  
            </div>
        </div>
    );
};

export default Banner;