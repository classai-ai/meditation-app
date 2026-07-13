"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, Leaf, Settings } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/meditations", label: "명상", icon: Leaf },
  { href: "/history", label: "기록", icon: CalendarDays },
  { href: "/settings", label: "설정", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="glass-panel fixed inset-x-0 bottom-0 z-40 border-t border-white/20 md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-1 px-2 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition-colors ${
                active
                  ? "bg-accent-green/20 text-accent-green"
                  : "text-muted hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
