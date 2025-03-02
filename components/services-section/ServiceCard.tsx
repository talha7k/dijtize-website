import { ServiceCarousel } from "./ServiceCarousel";
import Image from "next/image";
import type { Subservice } from "@/app/data/types";

interface ServiceCardProps {
  title: string;
  icon: string;
  subservices: Subservice[];
}

export function ServiceCard({ title, icon, subservices }: ServiceCardProps) {
  return (
    <div className="bg-transparent/20 rounded-xl shadow-md overflow-hidden mb-4">
      <div className="p-5">
        <div className="flex flex-col items-center mb-2">
          <div className="p-7 items-center rounded-xl bg-black/20">
            {/* Icon Container - Centered and sized */}
            <div className="relative w-20 h-20 rounded-full bg-primary/10 mb-4 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={icon}
                  alt={`${title} icon`}
                  width={40}
                  height={40}
                  className="object-contain invert"
                  style={{
                    maxWidth: '80%',
                    maxHeight: '80%',
                  }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-100">{title}</h2>
          </div>
        </div>

        <ServiceCarousel subservices={subservices} />
      </div>
    </div>
  );
}