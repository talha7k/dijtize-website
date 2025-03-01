// Updated data model with icons and images
export const servicesData = {
  mobileApps: {
    icon: "Smartphone",
    title: "Mobile App Development",
    subservices: [
      {
        subservice: "Native App Development",
        description:
          "We create high-performance native mobile apps that deliver superior user experiences. Our native development services focus on leveraging the full potential of the mobile platform for optimized performance.",
        techStack: ["Swift", "Kotlin", "Objective-C", "Java"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "Cross-Platform App Development",
        description:
          "Our cross-platform solutions enable you to reach a wider audience without compromising on performance. We build apps that work flawlessly on both iOS and Android, reducing development time and cost.",
        techStack: ["React Native", "Flutter", "Xamarin", "Ionic"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "Mobile App UI/UX Design",
        description:
          "A great app starts with an intuitive design. We focus on crafting engaging and user-friendly interfaces that enhance the mobile experience, ensuring your app stands out in today's competitive market.",
        techStack: ["Sketch", "Figma", "Adobe XD", "InVision"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "Mobile App Maintenance & Support",
        description:
          "Our maintenance and support services keep your mobile app updated, secure, and performing at its peak. We provide regular updates, bug fixes, and feature enhancements to ensure continuous improvement.",
        techStack: ["Firebase", "Crashlytics", "AppCenter", "JIRA"],
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  marketingVideo: {
    icon: "Video",
    title: "Marketing Video Production",
    subservices: [
      {
        subservice: "Explainer Video Animation",
        description:
          "Our explainer video animation service simplifies complex ideas through engaging narratives and dynamic visuals. Perfect for introducing products, explaining services, or educating audiences, these videos capture attention and drive conversions.",
        techStack: ["Adobe After Effects", "Premiere Pro", "Toonly"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "2D Animation",
        description:
          "Our 2D animation service brings stories to life with vibrant illustrations and smooth transitions. Ideal for ads, social media content, and educational videos, we deliver creative visuals that resonate with your audience.",
        techStack: ["Adobe Animate", "After Effects", "Toon Boom Harmony"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "3D Animation",
        description:
          "We craft immersive 3D animations that add depth and realism to your marketing campaigns. Perfect for product visualizations, architectural renderings, and cinematic presentations, our 3D animations captivate and inform.",
        techStack: ["Cinema 4D", "Blender", "Maya"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "Whiteboard Animation",
        description:
          "Our whiteboard animation service uses hand-drawn illustrations to tell your brand's story in a clear, engaging way. This technique is perfect for educational content and process explanations, making complex ideas accessible.",
        techStack: ["VideoScribe", "Explaindio", "After Effects"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "Custom Digital Logo Animation",
        description:
          "Transform your brand identity with our custom digital logo animation. We animate your logo to create dynamic visuals for intros, presentations, and online content, reinforcing brand recognition and adding a professional touch.",
        techStack: ["Adobe After Effects", "Cinema 4D", "Blender"],
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  brandingCreativeDesign: {
    icon: "Palette",
    title: "Branding & Creative Design",
    subservices: [
      {
        subservice: "Logo & Identity Design",
        description:
          "Craft a memorable visual identity with our custom logo and branding solutions. We create unique logos and brand assets that reflect your business's personality and values, ensuring consistency across all platforms.",
        techStack: ["Adobe Illustrator", "Photoshop", "CorelDRAW"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "Brand Strategy & Messaging",
        description:
          "Our strategic branding services help define your core message and market positioning. We work closely with you to develop a brand strategy that resonates with your audience and supports long-term growth.",
        techStack: ["Canva", "Miro", "Brandwatch"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "Print & Digital Collateral",
        description:
          "From business cards to social media graphics, our design services cover all your print and digital collateral needs. We ensure every piece of material is aligned with your brand identity and delivers a cohesive message.",
        techStack: ["Adobe InDesign", "Photoshop", "Illustrator"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        subservice: "Packaging & Merchandise Design",
        description:
          "Stand out on the shelf with innovative packaging and merchandise designs. We combine creativity with functionality to develop packaging that not only protects your product but also tells your brand story.",
        techStack: ["Adobe Illustrator", "Photoshop", "3D Studio Max"],
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
}

// Updated type definitions
export type Subservice = {
  subservice: string
  description: string
  techStack: string[]
  image: string
}

export type ServiceCategory = {
  icon: string
  title: string
  subservices: Subservice[]
}

// Tech stack icon mapping
export const techStackIcons: Record<string, string> = {
  // Mobile development
  Swift: "Apple",
  Kotlin: "Code",
  "Objective-C": "Apple",
  Java: "Coffee",
  "React Native": "React",
  Flutter: "Layers",
  Xamarin: "Code",
  Ionic: "Zap",

  // Design tools
  Sketch: "Pen",
  Figma: "Figma",
  "Adobe XD": "Square",
  InVision: "Eye",

  // DevOps & Analytics
  Firebase: "Database",
  Crashlytics: "AlertTriangle",
  AppCenter: "LayoutGrid",
  JIRA: "Trello",

  // Video & Animation
  "Adobe After Effects": "Film",
  "Premiere Pro": "Film",
  Toonly: "PenTool",
  "Adobe Animate": "Tv",
  "Toon Boom Harmony": "Tv",
  "Cinema 4D": "Box",
  Blender: "Box",
  Maya: "Box",
  VideoScribe: "PenTool",
  Explaindio: "PenTool",

  // Design & Branding
  "Adobe Illustrator": "PenTool",
  Photoshop: "Image",
  CorelDRAW: "PenTool",
  Canva: "Palette",
  Miro: "LayoutGrid",
  Brandwatch: "Eye",
  "Adobe InDesign": "FileText",
  "3D Studio Max": "Box",

  // Default
  default: "Code",
}

// Helper function to get icon for a tech
export const getTechIcon = (tech: string): string => {
  return techStackIcons[tech] || techStackIcons.default
}

