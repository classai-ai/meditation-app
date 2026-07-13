import {
  format,
  isSameMonth,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";
import type {
  ChallengeProgress,
  DaySummary,
  MeditationRecord,
} from "@/types/meditation";

export function formatDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function getTodayKey(date = new Date()): string {
  return formatDateKey(date);
}

export function groupRecordsByDate(
  records: MeditationRecord[],
): Map<string, MeditationRecord[]> {
  const map = new Map<string, MeditationRecord[]>();

  for (const record of records) {
    const existing = map.get(record.date) ?? [];
    existing.push(record);
    map.set(record.date, existing);
  }

  return map;
}

export function getDaySummary(
  records: MeditationRecord[],
  date: string,
): DaySummary {
  const dayRecords = records.filter((record) => record.date === date);
  const totalMinutes = dayRecords.reduce(
    (sum, record) => sum + record.duration,
    0,
  );

  return {
    date,
    totalMinutes,
    sessionCount: dayRecords.length,
    records: dayRecords,
  };
}

export function getTotalMinutes(
  records: MeditationRecord[],
  filter?: (record: MeditationRecord) => boolean,
): number {
  return records
    .filter((record) => (filter ? filter(record) : true))
    .reduce((sum, record) => sum + record.duration, 0);
}

export function getTodayMinutes(
  records: MeditationRecord[],
  date = new Date(),
): number {
  const today = getTodayKey(date);
  return getTotalMinutes(records, (record) => record.date === today);
}

export function getMonthMinutes(
  records: MeditationRecord[],
  date = new Date(),
): number {
  return getTotalMinutes(records, (record) =>
    isSameMonth(parseISO(record.date), date),
  );
}

export function getUniqueDays(records: MeditationRecord[]): number {
  return new Set(records.map((record) => record.date)).size;
}

export function getQualifiedDates(
  records: MeditationRecord[],
  minMinutes = 3,
): Set<string> {
  const grouped = groupRecordsByDate(records);
  const qualified = new Set<string>();

  grouped.forEach((dayRecords, date) => {
    const total = dayRecords.reduce((sum, record) => sum + record.duration, 0);
    if (total >= minMinutes) {
      qualified.add(date);
    }
  });

  return qualified;
}

export function getCurrentStreak(records: MeditationRecord[]): number {
  const qualified = getQualifiedDates(records);
  if (qualified.size === 0) {
    return 0;
  }

  let streak = 0;
  let cursor = startOfDay(new Date());

  while (qualified.has(formatDateKey(cursor))) {
    streak += 1;
    cursor = subDays(cursor, 1);
  }

  return streak;
}

export function getLongestStreak(records: MeditationRecord[]): number {
  const qualified = Array.from(getQualifiedDates(records)).sort();
  if (qualified.length === 0) {
    return 0;
  }

  let longest = 1;
  let current = 1;

  for (let index = 1; index < qualified.length; index += 1) {
    const previous = parseISO(qualified[index - 1]);
    const currentDate = parseISO(qualified[index]);
    const diffDays =
      (currentDate.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

export function getCalendarMarker(totalMinutes: number): "none" | "dot" | "leaf" | "leaf-lg" | "flower" {
  if (totalMinutes <= 0) return "none";
  if (totalMinutes <= 4) return "dot";
  if (totalMinutes <= 9) return "leaf";
  if (totalMinutes <= 19) return "leaf-lg";
  return "flower";
}

export function getChallengeProgress(
  records: MeditationRecord[],
  referenceDate = new Date(),
): ChallengeProgress {
  const dayStatuses = Array.from({ length: 7 }, (_, index) => {
    const date = subDays(referenceDate, 6 - index);
    const summary = getDaySummary(records, formatDateKey(date));
    return summary.totalMinutes >= 3;
  });

  const participatedDays = dayStatuses.filter(Boolean).length;

  return {
    participatedDays,
    requiredDays: 5,
    totalDays: 7,
    isComplete: participatedDays >= 5,
    dayStatuses,
  };
}

export function getCompletionMessage(duration: number): string {
  if (duration <= 3) {
    return "짧은 시간이지만 오늘의 마음에 충분한 쉼이 되었어요.";
  }

  return `${duration}분 동안 온전히 나에게 집중했습니다.`;
}
