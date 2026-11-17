import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, X } from 'lucide-react';
import type { CareerTrack, TimelineMilestone } from '../types/timeline';

interface MilestoneDrawerProps {
  milestone: TimelineMilestone | null;
  track: CareerTrack | null;
  allTracks: CareerTrack[];
  allMilestones: TimelineMilestone[];
  isBookmarked: boolean;
  noteValue: string;
  onClose: () => void;
  onSelectMilestone: (milestoneId: string) => void;
  onToggleBookmark: (milestoneId: string) => void;
  onNoteChange: (milestoneId: string, note: string) => void;
}

export function MilestoneDrawer({
  milestone,
  track,
  allTracks,
  allMilestones,
  isBookmarked,
  noteValue,
  onClose,
  onSelectMilestone,
  onToggleBookmark,
  onNoteChange,
}: MilestoneDrawerProps) {
  useEffect(() => {
    if (!milestone) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [milestone, onClose]);

  if (!milestone || !track) return null;

  const trackMilestones = allMilestones
    .filter((m) => m.trackId === milestone.trackId)
    .sort((a, b) => a.eraIndex - b.eraIndex);

  const currentIdx = trackMilestones.findIndex((m) => m.id === milestone.id);
  const prevMilestone = currentIdx > 0 ? trackMilestones[currentIdx - 1] : null;
  const nextMilestone =
    currentIdx >= 0 && currentIdx < trackMilestones.length - 1
      ? trackMilestones[currentIdx + 1]
      : null;

  const siblingMilestones = allMilestones.filter(
    (m) => m.eraId === milestone.eraId && m.trackId !== milestone.trackId,
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="milestone-dossier-title"
      className="fixed inset-0 z-40 flex justify-end"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[#1C1917]/30 backdrop-blur-[1px] transition-opacity"
      />

      {/* Slide-over Scenario Spotlight */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-[#E2DDD3] bg-[#FBF9F5] shadow-xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E2DDD3] bg-[#F3EFE7]/70 px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: track.accentHex }}
            />
            <span className="font-coord text-xs text-[#57534E] truncate">
              {track.romanIndex} · {track.shortTitle}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmark(milestone.id)}
              className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                isBookmarked
                  ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                  : 'border-[#D6CEBE] bg-[#FBF9F5] text-[#1C1917] hover:bg-[#FFFFFF]'
              }`}
            >
              <Bookmark
                className="h-3.5 w-3.5"
                fill={isBookmarked ? 'currentColor' : 'none'}
                strokeWidth={1.75}
              />
              <span>{isBookmarked ? 'Favorite' : 'Star Moment'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close scenario spotlight"
              className="flex h-8 w-8 items-center justify-center border border-[#D6CEBE] bg-[#FBF9F5] text-[#1C1917] transition-colors hover:bg-[#FFFFFF]"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-7 lg:px-8">
          {/* Metadata & Headline */}
          <div className="flex items-center gap-2 text-xs text-[#57534E]">
            <span className="font-coord font-medium text-[#1C1917]">
              {milestone.yearLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>{milestone.setting}</span>
          </div>

          <h2
            id="milestone-dossier-title"
            className="mt-2.5 font-editorial text-3xl font-semibold leading-tight text-[#1C1917] sm:text-4xl [text-wrap:balance]"
          >
            {milestone.roleTitle}
          </h2>

          {/* The Concrete Scenario */}
          <div className="mt-6 border-t border-[#E2DDD3] pt-5">
            <p className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
              A Real Moment in This Year
            </p>
            <p className="mt-2.5 max-w-prose text-[15.5px] leading-[1.75] text-[#1C1917]">
              {milestone.sceneStory}
            </p>
          </div>

          {/* The Hard Call */}
          <div className="mt-6 border border-[#E2DDD3] bg-[#F3EFE7] p-5">
            <h3 className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
              The Hard Call
            </h3>
            <p className="mt-2 font-editorial text-lg italic leading-relaxed text-[#1C1917]">
              {milestone.hardCall}
            </p>
          </div>

          {/* Tuesday Snapshot + Skills & Output */}
          <div className="mt-6 space-y-5 border-t border-[#E2DDD3] pt-5">
            <div>
              <h3 className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
                A Normal Tuesday
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#57534E]">
                {milestone.tuesdaySnapshot}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
                  What It Takes
                </h3>
                <p className="mt-1.5 text-sm text-[#1C1917]">
                  {milestone.skillsUsed.join(' · ')}
                </p>
              </div>
              <div>
                <h3 className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
                  What I’d Walk Away With
                </h3>
                <p className="mt-1.5 text-sm text-[#1C1917]">
                  {milestone.milestoneArtifact}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Walk Note */}
          <div className="mt-6 border-t border-[#E2DDD3] pt-5">
            <label
              htmlFor="milestone-reflection-note"
              className="block font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]"
            >
              Gallery Walk Note
            </label>
            <textarea
              id="milestone-reflection-note"
              rows={2}
              value={noteValue}
              onChange={(e) => onNoteChange(milestone.id, e.target.value)}
              placeholder="Leave a quick reaction or question about this scenario..."
              className="mt-2 w-full border border-[#D6CEBE] bg-[#FFFFFF] p-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1C1917] focus:outline-none"
            />
          </div>

          {/* Same Year, Other Two Futures */}
          <div className="mt-6 border-t border-[#E2DDD3] pt-5">
            <h3 className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
              Meanwhile at {milestone.yearLabel} in the Other Futures
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {siblingMilestones.map((sibling) => {
                const siblingTrack = allTracks.find(
                  (t) => t.id === sibling.trackId,
                );
                if (!siblingTrack) return null;
                return (
                  <button
                    key={sibling.id}
                    type="button"
                    onClick={() => onSelectMilestone(sibling.id)}
                    className="flex flex-col border border-[#E2DDD3] bg-[#FFFFFF] p-3.5 text-left transition-colors hover:border-[#1C1917]"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-[#57534E]">
                      <span
                        aria-hidden="true"
                        className="inline-block h-2 w-2 shrink-0"
                        style={{ backgroundColor: siblingTrack.accentHex }}
                      />
                      <span className="font-coord">
                        {siblingTrack.shortTitle}
                      </span>
                    </div>
                    <p className="mt-1 font-editorial text-lg font-semibold leading-snug text-[#1C1917]">
                      {sibling.roleTitle}
                    </p>
                    <p className="mt-1 text-xs text-[#57534E] line-clamp-2">
                      {sibling.scenarioHook}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chronological Stepper Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-[#E2DDD3] bg-[#F3EFE7]/80 px-6 py-3.5 lg:px-8">
          <button
            type="button"
            disabled={!prevMilestone}
            onClick={() => prevMilestone && onSelectMilestone(prevMilestone.id)}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#1C1917] transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>{prevMilestone ? prevMilestone.yearLabel : 'Start'}</span>
          </button>

          <button
            type="button"
            disabled={!nextMilestone}
            onClick={() => nextMilestone && onSelectMilestone(nextMilestone.id)}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#1C1917] transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span>{nextMilestone ? nextMilestone.yearLabel : 'End of Path'}</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        </div>
      </aside>
    </div>
  );
}
