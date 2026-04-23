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
  category: "oud" | "floral" | "musk";
  image: string;
  images: string[];
  featured: boolean;
  bestSeller: boolean;
  notes: { top: string; heart: string; base: string };
  reviews: Review[];
  inStock: boolean;
}

export type ProductCategory = "oud" | "floral" | "musk";
