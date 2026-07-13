"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/common/Button";
import { PageTransition } from "@/components/common/PageTransition";
import { ChallengeProgressCard } from "@/components/history/ChallengeProgressCard";
import { DurationPicker } from "@/components/meditation/DurationPicker";
import { MeditationCard } from "@/components/meditation/MeditationCard";
import {
  getBestMeditationForDuration,
  getRecommendedMeditations,
} from "@/data/meditations";
import { useTimePeriod } from "@/hooks/useTimePeriod";
import {
  getChallengeProgress,
  getCurrentStreak,
  getTodayMinutes,
} from "@/lib/statistics";
import { useMeditationStore } from "@/store/meditationStore";

export default function HomePage() {
  const router = useRouter();
  const { config } = useTimePeriod();
  const history = useMeditationStore((state) => state.history);
  const selectedDuration = useMeditationStore((state) => state.selectedDuration);
  const setSelectedDuration = useMeditationStore(
    (state) => state.setSelectedDuration,
  );

  const recommended = getRecommendedMeditations(
    config.id,
    3,
    selectedDuration,
  );
  const featured = getBestMeditationForDuration(selectedDuration, config.id);
  const todayMinutes = getTodayMinutes(history);
  const streak = getCurrentStreak(history);
  const challenge = getChallengeProgress(history);

  const startMeditation = (contentId?: string) => {
    const id = contentId ?? featured.id;
    router.push(`/session/${id}`);
  };

  return (
    <PageTransition className="space-y-8">
      <section className="glass-panel rounded-[2rem] p-6 md:p-10">
        <div className="flex min-h-[280px] flex-col justify-between gap-8 md:min-h-[320px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-moon">
              {config.label}
            </p>
            <h1 className="text-shadow-soft mt-3 max-w-2xl text-3xl font-bold leading-tight text-white md:text-5xl">
              {config.greeting}
            </h1>
            <p className="mt-4 text-sm text-muted">
              사진: {config.photographer}
            </p>
          </div>

          <div className="space-y-4">
            <DurationPicker
              value={selectedDuration}
              onChange={setSelectedDuration}
            />
            <Button
              className="w-full max-w-xs text-base"
              onClick={() => startMeditation()}
            >
              {selectedDuration}분 명상 시작
            </Button>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="flex min-h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">오늘의 추천</h2>
            <Link
              href="/meditations"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent-green hover:text-[#a0e0bc]"
            >
              더 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid flex-1 auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommended.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                onClick={() => startMeditation(meditation.id)}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="glass-panel-soft flex flex-1 flex-col justify-center rounded-3xl p-5">
            <p className="text-sm font-medium text-muted">오늘의 기록</p>
            <p className="mt-2 text-4xl font-bold text-white">{todayMinutes}분</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent-moon">
              <Flame className="h-4 w-4" />
              연속 {streak}일 참여 중
            </div>
          </div>

          <ChallengeProgressCard progress={challenge} />
        </section>
      </div>
    </PageTransition>
  );
}
