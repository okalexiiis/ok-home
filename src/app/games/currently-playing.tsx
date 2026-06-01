"use client";

import { motion } from "motion/react";
import type { Game } from "@/lib/games";

const ease = [0.16, 1, 0.3, 1] as const;

export function CurrentlyPlaying({ game }: { game: Game }) {
  return (
    <motion.section
      className="w-full flex flex-col gap-3"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
    >
      <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
        currently playing
      </h2>
      <motion.div
        className="group relative flex flex-col gap-3 border-4 border-gray border-t-orange p-5 overflow-hidden"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* corner glow */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-orange opacity-10 blur-[80px] transition-opacity duration-500 group-hover:opacity-50" />

        {/* shimmer */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-orange/5 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 4,
          }}
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-3xl text-foreground">{game.name}</h3>
            {game.comment && (
              <p className="font-serif text-foreground-sec text-sm italic max-w-prose">
                "{game.comment}"
              </p>
            )}
          </div>
          <div className="flex flex-col items-end shrink-0 gap-1">
            <span className="font-mono text-xs text-orange border border-orange px-2 py-0.5">
              {game.platform}
            </span>
            <span className="font-mono text-xs text-foreground-sec">
              {game.genre}
            </span>
          </div>
        </div>

        {game.hours && (
          <p className="font-mono text-xs text-foreground-sec">
            {game.hours}h played
          </p>
        )}
      </motion.div>
    </motion.section>
  );
}
