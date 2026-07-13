"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useHydration } from "@/hooks/useHydration";

export function Providers({ children }: { children: React.ReactNode }) {
  useHydration();

  return <AppShell>{children}</AppShell>;
}
