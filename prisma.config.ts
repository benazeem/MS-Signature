import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url:
      process.env.NEON_DIRECT_URL ??
      process.env.NEON_DATABASE_URL ??
      process.env.DIRECT_URL ??
      process.env.DATABASE_URL,
  },
});
