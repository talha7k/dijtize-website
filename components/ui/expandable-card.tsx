"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const ExpandableCard = ({
  title,
  description,
  icon,
  expanded = false,
}: {
  title: string
  description: string
  icon: React.ReactNode
  expanded?: boolean
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn("bg-white dark:bg-neutral-800 rounded-lg shadow-lg cursor-pointer", isExpanded ? "p-6" : "p-4")}
    >
      <motion.div layout className="flex items-center space-x-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </motion.div>
      {isExpanded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mt-4">
          <p className="text-neutral-600 dark:text-neutral-300">{description}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export const ExpandableCardGrid = ({ cards }: { cards: React.ReactNode[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <React.Fragment key={index}>{card}</React.Fragment>
      ))}
    </div>
  )
}

