-- Update all product images to use local paths
-- Run this in your Supabase SQL Editor

-- Update Orange Gummies
UPDATE products 
SET image_url = '/images/products/orange-gummy.png'
WHERE slug = 'yumburst-orange-gummies';

-- Update Pomegranate Gummies
UPDATE products 
SET image_url = '/images/products/pomogranate-gummy.png'
WHERE slug = 'yumburst-pomegranate-gummies';

-- Update Test Product
UPDATE products 
SET image_url = '/images/products/orange-gummy.png'
WHERE slug = 'test-product-rs1';

-- Update Combo Pack
UPDATE combos 
SET image_url = '/images/products/combo-pack.png'
WHERE name LIKE '%Combo Pack%';

-- Verify all images are updated
SELECT slug, name, image_url FROM products ORDER BY created_at;
SELECT name, image_url FROM combos;

