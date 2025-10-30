import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createShipment, generateAWB, schedulePickup } from '@/lib/shiprocket'
import { sendOrderConfirmationEmail, sendShipmentNotificationEmail, sendAdminOrderNotification } from '@/lib/email'
import { sendOrderWhatsApp, sendShipmentWhatsApp } from '@/lib/whatsapp'
import crypto from 'crypto'
import { isTestMode } from '@/lib/test-utils'

// Ensure Node.js runtime (needed for crypto) and disable caching
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('➡️  Webhook hit: /api/razorpay/webhook (POST)')
    console.log('Headers present:', Array.from(request.headers.keys()))
    if (isTestMode()) {
      console.log('🧪 Test Mode: Simulating webhook processing...')
      
      // In test mode, simulate payment success for any order
      const body = await request.text()
      const testEvent = JSON.parse(body || '{}')
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('🧪 Test Mode: Webhook processed successfully')
      return NextResponse.json({ success: true, test_mode: true })
    }

    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature') || request.headers.get('X-Razorpay-Signature')
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('❌ Webhook secret missing: Set RAZORPAY_WEBHOOK_SECRET in environment')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      console.error('❌ Invalid Razorpay signature. Check RAZORPAY_WEBHOOK_SECRET and mode (test/live).')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    console.log('🔔 Razorpay event received:', event.event)

    if (event.event === 'payment.captured') {
      const { order_id, payment_id } = event.payload.payment.entity
      console.log('✅ payment.captured for order:', order_id, 'payment:', payment_id)

      // Note: In production, you can use Razorpay MCP tools to fetch payment details
      // Example: fetch_payment(payment_id) to get detailed payment information
      
      // Update order status to paid
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('razorpay_order_id', order_id)
        .select()
        .single()

      if (orderError) {
        console.error('Failed to update order status:', orderError)
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
      }

      if (order) {
        // Send order confirmation email
        try {
          await sendOrderConfirmationEmail({
            orderNumber: order.id.substring(0, 8).toUpperCase(),
            customerName: order.address_json.name,
            customerEmail: order.address_json.email,
            items: order.items,
            subtotal: order.subtotal,
            shipping: order.shipping,
            total: order.total,
            address: order.address_json,
          })
        } catch (emailError) {
          console.error('⚠️ Failed to send order confirmation email (non-critical):', emailError)
        }

        // Send admin order notification
        try {
          await sendAdminOrderNotification({
            orderNumber: order.id.substring(0, 8).toUpperCase(),
            orderDate: new Date().toLocaleString('en-IN', { 
              timeZone: 'Asia/Kolkata',
              dateStyle: 'medium',
              timeStyle: 'short'
            }),
            customerName: order.address_json.name,
            customerEmail: order.address_json.email,
            customerPhone: order.address_json.phone,
            items: order.items,
            subtotal: order.subtotal,
            shipping: order.shipping,
            total: order.total,
            paymentId: payment_id,
            address: order.address_json,
          })
          console.log('✅ Admin notification sent')
        } catch (adminEmailError) {
          console.error('⚠️ Failed to send admin notification (non-critical):', adminEmailError)
        }

        // Send WhatsApp order confirmation
        try {
          await sendOrderWhatsApp({
            orderNumber: order.id.substring(0, 8).toUpperCase(),
            customerName: order.address_json.name,
            customerPhone: order.address_json.phone,
            items: order.items.map((item: any) => ({
              name: item.name,
              quantity: item.quantity,
            })),
            total: order.total,
            orderUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders`,
          })
          console.log('✅ WhatsApp order confirmation sent')
        } catch (whatsappError) {
          console.error('⚠️ Failed to send WhatsApp message (non-critical):', whatsappError)
        }

        // Create shipment with Shiprocket
        try {
          const [firstName, ...lastNameParts] = order.address_json.name.split(' ')
          const lastName = lastNameParts.join(' ') || firstName

          const shipmentData = {
            order_id: order.id,
            order_date: new Date().toISOString().split('T')[0],
            pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
            billing_customer_name: firstName,
            billing_last_name: lastName,
            billing_address: order.address_json.address,
            billing_address_2: '',
            billing_city: order.address_json.city,
            billing_pincode: order.address_json.pincode,
            billing_state: order.address_json.state,
            billing_country: 'India',
            billing_email: order.address_json.email,
            billing_phone: order.address_json.phone,
            shipping_is_billing: true,
            shipping_customer_name: firstName,
            shipping_last_name: lastName,
            shipping_address: order.address_json.address,
            shipping_address_2: '',
            shipping_city: order.address_json.city,
            shipping_pincode: order.address_json.pincode,
            shipping_state: order.address_json.state,
            shipping_country: 'India',
            shipping_email: order.address_json.email,
            shipping_phone: order.address_json.phone,
            order_items: order.items.map((item: any) => ({
              name: item.name,
              sku: item.id,
              units: item.quantity,
              selling_price: item.price,
            })),
            payment_method: 'Prepaid',
            sub_total: order.total,
            length: 20,
            breadth: 15,
            height: 10,
            weight: 0.5,
          }

          console.log('📦 Creating shipment...', { pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary' })
          const shipment: any = await createShipment(shipmentData)
          
          // Generate AWB if not already generated
          let awb = shipment.awb_code || shipment.awb
          let courierName = shipment.courier_name || 'Courier'
          
          if (!awb && shipment.shipment_id) {
            console.log('🏷️ Generating AWB...')
            const awbResponse: any = await generateAWB(
              shipment.shipment_id,
              shipment.courier_company_id || 1
            )
            awb = awbResponse.response?.data?.awb_code || awbResponse.awb_code
            courierName = awbResponse.courier_name || courierName

            // Schedule pickup
            try {
              console.log('📅 Scheduling pickup...')
              await schedulePickup(shipment.shipment_id)
            } catch (pickupError) {
              console.error('⚠️ Pickup scheduling failed (non-critical):', pickupError)
            }
          }

          const trackingUrl = `https://shiprocket.co/tracking/${awb}`
          
          // Update order with tracking information
          await supabase
            .from('orders')
            .update({
              status: 'shipped',
              shiprocket_awb: awb,
              tracking_url: trackingUrl,
            })
            .eq('id', order.id)

          console.log('✅ Shipment created and order updated')

          // Send shipment notification email
          try {
            await sendShipmentNotificationEmail({
              orderNumber: order.id.substring(0, 8).toUpperCase(),
              customerName: order.address_json.name,
              customerEmail: order.address_json.email,
              awbCode: awb,
              trackingUrl: trackingUrl,
              courierName: courierName,
            })
          } catch (emailError) {
            console.error('⚠️ Failed to send shipment notification email (non-critical):', emailError)
          }

          // Send WhatsApp shipment notification
          try {
            await sendShipmentWhatsApp({
              orderNumber: order.id.substring(0, 8).toUpperCase(),
              customerName: order.address_json.name,
              customerPhone: order.address_json.phone,
              awbCode: awb,
              trackingUrl: trackingUrl,
              courierName: courierName,
            })
            console.log('✅ WhatsApp shipment notification sent')
          } catch (whatsappError) {
            console.error('⚠️ Failed to send WhatsApp shipment notification (non-critical):', whatsappError)
          }
        } catch (shipmentError) {
          console.error('⚠️ Shipment creation failed (non-critical):', shipmentError)
          // Don't fail the webhook if shipment creation fails
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook processing failed:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// Health/test endpoint (GET) - always responds for connectivity checks.
// In test mode it can also simulate a full flow (kept as earlier behavior).
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ping = searchParams.get('ping')
  if (ping) {
    return NextResponse.json({ ok: true, test_mode: isTestMode() })
  }
  if (!isTestMode()) {
    return NextResponse.json({ error: 'Simulation only available in test mode', ok: true }, { status: 200 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')
    
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
    }

    console.log('🧪 Test Mode: Simulating payment success for order:', orderId)

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
      console.log('🧪 Test Mode: Supabase not configured, simulating order processing')
      
      // Create mock shipment data
      const mockShipment = {
        awb: `AWB${Date.now()}`,
        tracking_url: `https://test-tracking.shiprocket.in/track/${Date.now()}`,
        status: 'confirmed',
        courier_name: 'Test Courier'
      }

      console.log('🧪 Test Mode: Order processed successfully (mock mode)')
      return NextResponse.json({ 
        success: true, 
        order_id: orderId,
        shipment_awb: mockShipment.awb,
        tracking_url: mockShipment.tracking_url,
        testMode: true,
        message: 'Order processed in test mode without database'
      })
    }

    // Update order status to paid (when Supabase is configured)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('razorpay_order_id', orderId)
      .select()
      .single()

    if (orderError) {
      console.error('Failed to update order status:', orderError)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    if (order) {
      try {
        // Create shipment with Shiprocket (will use mock in test mode)
        const shipmentData = {
          order_id: order.id,
          order_date: new Date().toISOString(),
          pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
          billing_customer_name: order.address_json.name,
          billing_last_name: '',
          billing_address: order.address_json.address,
          billing_address_2: '',
          billing_city: order.address_json.city,
          billing_pincode: order.address_json.pincode,
          billing_state: order.address_json.state,
          billing_country: 'India',
          billing_email: order.address_json.email,
          billing_phone: order.address_json.phone,
          shipping_is_billing: true,
          shipping_customer_name: order.address_json.name,
          shipping_last_name: '',
          shipping_address: order.address_json.address,
          shipping_address_2: '',
          shipping_city: order.address_json.city,
          shipping_pincode: order.address_json.pincode,
          shipping_state: order.address_json.state,
          shipping_country: 'India',
          shipping_email: order.address_json.email,
          shipping_phone: order.address_json.phone,
          order_items: order.items.map((item: any) => ({
            name: item.name,
            sku: item.id,
            units: item.quantity,
            selling_price: item.price,
          })),
          payment_method: 'Prepaid',
          sub_total: order.subtotal,
          length: 20,
          breadth: 15,
          height: 10,
          weight: 0.2 * order.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
        }

        const shipment: any = await createShipment(shipmentData)
        
        const awb = shipment.awb_code || shipment.awb || `TEST${Date.now()}`
        const trackingUrl = `https://shiprocket.co/tracking/${awb}`
        
        // Update order with tracking information
        await supabase
          .from('orders')
          .update({
            status: 'shipped',
            shiprocket_awb: awb,
            tracking_url: trackingUrl,
          })
          .eq('id', order.id)

        console.log('🧪 Test Mode: Order processed successfully')
        return NextResponse.json({ 
          success: true, 
          order_id: order.id,
          shipment_awb: awb,
          tracking_url: trackingUrl
        })

      } catch (shipmentError) {
        console.error('Shipment creation failed:', shipmentError)
        return NextResponse.json({ 
          success: true, 
          order_id: order.id,
          error: 'Shipment creation failed but order is paid'
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Test webhook processing failed:', error)
    return NextResponse.json({ error: 'Test webhook processing failed' }, { status: 500 })
  }
}
