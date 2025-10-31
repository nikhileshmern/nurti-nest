import { NextRequest, NextResponse } from 'next/server'
import { generateOrderId } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { isTestMode } from '@/lib/test-utils'

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo, userId, discountAmount, couponCode } = await request.json() // Accept userId, discount and coupon

    // Calculate totals (apply discount, clamp to minimum ₹1)
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const shipping = 0 // Always FREE shipping! 🎉
    const appliedDiscount = Math.max(0, Number(discountAmount) || 0)
    const payable = Math.max(1, subtotal - appliedDiscount + shipping) // Minimum ₹1
    const total = payable
    const amountInPaisa = Math.max(100, Math.round(total * 100)) // Convert to paisa for Razorpay (min 100)

    console.log('Processing order:', { items: items.length, total, customerInfo: customerInfo.email })

    // Get Razorpay credentials from environment
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local')
    }

    console.log('🎯 Creating Razorpay order via API...')

    // Create Razorpay order using direct API call
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64')}`
      },
      body: JSON.stringify({
        amount: amountInPaisa,
        currency: 'INR',
        receipt: generateOrderId(), // Internal receipt number
        notes: {
          customer_email: customerInfo.email,
          customer_name: customerInfo.name,
          discount_applied: String(appliedDiscount)
        }
      })
    })

    if (!razorpayResponse.ok) {
      const errorData = await razorpayResponse.json()
      console.error('Razorpay API error:', errorData)
      throw new Error(`Razorpay API error: ${errorData.error?.description || 'Unknown error'}`)
    }

    const razorpayOrder = await razorpayResponse.json()
    console.log('✅ Razorpay order created:', razorpayOrder.id)

    // Save order to Supabase database
    const testModeActive = isTestMode()
    
          try {
            // Prepare order data for database
            const orderData = {
              user_id: userId || null, // Link to user if logged in, null for guest
              user_email: customerInfo.email,
              status: 'pending',
              subtotal: subtotal,
              shipping: shipping,
              total: total,
              coupon_code: couponCode || null,
              razorpay_order_id: razorpayOrder.id,
              shiprocket_awb: null,
              tracking_url: null,
              address_json: customerInfo,
              items: items.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                flavour: item.flavour,
              })),
            }

            console.log('💾 Saving order to database...', userId ? `(User: ${userId})` : '(Guest order)')
      
      const { data: savedOrder, error: dbError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()

      if (dbError) {
        console.error('❌ Database save failed:', dbError)
        
        if (!testModeActive) {
          // In production, this is critical - throw error
          throw new Error(`Database error: ${dbError.message}`)
        } else {
          // In test mode, just log warning and continue
          console.warn('⚠️ Test Mode: Database save failed but continuing anyway')
        }
      } else {
        console.log('✅ Order saved to database:', savedOrder?.id)
      }
    } catch (dbSaveError) {
      console.error('❌ Failed to save order to database:', dbSaveError)
      
      if (!testModeActive) {
        // In production mode, database is critical
        throw new Error('Failed to save order to database. Please try again.')
      } else {
        // In test mode, continue without database
        console.warn('⚠️ Test Mode: Continuing without database save')
      }
    }

    // Check if we're in test mode for frontend display
    const testMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true' || 
                     process.env.TEST_MODE === 'true'

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      testMode: testMode
    })
  } catch (error) {
    console.error('Order creation failed:', error)
    return NextResponse.json({ 
      error: 'Failed to create order',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}