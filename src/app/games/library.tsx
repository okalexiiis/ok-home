"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { Game, GameStatus } from "@/lib/games";

const ease = [0.16, 1, 0.3, 1] as const;

type Filter = "all" | GameStatus;

const filters: { label: string; value: Filter }[] = [
  { label: "all", value: "all" },
  { label: "playing", value: "playing" },
  { label: "completed", value: "completed" },
  { label: "pending", value: "pending" },
  { label: "dropped", value: "dropped" },
];

const statusColor: Record<GameStatus, string> = {
  playing: "text-orange",
  completed: "text-green",
  pending: "text-yellow",
  dropped: "text-red",
};

export function Library({ games }: { games: Game[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? games : games.filter((g) => g.status === filter);

  return (
    <motion.section
      className="w-full flex flex-col gap-3"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
          library
        </h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`font-mono text-xs px-2 py-1 border transition-colors cursor-pointer ${
                filter === f.value
                  ? "border-orange text-orange"
                  : "border-gray text-foreground-sec hover:border-orange/50 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col divide-y divide-gray/40">
        {filtered.map((game) => (
          <div key={game.name} className="flex items-start gap-4 py-3">
            <div className="flex flex-col flex-1 min-w-0 gap-0.5">
              <div className="flex items-center gap-3">
                <span className="font-serif text-foreground">{game.name}</span>
                <span className="font-mono text-xs text-foreground-sec">
                  {game.genre}
                </span>
                <span className="font-mono text-xs text-foreground-sec">
                  {game.platform}
                </span>
              </div>
              {game.comment && (
                <p className="font-serif text-sm text-foreground-sec italic">
                  "{game.comment}"
                </p>
              )}
            </div>
            <div className="flex flex-col items-end shrink-0 gap-0.5">
              <span className={`font-mono text-xs ${statusColor[game.status]}`}>
                {game.status}
              </span>
              {game.rating && (
                <span className="font-mono text-sm text-orange">
                  {game.rating}/10
                </span>
              )}
              {game.hours && (
                <span className="font-mono text-xs text-foreground-sec">
                  {game.hours}h
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
