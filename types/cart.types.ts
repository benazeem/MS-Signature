import { Product } from "./product.types";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  priceModifier: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, priceModifier: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
