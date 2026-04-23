import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

type PrismaSingleton = PrismaClient;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaSingleton };

const prisma = globalForPrisma.prisma ?? (() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
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
