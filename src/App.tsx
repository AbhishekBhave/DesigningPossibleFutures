import { useCallback, useEffect, useRef, useState } from 'react';
import { ChronologyRail } from './components/ChronologyRail';
import { ComparisonModal } from './components/ComparisonModal';
import { EditorialHeader } from './components/EditorialHeader';
import { HorizontalTimeline } from './components/HorizontalTimeline';
import { MilestoneDrawer } from './components/MilestoneDrawer';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import {
  CAREER_TRACKS,
  COMPARISON_DIMENSIONS,
  TIMELINE_ERAS,
  TIMELINE_MILESTONES,
} from './data/careerTimelineData';
import type { EraId, TrackId } from './types/timeline';

const BOOKMARKS_STORAGE_KEY = 'three-horizons-bookmarks-v1';
const NOTES_STORAGE_KEY = 'three-horizons-notes-v1';

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [activeFilter, setActiveFilter] = useState<TrackId | 'all'>('all');
  const [activeEraId, setActiveEraId] = useState<EraId>('origin');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(
    null,
  );
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [notesById, setNotesById] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(NOTES_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesById));
    } catch {
      // Ignore storage quota errors
    }
  }, [notesById]);

  const handleScrollUpdate = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
    setScrollProgress(progress);

    // Determine which era anchor is most prominent in the viewport
    const containerRect = container.getBoundingClientRect();
    const focalX = containerRect.left + containerRect.width * 0.36;
    const eraNodes = container.querySelectorAll<HTMLElement>('[data-era-anchor]');

    let closestEra: EraId = 'origin';
    let minDistance = Number.POSITIVE_INFINITY;

    eraNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.4;
      const dist = Math.abs(centerX - focalX);
      if (dist < minDistance) {
        minDistance = dist;
        const anchor = node.dataset.eraAnchor as EraId | undefined;
        if (anchor) closestEra = anchor;
      }
    });

    setActiveEraId(closestEra);
  }, []);

  const handleNavigateEra = useCallback((eraId: EraId) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (eraId === 'origin') {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      setActiveEraId('origin');
      return;
    }

    // Prefer the timeline column anchor if multiple elements share data-era-anchor
    const targets = container.querySelectorAll<HTMLElement>(
      `[data-era-anchor="${eraId}"]`,
    );
    const target = targets[targets.length - 1];
    if (!target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const desiredOffset = Math.max(24, containerRect.width * 0.14);
    const nextScrollLeft =
      container.scrollLeft + (targetRect.left - containerRect.left) - desiredOffset;

    container.scrollTo({
      left: Math.max(0, nextScrollLeft),
      behavior: 'smooth',
    });
    setActiveEraId(eraId);
  }, []);

  const handleStepHorizontal = useCallback((direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const step = Math.min(460, container.clientWidth * 0.65);
    container.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  }, []);

  // Keyboard arrow navigation when no modal/drawer/input is focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMilestoneId || isComparisonOpen) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleStepHorizontal('next');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleStepHorizontal('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMilestoneId, isComparisonOpen, handleStepHorizontal]);

  const handleToggleBookmark = (milestoneId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(milestoneId)
        ? prev.filter((id) => id !== milestoneId)
        : [...prev, milestoneId],
    );
  };

  const handleNoteChange = (milestoneId: string, note: string) => {
    setNotesById((prev) => ({
      ...prev,
      [milestoneId]: note,
    }));
  };

  const selectedMilestone =
    TIMELINE_MILESTONES.find((m) => m.id === selectedMilestoneId) ?? null;
  const selectedTrack = selectedMilestone
    ? CAREER_TRACKS.find((t) => t.id === selectedMilestone.trackId) ?? null
    : null;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#FBF9F5] text-[#1C1917]">
      <EditorialHeader
        activeEraId={activeEraId}
        onNavigateEra={handleNavigateEra}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      <WorkspaceToolbar
        tracks={CAREER_TRACKS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        bookmarkedCount={bookmarkedIds.length}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onStepHorizontal={handleStepHorizontal}
      />

      <HorizontalTimeline
        scrollContainerRef={scrollContainerRef}
        tracks={CAREER_TRACKS}
        eras={TIMELINE_ERAS}
        milestones={TIMELINE_MILESTONES}
        activeFilter={activeFilter}
        selectedMilestoneId={selectedMilestoneId}
        bookmarkedIds={bookmarkedIds}
        notesById={notesById}
        scrollProgress={scrollProgress}
        onSelectMilestone={setSelectedMilestoneId}
        onNavigateEra={handleNavigateEra}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onScrollUpdate={handleScrollUpdate}
      />

      <ChronologyRail
        eras={TIMELINE_ERAS}
        activeEraId={activeEraId}
        scrollProgress={scrollProgress}
        onSelectEra={handleNavigateEra}
      />

      <MilestoneDrawer
        milestone={selectedMilestone}
        track={selectedTrack}
        allTracks={CAREER_TRACKS}
        allMilestones={TIMELINE_MILESTONES}
        isBookmarked={
          selectedMilestone ? bookmarkedIds.includes(selectedMilestone.id) : false
        }
        noteValue={selectedMilestone ? notesById[selectedMilestone.id] ?? '' : ''}
        onClose={() => setSelectedMilestoneId(null)}
        onSelectMilestone={setSelectedMilestoneId}
        onToggleBookmark={handleToggleBookmark}
        onNoteChange={handleNoteChange}
      />

      <ComparisonModal
        isOpen={isComparisonOpen}
        tracks={CAREER_TRACKS}
        dimensions={COMPARISON_DIMENSIONS}
        milestones={TIMELINE_MILESTONES}
        bookmarkedIds={bookmarkedIds}
        notesById={notesById}
        onClose={() => setIsComparisonOpen(false)}
        onJumpToMilestone={(milestoneId) => {
          const target = TIMELINE_MILESTONES.find((m) => m.id === milestoneId);
          setIsComparisonOpen(false);
          setSelectedMilestoneId(milestoneId);
          if (target) {
            handleNavigateEra(target.eraId);
          }
        }}
      />
    </div>
  );
}
