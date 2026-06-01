import { getDb } from "./mongodb";

export interface MusicPick {
  type: "song" | "album" | "artist";
  title: string;
  artist?: string;
  spotifyUrl?: string;
  comment?: string;
  updatedAt: string;
}

export interface MusicPlaylist {
  name: string;
  spotifyUrl: string;
  comment?: string;
  updatedAt: string;
}

async function pickCollection() {
  const db = await getDb();
  return db.collection<MusicPick>("music_pick");
}

async function playlistCollection() {
  const db = await getDb();
  return db.collection<MusicPlaylist>("music_playlist");
}

function toPick(doc: MusicPick & { _id?: unknown }): MusicPick {
  return {
    type: doc.type,
    title: doc.title,
    ...(doc.artist !== undefined && { artist: doc.artist }),
    ...(doc.spotifyUrl !== undefined && { spotifyUrl: doc.spotifyUrl }),
    ...(doc.comment !== undefined && { comment: doc.comment }),
    updatedAt: doc.updatedAt,
  };
}

function toPlaylist(doc: MusicPlaylist & { _id?: unknown }): MusicPlaylist {
  return {
    name: doc.name,
    spotifyUrl: doc.spotifyUrl,
    ...(doc.comment !== undefined && { comment: doc.comment }),
    updatedAt: doc.updatedAt,
  };
}

export async function getCurrentPick(): Promise<MusicPick | null> {
  const col = await pickCollection();
  const doc = await col.findOne({});
  return doc ? toPick(doc) : null;
}

export async function setCurrentPick(
  data: Omit<MusicPick, "updatedAt">,
): Promise<void> {
  const col = await pickCollection();
  await col.updateOne(
    {},
    { $set: { ...data, updatedAt: new Date().toISOString().slice(0, 10) } },
    { upsert: true },
  );
}

export async function getCurrentPlaylist(): Promise<MusicPlaylist | null> {
  const col = await playlistCollection();
  const doc = await col.findOne({});
  return doc ? toPlaylist(doc) : null;
}

export async function setCurrentPlaylist(
  data: Omit<MusicPlaylist, "updatedAt">,
): Promise<void> {
  const col = await playlistCollection();
  await col.updateOne(
    {},
    { $set: { ...data, updatedAt: new Date().toISOString().slice(0, 10) } },
    { upsert: true },
  );
}
