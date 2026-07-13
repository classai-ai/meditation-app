"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, Leaf, Settings, Sparkles } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/meditations", label: "명상", icon: Leaf },
  { href: "/history", label: "기록", icon: CalendarDays },
  { href: "/settings", label: "설정", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-panel hidden w-64 shrink-0 p-6 md:flex md:flex-col">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-accent-green/25 p-3 text-accent-green">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">마음챙김</p>
          <p className="text-sm text-muted">명상 웹앱</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent-green/20 text-accent-green"
                  : "text-muted hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
