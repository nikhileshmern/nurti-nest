// Test mode utilities
export const isTestMode = (): boolean => {
  return process.env.NEXT_PUBLIC_TEST_MODE === 'true' || process.env.TEST_MODE === 'true'
}

export const getTestModeConfig = () => {
  return {
    razorpay: {
      keyId: 'rzp_test_1DP5mmOlF5G5ag',
      keySecret: 'thisisasecret',
      webhookSecret: 'test_webhook_secret'
    },
    shiprocket: {
      email: 'test@nutrinest.com',
      password: 'test_password',
      baseUrl: 'https://test-api.shiprocket.in'
    }
  }
}

// Mock data generators for testing
export const generateMockRazorpayOrder = (amount: number) => {
  return {
    id: `order_test_${Date.now()}`,
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    receipt: `receipt_test_${Date.now()}`,
    status: 'created',
    created_at: Date.now()
  }
}

export const generateMockPaymentResponse = (orderId: string) => {
  return {
    razorpay_payment_id: `pay_test_${Date.now()}`,
    razorpay_order_id: orderId,
    razorpay_signature: `test_signature_${Date.now()}`
  }
}

export const generateMockShipmentResponse = (orderId: string) => {
  return {
    order_id: orderId,
    awb: `AWB${Date.now()}`,
    tracking_url: `https://test-tracking.shiprocket.in/track/${Date.now()}`,
    status: 'confirmed',
    courier_name: 'Test Courier',
    courier_id: 'test_courier_123'
  }
}

export const generateMockTrackingResponse = (awb: string) => {
  return {
    awb: awb,
    status: 'In Transit',
    current_status: 'Picked up from origin',
    estimated_delivery_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    tracking_events: [
      {
        status: 'Order Placed',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Nutri Nest Warehouse'
      },
      {
        status: 'Picked up from origin',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Nutri Nest Warehouse'
      }
    ]
  }
}
