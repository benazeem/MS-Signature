import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug as getSanityProductBySlug, getProducts } from "@/sanity/lib/client";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { SITE_NAME } from "@/lib/constants";
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
        category: (p.category as "oud" | "floral" | "musk") || "oud",
        image: p.image || "/products/oud.png",
        images: p.images || [],
        featured: p.featured || false,
        bestSeller: p.bestSeller || false,
        notes: p.notes || { top: "", heart: "", base: "" },
        inStock: p.inStock ?? true,
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

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description: product.tagline,
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

  return (
    <div className="pt-28 pb-20">
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
              <Link href="/shop" className="hover:text-gold transition-colors">
                Shop
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/shop?category=${product.category}`} className="hover:text-gold transition-colors capitalize">
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-text-light">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-24">
          <ProductReviews productId={product.id} />
        </div>
      </div>
    </div>
  );
}
