"use client";

import { FilterChip } from "@/components/common/FilterChip";
import { DURATION_OPTIONS } from "@/data/meditations";

interface DurationPickerProps {
  value: number;
  onChange: (duration: number) => void;
}

export function DurationPicker({ value, onChange }: DurationPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {DURATION_OPTIONS.map((duration) => (
        <FilterChip
          key={duration}
          active={value === duration}
          label={`${duration}분`}
          onClick={() => onChange(duration)}
        />
      ))}
    </div>
  );
}
