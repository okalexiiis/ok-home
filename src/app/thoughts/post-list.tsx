"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { formatDate } from "@/lib/slug";
import type { Post } from "@/lib/thoughts";

const ease = [0.16, 1, 0.3, 1] as const;
const MotionLink = motion(Link);

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="font-mono text-sm text-foreground-sec py-12">
        nothing here yet.
      </p>
    );
  }

  return (
    <section className="w-full flex flex-col divide-y divide-gray/40">
      {posts.map((post, i) => (
        <MotionLink
          key={post.slug}
          href={`/thoughts/${post.slug}`}
          className="group relative flex flex-col gap-2 py-5 pl-4 transition-colors overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease, delay: Math.min(i * 0.06, 0.3) }}
          whileHover={{ x: 3 }}
        >
          {/* left accent bar */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-0.5 bg-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl text-foreground group-hover:text-purple transition-colors">
              {post.title}
            </h2>
            <span className="font-mono text-xs text-foreground-sec shrink-0">
              {formatDate(post.date)}
            </span>
          </div>
          <p className="font-serif text-foreground-sec">{post.excerpt}</p>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-purple">
                #{tag}
              </span>
            ))}
          </div>
        </MotionLink>
      ))}
    </section>
  );
}
