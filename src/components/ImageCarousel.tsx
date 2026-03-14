import { useState, useCallback } from "react";
import type { PlantImage } from "../types/plant";

interface ImageCarouselProps {
  images: PlantImage[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const startX = e.touches[0].clientX;
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endX = endEvent.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        setActiveIndex((prev) => {
          if (diff > 0) return Math.min(prev + 1, images.length - 1);
          return Math.max(prev - 1, 0);
        });
      }
      document.removeEventListener("touchend", handleTouchEnd);
    };
    document.addEventListener("touchend", handleTouchEnd);
  }, [images.length]);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden bg-sage-100"
        onTouchStart={handleTouchStart}
      >
        <img
          key={activeImage.url}
          src={activeImage.url}
          alt={activeImage.alt}
          className="w-full h-full object-cover animate-fade-in"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-sage-600 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-earth-400 text-center pb-2">
        {activeImage.credit}
      </p>
    </div>
  );
}
