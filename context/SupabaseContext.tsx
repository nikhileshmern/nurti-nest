'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

interface SupabaseContextType {
  supabase: SupabaseClient<Database> | null
  loading: boolean
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
  loading: true,
})

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const supabaseClient = createClientComponentClient<Database>()
      setSupabase(supabaseClient)
      setLoading(false)
    } catch (error) {
      console.error('Failed to initialize Supabase:', error)
      setLoading(false)
    }
  }, [])

  return (
    <SupabaseContext.Provider value={{ supabase, loading }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}
