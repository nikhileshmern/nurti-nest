-- Add ₹1 Test Product for Production Testing
-- Run this in your Supabase SQL Editor

INSERT INTO products (name, slug, flavour, description, price, image_url, stock) VALUES
(
  '🧪 Test Product - ₹1',
  'test-product-rs1',
  'Test',
  '⚠️ TEST PRODUCT ONLY ⚠️ - This is a ₹1 test product for testing the complete order flow in production mode. Use this to test payments, shipping, and notifications without spending much money. Delete this product after testing is complete.',
  100,  -- ₹1 = 100 paise
  '/images/products/orange-gummy.png',
  999
)
ON CONFLICT (slug) DO UPDATE SET
  price = 100,
  stock = 999,
  updated_at = NOW();

-- Verify the product was added
SELECT id, name, slug, price, stock FROM products WHERE slug = 'test-product-rs1';

