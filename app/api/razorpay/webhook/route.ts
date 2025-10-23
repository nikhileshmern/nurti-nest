import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createShipment } from '@/lib/shiprocket'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (!webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === 'payment.captured') {
      const { order_id, payment_id } = event.payload.payment.entity

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
        try {
          // Create shipment with Shiprocket
          const shipmentData = {
            order_id: order.id,
            order_date: new Date().toISOString(),
            pickup_location: 'Nutri Nest Warehouse',
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

          const shipment = await createShipment(shipmentData)
          
          // Update order with tracking information
          await supabase
            .from('orders')
            .update({
              status: 'shipped',
              shiprocket_awb: shipment.awb,
              tracking_url: shipment.tracking_url,
            })
            .eq('id', order.id)

        } catch (shipmentError) {
          console.error('Shipment creation failed:', shipmentError)
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
