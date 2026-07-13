"use client";

import { useRouter } from "next/navigation";
import { BackgroundImage } from "@/components/common/BackgroundImage";
import { Button } from "@/components/common/Button";
import { PageTransition } from "@/components/common/PageTransition";
import { getMeditationById } from "@/data/meditations";
import { useTimePeriod } from "@/hooks/useTimePeriod";
import {
  getCompletionMessage,
  getCurrentStreak,
  getMonthMinutes,
  getTodayMinutes,
} from "@/lib/statistics";
import { useMeditationStore } from "@/store/meditationStore";

export default function CompletePage() {
  const router = useRouter();
  const { config } = useTimePeriod();
  const preferences = useMeditationStore((state) => state.preferences);
  const history = useMeditationStore((state) => state.history);
  const lastCompleted = useMeditationStore((state) => state.lastCompleted);
  const selectedDuration = useMeditationStore((state) => state.selectedDuration);

  const meditation = lastCompleted
    ? getMeditationById(lastCompleted.contentId)
    : undefined;

  const duration = lastCompleted?.duration ?? selectedDuration;
  const todayMinutes = getTodayMinutes(history);
  const monthMinutes = getMonthMinutes(history);
  const streak = getCurrentStreak(history);

  if (!lastCompleted) {
    return (
      <BackgroundImage
        src={config.backgroundImage}
        fallbackSrc={config.fallbackImage}
        overlayColor={config.overlayColor}
        motionEnabled={preferences.backgroundMotion}
        className="min-h-screen"
      >
        <div className="flex min-h-screen items-center justify-center px-6 text-white">
          <div className="glass-panel rounded-3xl p-8 text-center">
            <h1 className="text-2xl font-bold">완료된 명상이 없습니다</h1>
            <Button className="mt-6" onClick={() => router.push("/")}>
              홈으로
            </Button>
          </div>
        </div>
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage
      src={config.backgroundImage}
      fallbackSrc={config.fallbackImage}
      overlayColor={config.overlayColor}
      motionEnabled={preferences.backgroundMotion}
      className="min-h-screen"
    >
      <PageTransition className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-10 text-center text-white">
        <div className="glass-panel rounded-[2rem] p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-moon">
            명상 완료
          </p>
          <h1 className="text-shadow-soft mt-4 text-4xl font-bold">
            수고하셨어요
          </h1>
          <p className="mt-4 text-lg text-muted">
            {getCompletionMessage(duration)}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatBox label="이번 명상" value={`${duration}분`} />
            <StatBox label="오늘 누적" value={`${todayMinutes}분`} />
            <StatBox label="이번 달" value={`${monthMinutes}분`} />
          </div>

          <p className="mt-6 text-sm font-semibold text-accent-green">
            연속 {streak}일째 마음을 돌보고 있어요
          </p>

          {meditation && (
            <p className="mt-2 text-sm text-muted">{meditation.title}</p>
          )}

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
            <Button
              variant="secondary"
              onClick={() =>
                router.push(
                  `/session/${lastCompleted.contentId}?duration=${duration}`,
                )
              }
            >
              한 번 더 명상하기
            </Button>
          </div>
        </div>
      </PageTransition>
    </BackgroundImage>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel-soft rounded-3xl p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
