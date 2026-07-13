"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  MeditationRecord,
  Preferences,
} from "@/types/meditation";
import { getTodayKey } from "@/lib/statistics";

interface MeditationStore {
  history: MeditationRecord[];
  preferences: Preferences;
  selectedDuration: number;
  lastCompleted: MeditationRecord | null;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setSelectedDuration: (duration: number) => void;
  addRecord: (record: Omit<MeditationRecord, "date" | "completedAt"> & {
    date?: string;
    completedAt?: string;
  }) => void;
  resetHistory: () => void;
  updatePreferences: (updates: Partial<Preferences>) => void;
}

const defaultPreferences: Preferences = {
  defaultDuration: 5,
  backgroundMotion: true,
  volume: 0.7,
};

export const useMeditationStore = create<MeditationStore>()(
  persist(
    (set) => ({
      history: [],
      preferences: defaultPreferences,
      selectedDuration: 5,
      lastCompleted: null,
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      setSelectedDuration: (duration) => set({ selectedDuration: duration }),
      addRecord: (record) => {
        const completed: MeditationRecord = {
          date: record.date ?? getTodayKey(),
          contentId: record.contentId,
          duration: record.duration,
          completedAt: record.completedAt ?? new Date().toISOString(),
        };

        set((state) => ({
          history: [...state.history, completed],
          lastCompleted: completed,
        }));
      },
      resetHistory: () => set({ history: [], lastCompleted: null }),
      updatePreferences: (updates) =>
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
          selectedDuration:
            updates.defaultDuration ?? state.selectedDuration,
        })),
    }),
    {
      name: "meditation-app-storage",
      partialize: (state) => ({
        history: state.history,
        preferences: state.preferences,
        selectedDuration: state.selectedDuration,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
