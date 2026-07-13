"use client";

import { useCallback, useRef, useState } from "react";
import YouTube, { type YouTubeEvent, type YouTubePlayer } from "react-youtube";

interface MeditationYouTubePlayerProps {
  videoId: string;
  fallbackVideoId?: string;
  playing: boolean;
  onReady?: () => void;
  onError?: () => void;
}

export function MeditationYouTubePlayer({
  videoId,
  fallbackVideoId,
  playing,
  onReady,
  onError,
}: MeditationYouTubePlayerProps) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [activeVideoId, setActiveVideoId] = useState(videoId);
  const [started, setStarted] = useState(false);

  const handleReady = useCallback(
    (event: YouTubeEvent) => {
      playerRef.current = event.target;
      onReady?.();
    },
    [onReady],
  );

  const handleError = useCallback(() => {
    if (fallbackVideoId && activeVideoId !== fallbackVideoId) {
      setActiveVideoId(fallbackVideoId);
      return;
    }
    onError?.();
  }, [activeVideoId, fallbackVideoId, onError]);

  const handleStart = async () => {
    setStarted(true);
    await playerRef.current?.playVideo();
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl">
      <YouTube
        videoId={activeVideoId}
        className="aspect-video w-full"
        iframeClassName="h-full w-full"
        onReady={handleReady}
        onError={handleError}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
        }}
      />

      {!started && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/65">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-full border-2 border-accent-green bg-accent-green px-6 py-3 text-sm font-bold text-primary-dark shadow-lg"
          >
            명상 시작하기
          </button>
        </div>
      )}

      {started && !playing && (
        <div className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/70 px-3 py-1 text-xs font-semibold text-white">
          일시정지 중
        </div>
      )}
    </div>
  );
}
