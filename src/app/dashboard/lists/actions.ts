"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createList,
  deleteList,
  getList,
  slugExists,
  slugify,
  type Tier,
  updateList,
} from "@/lib/lists";
import { requireAuth } from "../actions";

export type ListFormState = { error: string };

const validContexts = ["games", "consumed", "music"] as const;
const validModes = ["list", "tiers"] as const;

export async function saveList(
  _prev: ListFormState,
  formData: FormData,
): Promise<ListFormState> {
  await requireAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const context = String(formData.get("context") ?? "").trim();
  const mode = String(formData.get("mode") ?? "list").trim();
  const description =
    String(formData.get("description") ?? "").trim() || undefined;

  if (!title) return { error: "title is required" };
  if (!validContexts.includes(context as (typeof validContexts)[number]))
    return { error: "context is required" };
  if (!validModes.includes(mode as (typeof validModes)[number]))
    return { error: "mode is required" };

  const ctx = context as (typeof validContexts)[number];
  const md = mode as (typeof validModes)[number];
  const updatedAt = new Date().toISOString().slice(0, 10);

  let items: string[] = [];
  const tiers: Tier[] = [];

  if (md === "list") {
    items = String(formData.get("items") ?? "")
      .split("\n")
      .flatMap((s) => {
        const r = s.trim();
        return r ? [r] : [];
      });
  } else {
    for (let i = 0; i < 5; i++) {
      const label = String(formData.get(`tier_label_${i}`) ?? "").trim();
      const tierItems = String(formData.get(`tier_items_${i}`) ?? "")
        .split(",")
        .flatMap((s) => {
          const r = s.trim();
          return r ? [r] : [];
        });
      if (label && tierItems.length > 0) {
        tiers.push({ label, items: tierItems });
      }
    }
  }

  if (originalSlug) {
    const existing = await getList(originalSlug);
    if (!existing) return { error: "list not found" };
    await updateList(originalSlug, {
      title,
      context: ctx,
      mode: md,
      items,
      tiers,
      description,
      updatedAt,
    });
    revalidatePath(`/${existing.context}`);
  } else {
    const slug = slugify(title);
    if (!slug) return { error: "could not generate slug from title" };
    if (await slugExists(slug))
      return { error: `slug "${slug}" already exists` };
    await createList({
      slug,
      title,
      context: ctx,
      mode: md,
      items,
      tiers,
      description,
      updatedAt,
    });
  }

  revalidatePath(`/${ctx}`);
  revalidatePath("/dashboard/lists");
  redirect("/dashboard/lists");
}

export async function removeList(formData: FormData) {
  await requireAuth();
  const slug = String(formData.get("slug") ?? "").trim();
  const context = String(formData.get("context") ?? "").trim();
  if (slug) {
    await deleteList(slug);
    revalidatePath(`/${context}`);
    revalidatePath("/dashboard/lists");
  }
}
