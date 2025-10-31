-- Add coupon_code to orders for tracking one-time coupon usage
ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(100);

-- Helpful index for lookups by email + coupon
CREATE INDEX IF NOT EXISTS idx_orders_email_coupon ON orders(user_email, coupon_code);


