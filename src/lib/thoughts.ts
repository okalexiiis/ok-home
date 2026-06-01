import { getDb } from "./mongodb";

export interface Post {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  excerpt: string;
  /** body in plain text — paragraphs separated by blank lines, "## " for subheadings */
  body: string;
}

const COLLECTION = "thoughts";

async function collection() {
  const db = await getDb();
  return db.collection<Post>(COLLECTION);
}

/** Strip Mongo's _id so results are plain, client-serializable objects. */
function toPost(doc: Post & { _id?: unknown }): Post {
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.date,
    tags: doc.tags,
    excerpt: doc.excerpt,
    body: doc.body,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const col = await collection();
  const docs = await col.find({}).sort({ date: -1 }).toArray();
  return docs.map(toPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  const col = await collection();
  const doc = await col.findOne({ slug });
  return doc ? toPost(doc) : null;
}

export async function slugExists(slug: string): Promise<boolean> {
  const col = await collection();
  return (await col.countDocuments({ slug }, { limit: 1 })) > 0;
}

export async function createPost(post: Post): Promise<void> {
  const col = await collection();
  await col.insertOne(post);
}

export async function updatePost(
  slug: string,
  updates: Partial<Post>,
): Promise<void> {
  const col = await collection();
  await col.updateOne({ slug }, { $set: updates });
}

export async function deletePost(slug: string): Promise<void> {
  const col = await collection();
  await col.deleteOne({ slug });
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
