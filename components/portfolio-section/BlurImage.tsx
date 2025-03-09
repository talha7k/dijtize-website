"use client";
import Image, { ImageProps } from "next/image";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends ImageProps {
  enableScroll?: boolean; // Enable scrolling on hover
  hover?: ReactNode; // Content to show on hover (e.g., "View Live Demo")
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  enableScroll = false,
  hover,
  ...rest
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Use the provided height for scrolling distance
  const imageHeight =
    typeof height === "number" ? height : parseInt(height as string, 10) || 0;
  const translateDistance = -imageHeight; // Scroll the full image height

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden")}
      onMouseEnter={() => enableScroll && setIsHovered(true)}
      onMouseLeave={() => enableScroll && setIsHovered(false)}
    >
      <Image
        className={cn(
          "h-auto w-full transition duration-300", // Base blur and size
          isLoading ? "blur-sm" : "blur-0",
          enableScroll && isHovered ? "animate-scroll" : "",
          enableScroll ? "object-cover" : "",
          className,
        )}
        onLoad={() => setLoading(false)}
        src={src}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        blurDataURL={typeof src === "string" ? src : undefined}
        alt={alt ? alt : "Background of a beautiful view"}
        {...rest}
      />
      {enableScroll && hover && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/10 text-white transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          {hover}
        </div>
      )}
      {enableScroll && (
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(${translateDistance}px);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear forwards;
          }
        `}</style>
      )}
    </div>
  );
};
