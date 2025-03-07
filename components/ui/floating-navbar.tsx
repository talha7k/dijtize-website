"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  logo,
  footer,
  autoHideDelay = 5000, // Default to 5 seconds
}: {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  autoHideDelay?: number; // Time in milliseconds before auto-hiding
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false); // Track mouse hover
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when scrolling up, hide when scrolling down past 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle auto-hiding after a delay, but only if not hovered
  useEffect(() => {
    if (!isVisible || isHovered) return; // Skip if hidden or hovered

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, autoHideDelay);

    // Cleanup timer on unmount or when isVisible/isHovered changes
    return () => clearTimeout(timer);
  }, [isVisible, isHovered, autoHideDelay]); // Re-run when visibility, hover state, or delay changes

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "modal fixed inset-x-0 top-4 z-50 mx-auto flex max-w-4xl items-center justify-between overflow-x-auto rounded-full border border-neutral-200 px-4 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.1)] dark:border-neutral-800",
            className,
          )}
          onMouseEnter={() => setIsHovered(true)} // Set hovered true on mouse enter
          onMouseLeave={() => setIsHovered(false)} // Set hovered false on mouse leave
        >
          {logo && (
            <div className="hidden items-center align-middle md:flex">
              {logo}
            </div>
          )}
          <nav className="mx-auto flex items-center gap-2">
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
                    className="absolute inset-0 rounded-full bg-neutral-200 dark:bg-neutral-800"
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            ))}
          </nav>
          {footer && <div className="flex items-center">{footer}</div>}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
