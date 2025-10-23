import { loadScript } from '@razorpay/razorpay-js'

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
  const Razorpay = (window as any).Razorpay
  if (Razorpay) {
    const rzp = new Razorpay(options)
    rzp.open()
  }
}
