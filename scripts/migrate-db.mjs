/**
 * Applies schema to Aiven PostgreSQL (works around Prisma CLI SSL issues).
 * Run: pnpm db:migrate
 */
import pg from "pg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rawUrl = process.env.DATABASE_URL;
if (!rawUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, "").replace(/\?$/, "");

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const sql = readFileSync(join(__dirname, "init-schema.sql"), "utf8");

  await client.connect();
  console.log("Connected to database");

  await client.query(sql);
  console.log("Schema applied successfully.");

  await client.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
