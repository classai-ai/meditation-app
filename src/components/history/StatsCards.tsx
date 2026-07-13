"use client";

import { Card } from "@/components/common/Card";

interface StatsCardsProps {
  todayMinutes: number;
  monthMinutes: number;
  totalMinutes: number;
  uniqueDays: number;
  currentStreak: number;
  longestStreak: number;
}

export function StatsCards({
  todayMinutes,
  monthMinutes,
  totalMinutes,
  uniqueDays,
  currentStreak,
  longestStreak,
}: StatsCardsProps) {
  const stats = [
    { label: "오늘", value: `${todayMinutes}분` },
    { label: "이번 달", value: `${monthMinutes}분` },
    { label: "전체", value: `${totalMinutes}분` },
    { label: "명상한 날", value: `${uniqueDays}일` },
    { label: "현재 연속", value: `${currentStreak}일` },
    { label: "최장 연속", value: `${longestStreak}일` },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <p className="text-sm font-medium text-muted">{stat.label}</p>
          <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
