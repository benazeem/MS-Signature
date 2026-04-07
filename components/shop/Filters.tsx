"use client";

import { CATEGORIES } from "@/lib/constants";

interface FiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function Filters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="font-heading text-sm tracking-widest uppercase text-gold mb-4">
          Category
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`text-left text-sm py-2 px-3 transition-all duration-300 ${
              selectedCategory === "all"
                ? "text-gold bg-gold/5 border-l-2 border-gold"
                : "text-text-muted hover:text-text-light border-l-2 border-transparent"
            }`}
            id="filter-all"
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={`text-left text-sm py-2 px-3 transition-all duration-300 ${
                selectedCategory === cat.slug
                  ? "text-gold bg-gold/5 border-l-2 border-gold"
                  : "text-text-muted hover:text-text-light border-l-2 border-transparent"
              }`}
              id={`filter-${cat.slug}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-heading text-sm tracking-widest uppercase text-gold mb-4">
          Sort By
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "Featured", value: "featured" },
            { label: "Price: Low to High", value: "price-asc" },
            { label: "Price: High to Low", value: "price-desc" },
            { label: "Name", value: "name" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`text-left text-sm py-2 px-3 transition-all duration-300 ${
                sortBy === option.value
                  ? "text-gold bg-gold/5 border-l-2 border-gold"
                  : "text-text-muted hover:text-text-light border-l-2 border-transparent"
              }`}
              id={`sort-${option.value}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
