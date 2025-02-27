"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const FloatingNav = ({
  navItems,
  className,
  logo,
  footer,
}: {
  navItems: {
    name: string
    link: string
  }[]
  className?: string
  logo?: React.ReactNode
  footer?: React.ReactNode
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-4 inset-x-0 mx-auto max-w-2xl z-50 flex justify-between items-center px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.1)]",
          className,
        )}
      >
        {logo && <div className="flex items-center">{logo}</div>}
        <nav className="flex items-center gap-2">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition-colors",
                activeIndex === index
                  ? "text-neutral-800 dark:text-neutral-200"
                  : "text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200",
              )}
            >
              {activeIndex === index && (
                <motion.div
                  layoutId="pill-tab"
                  transition={{ type: "spring", duration: 0.5 }}
                  className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 rounded-full"
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          ))}
        </nav>
        {footer && <div className="flex items-center">{footer}</div>}
      </motion.div>
    </AnimatePresence>
  )
}

