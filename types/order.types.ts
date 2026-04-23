export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  slug: string;
  image: string;
  size?: string;
}

export interface Order {
  id: string;
  userEmail: string;
  customerName: string;
  total: number;
  status: string;
  items: OrderItem[];
  createdAt: Date | string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void | Promise<void>;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
}

export interface ShippingForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface OrderDetail {
  id: string;
  status: string;
  createdAt: string;
  total: number;
  items: Array<{
    id?: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
    slug?: string | null;
    image?: string | null;
  }>;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
}

export interface OrderStatus {
  id: string;
  status: string;
  createdAt: string;
  total: number;
  items: Array<{ name: string; size: string; quantity: number; price: number }>;
  shipping_address: {
    name: string;
    city: string;
    state: string;
    pincode: string;
  };
}
