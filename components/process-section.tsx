import { Timeline } from "@/components/ui/timeline"

const processData = [
  {
    title: "Discovery & Planning",
    content:
      "We start by understanding your vision, goals, and requirements. Our team conducts thorough research and creates a detailed project roadmap.",
  },
  {
    title: "Design & Prototyping",
    content:
      "Our designers create intuitive and visually appealing interfaces. We develop interactive prototypes to visualize the final product.",
  },
  {
    title: "Development",
    content:
      "Our skilled developers bring the designs to life, using cutting-edge technologies and best practices to ensure a robust and scalable solution.",
  },
  {
    title: "Testing & Quality Assurance",
    content:
      "Rigorous testing is performed to identify and fix any issues, ensuring a bug-free and smooth user experience.",
  },
  {
    title: "Deployment",
    content: "We carefully launch your project, ensuring all systems are properly set up and functioning as intended.",
  },
  {
    title: "Maintenance & Support",
    content:
      "Our commitment doesn't end at launch. We provide ongoing support and maintenance to keep your digital solution running smoothly.",
  },
]

export function ProcessSection() {
  return (  
    <section id="process" className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Process</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            We follow a structured approach to turn your ideas into reality. Here's how we bring your digital vision to
            life:
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Timeline data={processData} />
        </div>
      </div>
    </section>
  )
}

