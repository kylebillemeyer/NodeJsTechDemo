import { useState } from "react";

interface PlantSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function PlantSection({
  title,
  children,
  defaultOpen = false,
}: PlantSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-sage-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-sage-50/50 transition-colors"
      >
        <h3 className="font-serif text-lg text-earth-700">{title}</h3>
        <svg
          className={`w-5 h-5 text-earth-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}
