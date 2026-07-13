"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCalendarMarker, getDaySummary } from "@/lib/statistics";
import type { MeditationRecord } from "@/types/meditation";

interface CalendarProps {
  records: MeditationRecord[];
  currentMonth: Date;
  selectedDate: string;
  onMonthChange: (date: Date) => void;
  onSelectDate: (date: string) => void;
}

const markerStyles = {
  none: "bg-transparent",
  dot: "bg-accent-moon h-1.5 w-1.5 rounded-full",
  leaf: "text-sm",
  "leaf-lg": "text-base",
  flower: "text-lg",
};

const markerSymbols = {
  none: "",
  dot: "",
  leaf: "🍃",
  "leaf-lg": "🍃",
  flower: "🌸",
};

export function Calendar({
  records,
  currentMonth,
  selectedDate,
  onMonthChange,
  onSelectDate,
}: CalendarProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="glass-panel-soft rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onMonthChange(subMonths(currentMonth, 1))}
          className="rounded-full border border-white/20 bg-black/30 p-2 text-white hover:bg-black/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-bold text-white">
          {format(currentMonth, "yyyy년 M월", { locale: ko })}
        </h3>
        <button
          type="button"
          onClick={() => onMonthChange(addMonths(currentMonth, 1))}
          className="rounded-full border border-white/20 bg-black/30 p-2 text-white hover:bg-black/50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const summary = getDaySummary(records, dateKey);
          const marker = getCalendarMarker(summary.totalMinutes);
          const isSelected = selectedDate === dateKey;
          const inMonth = isSameMonth(day, currentMonth);

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              className={`flex min-h-14 flex-col items-center justify-center rounded-2xl p-1 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-2 border-accent-green bg-accent-green/25 text-white"
                  : inMonth
                    ? "border border-transparent text-white hover:border-white/20 hover:bg-black/30"
                    : "text-white/35"
              }`}
            >
              <span>{format(day, "d")}</span>
              <span className={`mt-1 ${markerStyles[marker]}`}>
                {markerSymbols[marker]}
              </span>
              {isSameDay(day, new Date()) && (
                <span className="mt-1 text-[10px] text-accent-moon">오늘</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DayDetail({
  records,
  date,
}: {
  records: MeditationRecord[];
  date: string;
}) {
  const summary = getDaySummary(records, date);

  return (
    <div className="rounded-3xl border border-white/10 bg-card p-5 backdrop-blur-md">
      <h3 className="text-lg font-semibold">
        {format(parseISO(date), "M월 d일", { locale: ko })} 기록
      </h3>
      {summary.sessionCount === 0 ? (
        <p className="mt-3 text-sm text-muted">이 날은 명상 기록이 없습니다.</p>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-muted">
            총 {summary.totalMinutes}분 · {summary.sessionCount}회
          </p>
          {summary.records.map((record) => (
            <div
              key={record.completedAt}
              className="rounded-2xl bg-white/5 px-4 py-3 text-sm"
            >
              <p className="font-medium">{record.contentId}</p>
              <p className="text-muted">
                {record.duration}분 ·{" "}
                {format(parseISO(record.completedAt), "HH:mm")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
