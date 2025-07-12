'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';
import dynamic from "next/dynamic"
const NavbarLogo = dynamic(() => import("./NavbarLogo"))
const NavbarLinks = dynamic(() => import("./NavbarLinks"), { ssr: false })

interface NavigationItem {
  name: string;
  href: string;
  section?: string;
  hasDropdown?: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Accueil", href: "/", section: "home" },
  { name: "À Propos", href: "/#about", section: "about" },
  { name: "Formations", href: "/#programs", section: "programs", hasDropdown: true },
  { name: "Contact", href: "/#contact", section: "contact" },
];

const formationsDropdown = [
  { name: "Infirmier(e) Polyvalent(e)", href: "/admission/infirmier-polyvalent" },
  { name: "Infirmier(e) Auxiliaire", href: "/admission/infirmier-auxiliaire" },
  { name: "Aide Soignant", href: "/admission/aide-soignant" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomLink = ({
  href,
  onClick,
  children,
  isHomePage,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  isHomePage: boolean;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();

    if (href.startsWith("/#")) {
      if (isHomePage) {
        // If we're on home page, scroll to section
        const sectionId = href.substring(2);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If we're on another page, navigate to home page with hash
        window.location.href = href;
      }
    } else if (href === "/") {
      // Navigate to home page
      window.location.href = "/";
    }
  };

  return (
    <a href={href} onClick={handleClick} className="px-3 py-4 text-lg font-normal cursor-pointer flex items-center">
      {children}
    </a>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("/");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true);
    setHasScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMounted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [isHomePage]);

  const handleLinkClick = (href: string) => {
    setCurrentLink(href);
  };

  const scrollToContact = () => {
    if (isHomePage) {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#contact";
    }
  };

  const handleLogoClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = "/";
    }
  };

  const handleDropdownItemClick = (href: string) => {
    setIsDropdownOpen(false);
    window.location.href = href;
  };

  const logo = "/logo.webp"; 

  // Prevent hydration mismatch by not rendering scroll-dependent styles until mounted
  if (!isMounted) {
    // Render a static, SSR-safe navbar (no dynamic classes)
    return (
      <nav className="fixed top-0 left-0 right-0 w-full z-[9999] ">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}
              <NavbarLogo onClick={handleLogoClick} />

              {/* LINKS */}
              <div className="hidden lg:block m-auto">
                <NavbarLinks
                  navigation={navigation}
                  currentLink={currentLink}
                  handleLinkClick={handleLinkClick}
                  isHomePage={isHomePage}
                  hasScrolled={hasScrolled}
                  isDropdownOpen={isDropdownOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                  dropdownRef={dropdownRef}
                  handleDropdownItemClick={handleDropdownItemClick}
                />
              </div>
            </div>

            {/* CALL TO ACTION BUTTON */}
            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
              <div className="hidden lg:block">
                <button
                  type="button"
                  className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-sm"
                  onClick={scrollToContact}
                >
                  PRÉ-INSCRIPTION
                </button>
              </div>
            </div>

            {/* DRAWER ICON */}
            <div className="block lg:hidden">
              <Menu
                className="block h-8 w-8 text-white transition-colors duration-300 cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={classNames(
          "fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ease-in-out",
          hasScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-lg"
            : "",
        )}
        style={{ zIndex: 9999 }}
      >
        <div className="mx-auto max-w-7xl   lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
             <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}
              <NavbarLogo onClick={handleLogoClick} />

              {/* LINKS */}
              <div className="hidden lg:block m-auto">
                <NavbarLinks
                  navigation={navigation}
                  currentLink={currentLink}
                  handleLinkClick={handleLinkClick}
                  isHomePage={isHomePage}
                  hasScrolled={hasScrolled}
                  isDropdownOpen={isDropdownOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                  dropdownRef={dropdownRef}
                  handleDropdownItemClick={handleDropdownItemClick}
                />
              </div>
            </div>

            {/* CALL TO ACTION BUTTON */}
            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
              <div className="hidden lg:block">
                <button
                  type="button"
                  className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-sm"
                  onClick={scrollToContact}
                >
                  PRÉ-INSCRIPTION
                </button>
              </div>
            </div>

            {/* DRAWER ICON */}
            <div className="block lg:hidden">
              <Menu
                className={classNames(
                  "block h-8 w-8 transition-colors duration-300 cursor-pointer",
                  hasScrolled ? "text-gray-900" : "text-white",
                )}
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* DRAWER FOR MOBILE VIEW */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Drawerdata setIsOpen={setIsOpen} isHomePage={isHomePage} />
      </Drawer>
    </>
  );
};

export default Navbar;