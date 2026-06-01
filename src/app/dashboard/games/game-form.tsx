"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Game } from "@/lib/games";
import { saveGame } from "./actions";

const inputClass =
  "no-ring w-full bg-transparent border border-gray focus:border-orange outline-none px-3 py-2 font-mono text-sm text-foreground transition-colors";
const labelClass =
  "font-mono text-xs text-foreground-sec uppercase tracking-widest";

const statuses: Game["status"][] = [
  "playing",
  "completed",
  "pending",
  "dropped",
];

export function GameForm({ game }: { game?: Game }) {
  const [state, action, pending] = useActionState(saveGame, { error: "" });

  return (
    <form action={action} className="flex flex-col gap-5">
      <input
        type="hidden"
        name="originalSlug"
        defaultValue={game?.slug ?? ""}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelClass}>
          name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={game?.name}
          className={inputClass}
        />
        {game && (
          <p className="font-mono text-xs text-foreground-sec">
            slug: {game.slug} (won't change on edit)
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="platform" className={labelClass}>
            platform
          </label>
          <input
            id="platform"
            name="platform"
            defaultValue={game?.platform ?? "PC"}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="genre" className={labelClass}>
            genre
          </label>
          <input
            id="genre"
            name="genre"
            defaultValue={game?.genre}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className={labelClass}>
            status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={game?.status ?? "pending"}
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

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="hours" className={labelClass}>
            hours
          </label>
          <input
            id="hours"
            name="hours"
            type="number"
            min="0"
            defaultValue={game?.hours}
            className={inputClass}
          />
        </div>
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
            defaultValue={game?.rating}
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
            defaultValue={game?.completedAt}
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
          defaultValue={game?.comment}
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
          className="h-11 px-6 font-mono text-sm border border-orange text-orange hover:bg-orange/20 transition-colors cursor-pointer disabled:opacity-50"
        >
          {pending ? "saving..." : "save"}
        </button>
        <Link
          href="/dashboard/games"
          className="h-11 px-6 flex items-center font-mono text-sm border border-gray text-foreground-sec hover:text-foreground transition-colors"
        >
          cancel
        </Link>
      </div>
    </form>
  );
}
