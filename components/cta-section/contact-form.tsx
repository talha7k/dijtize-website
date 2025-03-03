"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { XIcon}from "lucide-react";

export function ContactForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      console.log("Form submitted:", formData);
      // Replace with your actual backend endpoint
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "info@dijitize.com",
        }),
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 dark:bg-neutral-900">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-xl gray-100">
          Schedule a Consultation
        </h2>
        {onClose && (
          <Button
            variant="outline" // Use outline for a subtle border effect, similar to your ring-2
            size="sm"
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-white hover:text-black"
            aria-label="Close form"
          >
<XIcon  />
            
          </Button>
        )}
      </div>
      <p className="text-primary  text-sm max-w-sm mt-2 mb-2">
      Free consultation | Schedule a zoom meeting. </p>      <p className="text-gray-400 text-sm max-w-sm mt-2 mb-6">
      Fill out the form below to connect with Dijitize and discuss your digital transformation needs.
      </p>

      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name" className="self-start">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            type="text"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="self-start">Email Address</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            type="email"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="message" className="self-start"
          >Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your project or needs..."
            className="min-h-[120px]"
            required
          />
        </LabelInputContainer>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary  hover:bg-white text-black font-medium text-lg rounded-xl h-10 transition-all shadow-lg"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};