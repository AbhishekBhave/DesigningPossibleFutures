import { useRef, useState } from 'react';
import { ArrowRight, Bookmark, Compass } from 'lucide-react';
import { ORIGIN_PROLOGUE } from '../data/careerTimelineData';
import type {
  CareerTrack,
  EraDefinition,
  EraId,
  TimelineMilestone,
  TrackId,
} from '../types/timeline';
import { EditorialImage } from './EditorialImage';

interface HorizontalTimelineProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  tracks: CareerTrack[];
  eras: EraDefinition[];
  milestones: TimelineMilestone[];
  activeFilter: TrackId | 'all';
  selectedMilestoneId: string | null;
  bookmarkedIds: string[];
  notesById: Record<string, string>;
  scrollProgress: number;
  onSelectMilestone: (milestoneId: string) => void;
  onNavigateEra: (eraId: EraId) => void;
  onOpenComparison: () => void;
  onScrollUpdate: () => void;
}

export function HorizontalTimeline({
  scrollContainerRef,
  tracks,
  eras,
  milestones,
  activeFilter,
  selectedMilestoneId,
  bookmarkedIds,
  notesById,
  scrollProgress,
  onSelectMilestone,
  onNavigateEra,
  onOpenComparison,
  onScrollUpdate,
}: HorizontalTimelineProps) {
  const dragStateRef = useRef<{
    isDown: boolean;
    startX: number;
    scrollLeft: number;
    hasMoved: boolean;
  }>({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const [isDragging, setIsDragging] = useState(false);

  const visibleTracks =
    activeFilter === 'all'
      ? tracks
      : tracks.filter((t) => t.id === activeFilter);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (
      Math.abs(e.deltaY) > Math.abs(e.deltaX) &&
      container.scrollWidth > container.clientWidth
    ) {
      e.preventDefault();
      container.scrollLeft += e.deltaY * 1.15;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, textarea')) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    dragStateRef.current = {
      isDown: true,
      startX: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
      hasMoved: false,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isDown) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = x - dragStateRef.current.startX;
    if (Math.abs(walk) > 5) {
      dragStateRef.current.hasMoved = true;
    }
    container.scrollLeft = dragStateRef.current.scrollLeft - walk;
  };

  const stopDragging = () => {
    dragStateRef.current.isDown = false;
    setIsDragging(false);
  };

  const branchReveal = Math.min(1, Math.max(0.28, scrollProgress * 4 + 0.28));

  return (
    <div
      ref={scrollContainerRef}
      onWheel={handleWheel}
      onScroll={onScrollUpdate}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      className={`timeline-scroll-container archival-grid-bg relative flex-1 min-h-0 w-full overflow-x-auto overflow-y-auto select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div className="inline-flex min-h-full items-stretch px-6 py-6 lg:px-12 lg:py-8">
        {/* ==================== SECTION 1: YEAR 0 PROLOGUE ==================== */}
        <section
          data-era-anchor="origin"
          aria-label="Starting Point Prologue"
          className="flex w-[88vw] max-w-[960px] shrink-0 flex-col justify-center pr-8 lg:pr-14"
        >
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Editorial Column */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="font-coord text-[11px] uppercase tracking-[0.16em] text-[#78716C]">
                  {ORIGIN_PROLOGUE.kicker}
                </p>

                <h1 className="mt-3 font-editorial text-4xl font-medium leading-[1.06] tracking-tight text-[#1C1917] sm:text-5xl [text-wrap:balance]">
                  {ORIGIN_PROLOGUE.title}
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[#57534E] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-editorial first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-[#1C1917]">
                  {ORIGIN_PROLOGUE.leadParagraph}
                </p>
              </div>

              {/* Starting Sparks */}
              <div className="mt-7 border-t border-[#E2DDD3] pt-5">
                <p className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
                  What Pulls Me Toward All Three
                </p>
                <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                  {ORIGIN_PROLOGUE.sharedFoundations.map((item, idx) => (
                    <div
                      key={item}
                      className="flex items-baseline gap-2.5 border-b border-[#E2DDD3]/70 pb-2 text-sm text-[#1C1917]"
                    >
                      <span className="font-coord text-[11px] text-[#78716C]">
                        0{idx + 1}.
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => onNavigateEra('immersion')}
                    className="inline-flex items-center gap-2.5 bg-[#1C1917] px-5 py-2.5 text-xs font-medium tracking-wide text-[#FBF9F5] transition-colors duration-150 hover:bg-[#332E2A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1917]"
                  >
                    <span>Walk the Timeline</span>
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenComparison}
                    className="text-xs font-medium text-[#57534E] underline underline-offset-4 transition-colors hover:text-[#1C1917]"
                  >
                    Quick 3-Path Snapshot
                  </button>
                </div>
              </div>
            </div>

            {/* Right Plate Column */}
            <div className="flex flex-col justify-center lg:col-span-5">
              <EditorialImage
                src={ORIGIN_PROLOGUE.plateImage}
                alt="Walnut drafting desk with brass dividers and notebooks"
                caption={ORIGIN_PROLOGUE.plateCaption}
                className="h-full justify-center"
                aspectClassName="aspect-[4/3] lg:h-full lg:max-h-[420px]"
              />
            </div>
          </div>
        </section>

        {/* ==================== SECTION 2: SVG BRANCHING JUNCTION ==================== */}
        <div
          aria-hidden="true"
          className="relative flex w-[150px] sm:w-[200px] shrink-0 items-center justify-center"
        >
          <svg
            viewBox="0 0 210 600"
            preserveAspectRatio="none"
            className="h-[560px] w-full overflow-visible"
          >
            <line
              x1="0"
              y1="300"
              x2="42"
              y2="300"
              stroke="#C9C1B2"
              strokeWidth="1.5"
            />
            <circle cx="42" cy="300" r="4.5" fill="#1C1917" />

            <path
              d={
                activeFilter === tracks[0].id
                  ? 'M 42 300 C 100 300, 140 300, 210 300'
                  : 'M 42 300 C 115 300, 115 100, 210 100'
              }
              fill="none"
              stroke={tracks[0].accentHex}
              strokeWidth={activeFilter === 'all' || activeFilter === tracks[0].id ? 2 : 1}
              strokeOpacity={activeFilter === 'all' || activeFilter === tracks[0].id ? 0.9 : 0.14}
              strokeDasharray="340"
              strokeDashoffset={340 * (1 - branchReveal)}
              style={{ transition: 'stroke-opacity 200ms ease, stroke-dashoffset 120ms linear' }}
            />

            <path
              d="M 42 300 C 100 300, 140 300, 210 300"
              fill="none"
              stroke={tracks[1].accentHex}
              strokeWidth={activeFilter === 'all' || activeFilter === tracks[1].id ? 2 : 1}
              strokeOpacity={activeFilter === 'all' || activeFilter === tracks[1].id ? 0.9 : 0.14}
              strokeDasharray="200"
              strokeDashoffset={200 * (1 - branchReveal)}
              style={{ transition: 'stroke-opacity 200ms ease, stroke-dashoffset 120ms linear' }}
            />

            <path
              d={
                activeFilter === tracks[2].id
                  ? 'M 42 300 C 100 300, 140 300, 210 300'
                  : 'M 42 300 C 115 300, 115 500, 210 500'
              }
              fill="none"
              stroke={tracks[2].accentHex}
              strokeWidth={activeFilter === 'all' || activeFilter === tracks[2].id ? 2 : 1}
              strokeOpacity={activeFilter === 'all' || activeFilter === tracks[2].id ? 0.9 : 0.14}
              strokeDasharray="340"
              strokeDashoffset={340 * (1 - branchReveal)}
              style={{ transition: 'stroke-opacity 200ms ease, stroke-dashoffset 120ms linear' }}
            />
          </svg>
        </div>

        {/* ==================== SECTION 3: TRACK EXHIBITION PLATES ==================== */}
        <div className="flex w-[300px] sm:w-[330px] shrink-0 flex-col border-r border-[#E2DDD3] pr-7">
          <div className="flex h-[54px] shrink-0 items-end border-b border-[#E2DDD3] pb-2.5">
            <span className="font-coord text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
              Three Potential Futures
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-around gap-4 py-4">
            {visibleTracks.map((track) => (
              <div
                key={track.id}
                className="flex flex-1 items-center gap-4 border-b border-[#E2DDD3]/60 py-2 last:border-b-0"
              >
                <div className="w-24 shrink-0 overflow-hidden border border-[#E2DDD3] bg-[#F3EFE7]">
                  <img
                    src={track.plateImage}
                    alt={track.title}
                    referrerPolicy="no-referrer"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block h-2 w-2 shrink-0"
                      style={{ backgroundColor: track.accentHex }}
                    />
                    <span className="font-coord text-[11px] uppercase tracking-wider text-[#57534E]">
                      {track.romanIndex}
                    </span>
                  </div>
                  <h2 className="mt-1 font-editorial text-xl font-semibold leading-tight text-[#1C1917]">
                    {track.title}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#57534E] line-clamp-2">
                    {track.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== SECTION 4: SYNCHRONIZED 5-ERA COLUMNS ==================== */}
        {eras.map((era) => (
          <section
            key={era.id}
            data-era-anchor={era.id}
            aria-label={`${era.label} (${era.timeframe})`}
            className={`flex shrink-0 flex-col border-r border-[#E2DDD3] px-6 ${
              activeFilter === 'all'
                ? 'w-[330px] sm:w-[375px]'
                : 'w-[370px] sm:w-[440px]'
            }`}
          >
            {/* Synchronized Era Coordinate Header */}
            <div className="flex h-[54px] shrink-0 items-end justify-between gap-4 border-b border-[#E2DDD3] pb-2.5">
              <div className="flex items-baseline gap-2.5 min-w-0">
                <span className="font-coord text-xs font-medium text-[#1C1917]">
                  {era.code}
                </span>
                <span className="text-[#C9C1B2]" aria-hidden="true">
                  /
                </span>
                <h3 className="font-editorial text-xl font-semibold text-[#1C1917] truncate">
                  {era.label}
                </h3>
              </div>
              <span className="font-coord text-[11px] text-[#78716C] whitespace-nowrap shrink-0">
                {era.timeframe}
              </span>
            </div>

            {/* Parallel Swimlanes for this Era */}
            <div className="flex flex-1 flex-col justify-around gap-4 py-4">
              {visibleTracks.map((track) => {
                const milestone = milestones.find(
                  (m) => m.trackId === track.id && m.eraId === era.id,
                );
                if (!milestone) return null;

                const isSelected = selectedMilestoneId === milestone.id;
                const isBookmarked = bookmarkedIds.includes(milestone.id);
                const hasNote = Boolean(notesById[milestone.id]?.trim());

                return (
                  <div
                    key={milestone.id}
                    className="relative flex flex-1 items-center py-1"
                  >
                    {/* Continuous horizontal hairline spine behind the card */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-[-24px] top-1/2 h-[1px] -translate-y-1/2"
                      style={{
                        backgroundColor: track.accentHex,
                        opacity: 0.22,
                      }}
                    />

                    {/* Interactive Scenario Card */}
                    <button
                      type="button"
                      onClick={() => {
                        if (dragStateRef.current.hasMoved) return;
                        onSelectMilestone(milestone.id);
                      }}
                      className={`group relative z-10 flex w-full flex-col justify-between border bg-[#FFFFFF] p-4 text-left transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1917] ${
                        isSelected
                          ? 'border-[#1C1917] shadow-sm'
                          : 'border-[#E2DDD3] hover:-translate-y-0.5 hover:border-[#A89F91] hover:shadow-xs'
                      } ${activeFilter !== 'all' ? 'p-6' : ''}`}
                    >
                      <div>
                        {/* Unboxed metadata row */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-[11px] text-[#57534E] min-w-0">
                            <span
                              aria-hidden="true"
                              className="inline-block h-2 w-2 shrink-0"
                              style={{ backgroundColor: track.accentHex }}
                            />
                            <span className="font-coord whitespace-nowrap">
                              {milestone.yearLabel}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{track.shortTitle}</span>
                          </div>

                          {(isBookmarked || hasNote) && (
                            <span className="inline-flex items-center gap-1 font-coord text-[10px] text-[#57534E] shrink-0">
                              <Bookmark
                                className="h-3 w-3"
                                fill={isBookmarked ? 'currentColor' : 'none'}
                                strokeWidth={1.75}
                              />
                              <span>{isBookmarked ? 'Saved' : 'Note'}</span>
                            </span>
                          )}
                        </div>

                        {/* Role Title */}
                        <h4
                          className={`mt-2 font-editorial font-semibold leading-snug text-[#1C1917] ${
                            activeFilter !== 'all' ? 'text-2xl' : 'text-[20px]'
                          }`}
                        >
                          {milestone.roleTitle}
                        </h4>

                        {/* Vivid Gallery-Walk Scenario Hook */}
                        <p
                          className={`mt-2 leading-relaxed text-[#57534E] ${
                            activeFilter !== 'all'
                              ? 'text-sm'
                              : 'line-clamp-3 text-[13px]'
                          }`}
                        >
                          {milestone.scenarioHook}
                        </p>

                        {/* Extra context when soloing a single path */}
                        {activeFilter !== 'all' && (
                          <div className="mt-4 border-t border-[#E2DDD3] pt-3 space-y-2.5">
                            <p className="text-xs leading-relaxed text-[#1C1917]">
                              {milestone.sceneStory}
                            </p>
                            <p className="font-editorial text-sm italic text-[#57534E]">
                              Hard call: {milestone.hardCall}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Subtle interactive prompt */}
                      <div className="mt-3 flex items-center justify-between border-t border-[#E2DDD3]/70 pt-2 text-[11px] font-medium text-[#57534E] transition-colors group-hover:text-[#1C1917]">
                        <span>See the Scenario</span>
                        <ArrowRight
                          className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5"
                          strokeWidth={1.75}
                        />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* ==================== SECTION 5: SYNTHESIS EPILOGUE ==================== */}
        <section
          aria-label="Gallery Walk Wrap-Up"
          className="flex w-[340px] sm:w-[420px] shrink-0 flex-col justify-center pl-10 pr-8"
        >
          <div className="border border-[#E2DDD3] bg-[#F3EFE7] p-8">
            <div className="flex items-center gap-2 text-xs text-[#57534E]">
              <Compass className="h-4 w-4 text-[#1C1917]" strokeWidth={1.5} />
              <span className="font-coord uppercase tracking-widest text-[11px]">
                Gallery Walk Wrap-Up
              </span>
            </div>

            <h3 className="mt-4 font-editorial text-3xl font-medium leading-tight text-[#1C1917] [text-wrap:balance]">
              Which Future Fits Best?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#57534E]">
              See all three futures side by side in plain terms—what a random
              Tuesday feels like, the biggest rush, and the hardest trade-off
              for each one.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenComparison}
                className="bg-[#1C1917] px-4 py-2.5 text-xs font-medium tracking-wide text-[#FBF9F5] transition-colors hover:bg-[#332E2A]"
              >
                Compare All 3 Futures
              </button>
              <button
                type="button"
                onClick={() => onNavigateEra('origin')}
                className="text-xs font-medium text-[#57534E] underline underline-offset-4 hover:text-[#1C1917]"
              >
                Back to Today
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
