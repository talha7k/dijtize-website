export type PortfolioItem = {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    techStack: string[];
    content: string;
  };
  
  export type PortfolioData = {
    portfolio: PortfolioItem[];
  };
  
  // Keep your existing service types
  export type Subservice = {
    subservice: string;
    description: string;
    techStack: string[];
    image: string;
  };
  
  export type ServiceCategory = {
    icon: string;
    title: string;
    subservices: Subservice[];
  };
  
  export type ServicesData = {
    mobileApps: ServiceCategory;
    marketingVideo: ServiceCategory;
    brandingCreativeDesign: ServiceCategory;
    webDevelopment: ServiceCategory;
  };