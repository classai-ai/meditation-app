"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface PageBackgroundProps {
  src: string;
  fallbackSrc: string;
  overlayColor: string;
  motionEnabled?: boolean;
  dimOverlay?: string;
}

export function PageBackground({
  src,
  fallbackSrc,
  overlayColor,
  motionEnabled = true,
  dimOverlay = "rgba(4, 10, 20, 0.28)",
}: PageBackgroundProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-cover bg-center ${
          motionEnabled ? "animate-slow-zoom" : ""
        }`}
        style={{ backgroundImage: `url("${imageSrc}")` }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
      <div className="absolute inset-0" style={{ backgroundColor: dimOverlay }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        className="hidden"
        onError={() => setImageSrc(fallbackSrc)}
      />
    </div>
  );
}

interface BackgroundImageProps {
  src: string;
  fallbackSrc: string;
  overlayColor: string;
  motionEnabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function BackgroundImage({
  src,
  fallbackSrc,
  overlayColor,
  motionEnabled = true,
  className = "",
  children,
}: BackgroundImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 bg-cover bg-center ${
          motionEnabled ? "animate-slow-zoom" : ""
        }`}
        style={{ backgroundImage: `url("${imageSrc}")` }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(4, 10, 20, 0.28)" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className="hidden"
        onError={() => setImageSrc(fallbackSrc)}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
