-- Remove Test Product After Testing
-- Run this in your Supabase SQL Editor after you're done testing

DELETE FROM products WHERE slug = 'test-product-rs1';

-- Verify the product was removed
SELECT COUNT(*) as test_products_remaining FROM products WHERE slug = 'test-product-rs1';
-- Should return 0

