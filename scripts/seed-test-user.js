/**
 * Seed test user via Prisma (requires DATABASE_URL + working SSL in lib/db.ts).
 * Prefer: node scripts/seed-test-user-direct.js
 */
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const fs = require("fs");
const path = require("path");

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

const rawUrl = process.env.DATABASE_URL || "";
const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, "").replace(/\?$/, "");

const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "jethrojerrybj@gmail.com";
  const password = "Seun5757@";

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      plan: "PREMIUM",
      activePlanPurchased: true,
      passwordHash: password,
      showAds: false,
      isAdmin: true,
    },
    create: {
      email,
      name: "David Olaoluwa",
      passwordHash: password,
      plan: "PREMIUM",
      activePlanPurchased: true,
      showAds: false,
      isAdmin: true,
    },
  });

  console.log("Seeded:", {
    email: user.email,
    plan: user.plan,
    showAds: user.showAds,
    isAdmin: user.isAdmin,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
