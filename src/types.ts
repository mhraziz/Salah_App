export type TabType = 'home' | 'prayer-times' | 'quiz' | 'about';

export interface PrayerMeta {
  arabic: string;
  rakaatLabel: string;
}

export interface RakaatRow {
  rakaat: number;
  text: string;
}

export interface PrayerSegment {
  type: string;
  count: number;
  rows: RakaatRow[];
}

export interface HowToPrayStep {
  title: string;
  desc: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface LocationState {
  mode: 'coords' | 'city';
  city?: string;
  country?: string;
  lat?: number;
  lon?: number;
  label: string;
}

export interface WeekDayTiming {
  dateStr: string; // e.g. "25 Jul 2026" or "Today"
  rawDate: string;
  isToday: boolean;
  timings: Timings;
  hijri?: {
    day: string;
    monthEn: string;
    year: string;
  };
}
