import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()
    if (!email || !code) {
      return NextResponse.json({ valid: false, error: 'Email and code required' }, { status: 400 })
    }

    // One-time use: if an order exists with this email and coupon_code, block
    const { data, error } = await supabase
      .from('orders')
      .select('id, status')
      .eq('user_email', email)
      .eq('coupon_code', code)
      .limit(1)

    if (error) {
      return NextResponse.json({ valid: false, error: error.message }, { status: 500 })
    }

    if (data && data.length > 0) {
      return NextResponse.json({ valid: false, reason: 'already_used' })
    }

    return NextResponse.json({ valid: true })
  } catch (e: any) {
    return NextResponse.json({ valid: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}


