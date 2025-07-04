"use client"

import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
// Import useEffect and useState for handling scroll events
import React, { useState, useEffect } from 'react';

import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";

interface NavigationItem {
    name: string;
    href: string;
}

const navigation: NavigationItem[] = [
    { name: 'Accueil', href: '#' },
    { name: 'À Propos', href: '#About' },
    { name: 'Programs', href: '#Programs' },
    { name: 'Contact', href: '#Contact' },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

// CustomLink component remains the same
const CustomLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => {
    return (
        <Link href={href} passHref>
            <span
                onClick={onClick}
                className="px-3 py-4 text-lg font-normal cursor-pointer"
            >
                {children}
            </span>
        </Link>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentLink, setCurrentLink] = useState('#/');
    
    // State to track whether the page has been scrolled
    const [hasScrolled, setHasScrolled] = useState(false);

    // Effect to add a scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            // Set hasScrolled to true if user scrolls down more than 10px
            setHasScrolled(window.scrollY > 10);
        };

        // Add event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // The empty dependency array ensures this effect runs only once

    const handleLinkClick = (href: string) => {
        setCurrentLink(href);
    };

    return (
        // Dynamically change class based on the 'hasScrolled' state
        <Disclosure as="nav" className={classNames(
            'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out',
            hasScrolled ? 'bg-white backdrop-blur-sm shadow-md' : 'bg-transparent' 
        )}>
            <>
                <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
                    <div className="relative flex h-12 md:h-20 items-center justify-between">
                        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">

                            {/* LOGO */}
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="block h-14 w-auto lg:hidden"
                                    src='/logo.png'
                                    alt="dsign-logo"
                                />
                                <img
                                    className="hidden h-20 w-auto lg:block"
                                    src='/logo.png'
                                    alt="dsign-logo"
                                />
                            </div>
                    
                            {/* LINKS */}
                            <div className="hidden lg:block m-auto">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <CustomLink
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => handleLinkClick(item.href)}
                                        >
                                            {/* Dynamically change text color based on scroll */}
                                            <span
                                                className={classNames(
                                                    item.href === currentLink ? 'active-link-underline font-semibold' : 'font-normal opacity-90 hover:opacity-100',
                                                    'text-blue-900 transition-all duration-300' 
                                                )}
                                            >
                                                {item.name}
                                                
                                            </span>
                                        </CustomLink>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CALL TO ACTION BUTTON */}
                        <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
                            <div className='hidden lg:block'>
                                <Link href="#Contact" passHref>
                                     <button
                                        type="button"
                                        className='bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-sm'
                                        onClick={() => handleLinkClick("#Contact")}
                                    >
                                        PRÉ-INSCRIPTION
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* DRAWER ICON */}
                        <div className='block lg:hidden'>
                             {/* Icon color also changes with scroll */}
                            <Bars3Icon className={classNames(
                                'block h-8 w-8 transition-colors duration-300',
                                hasScrolled ? 'text-blue-900' : 'text-white'
                                )} 
                                aria-hidden="true" 
                                onClick={() => setIsOpen(true)} />
                        </div>

                        {/* DRAWER FOR MOBILE VIEW */}
                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>
                    </div>
                </div>
            </>
        </Disclosure>
    );
};

export default Navbar;