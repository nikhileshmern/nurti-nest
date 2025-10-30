import { NextRequest, NextResponse } from 'next/server'
import { createShipment, generateAWB, schedulePickup } from '@/lib/shiprocket'
import { createClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    console.log('📦 Creating shipment for order:', orderId)

    // Get order details from database
    const supabase = createClient()
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      console.error('❌ Order not found:', orderId)
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Verify order is paid
    if (order.status !== 'paid') {
      return NextResponse.json(
        { error: 'Order must be paid before creating shipment' },
        { status: 400 }
      )
    }

    // Check if shipment already exists
    if (order.shiprocket_awb) {
      return NextResponse.json({
        success: true,
        message: 'Shipment already exists',
        awb: order.shiprocket_awb,
        tracking_url: order.tracking_url,
      })
    }

    const address = order.address_json
    const [firstName, ...lastNameParts] = address.name.split(' ')
    const lastName = lastNameParts.join(' ') || firstName

    // Prepare shipment data
    const shipmentData = {
      order_id: order.id,
      order_date: new Date(order.created_at).toISOString().split('T')[0],
      pickup_location: 'Primary', // Default pickup location name in Shiprocket
      billing_customer_name: firstName,
      billing_last_name: lastName,
      billing_address: address.address,
      billing_address_2: '',
      billing_city: address.city,
      billing_pincode: address.pincode,
      billing_state: address.state,
      billing_country: 'India',
      billing_email: address.email,
      billing_phone: address.phone,
      shipping_is_billing: true,
      shipping_customer_name: firstName,
      shipping_last_name: lastName,
      shipping_address: address.address,
      shipping_address_2: '',
      shipping_city: address.city,
      shipping_pincode: address.pincode,
      shipping_state: address.state,
      shipping_country: 'India',
      shipping_email: address.email,
      shipping_phone: address.phone,
      order_items: order.items.map((item: any) => ({
        name: item.name,
        sku: item.id,
        units: item.quantity,
        selling_price: item.price,
      })),
      payment_method: 'Prepaid',
      sub_total: order.total,
      length: 20, // Default dimensions in cm
      breadth: 15,
      height: 10,
      weight: 0.5, // Default weight in kg
    }

    console.log('📦 Creating Shiprocket shipment...')
    const shipment = await createShipment(shipmentData)

    console.log('✅ Shipment created:', shipment)

    // Generate AWB if not already generated
    let awb = shipment.awb_code
    if (!awb && shipment.shipment_id) {
      console.log('🏷️ Generating AWB...')
      const awbResponse = await generateAWB(
        shipment.shipment_id,
        shipment.courier_company_id || 1
      )
      awb = awbResponse.response?.data?.awb_code || awbResponse.awb_code
      console.log('✅ AWB generated:', awb)

      // Schedule pickup
      try {
        console.log('📅 Scheduling pickup...')
        await schedulePickup(shipment.shipment_id)
        console.log('✅ Pickup scheduled')
      } catch (pickupError) {
        console.error('⚠️ Pickup scheduling failed (non-critical):', pickupError)
      }
    }

    // Update order with shipment info
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'shipped',
        shiprocket_awb: awb,
        tracking_url: `https://shiprocket.co/tracking/${awb}`,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('⚠️ Failed to update order:', updateError)
    }

    return NextResponse.json({
      success: true,
      shipment_id: shipment.shipment_id,
      awb: awb,
      tracking_url: `https://shiprocket.co/tracking/${awb}`,
      courier_name: shipment.courier_name,
    })
  } catch (error) {
    console.error('❌ Shipment creation failed:', error)
    return NextResponse.json(
      {
        error: 'Failed to create shipment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

