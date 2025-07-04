// Drawerdata.tsx

import React from "react";
import Link from "next/link";

// Style: Use the same navigation items as the main navbar for consistency.
const navigation = [
    { name: 'Accueil', href: '#/' },
    { name: 'Programs', href: '#Programs' },
    { name: 'About', href: '#About' },
    { name: 'Testimonials', href: '#Testimonials' },
    { name: 'Contact', href: '#Contact' },
]

const Drawerdata = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Navigation Links */}
      <div className="flex-1 space-y-2 py-1 px-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            // Style: Updated styling for links to match the theme.
            className='block rounded-md py-3 px-4 text-lg font-medium text-blue-900 hover:bg-sky-100'
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* "PRÉ-INSCRIPTION" Button */}
      <div className="p-4">
        <Link href="#Contact" passHref>
          <button
            type="button"
            // Style: The same styling as the desktop button for a consistent look.
            className='w-full bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-sm'
          >
            PRÉ-INSCRIPTION
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Drawerdata;