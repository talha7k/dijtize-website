"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ContactForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    projectType: "", // Added projectType field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "info@dijitize.com",
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send email");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "", projectType: "" }); // Reset projectType as well
      setRecaptchaToken(null);
    } catch (err: any) {
      setError(err.message || "Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md rounded-xl bg-neutral-900 p-4 pt-8 shadow-input dark:bg-neutral-900 md:p-9">
      {/* Close Button in Top-Right Corner */}
      {onClose && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 rounded-lg"
          aria-label="Close form"
        >
          <XIcon />
        </Button>
      )}

      <div className="mt-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-gray-100">
          Book Your Free Consultation Today
        </h2>
        <div className="my-4 flex flex-col items-center rounded-lg bg-white/5 py-3 md:space-y-1">
          <p className="flex items-center space-x-3 text-xl md:text-2xl">
            <Image
              src="/icons/whatsapp.svg"
              alt="WhatsApp Icon"
              width={24}
              height={24}
            />
            <span className="text-neutral-200">+1 (347) 479-2597</span>
          </p>

          <p className="mt-2 px-3 text-xs text-gray-400 text-primary md:px-6">
            WhatsApp now to discuss how we can elevate your business!
          </p>
        </div>

        <p className="mb-3 mt-1 max-w-sm text-xs text-gray-400">
          Complete the form below to schedule your free consultation.
        </p>

        {success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-white/10 px-5 py-8 text-center"
          >
            <h3 className="mb-2 text-2xl font-semibold text-gray-100">
              Thank You!
            </h3>
            <p className="mx-auto max-w-sm text-sm text-gray-400">
              Your message has been sent successfully. We'll get back to you
              soon.
            </p>
            <div className="mx-4 mt-10">
              {onClose && (
                <Button variant="outline" className="mx-4" onClick={onClose}>
                  Close
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          // Form Fields
          <form className="my-4 w-full" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name" className="self-start">
                Full Name
              </Label>
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
              <Label htmlFor="email" className="self-start">
                Email Address
              </Label>
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
            {/* Project Type Dropdown */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="projectType" className="self-start">
                Project Type
              </Label>
              <Select onValueChange={handleProjectTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Marketing Campaigns">
                    Marketing Campaigns
                  </SelectItem>
                  <SelectItem value="Video Production">
                    Video Production
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="message" className="self-start">
                Message
              </Label>
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

            <div className="mb-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleRecaptchaChange}
                theme="dark" // Change to "light" for a lighter theme
              />
            </div>

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={isSubmitting || !recaptchaToken}
              className="h-10 w-full rounded-xl bg-white text-lg font-medium text-black shadow-lg transition-all hover:bg-primary"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </div>
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
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
