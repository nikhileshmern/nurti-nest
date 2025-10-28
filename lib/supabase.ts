import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './database.types'

// Simple mock client for testing
const mockClient = {
  from: () => ({
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    })
  })
}

// Check if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Use mock client if Supabase is not configured
let supabase: any

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
  console.log('🧪 Test Mode: Using mock Supabase client')
  supabase = mockClient
} else {
  console.log('🔗 Using real Supabase client')
  supabase = createClientComponentClient<Database>()
}

export { supabase }