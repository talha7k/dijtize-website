"use client";
import Image from "next/image";
import type { Subservice } from "@/app/data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Subservice | null;
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
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
      <DialogContent className="modal scrollbar-hidden flex max-h-[90vh] min-h-[80vh] max-w-[90vw] justify-center rounded-xl border-0 bg-white/5 p-5 backdrop-blur-sm">
        <div className="relative h-full w-full overflow-y-auto px-2 py-3 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-primary">
              {service.subservice}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-[5%] flex grid-cols-[45%_45%] flex-col gap-8 self-center sm:grid md:mt-[10%]">
            {/* Image Container */}
            <div className="relative max-h-[85vh] min-h-[20vh] w-full cursor-pointer rounded-xl transition-transform duration-300 sm:h-auto sm:w-auto">
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
