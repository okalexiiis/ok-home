"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Post } from "@/lib/thoughts";
import { savePost } from "./actions";

const inputClass =
  "no-ring w-full bg-transparent border border-gray focus:border-purple outline-none px-3 py-2 font-mono text-sm text-foreground transition-colors";
const labelClass =
  "font-mono text-xs text-foreground-sec uppercase tracking-widest";

export function PostForm({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState(savePost, { error: "" });
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="flex flex-col gap-5">
      <input
        type="hidden"
        name="originalSlug"
        defaultValue={post?.slug ?? ""}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={labelClass}>
          title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={post?.title}
          className={inputClass}
        />
        {post && (
          <p className="font-mono text-xs text-foreground-sec">
            slug: {post.slug} (permalink won't change on edit)
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className={labelClass}>
            date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={post?.date ?? today}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tags" className={labelClass}>
            tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={post?.tags.join(", ")}
            placeholder="life, tech"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="excerpt" className={labelClass}>
          excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt}
          className={`${inputClass} font-serif resize-y`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="body" className={labelClass}>
          body — blank line = paragraph, "## " = heading, *text* = italic
        </label>
        <textarea
          id="body"
          name="body"
          rows={16}
          defaultValue={post?.body}
          className={`${inputClass} resize-y leading-relaxed`}
        />
      </div>

      {state.error && (
        <p className="font-mono text-xs text-red">{state.error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="h-11 px-6 font-mono text-sm border border-purple text-purple hover:bg-purple/20 transition-colors cursor-pointer disabled:opacity-50"
        >
          {pending ? "saving..." : "save"}
        </button>
        <Link
          href="/dashboard/thoughts"
          className="h-11 px-6 flex items-center font-mono text-sm border border-gray text-foreground-sec hover:text-foreground transition-colors"
        >
          cancel
        </Link>
      </div>
    </form>
  );
}
