import plants from "../data/plants.json";
import type { Plant } from "../types/plant";

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getPlantForDate(date: Date): Plant {
  const dayOfYear = getDayOfYear(date);
  const index = (dayOfYear - 1) % plants.length;
  return plants[index < 0 ? 0 : index] as Plant;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
