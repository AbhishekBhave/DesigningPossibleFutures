export type TrackId = 'consulting-pm' | 'edtech-founder' | 'ethics-professor';

export type EraId = 'origin' | 'immersion' | 'inflection' | 'stewardship' | 'legacy';

export interface EraDefinition {
  id: EraId;
  index: number;
  code: string;
  label: string;
  timeframe: string;
  summary: string;
}

export interface CareerTrack {
  id: TrackId;
  romanIndex: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  accentHex: string;
  accentSoftBg: string;
  accentBorder: string;
  plateImage: string;
  plateCaption: string;
  archetypeSummary: string;
}

export interface TimelineMilestone {
  id: string;
  trackId: TrackId;
  eraId: EraId;
  eraIndex: number;
  yearLabel: string;
  stageCategory: string;
  roleTitle: string;
  setting: string;
  scenarioHook: string;
  sceneStory: string;
  tuesdaySnapshot: string;
  skillsUsed: string[];
  hardCall: string;
  milestoneArtifact: string;
}

export interface ComparisonDimension {
  id: string;
  category: 'craft' | 'impact';
  label: string;
  description: string;
  entries: Record<TrackId, { headline: string; detail: string }>;
}
