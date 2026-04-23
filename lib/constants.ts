export const SITE_NAME = "MS Signature Scents";
export const SITE_DESCRIPTION =
  "Discover the art of fine attar — pure, long-lasting, and timeless fragrances crafted with heritage.";
export const SITE_URL = "https://mssignaturescents.com";

export const COLORS = {
  primary: "#0A0A0A",
  gold: "#D4AF37",
  softGold: "#F5D98A",
  accent: "#1A1A1A",
  textLight: "#EDEDED",
  textMuted: "#999999",
  border: "#2A2A2A",
} as const;

export const CATEGORIES = [
  { name: "Oud", slug: "oud", image: "/categories/oud.png" },
  { name: "Floral", slug: "floral", image: "/categories/floral.png" },
  { name: "Musk", slug: "musk", image: "/categories/musk.png" },
] as const;

export const SIZES = [
  { label: "3ml", value: "3ml", price: 0 },
  { label: "6ml", value: "6ml", price: 500 },
  { label: "12ml", value: "12ml", price: 1200 },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
