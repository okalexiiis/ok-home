"use client";

import { m } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

interface StatCardProps {
  value: string | number;
  label: string;
  index: number;
}

function StatCard({ value, label, index }: StatCardProps) {
  return (
    <m.div
      className="group relative flex flex-col gap-1 border border-gray p-4 border-t-orange overflow-hidden"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
    >
      <div className="pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-orange opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-40" />
      <span className="font-mono text-3xl text-orange font-bold">{value}</span>
      <span className="font-mono text-xs text-foreground-sec uppercase tracking-widest">
        {label}
      </span>
    </m.div>
  );
}

interface Props {
  total: number;
  hours: number;
  completed: number;
}

export function Stats({ total, hours, completed }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <StatCard value={total} label="games in library" index={0} />
      <StatCard value={`${hours}h`} label="hours played" index={1} />
      <StatCard value={completed} label="completed" index={2} />
    </div>
  );
}
