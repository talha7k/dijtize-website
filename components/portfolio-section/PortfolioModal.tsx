"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlurImage } from "./BlurImage";
import Image from "next/image";
import { PortfolioDemo } from "./PortfolioDemo";

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
  const [isDemoOpen, setIsDemoOpen] = useState(false);

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
    setIsDemoOpen(true);
  };

  const handleDemoClose = () => {
    setIsDemoOpen(false);
  };

  if (!portfolioItem) return null;

  return (
    <>
      <Dialog open={isOpen && !isDemoOpen} onOpenChange={onClose}>
        <DialogContent className="modal scrollbar-hidden flex max-h-[95vh] max-w-[90vw] items-center justify-center rounded-xl bg-transparent/55 p-5 backdrop-blur-sm">
          <div className="relative mt-6 max-h-[75vh] w-full overflow-y-auto px-2 py-3 md:p-8">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl font-bold">
                {portfolioItem.title}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-6 flex grid-cols-[45%_45%] flex-col gap-8 sm:grid">
              {/* Image Container */}

              <div
                className="relative max-h-[85vh] min-h-[100px] w-full cursor-pointer rounded-xl transition-transform duration-300 sm:h-auto sm:w-auto"
                onClick={handleImageClick}
              >
                <BlurImage
                  src={portfolioItem.image || "/placeholder.svg"}
                  alt={portfolioItem.title}
                  enableScroll={true}
                  hover={<span className="text-lg">View Live Demo</span>}
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="w-full sm:w-auto">
                <div className="mb-6 text-base">
                  <p className="text-primary">
                    <strong>Category:</strong> {portfolioItem.category}
                  </p>
                </div>

                <div className="mb-6 text-gray-100">
                  <strong>Case Study:</strong>
                  <p>{portfolioItem.case_study.client}</p>
                  <br />
                  <p>{portfolioItem.case_study.solution}</p>
                  <br />
                  <strong>Delivered:</strong>

                  <p>{portfolioItem.description}</p>
                  <p>{portfolioItem.content}</p>
                  <br />
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
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolioItem.techStack.map((techUrl, index) => (
                      <span
                        key={index}
                        className="inline-flex h-8 items-center rounded-full bg-gray-900 px-3 text-sm text-primary transition-transform duration-300"
                      >
                        <Image
                          src={techUrl}
                          alt={`Dijitize uses ${formatTechName(techUrl)}`}
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
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-Screen Demo */}
      {isDemoOpen && (
        <PortfolioDemo
          link={portfolioItem.link}
          title={portfolioItem.title}
          onClose={handleDemoClose}
        />
      )}
    </>
  );
}
