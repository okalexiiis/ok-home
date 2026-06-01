const dbName = process.env.MONGODB_DB ?? "okhome";

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<import("mongodb").MongoClient>;
};

async function getClientPromise(): Promise<import("mongodb").MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");
  if (!globalForMongo._mongoClientPromise) {
    const { MongoClient } = await import("mongodb");
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<import("mongodb").Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
