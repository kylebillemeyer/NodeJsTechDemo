interface GrowingConditionsProps {
  conditions: {
    sunlight: string;
    water: string;
    soil: string;
    hardiness: string;
  };
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function SoilIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22h20" />
      <path d="M7 18v-2a5 5 0 0 1 10 0v2" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ZoneIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14,2 14,8 20,8" />
      <path d="M12 18v-6" />
      <path d="M8 18v-1" />
      <path d="M16 18v-3" />
    </svg>
  );
}

export default function GrowingConditions({ conditions }: GrowingConditionsProps) {
  const items = [
    { icon: <SunIcon />, label: "Sun", value: conditions.sunlight },
    { icon: <WaterIcon />, label: "Water", value: conditions.water },
    { icon: <SoilIcon />, label: "Soil", value: conditions.soil },
    { icon: <ZoneIcon />, label: "Zones", value: conditions.hardiness },
  ];

  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-2.5 p-3 bg-sage-50 rounded-xl"
          >
            <div className="text-sage-600 mt-0.5 shrink-0">{item.icon}</div>
            <div>
              <p className="text-xs font-medium text-earth-500 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-sm text-earth-700 leading-snug">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
