"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ConsumedItem } from "@/lib/consumed";
import { saveItem } from "./actions";

const inputClass =
  "no-ring w-full bg-transparent border border-gray focus:border-green outline-none px-3 py-2 font-mono text-sm text-foreground transition-colors";
const labelClass =
  "font-mono text-xs text-foreground-sec uppercase tracking-widest";

const types: ConsumedItem["type"][] = [
  "manga",
  "anime",
  "movie",
  "show",
  "book",
];
const statuses: ConsumedItem["status"][] = [
  "consuming",
  "completed",
  "pending",
  "dropped",
];

export function ItemForm({ item }: { item?: ConsumedItem }) {
  const [state, action, pending] = useActionState(saveItem, { error: "" });

  return (
    <form action={action} className="flex flex-col gap-5">
      <input
        type="hidden"
        name="originalSlug"
        defaultValue={item?.slug ?? ""}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelClass}>
          name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={item?.name}
          className={inputClass}
        />
        {item && (
          <p className="font-mono text-xs text-foreground-sec">
            slug: {item.slug} (won't change on edit)
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className={labelClass}>
            type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={item?.type ?? "movie"}
            className={inputClass}
          >
            {types.map((t) => (
              <option key={t} value={t} className="bg-background">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className={labelClass}>
            status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={item?.status ?? "pending"}
            className={inputClass}
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="bg-background">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="genres" className={labelClass}>
          genres (comma separated)
        </label>
        <input
          id="genres"
          name="genres"
          defaultValue={item?.genres.join(", ")}
          placeholder="Drama, Sci-Fi"
          className={inputClass}
        />
      </div>

      {/* metadata */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="creator" className={labelClass}>
            creator
          </label>
          <input
            id="creator"
            name="creator"
            defaultValue={item?.creator}
            placeholder="author / director"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="studio" className={labelClass}>
            studio
          </label>
          <input
            id="studio"
            name="studio"
            defaultValue={item?.studio}
            placeholder="studio / network"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="year" className={labelClass}>
            year
          </label>
          <input
            id="year"
            name="year"
            type="number"
            defaultValue={item?.year}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="episodes" className={labelClass}>
            episodes
          </label>
          <input
            id="episodes"
            name="episodes"
            type="number"
            min="0"
            defaultValue={item?.episodes}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="chapters" className={labelClass}>
            chapters
          </label>
          <input
            id="chapters"
            name="chapters"
            type="number"
            min="0"
            defaultValue={item?.chapters}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="volumes" className={labelClass}>
            volumes
          </label>
          <input
            id="volumes"
            name="volumes"
            type="number"
            min="0"
            defaultValue={item?.volumes}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rating" className={labelClass}>
            rating (/10)
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="10"
            defaultValue={item?.rating}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="revisits" className={labelClass}>
            revisits
          </label>
          <input
            id="revisits"
            name="revisits"
            type="number"
            min="0"
            defaultValue={item?.revisits}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pickRank" className={labelClass}>
            pick rank
          </label>
          <input
            id="pickRank"
            name="pickRank"
            type="number"
            min="1"
            placeholder="1 = best"
            defaultValue={item?.pickRank}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="completedAt" className={labelClass}>
            completed at
          </label>
          <input
            id="completedAt"
            name="completedAt"
            type="date"
            defaultValue={item?.completedAt}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="comment" className={labelClass}>
          comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          defaultValue={item?.comment}
          className={`${inputClass} font-serif resize-y`}
        />
      </div>

      {state.error && (
        <p className="font-mono text-xs text-red">{state.error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="h-11 px-6 font-mono text-sm border border-green text-green hover:bg-green/20 transition-colors cursor-pointer disabled:opacity-50"
        >
          {pending ? "saving..." : "save"}
        </button>
        <Link
          href="/dashboard/consumed"
          className="h-11 px-6 flex items-center font-mono text-sm border border-gray text-foreground-sec hover:text-foreground transition-colors"
        >
          cancel
        </Link>
      </div>
    </form>
  );
}
