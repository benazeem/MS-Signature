import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/data";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Reviews } from "@/components/product/Reviews";
import { SITE_NAME } from "@/lib/constants";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
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
  const product = getProductBySlug(slug);

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
              <a href="/" className="hover:text-gold transition-colors">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/shop" className="hover:text-gold transition-colors">
                Shop
              </a>
            </li>
            <li>/</li>
            <li className="text-text-light">{product.name}</li>
          </ol>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="animate-fade-in-up">
            <ProductGallery images={product.images} name={product.name} />
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Reviews */}
        <div className="animate-fade-in-up animation-delay-300">
          <Reviews reviews={product.reviews} />
        </div>
      </div>
    </div>
  );
}
