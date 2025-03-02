"use client"
import { ThemeToggle } from "./ui/theme-toggle"
import { FloatingNav } from "@/components/ui/floating-navbar"
import Image from "next/image"

export function Navbar() {
  const navItems = [
    { name: "Home", link: "#" },
    { name: "Services", link: "#services" },
    { name: "Process", link: "#process" },
    { name: "Portfolio", link: "#portfolio" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ]

  return (
    <FloatingNav
      navItems={navItems}
      logo={
        <div className="align-middle">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={185}
            height={30}
            className="h-[30px] w-auto object-contain "
          />
        </div>
      }
      // footer={<ThemeToggle />}
      className="bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md"
    />
  )
}