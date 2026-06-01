"use client";

import { useActionState } from "react";
import type { MusicPlaylist } from "@/lib/music-pick";
import { savePlaylist } from "./actions";

const inputClass =
  "no-ring bg-transparent border-b border-gray focus:border-blue outline-none py-2 font-mono text-foreground transition-colors w-full";

export function PlaylistForm({ playlist }: { playlist?: MusicPlaylist }) {
  const [state, action, pending] = useActionState(savePlaylist, { error: "" });

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="playlist-name"
          className="font-mono text-xs text-foreground-sec"
        >
          name
        </label>
        <input
          id="playlist-name"
          name="name"
          defaultValue={playlist?.name}
          className={inputClass}
          placeholder="..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="playlist-url"
          className="font-mono text-xs text-foreground-sec"
        >
          spotify url
        </label>
        <input
          id="playlist-url"
          name="spotifyUrl"
          defaultValue={playlist?.spotifyUrl}
          className={inputClass}
          placeholder="https://open.spotify.com/playlist/..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="playlist-comment"
          className="font-mono text-xs text-foreground-sec"
        >
          comment <span className="opacity-50">(optional)</span>
        </label>
        <textarea
          id="playlist-comment"
          name="comment"
          defaultValue={playlist?.comment}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="why this playlist?"
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
        {pending ? "..." : "save playlist"}
      </button>
    </form>
  );
}
