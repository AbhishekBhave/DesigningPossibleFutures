import type { EraDefinition, EraId } from '../types/timeline';

interface ChronologyRailProps {
  eras: EraDefinition[];
  activeEraId: EraId;
  scrollProgress: number;
  onSelectEra: (eraId: EraId) => void;
}

export function ChronologyRail({
  eras,
  activeEraId,
  scrollProgress,
  onSelectEra,
}: ChronologyRailProps) {
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

  return (
    <footer className="z-20 border-t border-[#E2DDD3] bg-[#FBF9F5]/95 px-6 py-2.5 backdrop-blur-sm lg:px-10">
      <div className="mx-auto flex flex-col gap-2">
        {/* Continuous reading progress hairline */}
        <div
          aria-hidden="true"
          className="relative h-[2px] w-full bg-[#E2DDD3] overflow-hidden"
        >
          <div
            className="absolute inset-y-0 left-0 w-full origin-left bg-[#1C1917] transition-transform duration-100 ease-out"
            style={{ transform: `scaleX(${Math.max(0.03, clampedProgress)})` }}
          />
        </div>

        {/* Era milestone buttons */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-4 sm:gap-7">
            {eras.map((era) => {
              const isActive = era.id === activeEraId;
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => onSelectEra(era.id)}
                  className={`group flex items-baseline gap-2 py-0.5 text-left transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1917] ${
                    isActive
                      ? 'text-[#1C1917]'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  <span
                    className={`font-coord text-[11px] tracking-tight ${
                      isActive ? 'font-medium text-[#1C1917]' : 'text-[#78716C]'
                    }`}
                  >
                    {era.code}
                  </span>
                  <span className="text-xs font-medium">{era.label}</span>
                </button>
              );
            })}
          </div>

          <span className="hidden lg:inline font-coord text-[11px] text-[#78716C] whitespace-nowrap shrink-0">
            {Math.round(clampedProgress * 100)}% Explored
          </span>
        </div>
      </div>
    </footer>
  );
}
