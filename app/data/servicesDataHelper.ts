// servicesDataHelper.ts
import type { ServiceCategory, Subservice } from "@/app/data/types"; // Define your types if not already in a separate file

class ServicesDataHelper {
  private data: ServiceCategory[];

  constructor(data: ServiceCategory[]) {
    this.data = data;
  }

  // Load data from JSON file (assuming it's imported or fetched)
  static async loadFromJson(jsonPath: string): Promise<ServicesDataHelper> {
    const response = await fetch(jsonPath);
    const data: ServiceCategory[] = await response.json();
    return new ServicesDataHelper(data);
  }

  // Get all service categories
  getCategories(): ServiceCategory[] {
    return this.data;
  }

  // Get a specific category by title
  getCategory(title: string): ServiceCategory | undefined {
    return this.data.find((category) => category.title === title);
  }

  // Get all sub-services for a category
  getSubservices(categoryTitle: string): Subservice[] | undefined {
    const category = this.getCategory(categoryTitle);
    return category?.subservices;
  }

  // Get a specific sub-service by category and sub-service name
  getSubservice(categoryTitle: string, subserviceName: string): Subservice | undefined {
    const subservices = this.getSubservices(categoryTitle);
    return subservices?.find((subservice) => subservice.subservice === subserviceName);
  }

  // Helper to filter sub-services with empty techStack
  getEmptyTechStackSubservices(): { category: string; subservice: string }[] {
    const emptySubservices: { category: string; subservice: string }[] = [];
    this.data.forEach((category) => {
      category.subservices.forEach((subservice) => {
        if (subservice.techStack.length === 0) {
          emptySubservices.push({ category: category.title, subservice: subservice.subservice });
        }
      });
    });
    return emptySubservices;
  }
}

// Example usage (assuming you import or fetch the JSON)
export default ServicesDataHelper;