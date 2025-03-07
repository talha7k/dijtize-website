"use client";
import Image from "next/image";
import type { Subservice } from "@/app/data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Subservice | null;
}

export function PortfolioModal({
  isOpen,
  onClose,
  service,
}: ServiceModalProps) {
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
      <DialogContent className="modal flex max-h-[80vh] max-w-[80vw] items-center justify-center rounded-xl bg-transparent/55 p-5 backdrop-blur-sm">
        <div className="relative max-h-[75vh] w-full overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-gray-100">
              {service.subservice}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 flex flex-col gap-8 sm:grid sm:grid-cols-[35%_65%] md:grid-cols-[35%_65%]">
            {/* Image Container */}
            <div className="relative flex h-[150px] max-h-[150px] min-h-[100px] w-full items-center justify-center overflow-hidden rounded-lg transition-transform duration-300 hover:scale-110 sm:h-auto sm:w-auto">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.subservice}
                fill
                className="absolute inset-0 object-contain p-4"
                sizes="(max-width: 640px) 100vw, 35vw"
                priority={false}
              />
            </div>

            {/* Content Section */}
            <div className="w-full sm:w-auto">
              <div className="mb-6 text-base text-gray-300">
                {service.description}
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  Technologies We Use:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((techUrl, index) => (
                    <span
                      key={index}
                      className="inline-flex h-8 items-center rounded-full bg-gray-900 px-3 text-sm text-primary transition-transform duration-300 hover:scale-110"
                    >
                      <Image
                        src={techUrl}
                        alt={`Tech stack logo ${index}`}
                        width={16}
                        height={16}
                        className="mr-1.5 object-contain"
                      />
                      <span className="truncate">
                        {formatTechName(techUrl)}
                      </span>
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
