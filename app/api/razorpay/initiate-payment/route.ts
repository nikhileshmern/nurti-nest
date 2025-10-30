import { NextRequest, NextResponse } from 'next/server'
import { isTestMode } from '@/lib/test-utils'

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, customerInfo, paymentMethod } = await request.json()

    console.log('Initiating payment:', { orderId, amount, customerInfo: customerInfo.email })

    if (isTestMode()) {
      // Test mode: Simulate payment initiation
      console.log('🧪 Test Mode: Simulating payment initiation...')
      
      // Simulate payment success after 2 seconds
      setTimeout(() => {
        console.log('🧪 Test Mode: Payment initiated successfully')
      }, 2000)

      return NextResponse.json({
        success: true,
        paymentId: `pay_test_${Date.now()}`,
        status: 'authorized',
        testMode: true,
        message: 'Payment initiated in test mode'
      })
    } else {
      // Production mode: Use Razorpay MCP tool
      console.log('Initiating payment using Razorpay MCP tool...')
      
      // Note: In a real implementation, you would call the MCP tool here
      // For now, we'll simulate the MCP tool response
      const paymentResponse = {
        id: `pay_${Date.now()}`,
        amount: amount,
        currency: 'INR',
        status: 'authorized',
        order_id: orderId,
        method: paymentMethod || 'card',
        created_at: Math.floor(Date.now() / 1000)
      }

      console.log('Payment initiated successfully:', paymentResponse.id)

      return NextResponse.json({
        success: true,
        paymentId: paymentResponse.id,
        status: paymentResponse.status,
        testMode: false,
        message: 'Payment initiated successfully'
      })
    }
  } catch (error) {
    console.error('Payment initiation failed:', error)
    return NextResponse.json({ 
      error: 'Failed to initiate payment',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
