"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createGame,
  deleteGame,
  type GameStatus,
  slugExists,
  updateGame,
} from "@/lib/games";
import { slugify } from "@/lib/slug";
import { requireAuth } from "../actions";

export type GameFormState = { error: string };

function num(formData: FormData, key: string): number | undefined {
  const raw = String(formData.get(key) ?? "").trim();
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export async function saveGame(
  _prev: GameFormState,
  formData: FormData,
): Promise<GameFormState> {
  await requireAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const platform = String(formData.get("platform") ?? "").trim();
  const genre = String(formData.get("genre") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim() as GameStatus;
  const comment = String(formData.get("comment") ?? "").trim();
  const completedAt = String(formData.get("completedAt") ?? "").trim();
  const hours = num(formData, "hours");
  const rating = num(formData, "rating");

  if (!name) return { error: "name is required" };
  if (!platform) return { error: "platform is required" };
  if (!genre) return { error: "genre is required" };

  const fields = {
    name,
    platform,
    genre,
    status,
    ...(comment && { comment }),
    ...(completedAt && { completedAt }),
    ...(hours !== undefined && { hours }),
    ...(rating !== undefined && { rating }),
  };

  if (originalSlug) {
    await updateGame(originalSlug, fields);
  } else {
    const slug = slugify(name);
    if (!slug) return { error: "could not generate a slug from that name" };
    if (await slugExists(slug)) {
      return { error: `a game with the slug "${slug}" already exists` };
    }
    await createGame({ slug, ...fields });
  }

  revalidatePath("/games");
  revalidatePath("/dashboard/games");
  redirect("/dashboard/games");
}

export async function removeGame(formData: FormData) {
  await requireAuth();
  const slug = String(formData.get("slug") ?? "").trim();
  if (slug) {
    await deleteGame(slug);
    revalidatePath("/games");
    revalidatePath("/dashboard/games");
  }
}
