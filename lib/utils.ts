import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

export function getAllowedProductSizes(
  category: "attar" | "perfume",
  sizes: { label: string; value: string; price: number }[] = [],
) {
  const allowedValues = category === "attar" ? ["6ml", "12ml"] : ["30ml"];

  if (sizes.length > 0) {
    const filteredSizes = sizes.filter((size) => allowedValues.includes(size.value))

    if (filteredSizes.length > 0) {
      return filteredSizes
    }
  }

  if (category === "attar") {
    return [{ label: "6ml", value: "6ml", price: 0 }]
  }

  return [{ label: "30ml", value: "30ml", price: 0 }]
}
