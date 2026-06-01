"use client";

import { m } from "motion/react";
import type { MusicPick, MusicPlaylist } from "@/lib/music-pick";

export function MusicPickCard({ pick }: { pick: MusicPick }) {
  return (
    <m.div
      className="group relative border border-foreground/10 hover:border-blue p-5 transition-colors duration-200 flex flex-col gap-2 overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-blue opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-30" />
      <m.div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-blue/5 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />

      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-blue">{pick.type}</span>
        <span className="font-mono text-xs text-foreground-sec">·</span>
        <span className="font-mono text-xs text-foreground-sec">
          pick of the day
        </span>
      </div>

      {pick.artist && (
        <p className="font-mono text-sm text-foreground-sec">{pick.artist}</p>
      )}
      <h3 className="font-serif text-2xl text-foreground">{pick.title}</h3>

      {pick.comment && (
        <p className="font-serif text-sm text-foreground-sec italic mt-1">
          "{pick.comment}"
        </p>
      )}

      {pick.spotifyUrl && (
        <div className="flex justify-end mt-2">
          <a
            href={pick.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-blue hover:text-foreground transition-colors"
          >
            open ↗
          </a>
        </div>
      )}
    </m.div>
  );
}

export function MusicPlaylistCard({ playlist }: { playlist: MusicPlaylist }) {
  return (
    <m.div
      className="group relative border border-foreground/10 hover:border-blue p-5 transition-colors duration-200 flex flex-col gap-2 overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-blue opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-30" />
      <m.div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-blue/5 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 6.5,
        }}
      />

      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-blue">playlist</span>
        <span className="font-mono text-xs text-foreground-sec">·</span>
        <span className="font-mono text-xs text-foreground-sec">
          listening to
        </span>
      </div>

      <h3 className="font-serif text-2xl text-foreground">{playlist.name}</h3>

      {playlist.comment && (
        <p className="font-serif text-sm text-foreground-sec italic mt-1">
          "{playlist.comment}"
        </p>
      )}

      <div className="flex justify-end mt-2">
        <a
          href={playlist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-blue hover:text-foreground transition-colors"
        >
          open ↗
        </a>
      </div>
    </m.div>
  );
}
