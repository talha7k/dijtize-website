"use client";
import Image from "next/image";
import type { Subservice } from "@/app/data/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Subservice | null;
}

export function PortfolioModal({ isOpen, onClose, service }: ServiceModalProps) {
  const formatTechName = (url: string) => {
    return (
      url
        .split("/")
        .pop()
        ?.replace(/\.(png|svg)/, "")
        ?.replace(/-/g, " ")
        ?.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()) || "Unknown"
    );
  };
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal sm:max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-0 bg-transparent/55 backdrop-blur-sm">
        <div className="p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-100 text-center">
              {service.subservice}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 flex flex-col sm:grid sm:grid-cols-[35%_65%] md:grid-cols-[35%_65%] gap-8">
            <div className="transition-transform duration-300 hover:scale-110 relative h-[150px] sm:h-auto min-h-[100px] max-h-[150px] rounded-lg overflow-hidden flex items-center justify-center w-full sm:w-auto">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.subservice}
                fill
                className="object-contain absolute inset-0 p-4"
                sizes="(max-width: 640px) 100vw, 35vw"
                priority={false}
              />
            </div>

            <div className="w-full sm:w-auto">
              <div className="text-base text-gray-300 mb-6">{service.description}</div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Technologies We Use:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((techUrl, index) => (
                    <span
                      key={index}
                      className="transition-transform duration-300 hover:scale-110 inline-flex items-center bg-gray-900 text-primary text-sm px-3 rounded-full h-8"
                    >
                      <Image
                        src={techUrl}
                        alt={`Tech stack logo ${index}`}
                        width={16}
                        height={16}
                        className="mr-1.5 object-contain"
                      />
                      <span className="truncate">{formatTechName(techUrl)}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}