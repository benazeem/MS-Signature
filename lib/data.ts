import { Product } from "@/types/product.types";

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
    image: "/products/oud.webp",
    images: ["/products/oud.webp", "/products/oud-team.webp"],
    featured: true,
    bestSeller: true,
    notes: {
      top: "Agarwood, Smoke",
      heart: "Amber, Leather",
      base: "Sandalwood, Musk",
    },
    inStock: true,
    reviews: [
      {
        id: "r1",
        userName: "Ahmed K.",
        rating: 5,
        comment: "Absolutely divine. The oud is authentic and long-lasting.",
        createdAt: "2025-12-15",
      },
      {
        id: "r2",
        userName: "Faraz M.",
        rating: 5,
        comment:
          "This is the real deal. Been searching for genuine oud attar for years.",
        createdAt: "2025-11-20",
      },
      {
        id: "r3",
        userName: "Rashid S.",
        rating: 4,
        comment: "Rich and complex. Projection could be slightly stronger.",
        createdAt: "2025-10-08",
      },
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
    image: "/products/rose.webp",
    images: ["/products/rose.webp", "/products/rose-team.webp"],
    featured: true,
    bestSeller: false,
    notes: {
      top: "Rose Petals, Green Leaf",
      heart: "Rose Absolute, Geranium",
      base: "Honey, Soft Musk",
    },
    reviews: [
      {
        id: "r4",
        userName: "Aisha R.",
        rating: 5,
        comment: "Smells like a fresh rose garden in the morning. Beautiful.",
        createdAt: "2025-12-01",
      },
      {
        id: "r5",
        userName: "Mariam H.",
        rating: 4,
        comment: "Very natural and delicate. Perfect for everyday wear.",
        createdAt: "2025-11-15",
      },
    ],
    inStock: false,
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
    image: "/products/musk.webp",
    images: ["/products/musk.webp", "/products/musk-team.webp"],
    featured: true,
    bestSeller: true,
    notes: {
      top: "White Musk, Bergamot",
      heart: "Lily, Clean Cotton",
      base: "Cedarwood, Vanilla",
    },
    reviews: [
      {
        id: "r6",
        userName: "Sara T.",
        rating: 5,
        comment: "My everyday attar. So clean and beautiful.",
        createdAt: "2025-12-10",
      },
      {
        id: "r7",
        userName: "Zain A.",
        rating: 5,
        comment: "Everyone asks what I'm wearing. Subtle but captivating.",
        createdAt: "2025-10-25",
      },
    ],
    inStock: false,
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
    image: "/products/amber.webp",
    images: ["/products/amber.webp", "/products/amber-team.webp"],
    featured: true,
    bestSeller: false,
    notes: {
      top: "Amber, Saffron",
      heart: "Labdanum, Benzoin",
      base: "Oud, Vanilla",
    },
    reviews: [
      {
        id: "r8",
        userName: "Omar F.",
        rating: 5,
        comment: "The amber note is incredibly rich and warm.",
        createdAt: "2025-11-30",
      },
    ],
    inStock: false,
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
    image: "/products/sandalwood.webp",
    images: ["/products/sandalwood.webp", "/products/sandalwood-team.webp"],
    featured: false,
    bestSeller: true,
    notes: {
      top: "Sandalwood, Milk",
      heart: "Cream, Rose",
      base: "Wood, Earth",
    },
    inStock: true,
    reviews: [
      {
        id: "r9",
        userName: "Imran K.",
        rating: 5,
        comment: "The finest sandalwood I've ever smelled. Worth every rupee.",
        createdAt: "2025-12-20",
      },
      {
        id: "r10",
        userName: "Vikram P.",
        rating: 5,
        comment:
          "Incredible quality. You can tell this is the real Mysore variety.",
        createdAt: "2025-09-12",
      },
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
    image: "/products/jasmine.webp",
    images: ["/products/jasmine.webp", "/products/jasmine-team.webp"],
    featured: true,
    bestSeller: false,
    notes: {
      top: "Jasmine, Night Air",
      heart: "Tuberose, Ylang",
      base: "White Musk, Sandalwood",
    },
    reviews: [
      {
        id: "r11",
        userName: "Noor B.",
        rating: 4,
        comment: "Beautiful jasmine scent. Very authentic and natural.",
        createdAt: "2025-10-15",
      },
    ],
    inStock: false,
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
    image: "/products/saffron.webp",
    images: ["/products/saffron.webp", "/products/saffron-team.webp"],
    featured: false,
    bestSeller: false,
    notes: {
      top: "Saffron, Cardamom",
      heart: "Rose, Honey",
      base: "Amber, Musk",
    },
    reviews: [
      {
        id: "r12",
        userName: "Yusuf D.",
        rating: 5,
        comment: "Luxurious and unique. The saffron opening is incredible.",
        createdAt: "2025-12-05",
      },
      {
        id: "r13",
        userName: "Ali M.",
        rating: 4,
        comment: "Very rich and warm. Perfect winter attar.",
        createdAt: "2025-11-18",
      },
    ],
    inStock: false,
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
    image: "/products/rose.webp",
    images: ["/products/rose.webp", "/products/rose-team.webp"],
    featured: false,
    bestSeller: false,
    notes: {
      top: "Night Queen, Green",
      heart: "Jasmine, Tuberose",
      base: "Vetiver, Musk",
    },
    reviews: [
      {
        id: "r14",
        userName: "Priya S.",
        rating: 5,
        comment: "Absolutely magical scent. Takes me back to summer nights.",
        createdAt: "2025-09-28",
      },
    ],
    inStock: false,
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
