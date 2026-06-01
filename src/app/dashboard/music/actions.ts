"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCurrentPick, setCurrentPlaylist } from "@/lib/music-pick";
import { requireAuth } from "../actions";

export type PickFormState = { error: string };

const validTypes = ["song", "album", "artist"] as const;

export async function savePick(
  _prev: PickFormState,
  formData: FormData,
): Promise<PickFormState> {
  await requireAuth();

  const type = String(formData.get("type") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const artist = String(formData.get("artist") ?? "").trim() || undefined;
  const spotifyUrl =
    String(formData.get("spotifyUrl") ?? "").trim() || undefined;
  const comment = String(formData.get("comment") ?? "").trim() || undefined;

  if (!validTypes.includes(type as (typeof validTypes)[number]))
    return { error: "type is required" };
  if (!title) return { error: "title is required" };

  await setCurrentPick({
    type: type as (typeof validTypes)[number],
    title,
    artist,
    spotifyUrl,
    comment,
  });

  revalidatePath("/music");
  revalidatePath("/dashboard/music");
  revalidatePath("/dashboard");
  redirect("/dashboard/music");
}

export type PlaylistFormState = { error: string };

export async function savePlaylist(
  _prev: PlaylistFormState,
  formData: FormData,
): Promise<PlaylistFormState> {
  await requireAuth();

  const name = String(formData.get("name") ?? "").trim();
  const spotifyUrl = String(formData.get("spotifyUrl") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim() || undefined;

  if (!name) return { error: "name is required" };
  if (!spotifyUrl) return { error: "spotify url is required" };

  await setCurrentPlaylist({ name, spotifyUrl, comment });

  revalidatePath("/music");
  revalidatePath("/dashboard/music");
  redirect("/dashboard/music");
}
