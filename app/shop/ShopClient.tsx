"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Filters } from "@/components/shop/Filters";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SectionHeader } from "@/components/ui/Section";
import { SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/types/product.types";

export function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Array<{ name: string; slug: string }>;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlCategory = searchParams.get("category") || "all";
  const urlFilter = searchParams.get("filter") || "";

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState(
    urlFilter === "bestseller" ? "bestseller" : "featured",
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    if (urlFilter === "bestseller") {
      setSortBy("bestseller");
      return;
    }
    if (!urlFilter) {
      setSortBy("featured");
    }
  }, [urlFilter]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.delete("filter");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const filteredProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? [...products]
        : products.filter((p) => p.category === selectedCategory);

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "bestseller":
        filtered = filtered.filter((p) => p.bestSeller);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="pt-28 pb-20">
      <div className="container-wide">
        <SectionHeader
          label="Our Collection"
          title="Shop Attars"
          subtitle="Explore our complete range of handcrafted perfume oils — sourced from the finest botanicals across India and the Middle East."
        />

        <div className="lg:hidden mb-6 flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 text-text-muted text-xs tracking-widest uppercase border border-border px-5 py-2.5 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            id="mobile-filter-toggle"
            aria-label="Toggle mobile filters"
            aria-expanded={mobileFiltersOpen}
          >
            {mobileFiltersOpen ? (
              <X size={14} />
            ) : (
              <SlidersHorizontal size={14} />
            )}
            {mobileFiltersOpen ? "Close" : "Filters"}
          </button>
          {selectedCategory !== "all" && (
            <span className="text-gold text-xs border border-gold/30 px-3 py-1 rounded-full capitalize">
              {selectedCategory}
            </span>
          )}
        </div>

        <div className="flex gap-12">
          <aside
            className={`w-52 shrink-0 ${
              mobileFiltersOpen ? "block" : "hidden"
            } lg:block`}
          >
            <Filters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              categories={categories}
            />
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8">
              <p className="text-text-muted text-sm">
                <span className="text-text-light font-medium">
                  {filteredProducts.length}
                </span>
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
