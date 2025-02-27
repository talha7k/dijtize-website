"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string
  className?: string
}) => {
  const controls = useAnimation()
  const wordsArray = words.split(" ")

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  return (
    <div className={cn("font-bold", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          custom={idx}
          animate={controls}
          initial={{ opacity: 0 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

