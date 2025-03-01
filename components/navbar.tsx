"use client"
import { ThemeToggle } from "./ui/theme-toggle"
import { CuboidIcon as Cube } from "lucide-react"
import { FloatingNav } from "@/components/ui/floating-navbar"
import Image from "next/image";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "Process",
      link: "#process",
    },
    {
      name: "Portfolio",
      link: "#portfolio",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ]

  return (
    <FloatingNav
      navItems={navItems}
      logo={
        <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Company Logo" width={150} height={50} />
        </div>
      }
      // footer={<ThemeToggle />}
      className="bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md"
    />
  )
}

