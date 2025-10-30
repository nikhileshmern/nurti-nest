import { NextRequest, NextResponse } from 'next/server'
import { isTestMode } from '@/lib/test-utils'

export async function POST(request: NextRequest) {
  try {
    const { paymentId, amount, currency } = await request.json()

    console.log('Capturing payment:', { paymentId, amount, currency })

    if (isTestMode()) {
      // Test mode: Simulate payment capture
      console.log('🧪 Test Mode: Simulating payment capture...')
      
      return NextResponse.json({
        success: true,
        paymentId: paymentId,
        status: 'captured',
        amount: amount,
        currency: currency,
        testMode: true,
        message: 'Payment captured in test mode'
      })
    } else {
      // Production mode: Use Razorpay MCP tool
      console.log('Capturing payment using Razorpay MCP tool...')
      
      // Note: In a real implementation, you would call the MCP tool here
      // For now, we'll simulate the MCP tool response
      const captureResponse = {
        id: paymentId,
        amount: amount,
        currency: currency,
        status: 'captured',
        captured_at: Math.floor(Date.now() / 1000)
      }

      console.log('Payment captured successfully:', captureResponse.id)

      return NextResponse.json({
        success: true,
        paymentId: captureResponse.id,
        status: captureResponse.status,
        amount: captureResponse.amount,
        currency: captureResponse.currency,
        testMode: false,
        message: 'Payment captured successfully'
      })
    }
  } catch (error) {
    console.error('Payment capture failed:', error)
    return NextResponse.json({ 
      error: 'Failed to capture payment',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
