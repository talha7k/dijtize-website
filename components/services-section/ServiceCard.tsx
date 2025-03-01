import { ServiceCarousel } from "./ServiceCarousel"
import type { Subservice } from "@/app/data/servicesData"
import * as LucideIcons from "lucide-react"

interface ServiceCardProps {
  title: string
  icon: string
  subservices: Subservice[]
}

export function ServiceCard({ title, icon, subservices }: ServiceCardProps) {
  // Dynamically render the icon
  const Icon = (LucideIcons as any)[icon]

  return (
    <div className="bg-transparent/20 rounded-xl shadow-md overflow-hidden mb-12">
      <div className="p-8">
        <div className="flex flex-col items-center mb-8">
          {Icon && (
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Icon size={32} />
            </div>
          )}
          <h2 className="text-2xl font-bold text-center text-primary">{title}</h2>
          <div className="w-20 h-[2px] bg-white/50 mt-4"></div>
        </div>

        <ServiceCarousel subservices={subservices} />
      </div>
    </div>
  )
}

