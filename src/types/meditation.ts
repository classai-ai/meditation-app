export type TimePeriod = "dawn" | "morning" | "day" | "evening" | "night";

export type Category =
  | "breathing"
  | "stress"
  | "sleep"
  | "mindfulness"
  | "short-break"
  | "music";

export interface MeditationContent {
  id: string;
  title: string;
  description: string;
  category: Category;
  duration: number;
  youtubeId: string;
  fallbackYoutubeId?: string;
  recommendedTimes: TimePeriod[];
}

export interface MeditationRecord {
  date: string;
  contentId: string;
  duration: number;
  completedAt: string;
}

export interface Preferences {
  defaultDuration: number;
  backgroundMotion: boolean;
  volume: number;
}

export interface TimePeriodConfig {
  id: TimePeriod;
  label: string;
  hours: [number, number][];
  greeting: string;
  backgroundImage: string;
  fallbackImage: string;
  overlayColor: string;
  photographer: string;
}

export interface DaySummary {
  date: string;
  totalMinutes: number;
  sessionCount: number;
  records: MeditationRecord[];
}

export interface ChallengeProgress {
  participatedDays: number;
  requiredDays: number;
  totalDays: number;
  isComplete: boolean;
  dayStatuses: boolean[];
}
