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
  const timestamp = Date.now()
  return {
    order_id: 12345,
    shipment_id: 67890,
    awb_code: `TEST${timestamp}`,
    awb: `TEST${timestamp}`,
    tracking_url: `https://test-tracking.shiprocket.in/track/${timestamp}`,
    status: 'confirmed',
    courier_name: 'Test Courier',
    courier_company_id: 1,
    courier_id: 'test_courier_123'
  }
}

export const generateMockTrackingResponse = (awb: string) => {
  return {
    awb_code: awb,
    current_status: 'Picked up from origin',
    shipment_status: 'In Transit',
    shipment_track: [
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Order Placed',
        activity: 'Shipment has been created',
        location: 'Nutri Nest Warehouse'
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Picked Up',
        activity: 'Picked up from origin',
        location: 'Nutri Nest Warehouse'
      }
    ],
    shipment_track_activities: [
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Order Placed',
        activity: 'Shipment has been created',
        location: 'Nutri Nest Warehouse',
        'sr-status': '1',
        'sr-status-label': 'Order Placed'
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Picked Up',
        activity: 'Picked up from origin',
        location: 'Nutri Nest Warehouse',
        'sr-status': '6',
        'sr-status-label': 'Picked Up'
      }
    ]
  }
}
