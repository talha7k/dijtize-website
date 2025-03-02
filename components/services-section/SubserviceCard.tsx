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
      className="bg-primary/5 rounded-xl flex flex-col cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-row items-stretch  h-full">
        {/* Image Container */}
        <div className="w-2/5 mt-20 relative mb-5 h-[125px] md:h-[150px] p-2 flex items-center justify-center">
          <Image
            src={subservice.image || "/placeholder.svg"}
            alt={subservice.subservice}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={false}
            style={{
              maxHeight: "150px",
              maxWidth: "100%",
            }}
          />
        </div>

        {/* Text and Tech Stack Container */}
        <div className="w-3/5 p-6 flex flex-col">
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