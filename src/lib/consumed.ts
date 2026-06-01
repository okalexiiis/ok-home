import { getDb } from "./mongodb";

export type ConsumedType = "manga" | "movie" | "show" | "anime" | "book";
export type ConsumedStatus = "completed" | "consuming" | "dropped" | "pending";

export interface ConsumedItem {
  slug: string;
  name: string;
  type: ConsumedType;
  status: ConsumedStatus;
  genres: string[];
  rating?: number;
  comment?: string;
  revisits?: number;
  completedAt?: string;
  /** position in "top picks" — 1 = best. Absent = not a pick. */
  pickRank?: number;
  // type-specific metadata
  year?: number;
  creator?: string; // author / director
  studio?: string; // studio / network
  episodes?: number;
  chapters?: number;
  volumes?: number;
}

const COLLECTION = "consumed";

async function collection() {
  const db = await getDb();
  return db.collection<ConsumedItem>(COLLECTION);
}

/** Strip Mongo's _id and undefined optionals so results are plain, serializable objects. */
function toItem(doc: ConsumedItem & { _id?: unknown }): ConsumedItem {
  return {
    slug: doc.slug,
    name: doc.name,
    type: doc.type,
    status: doc.status,
    genres: doc.genres ?? [],
    ...(doc.rating !== undefined && { rating: doc.rating }),
    ...(doc.comment && { comment: doc.comment }),
    ...(doc.revisits !== undefined && { revisits: doc.revisits }),
    ...(doc.completedAt && { completedAt: doc.completedAt }),
    ...(doc.pickRank !== undefined && { pickRank: doc.pickRank }),
    ...(doc.year !== undefined && { year: doc.year }),
    ...(doc.creator && { creator: doc.creator }),
    ...(doc.studio && { studio: doc.studio }),
    ...(doc.episodes !== undefined && { episodes: doc.episodes }),
    ...(doc.chapters !== undefined && { chapters: doc.chapters }),
    ...(doc.volumes !== undefined && { volumes: doc.volumes }),
  };
}

export async function getAllItems(): Promise<ConsumedItem[]> {
  const col = await collection();
  const docs = await col.find({}).toArray();
  return docs.map(toItem);
}

export async function getItem(slug: string): Promise<ConsumedItem | null> {
  const col = await collection();
  const doc = await col.findOne({ slug });
  return doc ? toItem(doc) : null;
}

export async function slugExists(slug: string): Promise<boolean> {
  const col = await collection();
  return (await col.countDocuments({ slug }, { limit: 1 })) > 0;
}

export async function createItem(item: ConsumedItem): Promise<void> {
  const col = await collection();
  await col.insertOne(item);
}

/**
 * Update an item. Keys present with a value are `$set`; keys present but
 * `undefined` are `$unset` (lets the dashboard clear optional fields).
 */
export async function updateItem(
  slug: string,
  updates: Partial<Record<keyof ConsumedItem, unknown>>,
): Promise<void> {
  const col = await collection();
  const set: Record<string, unknown> = {};
  const unset: Record<string, ""> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) unset[key] = "";
    else set[key] = value;
  }
  await col.updateOne(
    { slug },
    {
      ...(Object.keys(set).length > 0 && { $set: set }),
      ...(Object.keys(unset).length > 0 && { $unset: unset }),
    },
  );
}

export async function deleteItem(slug: string): Promise<void> {
  const col = await collection();
  await col.deleteOne({ slug });
}

// ---- derivations (pure) ----

export function pickCurrentlyConsuming(items: ConsumedItem[]): ConsumedItem[] {
  return items.filter((i) => i.status === "consuming");
}

export function pickLastCompleted(
  items: ConsumedItem[],
  limit = 5,
): ConsumedItem[] {
  return items
    .filter((i) => i.status === "completed" && i.completedAt)
    .sort((a, b) => ((b.completedAt ?? "") > (a.completedAt ?? "") ? 1 : -1))
    .slice(0, limit);
}

export function pickTopPicks(items: ConsumedItem[]): ConsumedItem[] {
  return items
    .filter((i) => i.pickRank !== undefined)
    .sort((a, b) => (a.pickRank ?? 0) - (b.pickRank ?? 0));
}

export function computeConsumedStats(items: ConsumedItem[]): {
  total: number;
  completed: number;
} {
  return {
    total: items.length,
    completed: items.filter((i) => i.status === "completed").length,
  };
}
