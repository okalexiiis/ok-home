"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    name: "thoughts",
    href: "/dashboard/thoughts",
    active: "text-purple border-purple",
  },
  {
    name: "games",
    href: "/dashboard/games",
    active: "text-orange border-orange",
  },
  {
    name: "consumed",
    href: "/dashboard/consumed",
    active: "text-green border-green",
  },
  { name: "music", href: "/dashboard/music", active: "text-blue border-blue" },
  {
    name: "lists",
    href: "/dashboard/lists",
    active: "text-yellow border-yellow",
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 flex-wrap border-b border-gray/40 pb-4 mb-8">
      <Link
        href="/"
        className="font-mono text-xs text-foreground-sec hover:text-foreground transition-colors mr-3"
      >
        ← ok
      </Link>
      {sections.map((s) => {
        const isActive = pathname.startsWith(s.href);
        return (
          <Link
            key={s.name}
            href={s.href}
            className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
              isActive
                ? s.active
                : "border-transparent text-foreground-sec hover:text-foreground hover:border-gray"
            }`}
          >
            {s.name}
          </Link>
        );
      })}
    </nav>
  );
}
