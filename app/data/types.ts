export type Subservice = {
    subservice: string;
    description: string;
    techStack: string[]; // URLs to PNGs
    image: string; // URL to PNG
  };
  
  export type ServiceCategory = {
    icon: string; // URL to PNG
    title: string;
    subservices: Subservice[];
  };
  
  // Type for the servicesData object (JSON structure)
  export type ServicesData = {
    mobileApps: ServiceCategory;
    marketingVideo: ServiceCategory;
    brandingCreativeDesign: ServiceCategory;
    webDevelopment: ServiceCategory;
  };