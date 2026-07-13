"use client";

import { useState } from "react";
import { format } from "date-fns";
import { PageTransition } from "@/components/common/PageTransition";
import { Calendar } from "@/components/history/Calendar";
import { ChallengeProgressCard } from "@/components/history/ChallengeProgressCard";
import { StatsCards } from "@/components/history/StatsCards";
import { getMeditationById } from "@/data/meditations";
import {
  getChallengeProgress,
  getCurrentStreak,
  getDaySummary,
  getLongestStreak,
  getMonthMinutes,
  getTodayKey,
  getTodayMinutes,
  getTotalMinutes,
  getUniqueDays,
} from "@/lib/statistics";
import { useMeditationStore } from "@/store/meditationStore";
import type { MeditationRecord } from "@/types/meditation";

export default function HistoryPage() {
  const history = useMeditationStore((state) => state.history);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getTodayKey());

  const summary = getDaySummary(history, selectedDate);
  const challenge = getChallengeProgress(history);

  return (
    <PageTransition className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">명상 기록</h1>
        <p className="mt-2 text-base text-muted">
          달력에서 날짜를 선택해 하루의 명상을 확인하세요.
        </p>
      </div>

      <StatsCards
        todayMinutes={getTodayMinutes(history)}
        monthMinutes={getMonthMinutes(history)}
        totalMinutes={getTotalMinutes(history)}
        uniqueDays={getUniqueDays(history)}
        currentStreak={getCurrentStreak(history)}
        longestStreak={getLongestStreak(history)}
      />

      <ChallengeProgressCard progress={challenge} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Calendar
          records={history}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onMonthChange={setCurrentMonth}
          onSelectDate={setSelectedDate}
        />

        <div className="space-y-4">
          <DayDetailWithTitles records={history} date={selectedDate} />
          {summary.sessionCount > 0 && (
            <div className="glass-panel-soft rounded-3xl p-5 text-sm text-muted">
              {format(new Date(selectedDate), "M월 d일")}에는 총{" "}
              {summary.totalMinutes}분, {summary.sessionCount}회 명상했습니다.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

function DayDetailWithTitles({
  records,
  date,
}: {
  records: MeditationRecord[];
  date: string;
}) {
  const summary = getDaySummary(records, date);

  return (
    <div className="glass-panel-soft rounded-3xl p-5">
      <h3 className="text-lg font-bold text-white">{date} 기록</h3>
      {summary.sessionCount === 0 ? (
        <p className="mt-3 text-sm text-muted">이 날은 명상 기록이 없습니다.</p>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-muted">
            총 {summary.totalMinutes}분 · {summary.sessionCount}회
          </p>
          {summary.records.map((record) => {
            const meditation = getMeditationById(record.contentId);
            return (
              <div
                key={record.completedAt}
                className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm"
              >
                <p className="font-semibold text-white">
                  {meditation?.title ?? record.contentId}
                </p>
                <p className="text-muted">{record.duration}분</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
