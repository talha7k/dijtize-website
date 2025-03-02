"use client"

import Image from "next/image"
import type { Subservice } from "@/app/data/servicesData"
import { getTechIcon } from "@/app/data/servicesData"
import * as LucideIcons from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: Subservice | null
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!service) return null

  // Dynamically get icons based on tech stack
  const renderTechIcon = (tech: string) => {
    const iconName = getTechIcon(tech)
    const Icon = (LucideIcons as any)[iconName]
    return Icon ? <Icon className="size-4 mr-1.5" /> : null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] modal overflow-y-auto rounded-xl p-0 bg-transparent/55 backdrop-blur-sm">
        <div className="p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gray-100">{service.subservice}</DialogTitle>
          </DialogHeader>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
              <Image src={service.image || "/placeholder.svg"} alt={service.subservice} fill className="object-cover" />
            </div>

            <div>
              <div className="text-base text-gray-300 mb-6">{service.description}</div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Technologies We Use:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center  bg-gray-900  text-primary text-sm px-3 py-1.5 rounded-full"
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
      </DialogContent>
    </Dialog>
  )
}

