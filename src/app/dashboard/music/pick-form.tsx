"use client";

import { useActionState } from "react";
import type { MusicPick } from "@/lib/music-pick";
import { savePick } from "./actions";

const types = ["song", "album", "artist"] as const;

const inputClass =
  "no-ring bg-transparent border-b border-gray focus:border-blue outline-none py-2 font-mono text-foreground transition-colors w-full";

export function PickForm({ pick }: { pick?: MusicPick }) {
  const [state, action, pending] = useActionState(savePick, { error: "" });

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs text-foreground-sec">type</p>
        <div className="flex gap-6">
          {types.map((t) => (
            <label key={t} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={t}
                defaultChecked={(pick?.type ?? "song") === t}
                className="accent-blue"
              />
              <span className="font-mono text-sm text-foreground">{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="pick-title"
          className="font-mono text-xs text-foreground-sec"
        >
          title
        </label>
        <input
          id="pick-title"
          name="title"
          defaultValue={pick?.title}
          className={inputClass}
          placeholder="..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="pick-artist"
          className="font-mono text-xs text-foreground-sec"
        >
          artist <span className="opacity-50">(optional)</span>
        </label>
        <input
          id="pick-artist"
          name="artist"
          defaultValue={pick?.artist}
          className={inputClass}
          placeholder="..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="pick-spotify"
          className="font-mono text-xs text-foreground-sec"
        >
          spotify url <span className="opacity-50">(optional)</span>
        </label>
        <input
          id="pick-spotify"
          name="spotifyUrl"
          defaultValue={pick?.spotifyUrl}
          className={inputClass}
          placeholder="https://open.spotify.com/..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="pick-comment"
          className="font-mono text-xs text-foreground-sec"
        >
          comment <span className="opacity-50">(optional)</span>
        </label>
        <textarea
          id="pick-comment"
          name="comment"
          defaultValue={pick?.comment}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="why do you recommend it?"
        />
      </div>

      {state.error && (
        <p className="font-mono text-xs text-red">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="h-11 font-mono text-sm border border-blue text-blue hover:bg-blue/20 transition-colors cursor-pointer disabled:opacity-50"
      >
        {pending ? "..." : "save pick"}
      </button>
    </form>
  );
}
