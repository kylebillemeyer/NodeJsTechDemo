import type { Plant } from "../types/plant";

interface PlantInfoProps {
  plant: Plant;
}

const categoryColors: Record<Plant["category"], string> = {
  flower: "bg-coral-100 text-coral-700",
  herb: "bg-sage-100 text-sage-700",
  vegetable: "bg-green-100 text-green-700",
  fruit: "bg-amber-100 text-amber-700",
};

export default function PlantInfo({ plant }: PlantInfoProps) {
  return (
    <div className="px-4 py-3 text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <h2 className="font-serif text-3xl text-earth-800">{plant.name}</h2>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${
            categoryColors[plant.category]
          }`}
        >
          {plant.category}
        </span>
      </div>
      <p className="text-sm text-earth-400 italic mb-3">
        {plant.scientificName}
      </p>
      <p className="font-serif text-lg text-earth-600 italic leading-relaxed">
        &ldquo;{plant.tagline}&rdquo;
      </p>
    </div>
  );
}
