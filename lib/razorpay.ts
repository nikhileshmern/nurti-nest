import { isTestMode, getTestModeConfig, generateMockPaymentResponse } from './test-utils'

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: {
    name: string
    email: string
    contact: string
  }
  notes: {
    address: string
  }
  theme: {
    color: string
  }
  handler: (response: any) => void
  modal: {
    ondismiss: () => void
  }
}

export const loadRazorpay = async (): Promise<any> => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      resolve((window as any).Razorpay)
    }
    script.onerror = () => {
      resolve(null)
    }
    document.body.appendChild(script)
  })
}

export const openRazorpay = (options: RazorpayOptions) => {
  if (isTestMode()) {
    // Mock payment flow for testing
    console.log('🧪 Test Mode: Simulating Razorpay payment...')
    
    // Simulate payment success after 2 seconds
    setTimeout(() => {
      const mockResponse = generateMockPaymentResponse(options.order_id)
      console.log('🧪 Test Mode: Payment successful', mockResponse)
      options.handler(mockResponse)
    }, 2000)
    
    return
  }

  const Razorpay = (window as any).Razorpay
  if (Razorpay) {
    const rzp = new Razorpay(options)
    rzp.open()
  }
}
