import type { Game } from "@/lib/games";

// One-time seed data. The live source of truth is MongoDB — run `pnpm seed`
// to load these (slugs are generated from the name). Safe to edit after seeding.
export const seedGames: Omit<Game, "slug">[] = [
  {
    name: "Elden Ring",
    platform: "PC",
    status: "playing",
    genre: "RPG",
    hours: 60,
    comment:
      "Still exploring. The open world changes everything about how FromSoft games feel.",
  },
  {
    name: "Hollow Knight",
    platform: "PC",
    status: "completed",
    genre: "Metroidvania",
    hours: 38,
    rating: 10,
    comment: "Perfect. Best metroidvania ever made, and it's not close.",
    completedAt: "2025-04-10",
  },
  {
    name: "Celeste",
    platform: "PC",
    status: "completed",
    genre: "Platformer",
    hours: 12,
    rating: 10,
    comment:
      "The story hit harder than expected. A game about climbing a mountain and also yourself.",
    completedAt: "2025-03-22",
  },
  {
    name: "Dark Souls III",
    platform: "PC",
    status: "completed",
    genre: "RPG",
    hours: 55,
    rating: 9,
    comment:
      "Ringed City is one of the best DLCs ever made. The main game is a bit safe but still fantastic.",
    completedAt: "2025-02-14",
  },
  {
    name: "Disco Elysium",
    platform: "PC",
    status: "completed",
    genre: "RPG",
    hours: 40,
    rating: 10,
    comment:
      "Nothing else comes close to this writing. Changed how I think about games as a medium.",
    completedAt: "2025-01-30",
  },
  {
    name: "Hades",
    platform: "PC",
    status: "completed",
    genre: "Roguelite",
    hours: 60,
    rating: 9,
    comment:
      "The roguelite that made the genre click for me. Story through repetition is genius.",
    completedAt: "2024-12-05",
  },
  {
    name: "Cyberpunk 2077",
    platform: "PC",
    status: "dropped",
    genre: "RPG",
    hours: 20,
    comment:
      "Came back after the patches. Better, but the gameplay loop still doesn't grab me.",
  },
  {
    name: "Baldur's Gate 3",
    platform: "PC",
    status: "pending",
    genre: "RPG",
    comment: "Everyone says it's unmissable. It's in the queue.",
  },
  {
    name: "Sekiro",
    platform: "PC",
    status: "pending",
    genre: "Action",
    comment: "Started once, got destroyed, put it down. Will go back.",
  },
  {
    name: "Blasphemous",
    platform: "PC",
    status: "dropped",
    genre: "Metroidvania",
    hours: 8,
    comment: "Beautiful art, frustrating design. Might try again someday.",
  },
];
