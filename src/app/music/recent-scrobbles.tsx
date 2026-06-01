"use client";

import { motion } from "motion/react";
import { relativeTime, type Track } from "@/lib/lastfm";

const ease = [0.16, 1, 0.3, 1] as const;

export function RecentScrobbles({ tracks }: { tracks: Track[] }) {
  return (
    <motion.section
      className="w-full flex flex-col gap-3"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
    >
      <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
        last scrobbles
      </h2>
      <div className="flex flex-col divide-y divide-gray/40">
        {tracks.map((track, i) => (
          <motion.div
            key={`${track.name}-${i}`}
            className="flex items-center justify-between py-3 gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.35,
              ease,
              delay: Math.min(i * 0.06, 0.3),
            }}
          >
            <div className="flex flex-col min-w-0">
              <p className="font-serif text-foreground truncate">
                {track.name}
              </p>
              <p className="font-mono text-sm text-foreground-sec truncate">
                {track.artist}
              </p>
            </div>
            <p className="font-mono text-xs text-foreground-sec shrink-0">
              {track.isNowPlaying ? (
                <span className="text-blue">now playing</span>
              ) : track.timestamp ? (
                relativeTime(track.timestamp)
              ) : (
                ""
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
