"use client"
import { ChevronDown } from "lucide-react"
import CustomLink from "./CustomLink"
import { formationsDropdown } from "./NavbarDropdownData"
import React from "react"

export default function NavbarLinks({ navigation, currentLink, handleLinkClick, isHomePage, hasScrolled, isDropdownOpen, setIsDropdownOpen, dropdownRef, handleDropdownItemClick }: any) {
  return (
    <div className="flex items-center space-x-4">
      {navigation.map((item: any) => (
        <div key={item.name} className="relative flex items-center">
          {item.hasDropdown ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((open: boolean) => !open)}
                className="flex items-center px-3 py-4 text-lg font-normal cursor-pointer"
              >
                <span
                  className={
                    (item.href === currentLink
                      ? "active-link-underline font-semibold"
                      : "font-normal opacity-90 hover:opacity-100") +
                    " " +
                    (hasScrolled ? "text-gray-900" : "text-white") +
                    " transition-all duration-300 hover:text-teal-600"
                  }
                >
                  {item.name}
                </span>
                <ChevronDown
                  className={
                    "ml-1 h-4 w-4 transition-transform duration-200 " +
                    (hasScrolled ? "text-gray-900" : "text-white") +
                    (isDropdownOpen ? " rotate-180" : "")
                  }
                />
              </button>
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
                className={
                  (item.href === currentLink
                    ? "active-link-underline font-semibold"
                    : "font-normal opacity-90 hover:opacity-100") +
                  " " +
                  (hasScrolled ? "text-gray-900" : "text-white") +
                  " transition-all duration-300 hover:text-teal-600"
                }
              >
                {item.name}
              </span>
            </CustomLink>
          )}
        </div>
      ))}
    </div>
  )
} 