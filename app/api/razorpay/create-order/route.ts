import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateOrderId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo } = await request.json()

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 500 ? 0 : 50 // Free shipping above ₹500
    const total = subtotal + shipping

    // Create order in database
    const orderId = generateOrderId()
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_email: customerInfo.email,
        status: 'pending',
        subtotal,
        shipping,
        total,
        address_json: customerInfo,
        items: items.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          flavour: item.flavour,
        })),
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create Razorpay order
    const razorpay = require('razorpay')
    const rzp = new razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const options = {
      amount: total * 100, // Amount in paise
      currency: 'INR',
      receipt: orderId,
      notes: {
        order_id: order.id,
      },
    }

    const razorpayOrder = await rzp.orders.create(options)

    // Update order with Razorpay order ID
    await supabase
      .from('orders')
      .update({ razorpay_order_id: razorpayOrder.id })
      .eq('id', order.id)

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
    })
  } catch (error) {
    console.error('Razorpay order creation failed:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
