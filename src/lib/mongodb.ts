import { type Db, MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB ?? "okhome";

// Cache the connect() promise on globalThis so it survives dev hot-reloads and
// is reused across serverless invocations (one pool instead of one per request).
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

// Lazily create the connection so importing this module has no side effects
// (build-time module evaluation won't try to parse the URI or open a socket).
function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
