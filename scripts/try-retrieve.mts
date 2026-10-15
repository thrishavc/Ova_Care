// OWNER: Member 3. Quick manual check of retrieve():
//   npm run retrieve:test                       runs the built-in sample queries
//   npm run retrieve:test -- "my search words"  runs your own query

import { retrieve } from "@/lib/db/retrieve";
import { closeDb, getDb } from "@/lib/db/client";

const queries = process.argv.slice(2).length
  ? [process.argv.slice(2).join(" ")]
  : [
      "periods late 3 months acne",
      "irregular periods weight gain facial hair",
      "very painful periods",
      "I feel tired", // should usually find nothing relevant
    ];

try {
  const db = await getDb();
  const count = await db.collection("knowledge_chunks").countDocuments();
  console.log(`Connected to "${db.databaseName}" — knowledge_chunks has ${count} chunks.\n`);
} catch (err) {
  console.error(`Could not connect to MongoDB: ${(err as Error).message}`);
  console.error("Check MONGODB_URI in .env.local (user:password@cluster, no < >) and Atlas Network Access.");
  process.exit(1);
}

for (const q of queries) {
  const chunks = await retrieve(q);
  console.log(`"${q}" → ${chunks.length} result(s)`);
  for (const c of chunks) console.log(`   [${c.topic}] ${c.sourceTitle} — ${c.text.slice(0, 70).replace(/\s+/g, " ")}…`);
  console.log();
}
await closeDb();
