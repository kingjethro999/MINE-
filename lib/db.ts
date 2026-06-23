import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const prismaClientSingleton = () => {
  const rawUrl = process.env.DATABASE_URL ?? "";
  const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, "").replace(/\?$/, "");

  const adapter = new PrismaPg({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
}

const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaGlobal = prisma