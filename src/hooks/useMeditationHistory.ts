"use client";

import { useMeditationStore } from "@/store/meditationStore";
import {
  getChallengeProgress,
  getCurrentStreak,
  getLongestStreak,
  getMonthMinutes,
  getTodayMinutes,
  getTotalMinutes,
  getUniqueDays,
} from "@/lib/statistics";

export function useMeditationHistory() {
  const history = useMeditationStore((state) => state.history);

  return {
    history,
    todayMinutes: getTodayMinutes(history),
    monthMinutes: getMonthMinutes(history),
    totalMinutes: getTotalMinutes(history),
    uniqueDays: getUniqueDays(history),
    currentStreak: getCurrentStreak(history),
    longestStreak: getLongestStreak(history),
    challenge: getChallengeProgress(history),
  };
}
