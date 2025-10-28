import { NextRequest, NextResponse } from 'next/server'
import { generateOrderId } from '@/lib/utils'
import { isTestMode, generateMockRazorpayOrder } from '@/lib/test-utils'

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo } = await request.json()

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 500 ? 0 : 50 // Free shipping above ₹500
    const total = subtotal + shipping

    console.log('🧪 Processing order:', { items: items.length, total, customerInfo: customerInfo.email })

    // Always use mock mode for now to avoid database issues
    const orderId = generateOrderId()
    const mockOrder = {
      id: `order_${Date.now()}`,
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
    }

    // Create Razorpay order (always mock for now)
    console.log('🧪 Test Mode: Creating mock Razorpay order...')
    const razorpayOrder = generateMockRazorpayOrder(total)

    console.log('🧪 Order created successfully:', razorpayOrder.id)

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      testMode: true,
      mockOrder: mockOrder
    })
  } catch (error) {
    console.error('Order creation failed:', error)
    return NextResponse.json({ 
      error: 'Failed to create order',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}