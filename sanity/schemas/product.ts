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
