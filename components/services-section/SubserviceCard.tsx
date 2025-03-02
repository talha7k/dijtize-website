import Image from "next/image"
import type { Subservice } from "@/app/data/servicesData"
import { getTechIcon } from "@/app/data/servicesData"
import * as LucideIcons from "lucide-react"

interface SubserviceCardProps {
  subservice: Subservice
  onClick: () => void
}

export function SubserviceCard({ subservice, onClick }: SubserviceCardProps) {
  // Dynamically get icons based on tech stack
  const renderTechIcon = (tech: string) => {
    const iconName = getTechIcon(tech)
    const Icon = (LucideIcons as any)[iconName]
    return Icon ? <Icon className="size-3.5 mr-1" /> : null
  }

  return (
    <div
      className="bg-primary/5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-2/5 relative h-48 md:h-auto">
          <Image
            src={subservice.image || "/placeholder.svg"}
            alt={subservice.subservice}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full md:w-3/5 p-8">
          <h3 className="text-lg font-semibold mb-3 gray-100">{subservice.subservice}</h3>
          <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow">{subservice.description}</p>
          <div className="mt-auto">
            <p className="text-xs font-medium text-gray-200 mb-2">Tech Stack:</p>
            <div className="flex flex-wrap gap-1.5">
              {subservice.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-gray-900 text-primary text-xs px-2.5 py-1.5 rounded-full"
                >
                  {renderTechIcon(tech)}
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

