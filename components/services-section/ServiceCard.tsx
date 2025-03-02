import { ServiceCarousel } from "./ServiceCarousel";
import Image from "next/image";
import type { Subservice } from "@/app/data/types";

interface ServiceCardProps {
  title: string; // Added title property
  icon: string;
  subservices: Subservice[];
}

export function ServiceCard({ title, icon, subservices }: ServiceCardProps) {
  return (
    <div className="bg-transparent/20 rounded-xl shadow-md overflow-hidden mb-12">
      <div className="p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Image
              src={icon}
              alt={`${title} icon`}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-100">{title}</h2>
          <div className="w-20 h-[2px] bg-white/50 mt-4"></div>
        </div>

        <ServiceCarousel subservices={subservices} />
      </div>
    </div>
  );
}