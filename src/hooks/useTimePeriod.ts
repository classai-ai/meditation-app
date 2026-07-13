"use client";

import { useEffect, useState } from "react";
import { getTimePeriod, getTimePeriodConfig } from "@/data/timePeriods";
import type { TimePeriod, TimePeriodConfig } from "@/types/meditation";

export function useTimePeriod() {
  const [period, setPeriod] = useState<TimePeriod>("morning");
  const [config, setConfig] = useState<TimePeriodConfig>(
    getTimePeriodConfig("morning"),
  );

  useEffect(() => {
    const update = () => {
      const nextPeriod = getTimePeriod();
      setPeriod(nextPeriod);
      setConfig(getTimePeriodConfig(nextPeriod));
    };

    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return { period, config };
}
