// One shared MongoDB connection, reused across requests.
import { MongoClient, type Db } from "mongodb";

const DB_NAME = process.env.MONGODB_DB || "ovacare";

// Reuse the client across hot reloads in dev and across requests on the same serverless instance.
const globalForMongo = globalThis as unknown as { mongoClientPromise?: Promise<MongoClient> };

function getClient(): Promise<MongoClient> {
  if (!globalForMongo.mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not set (add it to .env.local)");
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5_000, maxPoolSize: 5 });
    globalForMongo.mongoClientPromise = client.connect().catch((err) => {
      // Let the next request try again instead of caching a failed connection.
      globalForMongo.mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo.mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  return (await getClient()).db(DB_NAME);
}

/** For scripts: close the shared connection so the process can exit. */
export async function closeDb() {
  const pending = globalForMongo.mongoClientPromise;
  globalForMongo.mongoClientPromise = undefined;
  if (pending) await (await pending).close();
}

export const COLLECTIONS = {
  knowledge: "knowledge_chunks",
  sessions: "sessions",
  diary: "diary_entries",
} as const;

export const VECTOR_INDEX = "knowledge_chunks_vector_index";
