interface DayNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  isToday: boolean;
}

export default function DayNavigation({
  onPrevious,
  onNext,
  onToday,
  isToday,
}: DayNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-2 px-4">
      <button
        onClick={onPrevious}
        className="p-2 rounded-full hover:bg-sage-100 transition-colors text-earth-500"
        aria-label="Previous day"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>

      {!isToday && (
        <button
          onClick={onToday}
          className="text-xs font-medium text-sage-600 hover:text-sage-700 px-3 py-1 rounded-full border border-sage-200 hover:border-sage-300 transition-colors"
        >
          Today
        </button>
      )}

      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-sage-100 transition-colors text-earth-500"
        aria-label="Next day"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </button>
    </div>
  );
}
