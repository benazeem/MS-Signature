export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  featured: boolean;
  bestSeller: boolean;
  image: string;
  images: string[];
  category: string;
  categoryName: string;
  notes?: {
    top: string;
    heart: string;
    base: string;
  };
  sizes?: Array<{
    label: string;
    value: string;
    price: number;
  }>;
  inStock: boolean;
}

export interface SanityCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}
