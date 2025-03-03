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
    <section id="testimonials" className="py-20 bg-background/10">
      <div className="container mx-auto px-4">
        <div className="text-center mt-8">
          <h2 className="text-3xl md:text-4xl font-bold gray-100 mb-4">
            Our Feedbacks
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            What people say about us!
          </p>
        </div>
        {/* Div to control size of AnimatedTestimonials with overflow handling */}
        <div className="w-full max-w-4xl mx-auto  overflow-hidden relative">
          {/* Optional: Add a border or background to visualize boundaries */}
          <AnimatedTestimonials
            testimonials={testimonials}
            autoplay={true}
            delay={3000}
          />
        </div>
      </div>
    </section>
  );
}