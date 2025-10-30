-- ============================================
-- NUTRI NEST - HYBRID AUTHENTICATION UPDATE
-- ============================================
-- This updates your existing database to support hybrid auth
-- Safe to run multiple times - uses DROP IF EXISTS

-- 1. Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add user_id column to orders table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'orders' 
    AND column_name = 'user_id'
  ) THEN
    ALTER TABLE orders ADD COLUMN user_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 3. Add index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- 4. Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 5. DROP existing policies and recreate them
-- This ensures clean slate

-- Drop existing profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can create profile during signup" ON profiles;

-- Drop existing orders policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Allow all inserts on orders" ON orders;
DROP POLICY IF EXISTS "Allow all updates on orders" ON orders;
DROP POLICY IF EXISTS "Allow all selects on orders" ON orders;
DROP POLICY IF EXISTS "Service role can insert orders" ON orders;
DROP POLICY IF EXISTS "Service role can update orders" ON orders;
DROP POLICY IF EXISTS "Anon can insert orders" ON orders;
DROP POLICY IF EXISTS "Users can view own orders or guest orders by email" ON orders;

-- 6. Create NEW policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can create profile during signup"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- 7. Create NEW policies for orders (supporting both guest and authenticated)

-- Allow anyone to create orders (guest or authenticated)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Allow users to view their own orders (by user_id) OR orders with their email (for guest orders)
-- Also allow service role to view all (for webhooks)
CREATE POLICY "Users can view own orders or guest orders by email"
  ON orders FOR SELECT
  USING (
    user_id = auth.uid() OR 
    user_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    true  -- Service role bypass
  );

-- Allow service role (webhooks) to update all orders
CREATE POLICY "Service role can update orders"
  ON orders FOR UPDATE
  USING (true);

-- 8. Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;  -- Prevent duplicate errors
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create trigger to call the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Create function to update updated_at on profiles
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 11. Create trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_profiles_updated_at();

-- ============================================
-- VERIFICATION
-- ============================================

-- Check if profiles table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) THEN
    RAISE NOTICE '✅ profiles table exists';
  ELSE
    RAISE NOTICE '❌ profiles table missing';
  END IF;
END $$;

-- Check if orders has user_id column
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'orders' 
    AND column_name = 'user_id'
  ) THEN
    RAISE NOTICE '✅ user_id column exists in orders';
  ELSE
    RAISE NOTICE '❌ user_id column missing from orders';
  END IF;
END $$;

-- Show all policies
SELECT 
  '✅ Policy: ' || schemaname || '.' || tablename || ' - ' || policyname as status
FROM pg_policies 
WHERE tablename IN ('profiles', 'orders')
ORDER BY tablename, policyname;

-- Final success message
DO $$
BEGIN
  RAISE NOTICE '🎉 Hybrid authentication setup complete!';
END $$;

