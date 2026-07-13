"use client";

import { Clock3 } from "lucide-react";
import { Card } from "@/components/common/Card";
import { CATEGORY_LABELS } from "@/data/meditations";
import type { MeditationContent } from "@/types/meditation";

interface MeditationCardProps {
  meditation: MeditationContent;
  onClick?: () => void;
  compact?: boolean;
  className?: string;
}

export function MeditationCard({
  meditation,
  onClick,
  compact = false,
  className = "",
}: MeditationCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`flex h-full flex-col ${compact ? "p-4" : ""} ${className}`}
    >
      <div className="flex flex-1 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full border border-accent-moon/40 bg-accent-moon/15 px-3 py-1 text-xs font-semibold text-accent-moon">
            {CATEGORY_LABELS[meditation.category]}
          </span>
          <h3 className="mt-3 text-lg font-bold leading-snug text-white">
            {meditation.title}
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
              {meditation.description}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white">
          <Clock3 className="h-3.5 w-3.5" />
          {meditation.duration}분
        </div>
      </div>
    </Card>
  );
}
