"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlurImage } from "./BlurImage"; // Importing BlurImage
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItem: {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    techStack: string[];
    content: string;
    case_study: {
      client: string;
      solution: string;
      results: string[];
    };
    link: string;
  } | null;
}

export function PortfolioModal({
  isOpen,
  onClose,
  portfolioItem,
}: PortfolioModalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDemoView, setIsDemoView] = useState(false);
  const fullImageHeight = 2367; // Adjust based on tallest image
  const modalImageHeightPx = 150; // Matches max-h-[150px] in modal
  const translateDistance = -(fullImageHeight - modalImageHeightPx);

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

  const handleImageClick = () => {
    setIsDemoView(true);
  };

  const handleBackToModal = () => {
    setIsDemoView(false);
  };

  if (!portfolioItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`modal ${
          isDemoView
            ? "h-screen max-h-full w-screen max-w-full p-0"
            : "scrollbar-hidden flex max-h-[95vh] max-w-[90vw] items-center justify-center rounded-xl bg-transparent/55 p-5 backdrop-blur-sm"
        }`}
        // Hide default close button when in demo view
        {...(isDemoView ? { hideCloseButton: true } : {})}
      >
        {isDemoView ? (
          // Full-Screen Demo View
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative m-[5%] h-[90%] w-[90%] overflow-hidden rounded-xl">
              <iframe
                src={portfolioItem.link}
                className="h-full w-full border-none"
                title={`${portfolioItem.title} Demo`}
                allowFullScreen
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToModal}
                className="absolute right-4 top-4 h-8 w-8 rounded-lg"
                aria-label="Close form"
              >
                {" "}
                <XIcon />
              </Button>
            </div>
          </div>
        ) : (
          // Modal Content View
          <div className="relative mt-6 max-h-[75vh] w-full overflow-y-auto px-2 py-3 md:p-8">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-gray-100">
                {portfolioItem.title}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-6 flex flex-col gap-8 sm:grid sm:grid-cols-[35%_65%] md:grid-cols-[35%_65%]">
              {/* Image Container */}
              <div
                className="relative flex h-[150px] max-h-[150px] min-h-[100px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-transform duration-300 hover:scale-110 sm:h-auto sm:w-auto"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleImageClick}
              >
                <BlurImage
                  src={portfolioItem.image || "/placeholder.svg"}
                  alt={portfolioItem.title}
                  width={533}
                  height={fullImageHeight}
                  className="duration-[30000ms] object-cover transition-transform ease-linear"
                  style={{
                    transform: isHovered
                      ? `translateY(${translateDistance}px)`
                      : "translateY(0)",
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="w-full sm:w-auto">
                <div className="mb-6 text-base text-gray-300">
                  <p>
                    <strong>Category:</strong> {portfolioItem.category}
                  </p>
                  <p>
                    <strong>Description:</strong> {portfolioItem.description}
                  </p>
                  <p>
                    <strong>Content:</strong> {portfolioItem.content}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolioItem.techStack.map((techUrl, index) => (
                      <span
                        key={index}
                        className="inline-flex h-8 items-center rounded-full bg-gray-900 px-3 text-sm text-primary transition-transform duration-300 hover:scale-110"
                      >
                        <BlurImage
                          src={techUrl}
                          alt={`Tech stack logo ${index}`}
                          width={16}
                          height={16}
                          className="mr-1.5 object-contain"
                        />
                        <span className="truncate">
                          {formatTechName(techUrl)}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold">Case Study:</h4>
                  <p>
                    <strong>Client:</strong> {portfolioItem.case_study.client}
                  </p>
                  <p>
                    <strong>Solution:</strong>{" "}
                    {portfolioItem.case_study.solution}
                  </p>
                  <p>
                    <strong>Results:</strong>
                  </p>
                  <ul className="list-disc pl-5">
                    {portfolioItem.case_study["results"].map(
                      (result, index) => (
                        <li key={index}>{result}</li>
                      ),
                    )}
                  </ul>
                </div>

                <div>
                  <span
                    className="cursor-pointer text-blue-400 underline"
                    onClick={handleImageClick}
                  >
                    View Live Demo
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
