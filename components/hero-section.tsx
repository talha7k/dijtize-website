"use client"

import { Sparkles } from "@/components/ui/sparkles"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export function HeroSection() {
  const words = "Transform your ideas into digital reality with cutting-edge solutions"

  return (
    <Sparkles className="h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="relative z-20 text-center px-6 md:px-10">
        <h1 className="font-bold text-7xl md:text-9xl tracking-tight mb-4 text-white">DIJITIZE</h1>
        <div className="mx-auto max-w-2xl">
          <TextGenerateEffect words={words} className="text-xl md:text-2xl text-neutral-200" />
        </div>

        <div className="mt-12">
          <button className="px-6 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-black font-medium text-lg transition-all shadow-lg hover:shadow-primary-500/50">
            Get Started
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#services" className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00FFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </a>
      </div>
    </Sparkles>
  )
}

