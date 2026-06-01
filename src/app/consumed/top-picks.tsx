"use client";

import { m } from "motion/react";
import type { ConsumedItem } from "@/lib/consumed";
import { getMeta } from "./meta";

const ease = [0.16, 1, 0.3, 1] as const;

function PickCard({
  item,
  rank,
  size = "md",
  index = 0,
}: {
  item: ConsumedItem;
  rank: number;
  size?: "lg" | "md" | "sm";
  index?: number;
}) {
  const rankSize =
    size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-lg";
  const nameSize =
    size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-base";

  return (
    <m.div
      className="group relative flex flex-col gap-2 border border-gray p-4 border-t-green h-full overflow-hidden"
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: Math.min(index * 0.07, 0.35) }}
      whileHover={{ y: -2 }}
    >
      <div className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-green opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-30" />

      <div className="flex items-start justify-between gap-2">
        <span className={`font-mono text-green font-bold ${rankSize}`}>
          {String(rank).padStart(2, "0")}
        </span>
        <div className="flex flex-col items-end gap-0.5">
          {item.rating ? (
            <span className="font-mono text-sm text-green">
              {item.rating}/10
            </span>
          ) : (
            <span className="font-mono text-sm text-green">N/A</span>
          )}
          {item.revisits ? (
            <span className="font-mono text-xs text-foreground-sec">
              ↺ {item.revisits}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-0.5 flex-1">
        <p className={`font-serif text-foreground ${nameSize}`}>{item.name}</p>
        <p className="font-mono text-xs text-green">{item.type}</p>
        <p className="font-mono text-xs text-foreground-sec">{getMeta(item)}</p>
      </div>
    </m.div>
  );
}

export function TopPicks({ items }: { items: ConsumedItem[] }) {
  const [first, second, third, fourth, fifth, ...base] = items;

  return (
    <m.section
      className="w-full flex flex-col gap-4"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
    >
      <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
        top picks
      </h2>

      {first && (
        <div className="max-w-xs mx-auto w-full">
          <PickCard item={first} rank={1} size="lg" index={0} />
        </div>
      )}

      {(second || third) && (
        <div className="max-w-lg mx-auto w-full grid grid-cols-2 gap-4">
          {second && <PickCard item={second} rank={2} size="md" index={1} />}
          {third && <PickCard item={third} rank={3} size="md" index={2} />}
        </div>
      )}

      {(fourth || fifth) && (
        <div className="max-w-2xl mx-auto w-full grid grid-cols-2 gap-4">
          {fourth && <PickCard item={fourth} rank={4} size="md" index={3} />}
          {fifth && <PickCard item={fifth} rank={5} size="md" index={4} />}
        </div>
      )}

      {base.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {base.map((item, i) => (
            <PickCard
              key={item.name}
              item={item}
              rank={i + 6}
              size="sm"
              index={i + 5}
            />
          ))}
        </div>
      )}
    </m.section>
  );
}
