import React, { ReactNode } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  const handleLogoClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };
  const logo = "/logo.webp" ;

  return (
    <main
      className={
        "fixed overflow-hidden z-[10000] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0"
          : "transition-all delay-500 opacity-0 -translate-x-full")
      }
      style={{ zIndex: 10000 }}
    >
      <section
        className={
          "w-full max-w-xs left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <article className="relative w-full flex flex-col h-full">
          <header className="p-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
              <Image
                  className="h-14 w-auto"
                  src={ logo || "/placeholder.svg"}
                  alt="APPA Logo"
                  width={160}
                  height={80}
                />

            </div>
            <X
              className="block h-8 w-8 text-gray-900 cursor-pointer hover:text-teal-600 transition-colors"
              onClick={() => setIsOpen(false)}
            />
          </header>
          <div className="flex-grow">{children}</div>
        </article>
      </section>
      <section className="w-screen h-full cursor-pointer" onClick={() => setIsOpen(false)}></section>
    </main>
  );
};

export default Drawer;

