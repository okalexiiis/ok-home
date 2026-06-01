"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { ItemList } from "@/lib/lists";
import { saveList } from "./actions";

const DEFAULT_TIER_LABELS = ["S", "A", "B", "C", "D"];

const inputClass =
  "no-ring w-full bg-background border border-gray focus:border-yellow outline-none px-3 py-2 font-mono text-sm text-foreground caret-foreground transition-colors";
const labelClass =
  "font-mono text-xs text-foreground-sec uppercase tracking-widest";

export function ListForm({ list }: { list?: ItemList }) {
  const [mode, setMode] = useState<"list" | "tiers">(list?.mode ?? "list");
  const [state, action, pending] = useActionState(saveList, { error: "" });

  return (
    <form action={action} className="flex flex-col gap-5">
      <input
        type="hidden"
        name="originalSlug"
        defaultValue={list?.slug ?? ""}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="list-title" className={labelClass}>
          title
        </label>
        <input
          id="list-title"
          name="title"
          defaultValue={list?.title}
          className={inputClass}
          placeholder="My top RPGs"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="list-context" className={labelClass}>
            context
          </label>
          <select
            id="list-context"
            name="context"
            defaultValue={list?.context ?? "games"}
            className={inputClass}
          >
            <option value="games">games</option>
            <option value="consumed">consumed</option>
            <option value="music">music</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className={labelClass}>mode</p>
          <div className="flex gap-6 h-full items-center">
            {(["list", "tiers"] as const).map((m) => (
              <label
                key={m}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <input
                  type="radio"
                  name="mode"
                  value={m}
                  checked={mode === m}
                  onChange={() => setMode(m)}
                  className="accent-yellow"
                />
                <span className="font-mono text-sm text-foreground">{m}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="list-description" className={labelClass}>
          description <span className="normal-case opacity-50">(optional)</span>
        </label>
        <input
          id="list-description"
          name="description"
          defaultValue={list?.description}
          className={inputClass}
          placeholder="..."
        />
      </div>

      {mode === "list" && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="list-items" className={labelClass}>
            items — one per line
          </label>
          <textarea
            id="list-items"
            name="items"
            rows={8}
            defaultValue={list?.items.join("\n")}
            className={`${inputClass} resize-y leading-relaxed`}
            placeholder={"Elden Ring\nPersona 5\nDark Souls III"}
          />
        </div>
      )}

      {mode === "tiers" && (
        <div className="flex flex-col gap-3">
          <p className={labelClass}>tiers — items comma separated</p>
          {DEFAULT_TIER_LABELS.map((defaultLabel, i) => (
            <div key={defaultLabel} className="flex items-center gap-2">
              <input
                name={`tier_label_${i}`}
                defaultValue={list?.tiers[i]?.label ?? defaultLabel}
                className="no-ring w-10 shrink-0 bg-background border border-gray focus:border-yellow outline-none px-2 py-2 font-mono text-sm text-foreground caret-foreground text-center transition-colors"
              />
              <input
                name={`tier_items_${i}`}
                defaultValue={list?.tiers[i]?.items.join(", ") ?? ""}
                className="no-ring flex-1 min-w-0 bg-background border border-gray focus:border-yellow outline-none px-3 py-2 font-mono text-sm text-foreground caret-foreground transition-colors"
                placeholder="item1, item2, item3..."
              />
            </div>
          ))}
        </div>
      )}

      {state.error && (
        <p className="font-mono text-xs text-red">{state.error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="h-11 px-6 font-mono text-sm border border-yellow text-yellow hover:bg-yellow/20 transition-colors cursor-pointer disabled:opacity-50"
        >
          {pending ? "saving..." : "save"}
        </button>
        <Link
          href="/dashboard/lists"
          className="h-11 px-6 flex items-center font-mono text-sm border border-gray text-foreground-sec hover:text-foreground transition-colors"
        >
          cancel
        </Link>
      </div>
    </form>
  );
}
