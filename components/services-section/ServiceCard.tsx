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
      <div className="px-2 pb-2">
        <div className="flex flex-col items-center align-middle justify-center mb-2">
          <div className="p-5 items-center rounded-xl bg-white/5">
            {/* Icon Container - Centered and sized */}
            <div className="relative rounded-full mx-auto">
              <div className="flex items-center justify-center mb-3">
                <Image
                  src={icon}
                  alt={`${title} icon`}
                  width={40}
                  height={40}
                  className="invert-[60%]"
                  style={{
                    maxWidth: '80%',
                    maxHeight: '80%',
                  }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-500">{title}</h2>
          </div>
        </div>

        <ServiceCarousel subservices={subservices} />
      </div>
    </div>
  );
}