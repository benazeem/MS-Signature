import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio/", // Disallow sanity studio
        "/api/", // Disallow api routes
        // "/developer/",  // Disallow developer page
        "/wishlist/", // Disallow user-specific pages
        "/cart/", // Disallow user-specific pages
        "/checkout/", // Disallow checkout
        "/login/", // Disallow login
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
