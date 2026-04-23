import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schema";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "48wtnv7j",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  schema,
  plugins: [structureTool()],
});
