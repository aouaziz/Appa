// Drawer.tsx

import React, { ReactNode } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
    return (
        <main
            className={
                " fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                (isOpen
                    ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 -translate-x-full  ")
            }
        >
            <section
                className={
                    // Style: Adjusted width for a more standard mobile drawer size
                    "w-full max-w-xs left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                    (isOpen ? "translate-x-0" : "-translate-x-full")
                }
            >
                <article className="relative w-full flex flex-col h-full">
                    <header className="p-4 flex items-center justify-between border-b border-gray-200">
                        {/* Style: Corrected logo path to match the main navbar */}
                        <img
                            className="h-14 w-auto"
                            src={"/logo.png"}
                            alt="Academy Logo"
                            onClick={() => setIsOpen(false)}
                        />
                        {/* Style: Styled the close icon to match the theme */}
                        <XMarkIcon className="block h-8 w-8 text-blue-900 cursor-pointer" onClick={() => {
                            setIsOpen(false);
                        }} />
                    </header>
                    {/* The onClick here will close the drawer if the user clicks a link */}
                    <div className="flex-grow" onClick={() => {
                        setIsOpen(false);
                    }}>
                        {children}
                    </div>
                </article>
            </section>
            <section
                className="w-screen h-full cursor-pointer"
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section>
        </main>
    );
}

export default Drawer;