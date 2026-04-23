-- =============================================
-- MS Signature Scents — Supabase Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Guest Users (OTP-based auth)
CREATE TABLE IF NOT EXISTS guest_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  otp TEXT,
  otp_expires_at TIMESTAMPTZ,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast email lookups
CREATE INDEX idx_guest_users_email ON guest_users(email);

-- 2. Carts (Supabase-synced cart)
CREATE TABLE IF NOT EXISTS carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL UNIQUE,
  items JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_email) REFERENCES guest_users(email) ON DELETE CASCADE
);

CREATE INDEX idx_carts_user_email ON carts(user_email);

-- 3. Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  customer_name TEXT,
  items JSONB NOT NULL,
  total INTEGER NOT NULL, -- stored in rupees
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  shipping_address JSONB,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  tracking_number TEXT,
  carrier TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_user_email ON orders(user_email);
CREATE INDEX idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX idx_orders_status ON orders(status);

-- 4. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER guest_users_updated_at
  BEFORE UPDATE ON guest_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER carts_updated_at
  BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE guest_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (API routes use service role key)
-- No client-side access needed for these tables
-- All access goes through server-side API routes

-- Allow service role full access (default in Supabase)
CREATE POLICY "Service role full access - guest_users" ON guest_users
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access - carts" ON carts
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access - orders" ON orders
  USING (auth.role() = 'service_role');
