"use client";

import { m } from "motion/react";
import type { TopAlbum } from "@/lib/lastfm";

const ease = [0.16, 1, 0.3, 1] as const;

export function TopAlbums({ albums }: { albums: TopAlbum[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
        top albums · this month
      </h2>
      <div className="flex flex-col divide-y divide-gray/40">
        {albums.map((album, i) => (
          <m.div
            key={album.name}
            className="flex items-center gap-3 h-14"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.35,
              ease,
              delay: Math.min(i * 0.06, 0.3),
            }}
          >
            <span className="font-mono text-sm text-blue w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-serif text-foreground truncate">
                {album.name}
              </span>
              <span className="font-mono text-xs text-foreground-sec truncate">
                {album.artist}
              </span>
            </div>
            <span className="font-mono text-xs text-foreground-sec shrink-0">
              {album.playcount.toLocaleString()}
            </span>
          </m.div>
        ))}
      </div>
    </section>
  );
}
