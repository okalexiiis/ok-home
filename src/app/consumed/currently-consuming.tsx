"use client";

import { m } from "motion/react";
import type { ConsumedItem } from "@/lib/consumed";
import { getMeta } from "./meta";

const ease = [0.16, 1, 0.3, 1] as const;

export function CurrentlyConsuming({ items }: { items: ConsumedItem[] }) {
  if (items.length === 0) return null;

  return (
    <m.section
      className="w-full flex flex-col gap-3"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
    >
      <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
        currently consuming
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <m.div
            key={item.slug}
            className="group relative flex flex-col gap-2 border-4 border-gray border-t-green p-4 overflow-hidden"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            whileHover={{ y: -2 }}
          >
            {/* corner glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-green opacity-10 blur-[80px] transition-opacity duration-500 group-hover:opacity-50" />

            {/* shimmer */}
            <m.div
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-green/5 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 3.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 4 + i * 1.2,
              }}
            />

            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-xs text-green uppercase">
                  {item.type}
                </span>
                <h3 className="font-serif text-xl text-foreground">
                  {item.name}
                </h3>
              </div>
              {item.revisits ? (
                <span className="font-mono text-xs text-foreground-sec shrink-0 border border-gray px-2 py-0.5">
                  ↺ {item.revisits}
                </span>
              ) : null}
            </div>

            <p className="font-mono text-xs text-foreground-sec">
              {getMeta(item)}
            </p>
            <p className="font-mono text-xs text-foreground-sec">
              {item.genres.join(", ")}
            </p>

            {item.comment && (
              <p className="font-serif text-sm text-foreground-sec italic">
                "{item.comment}"
              </p>
            )}
          </m.div>
        ))}
      </div>
    </m.section>
  );
}
