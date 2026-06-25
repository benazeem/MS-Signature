export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: "attar" | "perfume";
  image: string;
  images: string[];
  featured: boolean;
  bestSeller: boolean;
  notes: { top: string; heart: string; base: string };
  sizes?: { label: string; value: string; price: number }[];
  reviews: Review[];
  inStock: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export type ProductCategory = "attar" | "perfume";
