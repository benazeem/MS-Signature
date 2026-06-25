import { Product } from "@/types/product.types";

export const products: Product[] = [
  // ═══════════════════════════════════════
  //  ATTARS (base ₹349 for 6ml)
  // ═══════════════════════════════════════
  {
    id: "1",
    slug: "black-opium-attar",
    name: "Black Opium Attar",
    tagline: "Bold, Sensual & Addictive",
    description:
      "Black Opium is a captivating fragrance that combines the intensity of black coffee with the sweetness of vanilla and delicate white floral notes. Modern, sensual, and addictive, it is perfect for those who love a bold and confident scent.",
    price: 349,
    category: "attar",
    image: "/assets/Attar/Black Opium Attar/Black_Opium_Attar_MS.jpg",
    images: [
      "/assets/Attar/Black Opium Attar/Black_Opium_Attar_MS.jpg",
      "/assets/Attar/Black Opium Attar/Black_Opium_Attar_MS_Signature.jpg",
    ],
    featured: true,
    bestSeller: true,
    notes: {
      top: "Black Coffee, Pink Pepper",
      heart: "Jasmine, Orange Blossom",
      base: "Vanilla, Cedarwood, Cashmere Wood",
    },
    sizes: [
      { label: "6ml", value: "6ml", price: 0 },
      { label: "12ml", value: "12ml", price: 250 },
      { label: "30ml", value: "30ml", price: 750 },
    ],
    inStock: true,
    metaTitle: "Black Opium Attar | MS Signature Scents – Bold Coffee & Vanilla Fragrance",
    metaDescription:
      "Shop Black Opium Attar by MS Signature Scents. A captivating blend of black coffee, vanilla & white florals. Long-lasting, sensual attar for confident women.",
    reviews: [],
  },
  {
    id: "2",
    slug: "oud-grand-attar",
    name: "Oud Grand Attar",
    tagline: "Deep, Sophisticated & Refined",
    description:
      "Oud Grand is a luxurious oriental fragrance crafted with rich oud wood, warm spices, and smooth amber accords. Deep, sophisticated, and long-lasting, it embodies elegance and refinement for special occasions and evening wear.",
    price: 349,
    category: "attar",
    image: "/assets/Attar/Oud Grand Attar/Oud_Grand_Attar_MS.jpg",
    images: [
      "/assets/Attar/Oud Grand Attar/Oud_Grand_Attar_MS.jpg",
      "/assets/Attar/Oud Grand Attar/Oud_Grand_Attar_MS_Signature.jpg",
    ],
    featured: true,
    bestSeller: true,
    notes: {
      top: "Saffron, Cardamom, Bergamot",
      heart: "Oud Wood, Rose, Amber",
      base: "Sandalwood, Musk, Vetiver",
    },
    sizes: [
      { label: "6ml", value: "6ml", price: 0 },
      { label: "12ml", value: "12ml", price: 250 },
      { label: "30ml", value: "30ml", price: 750 },
    ],
    inStock: true,
    metaTitle: "Oud Grand Attar | MS Signature Scents – Luxurious Oud & Amber Fragrance",
    metaDescription:
      "Discover Oud Grand Attar by MS Signature Scents. A premium oud wood fragrance with warm spices & amber. Perfect for special occasions. Shop now.",
    reviews: [],
  },
  {
    id: "3",
    slug: "amir-al-oudh-attar",
    name: "Amir Al Oudh Attar",
    tagline: "Powerful, Warm & Inviting",
    description:
      "Amir Al Oudh is a rich and comforting fragrance that blends smoky oud, warm woods, vanilla, and amber notes. Its distinctive oriental character creates a memorable scent experience that is both powerful and inviting.",
    price: 349,
    category: "attar",
    image: "/assets/Attar/Amir Al Oudh/Amir_Al_Oudh_MS.jpg",
    images: [
      "/assets/Attar/Amir Al Oudh/Amir_Al_Oudh_MS.jpg",
      "/assets/Attar/Amir Al Oudh/Amir_Al_Oudh_MS_Signature.jpg",
    ],
    featured: true,
    bestSeller: false,
    notes: {
      top: "Smoky Oud, Black Pepper",
      heart: "Warm Woods, Amber",
      base: "Vanilla, Musk, Benzoin",
    },
    sizes: [
      { label: "6ml", value: "6ml", price: 0 },
      { label: "12ml", value: "12ml", price: 250 },
      { label: "30ml", value: "30ml", price: 750 },
    ],
    inStock: true,
    metaTitle: "Amir Al Oudh Attar | MS Signature Scents – Rich Oud & Vanilla Fragrance",
    metaDescription:
      "Buy Amir Al Oudh Attar from MS Signature Scents. A rich blend of smoky oud, vanilla & amber. Oriental luxury in every drop. Order online today.",
    reviews: [],
  },
  {
    id: "4",
    slug: "fortune-attar",
    name: "Fortune Attar",
    tagline: "Fresh, Confident & Stylish",
    description:
      "Fortune is a fresh and energetic fragrance featuring bright citrus notes, aromatic accords, and a refined woody base. Designed for everyday wear, it offers a clean, confident, and effortlessly stylish fragrance profile.",
    price: 349,
    category: "attar",
    image: "/assets/Attar/Fortune Attar/Fortune_Attar_MS.jpg",
    images: [
      "/assets/Attar/Fortune Attar/Fortune_Attar_MS.jpg",
      "/assets/Attar/Fortune Attar/Fortune_Attar_MS_Signature.jpg",
    ],
    featured: false,
    bestSeller: false,
    notes: {
      top: "Lemon, Bergamot, Green Apple",
      heart: "Lavender, Geranium, Sage",
      base: "Cedarwood, White Musk, Amber",
    },
    sizes: [
      { label: "6ml", value: "6ml", price: 0 },
      { label: "12ml", value: "12ml", price: 250 },
      { label: "30ml", value: "30ml", price: 750 },
    ],
    inStock: true,
    metaTitle: "Fortune Attar | MS Signature Scents – Fresh Citrus & Woody Fragrance",
    metaDescription:
      "Shop Fortune Attar by MS Signature Scents. A fresh, energetic blend of citrus, aromatics & refined woods. Perfect for everyday confidence. Order now.",
    reviews: [],
  },
  {
    id: "5",
    slug: "gucci-flora-attar",
    name: "Gucci Flora Attar",
    tagline: "Graceful, Romantic & Timeless",
    description:
      "Gucci Flora is a graceful floral fragrance inspired by blooming gardens and feminine elegance. Featuring delicate floral bouquets, soft fruity notes, and subtle musk, it delivers a fresh, romantic, and timeless scent suitable for any occasion.",
    price: 349,
    category: "attar",
    image: "/assets/Attar/Gucci Flora Attar/Gucci_Flora_Attar_MS.jpg",
    images: [
      "/assets/Attar/Gucci Flora Attar/Gucci_Flora_Attar_MS.jpg",
      "/assets/Attar/Gucci Flora Attar/Gucci_Flora_Attar_MS_Signature.jpg",
    ],
    featured: true,
    bestSeller: true,
    notes: {
      top: "Peony, Mandarin, Pink Pepper",
      heart: "Rose, Jasmine, Gardenia",
      base: "Patchouli, Musk, Sandalwood",
    },
    sizes: [
      { label: "6ml", value: "6ml", price: 0 },
      { label: "12ml", value: "12ml", price: 250 },
      { label: "30ml", value: "30ml", price: 750 },
    ],
    inStock: true,
    metaTitle: "Gucci Flora Attar | MS Signature Scents – Elegant Floral Fragrance",
    metaDescription:
      "Discover Gucci Flora Attar by MS Signature Scents. A graceful floral blend of rose, jasmine & peony. Timeless feminine elegance. Shop online now.",
    reviews: [],
  },

  // ═══════════════════════════════════════
  //  PERFUMES (₹449 flat)
  // ═══════════════════════════════════════
  {
    id: "6",
    slug: "black-opium-perfume",
    name: "Black Opium Perfume",
    tagline: "Bold, Sensual & Addictive",
    description:
      "Black Opium is a captivating fragrance that combines the intensity of black coffee with the sweetness of vanilla and delicate white floral notes. Modern, sensual, and addictive, it is perfect for those who love a bold and confident scent.",
    price: 449,
    category: "perfume",
    image: "/assets/Attar/Black Opium Perfume/Black_Opium_Perfume_MS.jpg",
    images: [
      "/assets/Attar/Black Opium Perfume/Black_Opium_Perfume_MS.jpg",
      "/assets/Attar/Black Opium Perfume/Black_Opium_Perfume_MS_Signature.jpg",
    ],
    featured: true,
    bestSeller: true,
    notes: {
      top: "Black Coffee, Pink Pepper",
      heart: "Jasmine, Orange Blossom",
      base: "Vanilla, Cedarwood, Cashmere Wood",
    },
    inStock: true,
    metaTitle: "Black Opium Perfume | MS Signature Scents – Bold Coffee & Vanilla Spray",
    metaDescription:
      "Shop Black Opium Perfume by MS Signature Scents. Captivating coffee & vanilla fragrance in a premium spray. Long-lasting, modern & sensual. Order now.",
    reviews: [],
  },
  {
    id: "7",
    slug: "oud-grand-perfume",
    name: "Oud Grand Perfume",
    tagline: "Deep, Sophisticated & Refined",
    description:
      "Oud Grand is a luxurious oriental fragrance crafted with rich oud wood, warm spices, and smooth amber accords. Deep, sophisticated, and long-lasting, it embodies elegance and refinement for special occasions and evening wear.",
    price: 449,
    category: "perfume",
    image: "/assets/Attar/Oud Grand Perfume/Oud_Grand_Perfume_MS.jpg",
    images: [
      "/assets/Attar/Oud Grand Perfume/Oud_Grand_Perfume_MS.jpg",
      "/assets/Attar/Oud Grand Perfume/Oud_Grand_Perfume_MS_Signature.jpg",
    ],
    featured: true,
    bestSeller: false,
    notes: {
      top: "Saffron, Cardamom, Bergamot",
      heart: "Oud Wood, Rose, Amber",
      base: "Sandalwood, Musk, Vetiver",
    },
    inStock: true,
    metaTitle: "Oud Grand Perfume | MS Signature Scents – Luxurious Oud & Amber Spray",
    metaDescription:
      "Discover Oud Grand Perfume by MS Signature Scents. Premium oud wood, warm spices & amber in a long-lasting spray. Perfect for evening wear. Shop now.",
    reviews: [],
  },
  {
    id: "8",
    slug: "amir-al-oudh-perfume",
    name: "Amir Al Oudh Perfume",
    tagline: "Powerful, Warm & Inviting",
    description:
      "Amir Al Oudh is a rich and comforting fragrance that blends smoky oud, warm woods, vanilla, and amber notes. Its distinctive oriental character creates a memorable scent experience that is both powerful and inviting.",
    price: 449,
    category: "perfume",
    image: "/assets/Attar/Amir Al Oudh Perfume/Amir_Al_Oudh_Perfume_MS.png",
    images: [
      "/assets/Attar/Amir Al Oudh Perfume/Amir_Al_Oudh_Perfume_MS.png",
      "/assets/Attar/Amir Al Oudh Perfume/Amir_Al_Oudh_Perfume_MS_Signature.png",
    ],
    featured: false,
    bestSeller: false,
    notes: {
      top: "Smoky Oud, Black Pepper",
      heart: "Warm Woods, Amber",
      base: "Vanilla, Musk, Benzoin",
    },
    inStock: true,
    metaTitle: "Amir Al Oudh Perfume | MS Signature Scents – Rich Oud & Vanilla Spray",
    metaDescription:
      "Buy Amir Al Oudh Perfume from MS Signature Scents. Smoky oud, vanilla & amber in a premium perfume spray. Oriental luxury delivered to your door.",
    reviews: [],
  },
  {
    id: "9",
    slug: "fortune-perfume",
    name: "Fortune Perfume",
    tagline: "Fresh, Confident & Stylish",
    description:
      "Fortune is a fresh and energetic fragrance featuring bright citrus notes, aromatic accords, and a refined woody base. Designed for everyday wear, it offers a clean, confident, and effortlessly stylish fragrance profile.",
    price: 449,
    category: "perfume",
    image: "/assets/Attar/Fortune Perfume/Fortune_Perfume_MS.jpg",
    images: [
      "/assets/Attar/Fortune Perfume/Fortune_Perfume_MS.jpg",
      "/assets/Attar/Fortune Perfume/Fortune_Perfume_MS_Signature.jpg",
    ],
    featured: false,
    bestSeller: false,
    notes: {
      top: "Lemon, Bergamot, Green Apple",
      heart: "Lavender, Geranium, Sage",
      base: "Cedarwood, White Musk, Amber",
    },
    inStock: true,
    metaTitle: "Fortune Perfume | MS Signature Scents – Fresh Citrus & Woody Spray",
    metaDescription:
      "Shop Fortune Perfume by MS Signature Scents. Fresh citrus, aromatics & refined woody base. Clean, confident everyday fragrance. Order online now.",
    reviews: [],
  },
  {
    id: "10",
    slug: "gucci-flora-perfume",
    name: "Gucci Flora Perfume",
    tagline: "Graceful, Romantic & Timeless",
    description:
      "Gucci Flora is a graceful floral fragrance inspired by blooming gardens and feminine elegance. Featuring delicate floral bouquets, soft fruity notes, and subtle musk, it delivers a fresh, romantic, and timeless scent suitable for any occasion.",
    price: 449,
    category: "perfume",
    image: "/assets/Attar/Gucci Flora Perfume/Gucci_Flora_Perfume_MS.jpg",
    images: [
      "/assets/Attar/Gucci Flora Perfume/Gucci_Flora_Perfume_MS.jpg",
      "/assets/Attar/Gucci Flora Perfume/Gucci_Flora_Perfume_MS_Signature.jpg",
    ],
    featured: true,
    bestSeller: true,
    notes: {
      top: "Peony, Mandarin, Pink Pepper",
      heart: "Rose, Jasmine, Gardenia",
      base: "Patchouli, Musk, Sandalwood",
    },
    inStock: true,
    metaTitle: "Gucci Flora Perfume | MS Signature Scents – Elegant Floral Spray",
    metaDescription:
      "Discover Gucci Flora Perfume by MS Signature Scents. A graceful floral spray with rose, jasmine & peony. Timeless feminine elegance. Shop now.",
    reviews: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}
