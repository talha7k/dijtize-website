"use client";
import Image, { ImageProps } from "next/image";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends ImageProps {
  autoScroll?: boolean; // Enable automatic continuous scrolling
  hover?: ReactNode; // Content to show on hover (e.g., "View Live Demo")
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  autoScroll = false,
  hover,
  ...rest
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Use the provided height for scrolling distance
  const imageHeight =
    typeof height === "number" ? height : parseInt(height as string, 10) || 0;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container for continuous scrolling */}
      <div
        className={cn(
          "flex flex-col",
          autoScroll ? "animate-continuous-scroll" : "",
        )}
        style={{ height: autoScroll ? `${imageHeight * 2}px` : "auto" }} // Double height for seamless loop
      >
        <Image
          className={cn(
            "h-auto w-full transition duration-300", // Base blur and size
            isLoading ? "blur-sm" : "blur-0",
            autoScroll ? "object-cover" : "",
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
        {/* Duplicate image for continuous scroll */}
        {autoScroll && (
          <Image
            className={cn(
              "h-auto w-full transition duration-300",
              isLoading ? "blur-sm" : "blur-0",
              autoScroll ? "object-cover" : "",
              className,
            )}
            src={src}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            blurDataURL={typeof src === "string" ? src : undefined}
            alt={alt ? alt : "Background of a beautiful view (duplicate)"}
            {...rest}
          />
        )}
      </div>

      {/* Hover overlay */}
      {hover && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/10 text-white transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          {hover}
        </div>
      )}

      {/* Animation keyframes for continuous scroll */}
      {autoScroll && (
        <style jsx>{`
          @keyframes continuous-scroll {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-${imageHeight}px);
            }
          }
          .animate-continuous-scroll {
            animation: continuous-scroll ${imageHeight / 50}s linear infinite; /* Adjustable speed */
          }
        `}</style>
      )}
    </div>
  );
};
