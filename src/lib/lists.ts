import { getDb } from "./mongodb";
import { slugify } from "./slug";

export { slugify };

export interface Tier {
  label: string;
  items: string[];
}

export interface ItemList {
  slug: string;
  title: string;
  context: "games" | "consumed" | "music";
  mode: "list" | "tiers";
  items: string[];
  tiers: Tier[];
  description?: string;
  updatedAt: string;
}

const COLLECTION = "lists";

async function collection() {
  const db = await getDb();
  return db.collection<ItemList>(COLLECTION);
}

function toList(doc: ItemList & { _id?: unknown }): ItemList {
  return {
    slug: doc.slug,
    title: doc.title,
    context: doc.context,
    mode: doc.mode,
    items: doc.items ?? [],
    tiers: doc.tiers ?? [],
    ...(doc.description !== undefined && { description: doc.description }),
    updatedAt: doc.updatedAt,
  };
}

export async function getAllLists(): Promise<ItemList[]> {
  const col = await collection();
  const docs = await col.find({}).sort({ updatedAt: -1 }).toArray();
  return docs.map(toList);
}

export async function getListsByContext(
  context: ItemList["context"],
): Promise<ItemList[]> {
  const col = await collection();
  const docs = await col.find({ context }).sort({ updatedAt: -1 }).toArray();
  return docs.map(toList);
}

export async function getList(slug: string): Promise<ItemList | null> {
  const col = await collection();
  const doc = await col.findOne({ slug });
  return doc ? toList(doc) : null;
}

export async function slugExists(slug: string): Promise<boolean> {
  const col = await collection();
  return (await col.countDocuments({ slug }, { limit: 1 })) > 0;
}

export async function createList(list: ItemList): Promise<void> {
  const col = await collection();
  await col.insertOne(list);
}

export async function updateList(
  slug: string,
  updates: Partial<ItemList>,
): Promise<void> {
  const col = await collection();
  await col.updateOne({ slug }, { $set: updates });
}

export async function deleteList(slug: string): Promise<void> {
  const col = await collection();
  await col.deleteOne({ slug });
}
