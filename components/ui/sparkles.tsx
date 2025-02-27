"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const Sparkles = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  const [sparkles, setSparkles] = useState<
    Array<{ id: string; createdAt: number; color: string; size: number; style: React.CSSProperties }>
  >([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generateSparkle = () => {
      const sparkle = {
        id: Math.random().toString(36).substring(2),
        createdAt: Date.now(),
        color: `hsl(${Math.random() * 360}deg, 100%, 75%)`,
        size: Math.random() * 20 + 10,
        style: {
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          zIndex: 2,
        },
      }
      setSparkles((sparkles) => [...sparkles, sparkle])
    }

    const interval = setInterval(generateSparkle, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cleanUpSparkles = () => {
      const now = Date.now()
      setSparkles((sparkles) => sparkles.filter((sparkle) => now - sparkle.createdAt < 1000))
    }

    const interval = setInterval(cleanUpSparkles, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn("relative", className)} ref={ref} {...props}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute inline-block animate-scale-in-out"
          style={{
            ...sparkle.style,
            width: sparkle.size,
            height: sparkle.size,
            background: sparkle.color,
            borderRadius: "50%",
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

