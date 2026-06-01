"use client";

import { m } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/lastfm";

interface Props {
  track: Track | null;
  label: string;
}

export function NowPlayingCard({ track, label }: Props) {
  const copyRef = useRef<HTMLSpanElement>(null);
  const [copyWidth, setCopyWidth] = useState(0);

  useEffect(() => {
    if (!track || !copyRef.current) return;
    setCopyWidth(copyRef.current.offsetWidth);
  }, [track]);

  if (!track) return null;

  return (
    <m.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex w-full items-center gap-4 border-4 border-gray border-t-blue overflow-hidden p-4"
    >
      {/* corner glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-blue opacity-15 blur-[80px] transition-opacity duration-700 group-hover:opacity-60" />

      {/* center shimmer */}
      <m.div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-blue/5 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 4,
        }}
      />

      {/* album art */}
      {track.image && (
        <div className="relative shrink-0 size-14">
          <Image
            src={track.image}
            alt={track.album}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* info */}
      <div className="flex flex-col flex-1 overflow-hidden gap-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono text-foreground-sec tracking-wider">
            {track.isNowPlaying ? "now playing" : "last played"}
          </p>
          {label && (
            <p className="text-xs font-mono text-foreground-sec">{label}</p>
          )}
        </div>

        <div className="overflow-hidden whitespace-nowrap">
          <m.div
            className="inline-flex"
            animate={{ x: copyWidth ? [0, -copyWidth] : 0 }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <span
              ref={copyRef}
              className="font-serif text-3xl text-foreground pr-24"
            >
              {track.name} - {track.artist}
            </span>
            <span className="font-serif text-3xl text-foreground pr-24">
              {track.name} - {track.artist}
            </span>
          </m.div>
        </div>
      </div>
    </m.div>
  );
}
