import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Check if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Simple mock client for testing (when Supabase not configured)
const mockClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mock mode - auth not available' } }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mock mode - auth not available' } }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    resetPasswordForEmail: () => Promise.resolve({ data: null, error: { message: 'Mock mode - auth not available' } }),
  },
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
    }),
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      order: () => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: null })
    })
  })
}

// Create real or mock client
let supabase: any

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
  console.log('🧪 Test Mode: Using mock Supabase client')
  supabase = mockClient
} else {
  console.log('🔗 Using real Supabase client')
  // Use createSupabaseClient for full auth support
  supabase = createSupabaseClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  })
}

// Export createClient function for consistency
export function createClient() {
  return supabase
}

// Export client-specific creator for client components
export function createClientComponent() {
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
    return mockClient
  }
  return createClientComponentClient<Database>()
}

// Also export supabase for backward compatibility
export { supabase }