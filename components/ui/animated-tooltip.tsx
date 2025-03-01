"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
  }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50"
              >
                <div className="bg-black gray-100 px-4 py-2 rounded-md">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs">{item.designation}</div>
                </div>
                <div className="w-4 h-4 bg-black transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className={cn(
              "object-cover h-14 w-14 rounded-full border-2 group-hover:scale-105 transition-transform duration-200",
              hoveredIndex === idx ? "border-primary-500 scale-105" : "border-neutral-200 dark:border-neutral-700",
            )}
          />
        </div>
      ))}
    </div>
  )
}

