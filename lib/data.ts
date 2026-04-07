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
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "royal-oud",
    name: "Royal Oud",
    tagline: "The King of Fragrances",
    description:
      "A majestic blend of aged agarwood distilled through traditional hydro-distillation. Royal Oud opens with warm, woody depth and unfolds into a rich, smoky sweetness that lingers for hours. Sourced from the finest agarwood in Assam, this attar embodies centuries of perfumery heritage.",
    price: 2499,
    category: "oud",
    image: "/products/oud.png",
    images: ["/products/oud.png", "/products/collection.png"],
    featured: true,
    bestSeller: true,
    notes: { top: "Agarwood, Smoke", heart: "Amber, Leather", base: "Sandalwood, Musk" },
    reviews: [
      { id: "r1", name: "Ahmed K.", rating: 5, comment: "Absolutely divine. The oud is authentic and long-lasting.", date: "2025-12-15" },
      { id: "r2", name: "Faraz M.", rating: 5, comment: "This is the real deal. Been searching for genuine oud attar for years.", date: "2025-11-20" },
      { id: "r3", name: "Rashid S.", rating: 4, comment: "Rich and complex. Projection could be slightly stronger.", date: "2025-10-08" },
    ],
  },
  {
    id: "2",
    slug: "damascus-rose",
    name: "Damascus Rose",
    tagline: "Elegance in Every Drop",
    description:
      "Distilled from hand-picked Damascena roses at dawn, this attar captures the ephemeral beauty of fresh roses in concentrated perfume oil. Each 6ml bottle requires over 3,000 rose petals. A timeless floral that speaks of grace and refinement.",
    price: 1899,
    category: "floral",
    image: "/products/rose.png",
    images: ["/products/rose.png", "/products/collection.png"],
    featured: true,
    bestSeller: false,
    notes: { top: "Rose Petals, Green Leaf", heart: "Rose Absolute, Geranium", base: "Honey, Soft Musk" },
    reviews: [
      { id: "r4", name: "Aisha R.", rating: 5, comment: "Smells like a fresh rose garden in the morning. Beautiful.", date: "2025-12-01" },
      { id: "r5", name: "Mariam H.", rating: 4, comment: "Very natural and delicate. Perfect for everyday wear.", date: "2025-11-15" },
    ],
  },
  {
    id: "3",
    slug: "white-musk",
    name: "White Musk",
    tagline: "Pure & Serene",
    description:
      "A clean, ethereal musk attar that wraps you in soft warmth. White Musk is the quintessential minimalist fragrance — understated yet unforgettable. Crafted from botanical musks and aged for six months to achieve perfect balance.",
    price: 1299,
    category: "musk",
    image: "/products/musk.png",
    images: ["/products/musk.png", "/products/collection.png"],
    featured: true,
    bestSeller: true,
    notes: { top: "White Musk, Bergamot", heart: "Lily, Clean Cotton", base: "Cedarwood, Vanilla" },
    reviews: [
      { id: "r6", name: "Sara T.", rating: 5, comment: "My everyday attar. So clean and beautiful.", date: "2025-12-10" },
      { id: "r7", name: "Zain A.", rating: 5, comment: "Everyone asks what I'm wearing. Subtle but captivating.", date: "2025-10-25" },
    ],
  },
  {
    id: "4",
    slug: "golden-amber",
    name: "Golden Amber",
    tagline: "Warmth of the East",
    description:
      "A luxurious amber attar blended with rare resins and aged woods. Golden Amber radiates warmth and depth, enveloping you in a cocoon of oriental richness. Perfect for cold evenings and special occasions.",
    price: 1999,
    category: "oud",
    image: "/products/amber.png",
    images: ["/products/amber.png", "/products/collection.png"],
    featured: true,
    bestSeller: false,
    notes: { top: "Amber, Saffron", heart: "Labdanum, Benzoin", base: "Oud, Vanilla" },
    reviews: [
      { id: "r8", name: "Omar F.", rating: 5, comment: "The amber note is incredibly rich and warm.", date: "2025-11-30" },
    ],
  },
  {
    id: "5",
    slug: "mysore-sandalwood",
    name: "Mysore Sandalwood",
    tagline: "Liquid Gold of India",
    description:
      "Distilled from aged Mysore sandalwood, this attar is creamy, smooth, and impossibly refined. The oil has been aged for over two years in copper vessels, resulting in unparalleled depth and longevity.",
    price: 3499,
    category: "oud",
    image: "/products/sandalwood.png",
    images: ["/products/sandalwood.png", "/products/collection.png"],
    featured: false,
    bestSeller: true,
    notes: { top: "Sandalwood, Milk", heart: "Cream, Rose", base: "Wood, Earth" },
    reviews: [
      { id: "r9", name: "Imran K.", rating: 5, comment: "The finest sandalwood I've ever smelled. Worth every rupee.", date: "2025-12-20" },
      { id: "r10", name: "Vikram P.", rating: 5, comment: "Incredible quality. You can tell this is the real Mysore variety.", date: "2025-09-12" },
    ],
  },
  {
    id: "6",
    slug: "midnight-jasmine",
    name: "Midnight Jasmine",
    tagline: "Whispers of the Night",
    description:
      "Captured from jasmine flowers harvested at midnight when their scent is most potent. This intoxicating floral attar is both sensual and calming, with an almost hypnotic quality that lingers through the night.",
    price: 1699,
    category: "floral",
    image: "/products/jasmine.png",
    images: ["/products/jasmine.png", "/products/collection.png"],
    featured: true,
    bestSeller: false,
    notes: { top: "Jasmine, Night Air", heart: "Tuberose, Ylang", base: "White Musk, Sandalwood" },
    reviews: [
      { id: "r11", name: "Noor B.", rating: 4, comment: "Beautiful jasmine scent. Very authentic and natural.", date: "2025-10-15" },
    ],
  },
  {
    id: "7",
    slug: "kashmiri-saffron",
    name: "Kashmiri Saffron",
    tagline: "Precious & Rare",
    description:
      "An opulent attar infused with genuine Kashmiri saffron threads. This rare fragrance opens with a warm, spicy-sweet saffron note and dries down to a rich, honeyed base. Each batch is limited to 50 bottles.",
    price: 2999,
    category: "musk",
    image: "/products/saffron.png",
    images: ["/products/saffron.png", "/products/collection.png"],
    featured: false,
    bestSeller: false,
    notes: { top: "Saffron, Cardamom", heart: "Rose, Honey", base: "Amber, Musk" },
    reviews: [
      { id: "r12", name: "Yusuf D.", rating: 5, comment: "Luxurious and unique. The saffron opening is incredible.", date: "2025-12-05" },
      { id: "r13", name: "Ali M.", rating: 4, comment: "Very rich and warm. Perfect winter attar.", date: "2025-11-18" },
    ],
  },
  {
    id: "8",
    slug: "night-queen",
    name: "Night Queen",
    tagline: "Mystery in a Bottle",
    description:
      "Inspired by the rare Raat ki Rani flower that blooms only at night. This enchanting attar combines heady white florals with subtle spice. It captures the magic of warm summer nights in India.",
    price: 1599,
    category: "floral",
    image: "/products/rose.png",
    images: ["/products/rose.png", "/products/collection.png"],
    featured: false,
    bestSeller: false,
    notes: { top: "Night Queen, Green", heart: "Jasmine, Tuberose", base: "Vetiver, Musk" },
    reviews: [
      { id: "r14", name: "Priya S.", rating: 5, comment: "Absolutely magical scent. Takes me back to summer nights.", date: "2025-09-28" },
    ],
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
