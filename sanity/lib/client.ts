import { createClient } from "next-sanity";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { SanityProduct, SanityCategory } from "@/types/sanity.types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-04-01",
  useCdn: true, // Use CDN to avoid session issues in dev unless explicitly needed
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

export const PRODUCTS_QUERY = `
  *[_type == "product"] | order(featured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    price,
    featured,
    bestSeller,
    "image": image.asset->url,
    "images": images[].asset->url,
    "category": category->slug.current,
    "categoryName": category->name,
    notes {
      top,
      heart,
      base
    },
    sizes[] {
      label,
      value,
      price
    },
    inStock
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    price,
    featured,
    bestSeller,
    "image": image.asset->url,
    "images": images[].asset->url,
    "category": category->slug.current,
    "categoryName": category->name,
    notes {
      top,
      heart,
      base
    },
    sizes[] {
      label,
      value,
      price
    },
    inStock
  }
`;

export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    price,
    bestSeller,
    "image": image.asset->url,
    "category": category->slug.current,
    inStock
  }
`;

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "image": image.asset->url
  }
`;

export async function getProducts() {
  return client.fetch<SanityProduct[]>(
    PRODUCTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getProductBySlug(slug: string) {
  return client.fetch<SanityProduct | null>(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export async function getFeaturedProducts() {
  return client.fetch<SanityProduct[]>(
    FEATURED_PRODUCTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getCategories() {
  return client.fetch<SanityCategory[]>(
    CATEGORIES_QUERY,
    {},
    { next: { revalidate: 300 } },
  );
}

