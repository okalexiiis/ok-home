"use client";

import { AnimatePresence, m } from "motion/react";
import { useSyncExternalStore } from "react";

const titleText = "Welcome home";
const titleChars = titleText
  .split("")
  .map((char, i) => ({ char, key: `t${i}`, delay: i * 0.03 }));
const clockPositions = ["h0", "h1", "c0", "m0", "m1", "c1", "s0", "s1"];

function subscribe(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSnapshot() {
  return 0;
}

function ClockDigit({ digit }: { digit: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.span
        key={digit}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {digit}
      </m.span>
    </AnimatePresence>
  );
}

export function Welcome() {
  const epochSeconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const date = epochSeconds ? new Date(epochSeconds * 1000) : null;

  const hours = date?.getHours().toString().padStart(2, "0") ?? "--";
  const minutes = date?.getMinutes().toString().padStart(2, "0") ?? "--";
  const seconds = date?.getSeconds().toString().padStart(2, "0") ?? "--";

  const day = date?.getDate() ?? "--";
  const month = date?.toLocaleString("default", { month: "long" }) ?? "---";
  const year = date?.getFullYear() ?? "----";

  const timeChars = `${hours}:${minutes}:${seconds}`.split("");

  return (
    <div className="flex items-center justify-between gap-4">
      {/* LEFT — character reveal */}
      <section className="font-serif">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {titleChars.map(({ char, key, delay }) => (
            <m.span
              key={key}
              initial={{ opacity: 0, y: "60%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
              className="inline-block"
            >
              {char === " " ? " " : char}
            </m.span>
          ))}
        </h1>
        <m.p
          className="text-sm text-foreground-sec"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: titleText.length * 0.03 + 0.1 }}
        >
          okalexiiis
        </m.p>
      </section>

      {/* RIGHT — section entrance + ticking digits */}
      <m.section
        className="font-mono text-right"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <p className="text-foreground">
          {timeChars.map((char, i) => {
            const pos = clockPositions[i];
            return char === ":" ? (
              <span key={pos}>:</span>
            ) : (
              <ClockDigit key={pos} digit={char} />
            );
          })}
        </p>
        <p className="text-foreground">
          {month} {day} {year}
        </p>
      </m.section>
    </div>
  );
}
