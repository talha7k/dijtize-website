"use client";
import Image, { ImageProps } from "next/image";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends Omit<ImageProps, "height"> {
  enableScroll?: boolean; // Enable scrolling on hover
  autoScroll?: boolean; // Automatically enable scrolling
  scrollSpeed?: number; // Duration of one scroll cycle in seconds
  hover?: ReactNode; // Content to show on hover (e.g., "View Live Demo")
}

export const BlurImage = ({
  width,
  src,
  className,
  alt,
  enableScroll = false,
  autoScroll = true,
  scrollSpeed = 200, // Default to 30 seconds
  hover,
  ...rest
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [imageHeight, setImageHeight] = useState<number>(0);

  // Determine if scrolling animation should be applied
  const shouldScroll = autoScroll || (enableScroll && isHovered);

  return (
    <div
      className={cn("relative max-h-[85vh] w-full overflow-hidden rounded-xl")}
      style={{ height: imageHeight || "auto" }} // Set container height once measured
      onMouseEnter={() => {
        if (enableScroll || hover) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (enableScroll || hover) setIsHovered(false);
      }}
    >
      {/* Container for infinite scrolling */}
      <div
        className={cn("flex flex-col", shouldScroll ? "animate-scroll" : "")}
      >
        {/* Primary image */}
        <Image
          className={cn(
            "w-full transition duration-300",
            isLoading ? "blur-sm" : "blur-0",
            autoScroll || enableScroll ? "object-cover" : "",
            className,
          )}
          src={src}
          width={width}
          // Provide a dummy height until the image loads.
          height={imageHeight || 200}
          onLoadingComplete={(img) => {
            setImageHeight(img.naturalHeight);
            setLoading(false);
          }}
          loading="lazy"
          decoding="async"
          blurDataURL={typeof src === "string" ? src : undefined}
          alt={alt || "Background of a beautiful view"}
          {...rest}
        />
        {/* Duplicate image for seamless looping */}
        {(autoScroll || enableScroll) && (
          <Image
            className={cn(
              "w-full transition duration-300",
              isLoading ? "blur-sm" : "blur-0",
              autoScroll || enableScroll ? "object-cover" : "",
              className,
            )}
            src={src}
            width={width}
            height={imageHeight || 200}
            loading="lazy"
            decoding="async"
            blurDataURL={typeof src === "string" ? src : undefined}
            alt={alt || "Background of a beautiful view (duplicate)"}
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

      {/* Animation keyframes updated dynamically */}
      {(autoScroll || enableScroll) && imageHeight > 0 && (
        <style jsx key={`scroll-${scrollSpeed}-${imageHeight}`}>{`
          @keyframes scroll {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-${imageHeight}px);
            }
          }
          .animate-scroll {
            animation: scroll ${scrollSpeed}s linear infinite;
          }
        `}</style>
      )}
    </div>
  );
};
