interface HeaderProps {
  dateString: string;
}

export default function Header({ dateString }: HeaderProps) {
  return (
    <header className="text-center pt-6 pb-4 px-4">
      <div className="flex items-center justify-center gap-2 mb-1">
        <svg
          className="w-6 h-6 text-sage-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.8" />
          <path d="M17 8c2.2 0 4-1.8 4-4 0 2.2-1.8 4-4 4zm0 0c0 2.2 1.8 4 4 4-2.2 0-4-1.8-4-4zm0 0V2" />
          <path d="M12 22V12" />
          <path d="M8 16l4-4 4 4" />
        </svg>
        <h1 className="font-serif text-2xl text-earth-800 tracking-tight">
          Garden Plant a Day
        </h1>
      </div>
      <p className="text-sm text-earth-500">{dateString}</p>
    </header>
  );
}
