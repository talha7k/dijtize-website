"use client";
import Image, { ImageProps } from "next/image";
import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends Omit<ImageProps, "width" | "height"> {
  src: string; // Assumes src contains dimensions like "car-dealer-landing-page-533x2076.jpg"
  enableScroll?: boolean; // Enable scrolling on hover (if autoScroll is false)
  autoScroll?: boolean; // Automatically enable scrolling
  scrollSpeed?: number; // Base speed in pixels per second (default: 50)
  hoverScrollSpeed?: number; // Speed in pixels per second when hovered (optional)
  hover?: ReactNode; // Content to show on hover (e.g., "View Live Demo")
}

const extractDimensions = (
  src: string,
): { width: number; height: number } | null => {
  // Extracts dimensions from a filename with the pattern "-{width}x{height}."
  const match = src.match(/-(\d+)x(\d+)\./);
  if (match) {
    return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) };
  }
  return null;
};

export const BlurImage = ({
  src,
  className,
  alt,
  enableScroll = false,
  autoScroll = true,
  scrollSpeed = 50, // base pixels per second
  hoverScrollSpeed = 150, // optional different speed on hover
  hover,
  ...rest
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Extract dimensions from the image URL.
  const dimensions = extractDimensions(src);
  const width = dimensions?.width || 500;
  const imageHeight = dimensions?.height || 300;

  // Refs to control animation state.
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // Determine if scrolling should be active.
  const shouldScroll = autoScroll || (enableScroll && isHovered);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000; // in seconds
      lastTimestampRef.current = timestamp;

      // Determine effective scroll speed:
      const effectiveSpeed =
        isHovered && hoverScrollSpeed ? hoverScrollSpeed : scrollSpeed;

      if (containerRef.current && (autoScroll || (enableScroll && isHovered))) {
        // Increase offset based on effective speed and elapsed time.
        offsetRef.current =
          (offsetRef.current + effectiveSpeed * deltaTime) % imageHeight;
        containerRef.current.style.transform = `translateY(-${offsetRef.current}px)`;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (shouldScroll) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Pause the animation.
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastTimestampRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    shouldScroll,
    scrollSpeed,
    hoverScrollSpeed,
    imageHeight,
    autoScroll,
    enableScroll,
    isHovered,
  ]);

  return (
    <div
      className={cn("relative max-h-[85vh] w-full overflow-hidden rounded-xl")}
      style={{ height: imageHeight }}
      onMouseEnter={() => {
        if (enableScroll || hover) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (enableScroll || hover) setIsHovered(false);
      }}
    >
      {/* Container that will be animated via JavaScript */}
      <div ref={containerRef} className="flex flex-col">
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
          height={imageHeight}
          onLoad={() => setLoading(false)}
          loading="lazy"
          decoding="async"
          blurDataURL={src}
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
            height={imageHeight}
            loading="lazy"
            decoding="async"
            blurDataURL={src}
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
    </div>
  );
};
