import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { HorizontalScroll } from "@/components/home/HorizontalScroll";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HorizontalScroll />
      <BrandStory />
    </>
  );
}
