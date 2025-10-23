import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        message,
      })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
