import { NextRequest, NextResponse } from 'next/server'
import { getShippingRates } from '@/lib/shiprocket'

export async function POST(request: NextRequest) {
  try {
    const { pincode, weight } = await request.json()

    if (!pincode) {
      return NextResponse.json(
        { error: 'Pincode is required' },
        { status: 400 }
      )
    }

    console.log('📦 Calculating shipping rates for:', { pincode, weight: weight || 0.5 })

    // Default pickup pincode (you should set this in env or use your warehouse pincode)
    const pickupPincode = process.env.SHIPROCKET_PICKUP_PINCODE || '110001'

    const rates = await getShippingRates({
      pickup_postcode: pickupPincode,
      delivery_postcode: pincode,
      weight: weight || 0.5, // Default 500g
      cod: 0, // Prepaid (we're using Razorpay)
    })

    // Sort by rate (cheapest first)
    const sortedRates = rates.sort((a, b) => a.rate - b.rate)

    console.log('✅ Shipping rates calculated:', sortedRates.length, 'options')

    return NextResponse.json({
      success: true,
      rates: sortedRates,
      recommended: sortedRates[0], // Cheapest option
    })
  } catch (error) {
    console.error('❌ Failed to calculate shipping rates:', error)
    return NextResponse.json(
      { 
        error: 'Failed to calculate shipping rates',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

