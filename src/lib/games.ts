import { getDb } from "./mongodb";

export type GameStatus = "playing" | "completed" | "dropped" | "pending";

export interface Game {
  slug: string;
  name: string;
  platform: string;
  status: GameStatus;
  genre: string;
  hours?: number;
  rating?: number; // out of 10
  comment?: string;
  completedAt?: string; // YYYY-MM-DD
}

const COLLECTION = "games";

async function collection() {
  const db = await getDb();
  return db.collection<Game>(COLLECTION);
}

/** Strip Mongo's _id and undefined optionals so results are plain, serializable objects. */
function toGame(doc: Game & { _id?: unknown }): Game {
  return {
    slug: doc.slug,
    name: doc.name,
    platform: doc.platform,
    status: doc.status,
    genre: doc.genre,
    ...(doc.hours !== undefined && { hours: doc.hours }),
    ...(doc.rating !== undefined && { rating: doc.rating }),
    ...(doc.comment && { comment: doc.comment }),
    ...(doc.completedAt && { completedAt: doc.completedAt }),
  };
}

export async function getAllGames(): Promise<Game[]> {
  const col = await collection();
  const docs = await col.find({}).toArray();
  return docs.map(toGame);
}

export async function getGame(slug: string): Promise<Game | null> {
  const col = await collection();
  const doc = await col.findOne({ slug });
  return doc ? toGame(doc) : null;
}

export async function slugExists(slug: string): Promise<boolean> {
  const col = await collection();
  return (await col.countDocuments({ slug }, { limit: 1 })) > 0;
}

export async function createGame(game: Game): Promise<void> {
  const col = await collection();
  await col.insertOne(game);
}

export async function updateGame(
  slug: string,
  updates: Partial<Game>,
): Promise<void> {
  const col = await collection();
  await col.updateOne({ slug }, { $set: updates });
}

export async function deleteGame(slug: string): Promise<void> {
  const col = await collection();
  await col.deleteOne({ slug });
}

// ---- derivations (pure) ----

export function pickCurrentlyPlaying(games: Game[]): Game | null {
  return games.find((g) => g.status === "playing") ?? null;
}

export function pickLastCompleted(games: Game[], limit = 5): Game[] {
  return games
    .filter((g) => g.status === "completed" && g.completedAt)
    .sort((a, b) => ((b.completedAt ?? "") > (a.completedAt ?? "") ? 1 : -1))
    .slice(0, limit);
}

export function computeGameStats(games: Game[]): {
  total: number;
  hours: number;
  completed: number;
} {
  return {
    total: games.length,
    hours: games.reduce((sum, g) => sum + (g.hours ?? 0), 0),
    completed: games.filter((g) => g.status === "completed").length,
  };
}
