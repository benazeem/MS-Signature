import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getProductBySlug as getSanityProductBySlug,
  getProducts,
} from "@/sanity/lib/client";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
// import { ProductReviews } from "@/components/shop/ProductReviews";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Product } from "@/types/product.types";

export async function generateStaticParams() {
  try {
    const sanityProducts = await getProducts();
    return sanityProducts.map((product) => ({
      slug: product.slug,
    }));
  } catch {
    return [];
  }
}

async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    const p = await getSanityProductBySlug(slug);
    if (p) {
      return {
        id: p._id,
        slug: p.slug,
        name: p.name,
        tagline: p.tagline || "",
        description: p.description || "",
        price: p.price || 0,
        category: (p.category as "attar" | "perfume") || "attar",
        image: p.image || "/products/oud.png",
        images: p.images || [],
        featured: p.featured || false,
        bestSeller: p.bestSeller || false,
        notes: p.notes || { top: "", heart: "", base: "" },
        inStock: p.inStock ?? true,
        sizes: p.sizes || [],
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        reviews: [],
      };
    }
  } catch (err) {
    console.warn("Failed to fetch product from Sanity", err);
  }
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  const title = product.metaTitle || `${product.name} — ${product.tagline}`;
  const description =
    product.metaDescription || product.description.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description: description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const galleryImages = Array.from(
    new Set([product.image, ...product.images].filter(Boolean)),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.image,
            description: product.description,
            brand: {
              "@type": "Brand",
              name: SITE_NAME,
            },
            offers: {
              "@type": "Offer",
              url: `${SITE_URL}/product/${product.slug}`,
              priceCurrency: "INR",
              price: product.price,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
      <div className="pt-40 pb-20">
        <div className="container-wide">
          {/* Breadcrumb */}
          <nav className="mb-10 animate-fade-in" id="breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-text-muted">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-gold transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={`/shop?category=${product.category}`}
                  className="hover:text-gold transition-colors capitalize"
                >
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-text-light">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ProductGallery images={galleryImages} name={product.name} />
            <ProductInfo product={product} />
          </div>

          {/*
          <div className="mt-24">
            <ProductReviews productId={product.id} />
          </div>
          */}
        </div>
      </div>
    </>
  );
}
