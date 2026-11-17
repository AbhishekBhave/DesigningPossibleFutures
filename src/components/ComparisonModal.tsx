import { useEffect, useState } from 'react';
import { ArrowUpRight, Bookmark, X } from 'lucide-react';
import type {
  CareerTrack,
  ComparisonDimension,
  TimelineMilestone,
} from '../types/timeline';
import { EditorialImage } from './EditorialImage';

interface ComparisonModalProps {
  isOpen: boolean;
  tracks: CareerTrack[];
  dimensions: ComparisonDimension[];
  milestones: TimelineMilestone[];
  bookmarkedIds: string[];
  notesById: Record<string, string>;
  onClose: () => void;
  onJumpToMilestone: (milestoneId: string) => void;
}

export function ComparisonModal({
  isOpen,
  tracks,
  dimensions,
  milestones,
  bookmarkedIds,
  notesById,
  onClose,
  onJumpToMilestone,
}: ComparisonModalProps) {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'craft' | 'impact'>('all');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDimensions =
    categoryFilter === 'all'
      ? dimensions
      : dimensions.filter((d) => d.category === categoryFilter);

  const annotatedMilestones = milestones.filter(
    (m) => bookmarkedIds.includes(m.id) || Boolean(notesById[m.id]?.trim()),
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 lg:p-10"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-[1px]"
      />

      <div className="relative z-10 flex h-full w-full max-w-6xl flex-col border border-[#E2DDD3] bg-[#FBF9F5] shadow-2xl sm:max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2DDD3] bg-[#F3EFE7]/80 px-6 py-4 lg:px-8">
          <div>
            <p className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
              Gallery Walk Snapshot
            </p>
            <h2
              id="comparison-modal-title"
              className="font-editorial text-2xl font-semibold text-[#1C1917] sm:text-3xl"
            >
              Three Futures Side by Side
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div
              role="group"
              aria-label="Filter comparison questions"
              className="flex items-center gap-1 bg-[#E8E2D5]/70 p-1"
            >
              {[
                { id: 'all', label: 'All' },
                { id: 'craft', label: 'Day-to-Day' },
                { id: 'impact', label: 'Long-Term' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setCategoryFilter(tab.id as 'all' | 'craft' | 'impact')
                  }
                  className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                    categoryFilter === tab.id
                      ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close comparison view"
              className="flex h-9 w-9 items-center justify-center border border-[#D6CEBE] bg-[#FBF9F5] text-[#1C1917] hover:bg-[#FFFFFF]"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
          {/* 3-Path Overview Header Cards */}
          <div className="grid grid-cols-1 gap-6 border-b border-[#E2DDD3] pb-7 lg:grid-cols-3">
            {tracks.map((track) => (
              <div key={track.id} className="flex flex-col">
                <EditorialImage
                  src={track.plateImage}
                  alt={track.title}
                  aspectClassName="aspect-[16/10]"
                />
                <div className="mt-3 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 shrink-0"
                    style={{ backgroundColor: track.accentHex }}
                  />
                  <span className="font-coord text-[11px] uppercase tracking-wider text-[#57534E]">
                    {track.romanIndex}
                  </span>
                </div>
                <h3 className="mt-1 font-editorial text-xl font-semibold text-[#1C1917]">
                  {track.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#57534E]">
                  {track.archetypeSummary}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-[#E2DDD3]">
            {filteredDimensions.map((dim) => (
              <div key={dim.id} className="py-6">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-editorial text-xl font-semibold text-[#1C1917]">
                    {dim.label}
                  </h4>
                  <p className="text-xs text-[#78716C]">{dim.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                  {tracks.map((track) => {
                    const entry = dim.entries[track.id];
                    return (
                      <div
                        key={track.id}
                        className="border border-[#E2DDD3] bg-[#FFFFFF] p-4"
                      >
                        <div className="flex items-center gap-2 text-[11px] text-[#78716C]">
                          <span
                            aria-hidden="true"
                            className="inline-block h-1.5 w-1.5 shrink-0"
                            style={{ backgroundColor: track.accentHex }}
                          />
                          <span className="font-coord">{track.shortTitle}</span>
                        </div>
                        <p className="mt-1.5 text-sm font-semibold text-[#1C1917]">
                          {entry.headline}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#57534E]">
                          {entry.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Starred Moments & Gallery Walk Notes */}
          <div className="mt-6 border-t border-[#E2DDD3] pt-7">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                Starred Moments &amp; Gallery Notes
              </h3>
              <span className="font-coord text-xs text-[#78716C]">
                {annotatedMilestones.length} saved
              </span>
            </div>

            {annotatedMilestones.length === 0 ? (
              <p className="mt-3 border border-[#E2DDD3] bg-[#F3EFE7]/60 p-5 text-sm text-[#57534E]">
                Click any moment along the timeline to star favorite scenarios or
                leave a quick note during the gallery walk.
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {annotatedMilestones.map((m) => {
                  const track = tracks.find((t) => t.id === m.trackId);
                  const note = notesById[m.id]?.trim();
                  return (
                    <div
                      key={m.id}
                      className="flex flex-col justify-between border border-[#E2DDD3] bg-[#FFFFFF] p-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-[11px] text-[#57534E]">
                          <span className="font-coord">
                            {track?.shortTitle} · {m.yearLabel}
                          </span>
                          {bookmarkedIds.includes(m.id) && (
                            <Bookmark
                              className="h-3.5 w-3.5 text-[#1C1917]"
                              fill="currentColor"
                              strokeWidth={1.75}
                            />
                          )}
                        </div>
                        <h4 className="mt-1.5 font-editorial text-lg font-semibold text-[#1C1917]">
                          {m.roleTitle}
                        </h4>
                        {note && (
                          <p className="mt-2 border-t border-[#E2DDD3]/70 pt-2 text-xs italic leading-relaxed text-[#57534E]">
                            &ldquo;{note}&rdquo;
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => onJumpToMilestone(m.id)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#1C1917] underline underline-offset-4"
                      >
                        <span>Open Scenario</span>
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
