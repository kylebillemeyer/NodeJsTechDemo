import { useState, useCallback } from "react";
import Header from "./components/Header";
import ImageCarousel from "./components/ImageCarousel";
import PlantInfo from "./components/PlantInfo";
import GrowingConditions from "./components/GrowingConditions";
import PlantSection from "./components/PlantSection";
import PurchaseLinks from "./components/PurchaseLinks";
import DayNavigation from "./components/DayNavigation";
import Footer from "./components/Footer";
import { getPlantForDate, formatDate, addDays } from "./utils/plantOfTheDay";

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const isToday = isSameDay(currentDate, today);
  const plant = getPlantForDate(currentDate);

  const goToPrevious = useCallback(
    () => setCurrentDate((d) => addDays(d, -1)),
    [],
  );
  const goToNext = useCallback(
    () => setCurrentDate((d) => addDays(d, 1)),
    [],
  );
  const goToToday = useCallback(() => setCurrentDate(new Date()), []);

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
        <Header dateString={formatDate(currentDate)} />
        <DayNavigation
          onPrevious={goToPrevious}
          onNext={goToNext}
          onToday={goToToday}
          isToday={isToday}
        />
        <ImageCarousel images={plant.images} />
        <PlantInfo plant={plant} />
        <GrowingConditions conditions={plant.growingConditions} />

        <PlantSection title="About" defaultOpen>
          <p className="text-sm text-earth-600 leading-relaxed">
            {plant.description}
          </p>
        </PlantSection>

        <PlantSection title="Fun Facts">
          <ul className="space-y-2">
            {plant.facts.map((fact, i) => (
              <li
                key={i}
                className="text-sm text-earth-600 leading-relaxed flex gap-2"
              >
                <span className="text-sage-400 shrink-0">&#8226;</span>
                {fact}
              </li>
            ))}
          </ul>
        </PlantSection>

        <PlantSection title="When to Plant">
          <div className="space-y-2 text-sm text-earth-600">
            <p>
              <span className="font-medium text-earth-700">Best season:</span>{" "}
              {plant.plantingInfo.bestSeason}
            </p>
            <p>
              <span className="font-medium text-earth-700">Germination:</span>{" "}
              {plant.plantingInfo.germination}
            </p>
            <p>
              <span className="font-medium text-earth-700">Spacing:</span>{" "}
              {plant.plantingInfo.spacing}
            </p>
            {plant.plantingInfo.daysToHarvest && (
              <p>
                <span className="font-medium text-earth-700">
                  Days to harvest:
                </span>{" "}
                {plant.plantingInfo.daysToHarvest}
              </p>
            )}
          </div>
        </PlantSection>

        <PlantSection title="Care Tips">
          <ul className="space-y-2">
            {plant.careTips.map((tip, i) => (
              <li
                key={i}
                className="text-sm text-earth-600 leading-relaxed flex gap-2"
              >
                <span className="text-sage-400 shrink-0">&#8226;</span>
                {tip}
              </li>
            ))}
          </ul>
        </PlantSection>

        {plant.companionPlants.length > 0 && (
          <PlantSection title="Great Companions">
            <div className="flex flex-wrap gap-2">
              {plant.companionPlants.map((companion) => (
                <span
                  key={companion}
                  className="text-sm bg-sage-50 text-sage-700 px-3 py-1 rounded-full"
                >
                  {companion}
                </span>
              ))}
            </div>
          </PlantSection>
        )}

        <PurchaseLinks links={plant.purchaseLinks} plantName={plant.name} />
        <Footer />
      </div>
    </div>
  );
}
