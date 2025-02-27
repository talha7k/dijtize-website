"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export const EvervaultCard = ({
  text,
  className,
  children,
}: {
  text?: string
  className?: string
  children?: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const [randomString, setRandomString] = useState("")

  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < 2000; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setRandomString(result)
  }, [])

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-xl border border-neutral-800 bg-black p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div
        className="absolute inset-0 z-10 h-full w-full"
        style={{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0, 255, 255, 0.15), transparent 80%)`,
        }}
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent text-4xl font-bold">
          {text || ""}
        </span>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="evervault-card-canvas h-full w-full [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_60%)]">
          <span className="absolute inset-0 text-[8px] text-neutral-600 opacity-50">{randomString}</span>
        </div>
      </div>

      {children}
    </div>
  )
}

