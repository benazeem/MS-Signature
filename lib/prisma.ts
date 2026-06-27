import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

type PrismaSingleton = PrismaClient;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaSingleton };
const databaseUrl = process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL;

const prisma = globalForPrisma.prisma ?? (() => {
  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
})();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
export { prisma };

export async function getPrisma() {
  return prisma;
}
