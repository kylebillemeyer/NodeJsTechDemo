import type { PurchaseLink } from "../types/plant";

export function generateDefaultPurchaseLinks(plantName: string): PurchaseLink[] {
  return [
    {
      label: "Find seeds on Etsy",
      url: `https://www.etsy.com/search?q=${encodeURIComponent(plantName + " seeds")}`,
      type: "seeds",
    },
    {
      label: "Find live plants on Etsy",
      url: `https://www.etsy.com/search?q=${encodeURIComponent(plantName + " live plant")}`,
      type: "plant",
    },
  ];
}
