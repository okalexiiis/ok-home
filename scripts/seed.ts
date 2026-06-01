import { MongoClient } from "mongodb";
import { seedItems } from "../src/app/consumed/data";
import { seedGames } from "../src/app/games/data";
import { seedPosts } from "../src/app/thoughts/posts";
import { slugify } from "../src/lib/slug";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "okhome";

async function seedCollection<T extends { slug: string }>(
  client: MongoClient,
  name: string,
  docs: T[],
): Promise<void> {
  const col = client.db(dbName).collection(name);
  await col.createIndex({ slug: 1 }, { unique: true });

  let inserted = 0;
  for (const doc of docs) {
    const res = await col.updateOne(
      { slug: doc.slug },
      { $setOnInsert: doc },
      { upsert: true },
    );
    if (res.upsertedCount) inserted++;
  }
  console.log(
    `  ${name}: seeded ${inserted} new, ${docs.length - inserted} already existed.`,
  );
}

async function main() {
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");

  const client = new MongoClient(uri);
  await client.connect();
  console.log(`Seeding "${dbName}"...`);

  await seedCollection(client, "thoughts", seedPosts);

  await seedCollection(
    client,
    "games",
    seedGames.map((g) => ({ ...g, slug: slugify(g.name) })),
  );

  await seedCollection(
    client,
    "consumed",
    seedItems.map((i) => ({ ...i, slug: slugify(i.name) })),
  );

  await client.close();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
