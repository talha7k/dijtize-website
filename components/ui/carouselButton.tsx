"use client";
import React, { ReactNode } from "react";

interface CarouselButtonProps {
  icon: ReactNode; // Icon component or element (e.g., <ArrowLeft />)
  onClick: () => void;
  disabled?: boolean; // Optional disabled state
  className?: string; // Optional custom classes for additional styling
}

export const CarouselButton = ({
  icon,
  onClick,
  disabled = false,
  className = "",
}: CarouselButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl opacity-80 transition-opacity hover:opacity-100 ring-2 ring-gray-300 dark:ring-gray-600
        relative z-40 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100
        disabled:opacity-20 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {icon}
    </button>
  );
};