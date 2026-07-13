"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FilterChip } from "@/components/common/FilterChip";
import { PageTransition } from "@/components/common/PageTransition";
import { MeditationCard } from "@/components/meditation/MeditationCard";
import {
  CATEGORY_LABELS,
  DURATION_OPTIONS,
  meditations,
} from "@/data/meditations";
import type { Category } from "@/types/meditation";

const categories = Object.keys(CATEGORY_LABELS) as Category[];

export default function MeditationsPage() {
  const router = useRouter();
  const [category, setCategory] = useState<Category | "all">("all");
  const [duration, setDuration] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    return meditations.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      const durationMatch = duration === "all" || item.duration === duration;
      return categoryMatch && durationMatch;
    });
  }, [category, duration]);

  return (
    <PageTransition className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">명상 콘텐츠</h1>
        <p className="mt-2 text-base text-muted">
          카테고리와 시간으로 원하는 명상을 찾아보세요.
        </p>
      </div>

      <section className="glass-panel-soft space-y-4 rounded-3xl p-5">
        <div>
          <p className="text-sm font-semibold text-white">카테고리</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <FilterChip
              active={category === "all"}
              label="전체"
              onClick={() => setCategory("all")}
            />
            {categories.map((item) => (
              <FilterChip
                key={item}
                active={category === item}
                label={CATEGORY_LABELS[item]}
                onClick={() => setCategory(item)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">명상 시간</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <FilterChip
              active={duration === "all"}
              label="모든 시간"
              onClick={() => setDuration("all")}
            />
            {DURATION_OPTIONS.map((item) => (
              <FilterChip
                key={item}
                active={duration === item}
                label={`${item}분`}
                onClick={() => setDuration(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="glass-panel-soft rounded-3xl border border-dashed border-white/25 p-10 text-center text-muted">
          조건에 맞는 명상 콘텐츠가 없습니다.
        </div>
      ) : (
        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((meditation) => (
            <MeditationCard
              key={meditation.id}
              meditation={meditation}
              onClick={() => router.push(`/session/${meditation.id}`)}
            />
          ))}
        </div>
      )}
    </PageTransition>
  );
}
