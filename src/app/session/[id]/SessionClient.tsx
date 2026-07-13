"use client";

import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Maximize2, Minimize2, Pause, Play, X } from "lucide-react";
import { BackgroundImage } from "@/components/common/BackgroundImage";
import { Button } from "@/components/common/Button";
import { MeditationYouTubePlayer } from "@/components/meditation/MeditationYouTubePlayer";
import { getMeditationById } from "@/data/meditations";
import { getTimePeriod, getTimePeriodConfig } from "@/data/timePeriods";
import { useMeditationStore } from "@/store/meditationStore";

interface SessionPageProps {
  params: Promise<{ id: string }>;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function SessionPage({ params }: SessionPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: contentId } = use(params);
  const addRecord = useMeditationStore((state) => state.addRecord);
  const preferences = useMeditationStore((state) => state.preferences);

  const durationMinutes = Number(searchParams.get("duration") ?? "5");
  const totalSeconds = useMemo(() => durationMinutes * 60, [durationMinutes]);

  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const meditation = getMeditationById(contentId);
  const periodConfig = getTimePeriodConfig(getTimePeriod());

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const completeSession = useCallback(() => {
    if (!meditation) return;

    clearTimer();
    addRecord({
      contentId: meditation.id,
      duration: durationMinutes,
    });
    router.push("/complete");
  }, [addRecord, clearTimer, durationMinutes, meditation, router]);

  useEffect(() => {
    if (!playing || !started) {
      clearTimer();
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          clearTimer();
          completeSession();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return clearTimer;
  }, [clearTimer, completeSession, playing, started]);

  const handleStartPause = () => {
    if (!started) {
      setStarted(true);
      setPlaying(true);
      return;
    }
    setPlaying((current) => !current);
  };

  const handleExit = () => {
    clearTimer();
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    }
    router.push("/");
  };

  const handleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await document.documentElement.requestFullscreen?.();
  };

  if (!meditation) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center text-white">
        <div className="glass-panel rounded-3xl p-8">
          <h1 className="text-2xl font-bold">콘텐츠를 찾을 수 없습니다</h1>
          <Button className="mt-6" onClick={() => router.push("/meditations")}>
            명상 목록으로
          </Button>
        </div>
      </div>
    );
  }

  const progress =
    totalSeconds === 0
      ? 0
      : ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <BackgroundImage
      key={`${contentId}-${durationMinutes}`}
      src={periodConfig.backgroundImage}
      fallbackSrc={periodConfig.fallbackImage}
      overlayColor={periodConfig.overlayColor}
      motionEnabled={preferences.backgroundMotion}
      className="min-h-screen"
    >
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-6">
        <div className="glass-panel flex items-center justify-between rounded-3xl p-4">
          <div>
            <p className="text-sm font-semibold text-accent-moon">명상 진행 중</p>
            <h1 className="mt-1 text-2xl font-bold text-white">
              {meditation.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={handleExit}
            className="rounded-full border border-white/25 bg-black/45 p-3 text-white hover:bg-black/65"
            aria-label="명상 종료"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex flex-1 flex-col justify-center gap-8">
          <div className="glass-panel rounded-3xl p-8 text-center">
            <p className="text-sm font-semibold text-muted">남은 시간</p>
            <p className="text-shadow-soft mt-2 text-6xl font-bold tracking-tight text-white">
              {formatTime(remainingSeconds)}
            </p>
            <div className="mx-auto mt-6 h-2.5 max-w-md overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-accent-green transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <MeditationYouTubePlayer
            videoId={meditation.youtubeId}
            fallbackVideoId={meditation.fallbackYoutubeId}
            playing={playing}
          />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="secondary"
              onClick={handleStartPause}
              className="min-w-36"
            >
              {!started ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  타이머 시작
                </>
              ) : playing ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  일시정지
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  재개
                </>
              )}
            </Button>
            <Button variant="secondary" onClick={handleFullscreen}>
              {isFullscreen ? (
                <>
                  <Minimize2 className="mr-2 h-4 w-4" />
                  전체화면 해제
                </>
              ) : (
                <>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  전체화면
                </>
              )}
            </Button>
          </div>
        </div>

        <p className="pb-4 text-center text-sm text-muted">
          중간에 종료하면 기록이 저장되지 않습니다. 타이머가 끝나면 자동으로
          완료됩니다.
        </p>
      </div>
    </BackgroundImage>
  );
}
