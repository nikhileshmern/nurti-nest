import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '@/lib/supabase'
import { createShipment, generateAWB, schedulePickup } from '@/lib/shiprocket'
import { sendOrderConfirmationEmail, sendShipmentNotificationEmail, sendAdminOrderNotification } from '@/lib/email'
import { sendOrderWhatsApp, sendShipmentWhatsApp } from '@/lib/whatsapp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// POST /api/razorpay/confirm
// Verifies payment signature and creates Shiprocket shipment without relying on webhook
export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment parameters' }, { status: 400 })
    }

    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) {
      return NextResponse.json({ error: 'Server payment secret not configured' }, { status: 500 })
    }

    // Verify signature: HMAC_SHA256(order_id|payment_id)
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // Mark order as paid and fetch it
    const { data: order, error: updateError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('razorpay_order_id', razorpay_order_id)
      .select()
      .single()

    if (updateError || !order) {
      return NextResponse.json({ error: 'Order not found or failed to update' }, { status: 404 })
    }

    // Best-effort notifications (do not fail the flow on email/WhatsApp)
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
    } catch {}

    try {
      await sendAdminOrderNotification({
        orderNumber: order.id.substring(0, 8).toUpperCase(),
        orderDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }),
        customerName: order.address_json.name,
        customerEmail: order.address_json.email,
        customerPhone: order.address_json.phone,
        items: order.items,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        paymentId: razorpay_payment_id,
        address: order.address_json,
      })
    } catch {}

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

      const shipment: any = await createShipment(shipmentData)

      let awb = shipment.awb_code || shipment.awb
      let courierName = shipment.courier_name || 'Courier'

      if (!awb && shipment.shipment_id) {
        const awbResponse: any = await generateAWB(
          shipment.shipment_id,
          shipment.courier_company_id || 1
        )
        awb = awbResponse.response?.data?.awb_code || awbResponse.awb_code
        courierName = awbResponse.courier_name || courierName
        try { await schedulePickup(shipment.shipment_id) } catch {}
      }

      const trackingUrl = `https://shiprocket.co/tracking/${awb}`

      await supabase
        .from('orders')
        .update({ status: 'shipped', shiprocket_awb: awb, tracking_url: trackingUrl })
        .eq('id', order.id)

      try {
        await sendShipmentNotificationEmail({
          orderNumber: order.id.substring(0, 8).toUpperCase(),
          customerName: order.address_json.name,
          customerEmail: order.address_json.email,
          awbCode: awb,
          trackingUrl,
          courierName,
        })
      } catch {}

      try {
        await sendShipmentWhatsApp({
          orderNumber: order.id.substring(0, 8).toUpperCase(),
          customerName: order.address_json.name,
          customerPhone: order.address_json.phone,
          awbCode: awb,
          trackingUrl,
          courierName,
        })
      } catch {}

      return NextResponse.json({ success: true, order_id: order.id, awb, tracking_url: trackingUrl })
    } catch (err: any) {
      // Shipment failure should still return success for payment confirmation (frontend can poll later)
      return NextResponse.json({ success: true, order_id: order.id, shipment_error: err?.message || 'Shipment failed' })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Confirmation failed', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}


