"use client";

import { motion } from "motion/react";
import type { ConsumedItem } from "@/lib/consumed";
import { getMeta } from "./meta";

const ease = [0.16, 1, 0.3, 1] as const;

export function LastCompleted({ items }: { items: ConsumedItem[] }) {
  return (
    <motion.section
      className="w-full flex flex-col gap-3"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
    >
      <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
        last completed
      </h2>
      <div className="flex flex-col divide-y divide-gray/40">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className="flex items-start gap-4 py-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease, delay: Math.min(i * 0.06, 0.3) }}
          >
            <span className="font-mono text-sm text-green w-6 shrink-0 pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col flex-1 min-w-0 gap-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif text-foreground">{item.name}</span>
                <span className="font-mono text-xs text-green">
                  {item.type}
                </span>
                <span className="font-mono text-xs text-foreground-sec">
                  {getMeta(item)}
                </span>
              </div>
              <p className="font-mono text-xs text-foreground-sec">
                {item.genres.join(", ")}
              </p>
              {item.comment && (
                <p className="font-serif text-sm text-foreground-sec italic">
                  "{item.comment}"
                </p>
              )}
            </div>
            <div className="flex flex-col items-end shrink-0 gap-0.5">
              {item.rating && (
                <span className="font-mono text-sm text-green">
                  {item.rating}/10
                </span>
              )}
              {item.revisits ? (
                <span className="font-mono text-xs text-foreground-sec">
                  ↺ {item.revisits}
                </span>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
