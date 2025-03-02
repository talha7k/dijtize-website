'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function HeroSection() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Column - Content */}
        <div className="flex-1 flex flex-col justify-end md:justify-center pb-4 md:pb-0 h-[30%] md:h-auto p-5">
          <div className="text-center md:text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Dijitize.com
            </h1>
            <p className="mt-3 md:mt-5 text-neutral-400 text-xl md:text-2xl">
              Bringing your vision to life with latest technology!
            </p>
          </div>
        </div>

        {/* Right Column - Spline */}
        <div className="flex-1 relative h-[70%] md:h-full">
          <div className="absolute bottom-0 left-0 right-0 h-full">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full origin-bottom"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}