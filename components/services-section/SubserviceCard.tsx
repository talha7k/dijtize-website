import Image from "next/image";
import type { Subservice } from "@/app/data/types";

interface SubserviceCardProps {
  subservice: Subservice;
  onClick: () => void;
}

export function SubserviceCard({ subservice, onClick }: SubserviceCardProps) {
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

  return (
    <div
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-primary/5 px-1 transition-transform duration-300 hover:scale-95 hover:bg-white/5 md:px-2"
      onClick={onClick}
    >
      <div className="flex h-full flex-col items-stretch">
        {/* Image Container */}
        <div className="relative my-5 flex h-[100px] items-center justify-center md:h-[100px]">
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
        <div className="flex flex-col p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-100">
            {subservice.subservice}
          </h3>
          <p className="mb-4 flex-grow text-sm text-gray-300">
            {subservice.description}
          </p>
          <div className="mt-auto">
            <p className="mb-2 text-xs font-medium text-gray-400">
              Tech Stack:
            </p>
            <div className="flex flex-wrap gap-2">
              {subservice.techStack.map((techUrl, index) => (
                <span
                  key={index}
                  className="inline-flex h-8 min-w-[100px] items-center justify-center rounded-full bg-gray-900 px-3 py-1 text-xs text-primary"
                >
                  <Image
                    src={techUrl}
                    alt={`Tech stack logo ${index}`}
                    width={16}
                    height={16}
                    className="mr-2 object-contain"
                  />
                  <span className="truncate">{formatTechName(techUrl)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
