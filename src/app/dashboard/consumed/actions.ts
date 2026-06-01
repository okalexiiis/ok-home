"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  type ConsumedStatus,
  type ConsumedType,
  createItem,
  deleteItem,
  slugExists,
  updateItem,
} from "@/lib/consumed";
import { slugify } from "@/lib/slug";
import { requireAuth } from "../actions";

export type ItemFormState = { error: string };

function num(formData: FormData, key: string): number | undefined {
  const raw = String(formData.get(key) ?? "").trim();
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

function str(formData: FormData, key: string): string | undefined {
  const raw = String(formData.get(key) ?? "").trim();
  return raw || undefined;
}

export async function saveItem(
  _prev: ItemFormState,
  formData: FormData,
): Promise<ItemFormState> {
  await requireAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim() as ConsumedType;
  const status = String(formData.get("status") ?? "").trim() as ConsumedStatus;
  const genres = String(formData.get("genres") ?? "")
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);

  if (!name) return { error: "name is required" };
  if (genres.length === 0) return { error: "at least one genre is required" };

  // All optional fields, undefined when empty (so edit can clear them).
  const optionals = {
    rating: num(formData, "rating"),
    comment: str(formData, "comment"),
    revisits: num(formData, "revisits"),
    completedAt: str(formData, "completedAt"),
    pickRank: num(formData, "pickRank"),
    year: num(formData, "year"),
    creator: str(formData, "creator"),
    studio: str(formData, "studio"),
    episodes: num(formData, "episodes"),
    chapters: num(formData, "chapters"),
    volumes: num(formData, "volumes"),
  };

  if (originalSlug) {
    await updateItem(originalSlug, {
      name,
      type,
      status,
      genres,
      ...optionals,
    });
  } else {
    const slug = slugify(name);
    if (!slug) return { error: "could not generate a slug from that name" };
    if (await slugExists(slug)) {
      return { error: `an item with the slug "${slug}" already exists` };
    }
    // Drop undefined keys so we don't insert null-ish fields.
    const compact = Object.fromEntries(
      Object.entries(optionals).filter(([, v]) => v !== undefined),
    );
    await createItem({ slug, name, type, status, genres, ...compact });
  }

  revalidatePath("/consumed");
  revalidatePath("/dashboard/consumed");
  redirect("/dashboard/consumed");
}

export async function removeItem(formData: FormData) {
  await requireAuth();
  const slug = String(formData.get("slug") ?? "").trim();
  if (slug) {
    await deleteItem(slug);
    revalidatePath("/consumed");
    revalidatePath("/dashboard/consumed");
  }
}
