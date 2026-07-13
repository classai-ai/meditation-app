"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import YouTube, { type YouTubeEvent, type YouTubePlayer } from "react-youtube";

interface MeditationYouTubePlayerProps {
  videoId: string;
  fallbackVideoId?: string;
  playing: boolean;
  started: boolean;
  onPlayerStateChange?: (playing: boolean) => void;
  onReady?: () => void;
  onError?: () => void;
}

export function MeditationYouTubePlayer({
  videoId,
  fallbackVideoId,
  playing,
  started,
  onPlayerStateChange,
  onReady,
  onError,
}: MeditationYouTubePlayerProps) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [fallbackId, setFallbackId] = useState<string | null>(null);
  const activeVideoId = fallbackId ?? videoId;

  const syncPlayback = useCallback(async () => {
    const player = playerRef.current;
    if (!player || !started) return;

    if (playing) {
      await player.playVideo();
    } else {
      await player.pauseVideo();
    }
  }, [playing, started]);

  useEffect(() => {
    void syncPlayback();
  }, [syncPlayback]);

  const handleReady = useCallback(
    (event: YouTubeEvent) => {
      playerRef.current = event.target;
      onReady?.();
      if (started && playing) {
        void event.target.playVideo();
      }
    },
    [onReady, playing, started],
  );

  const handleStateChange = useCallback(
    (event: YouTubeEvent) => {
      if (!started) return;

      const state = event.data;
      if (state === 1) {
        onPlayerStateChange?.(true);
      } else if (state === 2) {
        onPlayerStateChange?.(false);
      }
    },
    [onPlayerStateChange, started],
  );

  const handleError = useCallback(() => {
    if (fallbackVideoId && activeVideoId !== fallbackVideoId) {
      setFallbackId(fallbackVideoId);
      return;
    }
    onError?.();
  }, [activeVideoId, fallbackVideoId, onError]);

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl">
      <YouTube
        key={activeVideoId}
        videoId={activeVideoId}
        className="aspect-video w-full"
        iframeClassName="h-full w-full"
        onReady={handleReady}
        onStateChange={handleStateChange}
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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
          <p className="rounded-full border border-white/25 bg-black/60 px-4 py-2 text-sm font-semibold text-white">
            아래 버튼으로 명상을 시작하세요
          </p>
        </div>
      )}

      {started && !playing && (
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/70 px-3 py-1 text-xs font-semibold text-white">
          일시정지 중
        </div>
      )}
    </div>
  );
}
