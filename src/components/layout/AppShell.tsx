"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageBackground } from "@/components/common/BackgroundImage";
import { BottomNav } from "@/components/layout/BottomNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { useTimePeriod } from "@/hooks/useTimePeriod";
import { useMeditationStore } from "@/store/meditationStore";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { config } = useTimePeriod();
  const preferences = useMeditationStore((state) => state.preferences);
  const hideNavigation =
    pathname.startsWith("/session") || pathname.startsWith("/complete");

  if (hideNavigation) {
    return <div className="relative min-h-screen text-white">{children}</div>;
  }

  return (
    <div className="relative min-h-screen text-white">
      <PageBackground
        src={config.backgroundImage}
        fallbackSrc={config.fallbackImage}
        overlayColor={config.overlayColor}
        motionEnabled={preferences.backgroundMotion}
      />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-8">
            {children}
          </main>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
