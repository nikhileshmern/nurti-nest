-- ============================================
-- FIX PROFILE RLS POLICIES
-- ============================================
-- This fixes the 400 error when updating profiles

-- Drop existing profile policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can create profile during signup" ON profiles;

-- Create new policies that work with both authenticated and service role

-- Allow anyone to view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (
    auth.uid() = id OR
    auth.role() = 'service_role'
  );

-- Allow anyone to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (
    auth.uid() = id OR
    auth.role() = 'service_role'
  )
  WITH CHECK (
    auth.uid() = id OR
    auth.role() = 'service_role'
  );

-- Allow anyone to insert during signup
CREATE POLICY "Anyone can create profile during signup"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- Also allow deletes for cleanup
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (
    auth.uid() = id OR
    auth.role() = 'service_role'
  );

-- Verify
SELECT 
  '✅ ' || policyname as policy_name
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

