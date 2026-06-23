const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const envPath = path.join(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
      }
    });
}

function getConnectionString() {
  const raw = process.env.DATABASE_URL || "";
  return raw.replace(/[?&]sslmode=[^&]*/g, "").replace(/\?$/, "");
}

async function main() {
  const email = "jethrojerrybj@gmail.com";
  const password = "Seun5757@";
  const name = "David Olaoluwa";

  const client = new Client({
    connectionString: getConnectionString(),
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log(`Connected. Seeding: ${email}`);

    const existing = await client.query('SELECT id FROM "User" WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      await client.query(
        `UPDATE "User" SET
          plan = $1,
          "activePlanPurchased" = $2,
          "passwordHash" = $3,
          "showAds" = $4,
          "isAdmin" = $5,
          "updatedAt" = NOW()
        WHERE email = $6`,
        ["PREMIUM", true, password, false, true, email]
      );
      console.log("Updated existing user (PREMIUM, showAds=false, isAdmin=true)");
    } else {
      const id = randomUUID();
      await client.query(
        `INSERT INTO "User" (
          id, email, name, "passwordHash", plan,
          "activePlanPurchased", "isAdmin", "showAds",
          "coinsBalance", "totalEarned", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, 0, NOW(), NOW())`,
        [id, email, name, password, "PREMIUM", true, true, false]
      );
      console.log("Created new user:", id);
    }

    const check = await client.query(
      'SELECT email, plan, "showAds", "activePlanPurchased", "isAdmin" FROM "User" WHERE email = $1',
      [email]
    );
    console.log("User record:", check.rows[0]);
    console.log("Done. Login with:", email);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
