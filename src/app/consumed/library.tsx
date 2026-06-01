"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { ConsumedItem, ConsumedStatus, ConsumedType } from "./data";

const ease = [0.16, 1, 0.3, 1] as const;

import { getMeta } from "./meta";

type StatusFilter = "all" | ConsumedStatus;
type TypeFilter = "all" | ConsumedType;

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: "all", value: "all" },
  { label: "consuming", value: "consuming" },
  { label: "completed", value: "completed" },
  { label: "pending", value: "pending" },
  { label: "dropped", value: "dropped" },
];

const typeFilters: { label: string; value: TypeFilter }[] = [
  { label: "all", value: "all" },
  { label: "manga", value: "manga" },
  { label: "anime", value: "anime" },
  { label: "movie", value: "movie" },
  { label: "show", value: "show" },
  { label: "book", value: "book" },
];

const statusColor: Record<ConsumedStatus, string> = {
  consuming: "text-green",
  completed: "text-mint",
  pending: "text-yellow",
  dropped: "text-red",
};

function FilterRow<T extends string>({
  filters,
  active,
  onChange,
}: {
  filters: { label: string; value: T }[];
  active: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => onChange(f.value)}
          className={`font-mono text-xs px-2 py-1 border transition-colors cursor-pointer ${
            active === f.value
              ? `border-green text-green`
              : "border-gray text-foreground-sec hover:border-green/50 hover:text-foreground"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export function Library({ items }: { items: ConsumedItem[] }) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");

  const filtered = items
    .filter((i) => status === "all" || i.status === status)
    .filter((i) => type === "all" || i.type === type);

  return (
    <motion.section
      className="w-full flex flex-col gap-4"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase pt-1">
          library
        </h2>
        <div className="flex flex-col gap-2 items-end">
          <FilterRow
            filters={statusFilters}
            active={status}
            onChange={setStatus}
          />
          <FilterRow filters={typeFilters} active={type} onChange={setType} />
        </div>
      </div>

      <div className="flex flex-col divide-y divide-gray/40">
        {filtered.map((item) => (
          <div key={item.name} className="flex items-start gap-4 py-3">
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
              <span className={`font-mono text-xs ${statusColor[item.status]}`}>
                {item.status}
              </span>
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
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="font-mono text-sm text-foreground-sec py-8 text-center">
            nothing here yet
          </p>
        )}
      </div>
    </motion.section>
  );
}
