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

export function ContactForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // Changed to boolean for conditional rendering
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      // console.log("API response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to send email");
      }

      setSuccess(true); // Set success to true on successful submission
      setFormData({ name: "", email: "", message: "" });
      setRecaptchaToken(null); // Reset reCAPTCHA
    } catch (err: any) {
      setError(err.message || "Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-neutral-900 p-6 shadow-input dark:bg-neutral-900 md:rounded-2xl md:p-8">
      <div className="mb-4 flex justify-between">
        <div className="flex-col">
          <h2 className="text-xl font-bold text-gray-100">
            Book Your Free Consultation
          </h2>
          <p className="mb-2 mt-2 max-w-sm text-sm text-primary">
            Get expert advice. <br />
            Schedule a free Zoom consultation today!
          </p>
          <p className="mb-6 mt-2 max-w-sm text-sm text-gray-400">
            Fill out the form below to connect with Dijitize and discuss your
            digital transformation needs.
          </p>
        </div>
        {onClose && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 rounded-lg"
            aria-label="Close form"
          >
            <XIcon />
          </Button>
        )}
      </div>

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
            Your message has been sent successfully. We'll get back to you soon.
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
        <>
          <form className="my-4" onSubmit={handleSubmit}>
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
        </>
      )}
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
