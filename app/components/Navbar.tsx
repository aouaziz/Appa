&apos;use client&apos;
import React, { useState, useEffect, useRef } from &apos;react&apos;;
import { Menu, ChevronDown } from &apos;lucide-react&apos;;
import Drawer from &apos;./Drawer&apos;;
import Drawerdata from &apos;./Drawerdata&apos;;
import Image from &apos;next/image&apos;;

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
        // If we&apos;re on home page, scroll to section
        const sectionId = href.substring(2);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If we&apos;re on another page, navigate to home page with hash
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHomePage = true; // Since we&apos;re in a single page app

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener(&apos;mousedown&apos;, handleClickOutside);
    return () => {
      document.removeEventListener(&apos;mousedown&apos;, handleClickOutside);
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
    window.scrollTo({ top: 0, behavior: &apos;smooth&apos; });
  };

  const handleDropdownItemClick = (href: string) => {
    setIsDropdownOpen(false);
    window.location.href = href;
  };
  const logo = "/logo.webp"; 
  return (
    <>
      <nav
      
        className={classNames(
          "fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ease-in-out",
          hasScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent",
        )}
        style={{ zIndex: 9999 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
             <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}
              <div className="flex flex-shrink-0 items-center cursor-pointer" onClick={handleLogoClick}>
                <Image
                  className="block h-14 w-auto lg:hidden"
                  src={ logo || "/placeholder.svg"} 
                  alt="APPA Logo"
                  width={120}
                  height={56}
                />
                <Image
                  className="hidden h-20 w-auto lg:block"
                  src={ logo || "/placeholder.svg"} 
                  alt="APPA Logo"
                  width={160}
                  height={80}
                />
              </div>

              {/* LINKS */}
              <div className="hidden lg:block m-auto">
                <div className="flex items-center space-x-4">
                  {navigation.map((item) => (
                    <div key={item.name} className="relative flex items-center">
                      {item.hasDropdown ? (
                        <div className="relative" ref={dropdownRef}>
                          <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center px-3 py-4 text-lg font-normal cursor-pointer"
                          >
                            <span
                              className={classNames(
                                item.href === currentLink
                                  ? "active-link-underline font-semibold"
                                  : "font-normal opacity-90 hover:opacity-100",
                                hasScrolled ? "text-gray-900" : "text-white",
                                "transition-all duration-300 hover:text-teal-600",
                              )}
                            >
                              {item.name}
                            </span>
                            <ChevronDown 
                              className={classNames(
                                "ml-1 h-4 w-4 transition-transform duration-200",
                                hasScrolled ? "text-gray-900" : "text-white",
                                isDropdownOpen ? "rotate-180" : ""
                              )}
                            />
                          </button>
                          
                          {/* Dropdown Menu */}
                          {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                              {formationsDropdown.map((dropdownItem) => (
                                <button
                                  key={dropdownItem.name}
                                  onClick={() => handleDropdownItemClick(dropdownItem.href)}
                                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                                >
                                  {dropdownItem.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <CustomLink
                          href={item.href}
                          onClick={() => handleLinkClick(item.href)}
                          isHomePage={isHomePage}
                        >
                          <span
                            className={classNames(
                              item.href === currentLink
                                ? "active-link-underline font-semibold"
                                : "font-normal opacity-90 hover:opacity-100",
                              hasScrolled ? "text-gray-900" : "text-white",
                              "transition-all duration-300 hover:text-teal-600",
                            )}
                          >
                            {item.name}
                          </span>
                        </CustomLink>
                      )}
                    </div>
                  ))}
                </div>
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