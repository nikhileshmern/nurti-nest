-- ============================================
-- ADD MISSING COLUMNS TO PROFILES TABLE
-- ============================================
-- This adds columns that the profile page expects

-- Add address column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'address'
  ) THEN
    ALTER TABLE profiles ADD COLUMN address TEXT;
  END IF;
END $$;

-- Verify the profiles table has all needed columns
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- Show success message
DO $$
BEGIN
  RAISE NOTICE '✅ Profile columns updated successfully!';
END $$;

