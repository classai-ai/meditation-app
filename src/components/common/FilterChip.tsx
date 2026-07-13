"use client";

interface FilterChipProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export function FilterChip({ active, label, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2.5 text-sm font-semibold shadow-md transition-all ${
        active
          ? "border-accent-green bg-accent-green text-primary-dark shadow-accent-green/20"
          : "border-white/35 bg-card-strong text-white hover:border-white/55 hover:bg-[rgba(12,24,42,0.62)]"
      }`}
    >
      {label}
    </button>
  );
}
