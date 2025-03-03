import Image from "next/image";
import type { Subservice } from "@/app/data/types";

interface SubserviceCardProps {
  subservice: Subservice;
  onClick: () => void;
}

export function SubserviceCard({ subservice, onClick }: SubserviceCardProps) {
  const formatTechName = (url: string) => {
    return url
      .split("/")
      .pop()
      ?.replace(/\.(png|svg)/, "")
      ?.replace(/-/g, " ")
      ?.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()) || "Unknown";
  };
  
  return (
    <div
      className="transition-transform p-5 duration-300 hover:scale-95 bg-primary/5 rounded-xl flex flex-col hover:bg-white/5 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-col items-stretch  h-full">
        {/* Image Container */}
        <div className=" my-5 relative h-[100px] md:h-[100px] flex items-center justify-center">
          <Image
            src={subservice.image || "/placeholder.svg"}
            alt={subservice.subservice}
            fill
            className="object-contain object-center"
            priority={false}
            style={{
              maxHeight: "100px",
              maxWidth: "100%",
            }}
          />
        </div>

        {/* Text and Tech Stack Container */}
        <div className="p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-gray-100">
            {subservice.subservice}
          </h3>
          <p className="text-sm text-gray-400 mb-4 flex-grow">
            {subservice.description}
          </p>
          <div className="mt-auto">
            <p className="text-xs font-medium text-gray-200 mb-2">Tech Stack:</p>
            <div className="flex flex-wrap gap-2">
              {subservice.techStack.map((techUrl, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-gray-900 text-primary text-xs px-3 py-1 rounded-full h-8 min-w-[100px] justify-center"
                >
                  <Image
                    src={techUrl}
                    alt={`Tech stack logo ${index}`}
                    width={16}
                    height={16}
                    className="mr-2 object-contain"
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
  );
}