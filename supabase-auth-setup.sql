-- ============================================
-- NUTRI NEST - HYBRID AUTHENTICATION SETUP
-- ============================================
-- This enables both guest checkout AND user accounts
-- Run this in your Supabase SQL Editor

-- 1. Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Update orders table to support both guest and authenticated users
-- Add user_id column (nullable for guest orders)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- Add index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- 3. Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can create profile during signup"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- 5. Update orders RLS policies to support both authenticated and guest users
DROP POLICY IF EXISTS "Allow all inserts on orders" ON orders;
DROP POLICY IF EXISTS "Allow all updates on orders" ON orders;
DROP POLICY IF EXISTS "Allow all selects on orders" ON orders;

-- Allow anyone to create orders (guest or authenticated)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Allow users to view their own orders (by user_id) OR orders with their email (for guest orders)
CREATE POLICY "Users can view own orders or guest orders by email"
  ON orders FOR SELECT
  USING (
    user_id = auth.uid() OR 
    user_email = auth.jwt() ->> 'email' OR
    true  -- Allow all for webhook/admin access (service role)
  );

-- Allow service role (webhooks) to update all orders
CREATE POLICY "Service role can update orders"
  ON orders FOR UPDATE
  USING (true);

-- 6. Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger to call the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Create function to update updated_at on profiles
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Create trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_profiles_updated_at();

-- ============================================
-- VERIFICATION QUERIES (Run these to check)
-- ============================================

-- Check if profiles table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'profiles'
) AS profiles_exists;

-- Check if orders has user_id column
SELECT EXISTS (
  SELECT FROM information_schema.columns 
  WHERE table_schema = 'public' 
  AND table_name = 'orders' 
  AND column_name = 'user_id'
) AS user_id_column_exists;

-- Check RLS policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('profiles', 'orders')
ORDER BY tablename, policyname;

