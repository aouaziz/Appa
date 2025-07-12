"use client"
import Image from "next/image"

export default function NavbarLogo({ onClick }: { onClick: () => void }) {
  const logo = "/logo.webp";
  return (
    <div className="flex flex-shrink-0 items-center cursor-pointer" onClick={onClick}>
      <Image
        className="block h-14 w-auto lg:hidden"
        src={logo || "/placeholder.svg"}
        alt="APPA Logo"
        width={100}
        height={40}
      />
      <Image
        className="hidden h-16 w-auto lg:block"
        src={logo || "/placeholder.svg"}
        alt="APPA Logo"
        width={150}
        height={56}
      />
    </div>
  );
} 