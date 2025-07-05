import Image from 'next/image';
import Link from 'next/link';

// Updated data arrays to match the new design
const quickLinks = [
    { name: 'Accueil', href: '/#' },
    { name: 'À Propos', href: '/#About' },
    { name: 'Programs', href: '/#Programs' },
    { name: 'Contact', href: '/#Contact' },
];


const programs = [
    { name: 'Infirmier(ère) Polyvalent(e)', href: '/admission/infirmier-polyvalent' },
    { name: 'Infirmier(ère) Auxiliaire', href: '/admission/infirmier-auxiliaire' },
    { name: 'Assistant(e) Infirmier(ère)', href: '/admission/aide-soignant' },
];

export default function Footer() {
    return (
        <footer className="bg-slate-700 border-t border-slate-700">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Column 1: Logo and Tagline */}
                    <div className="space-y-4">
                        <Image 
                            src="/logo.png" 
                            alt="APPA Logo" 
                            width={180} 
                            height={60}
                            style={{ 
                                width: 'auto', 
                                height: 'auto' 
                            }}
                        />
                        <p className="text-sm leading-6 text-gray-300">
                            Académie Privée Paramédicale Africaine. Transformer la passion pour le soin en impact sociétal réel grâce à l'excellence en éducation sanitaire.
                        </p>
                    </div>
                    {/* Columns 2 & 3 Wrapper */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div>
                            <h3 className="text-base font-semibold leading-6 text-white">Liens Rapides</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {quickLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-lime-400 transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold leading-6 text-white">Programmes</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {programs.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-lime-400 transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-[#8AC14B]/20 py-8">
                <p className="text-center text-xs leading-5 text-gray-400">
                    © {new Date().getFullYear()} Académie Privée Paramédicale Africaine. Tous droits réservés.
                </p>
            </div>
        
        </footer>
    );
}