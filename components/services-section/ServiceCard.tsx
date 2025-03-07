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
    <div className="mb-4 overflow-hidden rounded-xl bg-transparent/20 shadow-md">
      <div className="px-2 pb-2">
        <div className="mb-2 flex flex-col items-center justify-center align-middle">
          <div className="items-center bg-white/5 p-3 px-[100%] py-6">
            {/* Icon Container - Centered and sized */}
            <div className="relativerounded-full mx-auto">
              <div className="mb-3 flex items-center justify-center">
                <Image
                  src={icon}
                  alt={`${title} icon`}
                  width={40}
                  height={40}
                  className="invert-[70%]"
                  style={{
                    maxWidth: "80%",
                    maxHeight: "80%",
                  }}
                />
              </div>
            </div>
            <h2 className="w-[300px] text-center text-2xl font-bold text-gray-500">
              {title}
            </h2>
          </div>
        </div>

        <ServiceCarousel subservices={subservices} />
      </div>
    </div>
  );
}
