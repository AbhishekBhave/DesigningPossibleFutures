import { ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import type { CareerTrack, TrackId } from '../types/timeline';

interface WorkspaceToolbarProps {
  tracks: CareerTrack[];
  activeFilter: TrackId | 'all';
  onFilterChange: (filter: TrackId | 'all') => void;
  bookmarkedCount: number;
  onOpenComparison: () => void;
  onStepHorizontal: (direction: 'prev' | 'next') => void;
}

export function WorkspaceToolbar({
  tracks,
  activeFilter,
  onFilterChange,
  bookmarkedCount,
  onOpenComparison,
  onStepHorizontal,
}: WorkspaceToolbarProps) {
  return (
    <div className="z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#E2DDD3] bg-[#F3EFE7]/80 px-6 py-2.5 lg:px-10">
      {/* Track isolation segmented control */}
      <div
        role="group"
        aria-label="Filter career paths"
        className="flex items-center gap-1 overflow-x-auto bg-[#E8E2D5]/70 p-1"
      >
        <button
          type="button"
          onClick={() => onFilterChange('all')}
          className={`px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1C1917] ${
            activeFilter === 'all'
              ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
              : 'text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          All Three Paths
        </button>
        {tracks.map((track) => {
          const isSelected = activeFilter === track.id;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => onFilterChange(track.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1C1917] ${
                isSelected
                  ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 shrink-0"
                style={{ backgroundColor: track.accentHex }}
              />
              <span>
                {track.romanIndex} · {track.shortTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right utility group: saved indicator + lateral step controls */}
      <div className="flex items-center gap-4 shrink-0">
        {bookmarkedCount > 0 && (
          <button
            type="button"
            onClick={onOpenComparison}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E] hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0"
          >
            <Bookmark className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="font-coord">{bookmarkedCount}</span>
            <span>Saved</span>
          </button>
        )}

        <div className="flex items-center gap-1.5">
          <span className="hidden xl:inline text-xs text-[#78716C] mr-2 whitespace-nowrap">
            Scroll or drag horizontally
          </span>
          <button
            type="button"
            onClick={() => onStepHorizontal('prev')}
            aria-label="Scroll timeline earlier"
            className="flex h-8 w-8 items-center justify-center border border-[#D6CEBE] bg-[#FBF9F5] text-[#1C1917] hover:bg-[#FFFFFF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1C1917]"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => onStepHorizontal('next')}
            aria-label="Scroll timeline forward"
            className="flex h-8 w-8 items-center justify-center border border-[#D6CEBE] bg-[#FBF9F5] text-[#1C1917] hover:bg-[#FFFFFF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1C1917]"
          >
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
