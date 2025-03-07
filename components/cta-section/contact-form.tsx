"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

export function ContactForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "info@dijitize.com", // Recipient email
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const result = await response.json();
      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-neutral-900 p-4 shadow-input dark:bg-neutral-900 md:rounded-2xl md:p-8">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold text-gray-100">
          Schedule a Consultation
        </h2>
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
      <p className="mb-2 mt-2 max-w-sm text-sm text-primary">
        Free consultation | Schedule a zoom meeting.
      </p>
      <p className="mb-6 mt-2 max-w-sm text-sm text-gray-400">
        Fill out the form below to connect with Dijitize and discuss your
        digital transformation needs.
      </p>

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

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-4 text-sm text-green-500">{success}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-xl bg-white text-lg font-medium text-black shadow-lg transition-all hover:bg-primary"
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
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
