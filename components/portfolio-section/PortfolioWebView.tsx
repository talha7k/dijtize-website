"use client";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface PortfolioDemoProps {
  link: string;
  title: string;
  onClose: () => void;
}

export function PortfolioWebView({ link, title, onClose }: PortfolioDemoProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative m-[2.5%] h-[95%] w-[95%] overflow-hidden rounded-xl">
        <iframe
          src={link}
          className="h-full w-full border-none"
          title={`${title} Demo`}
          allowFullScreen
        />
        <Button
          size="sm"
          onClick={onClose}
          className="absolute right-4 top-4 z-50 h-8 w-8 rounded-lg bg-gray-800 text-white hover:bg-primary"
          aria-label="Close demo"
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
}
