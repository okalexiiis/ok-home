"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPost,
  deletePost,
  slugExists,
  slugify,
  updatePost,
} from "@/lib/thoughts";
import { requireAuth } from "../actions";

export type PostFormState = { error: string };

export async function savePost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const date =
    String(formData.get("date") ?? "").trim() ||
    new Date().toISOString().slice(0, 10);
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .flatMap((t) => {
      const r = t.trim().replace(/^#/, "");
      return r ? [r] : [];
    });

  if (!title) return { error: "title is required" };
  if (!body) return { error: "body is required" };

  if (originalSlug) {
    await updatePost(originalSlug, { title, body, excerpt, date, tags });
    revalidatePath(`/thoughts/${originalSlug}`);
  } else {
    const slug = slugify(title);
    if (!slug) return { error: "could not generate a slug from that title" };
    if (await slugExists(slug)) {
      return { error: `a post with the slug "${slug}" already exists` };
    }
    await createPost({ slug, title, body, excerpt, date, tags });
    revalidatePath(`/thoughts/${slug}`);
  }

  revalidatePath("/thoughts");
  revalidatePath("/dashboard/thoughts");
  redirect("/dashboard/thoughts");
}

export async function removePost(formData: FormData) {
  await requireAuth();
  const slug = String(formData.get("slug") ?? "").trim();
  if (slug) {
    await deletePost(slug);
    revalidatePath("/thoughts");
    revalidatePath(`/thoughts/${slug}`);
    revalidatePath("/dashboard/thoughts");
  }
}
