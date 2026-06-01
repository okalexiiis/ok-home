"use client";

import { m } from "motion/react";
import Link from "next/link";

const MotionLink = m(Link);

const RoomsItems = [
  {
    name: "music",
    route: "/music",
    color: "blue",
    desc: "what im listening to rn",
  },
  {
    name: "games",
    route: "/games",
    color: "orange",
    desc: "some games i played",
  },
  {
    name: "consumed",
    route: "/consumed",
    color: "green",
    desc: "manga, movies, shows, etc",
  },
  {
    name: "thoughts",
    route: "/thoughts",
    color: "purple",
    desc: "random thoughts and ideas",
  },
];

export type RoomItem = (typeof RoomsItems)[number];

const roomColors: Record<
  string,
  { text: string; border: string; hover: string; glow: string }
> = {
  blue: {
    text: "text-blue",
    border: "border-b-blue",
    hover: "hover:border-blue",
    glow: "bg-blue",
  },
  orange: {
    text: "text-orange",
    border: "border-b-orange",
    hover: "hover:border-orange",
    glow: "bg-orange",
  },
  green: {
    text: "text-green",
    border: "border-b-green",
    hover: "hover:border-green",
    glow: "bg-green",
  },
  purple: {
    text: "text-purple",
    border: "border-b-purple",
    hover: "hover:border-purple",
    glow: "bg-purple",
  },
  red: {
    text: "text-red",
    border: "border-b-red",
    hover: "hover:border-red",
    glow: "bg-red",
  },
  mint: {
    text: "text-mint",
    border: "border-b-mint",
    hover: "hover:border-mint",
    glow: "bg-mint",
  },
  yellow: {
    text: "text-yellow",
    border: "border-b-yellow",
    hover: "hover:border-yellow",
    glow: "bg-yellow",
  },
};

export function Rooms() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {RoomsItems.map((room, index) => {
        const colors = roomColors[room.color];
        return (
          <MotionLink
            key={room.name}
            href={room.route}
            className={`relative bg-background-secondary p-5 group border border-foreground/10 ${colors?.hover} transition-colors duration-200 overflow-hidden`}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.08,
            }}
            whileHover={{ y: -3 }}
          >
            <div
              className={`pointer-events-none absolute -top-12 -right-12 size-32 rounded-full ${colors?.glow} opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-30`}
            />

            <section className="flex justify-between items-center text-orange font-mono text-sm mb-2">
              <div>ROOM {String(index + 1).padStart(2, "0")}</div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                enter →
              </div>
            </section>
            <section
              className={`border-b pb-1 ${colors?.border} ${colors?.text}`}
            >
              <span className="font-mono text-lg">{room.name}</span>
              <p className="text-foreground-sec text-sm font-serif">
                {room.desc}
              </p>
            </section>
          </MotionLink>
        );
      })}
    </div>
  );
}
