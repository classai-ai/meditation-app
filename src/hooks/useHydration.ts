"use client";

import { useEffect } from "react";
import { useMeditationStore } from "@/store/meditationStore";

export function useHydration() {
  const hydrated = useMeditationStore((state) => state.hydrated);
  const setHydrated = useMeditationStore((state) => state.setHydrated);

  useEffect(() => {
    useMeditationStore.persist.rehydrate();
    setHydrated(true);
  }, [setHydrated]);

  return hydrated;
}
