"use client";
import { AnimatedTestimonials } from "./animated-testimonials";
import testimonialsData from "@/app/data/testimonialsData.json";

// Define the Testimonial type (matches AnimatedTestimonials and JSON structure)
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export function TestimonialsSection() {
  // Extract testimonials from JSON
  const testimonials: Testimonial[] = testimonialsData.testimonials;

  return (
    <section id="testimonials" className="bg-background/10 py-12">
      <div className="container mx-auto px-4">
        <div className="my-10 text-center">
          <h2 className="gray-100 mb-4 text-3xl font-bold md:text-4xl">
            Our Feedbacks
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            What people say about us!
          </p>
        </div>
        {/* Div to control size of AnimatedTestimonials with overflow handling */}
        <div className="relative mx-auto mt-12 w-full max-w-4xl overflow-hidden">
          {/* Optional: Add a border or background to visualize boundaries */}
          <AnimatedTestimonials
            testimonials={testimonials}
            autoplay={true}
            delay={4000}
          />
        </div>
      </div>
    </section>
  );
}
