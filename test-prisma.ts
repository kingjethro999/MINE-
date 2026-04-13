import prisma from "./lib/db";
async function main() {
  try {
    const res = await prisma.user.count();
    console.log("Users:", res);
  } catch (err) {
    console.error("Prisma error:", err);
  }
}
main();
