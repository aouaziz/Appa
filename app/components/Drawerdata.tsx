import React from "react";

const navigation = [
  { name: "Accueil", href: "/", section: "home" },
  { name: "À Propos", href: "/#about", section: "about" },
  { name: "Formations", href: "/#programs", section: "programs" },
  { name: "Contact", href: "/#contact", section: "contact" },
];

interface DrawerdataProps {
  setIsOpen: (isOpen: boolean) => void;
  isHomePage: boolean;
}

const Drawerdata = ({ setIsOpen, isHomePage }: DrawerdataProps) => {
  const handleLinkClick = (href: string) => {
    setIsOpen(false); // Close drawer first

    if (href.startsWith("/#")) {
      if (isHomePage) {
        // If we're on home page, scroll to section
        const sectionId = href.substring(2);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300); // Wait for drawer to close
      } else {
        // If we're on another page, navigate to home page with hash
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    } else if (href === "/") {
      // Navigate to home page
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } else {
      // Navigate to other pages
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  };

  const scrollToContact = () => {
    setIsOpen(false); // Close drawer first

    if (isHomePage) {
      setTimeout(() => {
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Wait for drawer to close
    } else {
      setTimeout(() => {
        window.location.href = "/#contact";
      }, 300);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation Links */}
      <div className="flex-1 space-y-2 py-1 px-4">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => handleLinkClick(item.href)}
            className="block w-full text-left rounded-md py-3 px-4 text-lg font-medium text-gray-900 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* "PRÉ-INSCRIPTION" Button */}
      <div className="p-4">
        <button
          type="button"
          onClick={scrollToContact}
          className="w-full bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-sm"
        >
          PRÉ-INSCRIPTION
        </button>
      </div>
    </div>
  );
};

export default Drawerdata;