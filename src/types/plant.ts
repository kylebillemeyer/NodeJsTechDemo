export interface PlantImage {
  url: string;
  alt: string;
  credit: string;
}

export interface PurchaseLink {
  label: string;
  url: string;
  type: "seeds" | "plant" | "bulb";
}

export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  category: "flower" | "herb" | "vegetable" | "fruit";
  tagline: string;
  description: string;
  facts: string[];
  growingConditions: {
    sunlight: string;
    water: string;
    soil: string;
    hardiness: string;
  };
  plantingInfo: {
    bestSeason: string;
    germination: string;
    spacing: string;
    daysToHarvest?: string;
  };
  careTips: string[];
  companionPlants: string[];
  images: PlantImage[];
  purchaseLinks: PurchaseLink[];
}
