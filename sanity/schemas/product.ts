import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short description shown on product cards (max 100 chars)",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "price",
      title: "Base Price (₹)",
      type: "number",
      description: "Price for the default/smallest size",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "bestSeller",
      title: "Best Seller",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Primary Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      description: "Define available bottle sizes and their price additions",
      of: [
        {
          type: "object",
          name: "sizeOption",
          fields: [
            { name: "label", title: "Display Label", type: "string" }, // e.g. "3ml"
            { name: "value", title: "Size Value", type: "string" },    // e.g. "3ml"
            { name: "price", title: "Additional Price (₹)", type: "number", initialValue: 0 },
          ],
          preview: {
            select: { title: "label", subtitle: "price" },
            prepare(selection) {
              const data = selection as { title?: string; subtitle?: number };
              return { title: data.title ?? "", subtitle: `+₹${data.subtitle ?? 0}` };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.custom(async (sizes, context) => {
          const ctx = context as {
            document?: { category?: unknown };
          };
          const rawCat = ctx?.document?.category;
          let catRef: string | undefined;
          if (typeof rawCat === "string") {
            catRef = rawCat as string;
          } else if (typeof rawCat === "object" && rawCat !== null && "_ref" in (rawCat as object)) {
            catRef = (rawCat as { _ref?: unknown })._ref as string | undefined;
          }
          if (!catRef) return true;
          try {
            const client = context.getClient({ apiVersion: "2024-01-01" });
            const cat = await client.getDocument(catRef);
            const attarAllowed = ["6ml", "12ml"];
            const perfumeAllowed = ["30ml"];

            if (cat?.slug?.current === "attar" || (cat?.name && String(cat.name).toLowerCase() === "attar")) {
              const invalid = (sizes || []).filter((s: unknown) => {
                const val = typeof s === "object" && s !== null && "value" in s ? (s as { value?: unknown }).value : undefined;
                return typeof val !== "string" || !attarAllowed.includes(val);
              });
              if (invalid.length) return "Attar products can only have sizes 6ml or 12ml.";
            }

            if (cat?.slug?.current === "perfume" || (cat?.name && String(cat.name).toLowerCase() === "perfume")) {
              const invalid = (sizes || []).filter((s: unknown) => {
                const val = typeof s === "object" && s !== null && "value" in s ? (s as { value?: unknown }).value : undefined;
                return typeof val !== "string" || !perfumeAllowed.includes(val);
              });
              if (invalid.length) return "Perfume products can only have size 30ml.";
            }

            return true;
          } catch {
            return true;
          }
        }),
    }),
    defineField({
      name: "notes",
      title: "Fragrance Notes",
      type: "object",
      fields: [
        { name: "top", title: "Top Notes", type: "string", description: "e.g. Bergamot, Saffron" },
        { name: "heart", title: "Heart Notes", type: "string", description: "e.g. Rose, Jasmine" },
        { name: "base", title: "Base Notes", type: "string", description: "e.g. Oud, Sandalwood" },
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
      description: "Optional. Custom title for search engines. Falls back to product name.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 3,
      description: "Optional. Custom description for search engines. Falls back to tagline.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "tagline",
    },
  },
});
