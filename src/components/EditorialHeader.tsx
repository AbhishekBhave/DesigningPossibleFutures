import type { EraId } from '../types/timeline';

interface EditorialHeaderProps {
  activeEraId: EraId;
  onNavigateEra: (eraId: EraId) => void;
  onOpenComparison: () => void;
}

const NAV_ERAS: { id: EraId; label: string }[] = [
  { id: 'origin', label: 'Today' },
  { id: 'immersion', label: 'Years 1–2' },
  { id: 'inflection', label: 'Years 3–5' },
  { id: 'legacy', label: 'Year 10+' },
];

export function EditorialHeader({
  activeEraId,
  onNavigateEra,
  onOpenComparison,
}: EditorialHeaderProps) {
  return (
    <header className="z-30 flex items-center justify-between gap-8 border-b border-[#E2DDD3] bg-[#FBF9F5]/95 px-6 py-3.5 backdrop-blur-sm lg:px-10">
      {/* Zone 1: Single-element Brand Wordmark */}
      <a
        href="#origin"
        onClick={(e) => {
          e.preventDefault();
          onNavigateEra('origin');
        }}
        className="font-editorial text-2xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1917]"
      >
        Three Horizons
      </a>

      {/* Zone 2: Concise single-line navigation links */}
      <nav
        aria-label="Timeline eras"
        className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
      >
        {NAV_ERAS.map((item) => {
          const isActive = activeEraId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigateEra(item.id)}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1917] ${
                isActive ? 'text-[#1C1917]' : 'text-[#57534E]'
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#1C1917] transition-transform duration-200 origin-left ${
                  isActive ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Single Primary Action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onOpenComparison}
          className="px-4 py-2 text-xs font-medium tracking-wide text-[#FBF9F5] bg-[#1C1917] hover:bg-[#332E2A] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1917]"
        >
          Compare Futures
        </button>
      </div>
    </header>
  );
}
