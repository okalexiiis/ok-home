"use client";

import { motion } from "motion/react";

export const bookmarks = [
  {
    name: "gh",
    url: "github.com/okalexiiis",
    color: "purple",
  },
  {
    name: "arch",
    color: "blue",
    url: "archlinux.org",
  },
];

export type Bookmark = (typeof bookmarks)[number];

const colorClasses: Record<string, string> = {
  purple: "hover:border-purple hover:text-purple",
  blue: "hover:border-blue hover:text-blue",
  green: "hover:border-green hover:text-green",
  red: "hover:border-red hover:text-red",
  yellow: "hover:border-yellow hover:text-yellow",
  orange: "hover:border-orange hover:text-orange",
  mint: "hover:border-mint hover:text-mint",
};

export function Bookmarks() {
  return (
    <div className="flex gap-4 w-full">
      {bookmarks.map((bookmark, index) => (
        <motion.a
          key={bookmark.name}
          href={`https://${bookmark.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-foreground p-1 text-center font-mono text-[12px] border-gray border min-w-8 transition-colors ${colorClasses[bookmark.color] ?? ""}`}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.08,
          }}
        >
          {bookmark.name}
        </motion.a>
      ))}
    </div>
  );
}
