import type { PurchaseLink } from "../types/plant";

interface PurchaseLinksProps {
  links: PurchaseLink[];
  plantName: string;
}

export default function PurchaseLinks({ links, plantName }: PurchaseLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="border-t border-sage-100 px-4 py-5">
      <h3 className="font-serif text-lg text-earth-700 mb-1">
        Get This Plant
      </h3>
      <p className="text-sm text-earth-400 mb-3">
        Support an independent grower
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-sage-600 text-white text-sm font-medium rounded-full hover:bg-sage-700 transition-colors shadow-sm"
            aria-label={`${link.label} for ${plantName}`}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
