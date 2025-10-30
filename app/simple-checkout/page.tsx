'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { TestTube } from 'lucide-react'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SimpleCheckout() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Test User',
    email: 'test@example.com',
    phone: '9876543210',
  })

  const subtotal = getTotalPrice()
  const total = subtotal

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    console.clear()
    console.log('🚀 Starting Simple Payment Flow...')
    
    setIsProcessing(true)

    try {
      // Step 1: Load Razorpay Script
      console.log('Step 1: Loading Razorpay script...')
      const scriptLoaded = await loadRazorpayScript()
      
      if (!scriptLoaded) {
        throw new Error('Razorpay script failed to load')
      }
      console.log('✅ Razorpay script loaded')

      // Step 2: Create Order
      console.log('Step 2: Creating order...')
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: items.length > 0 ? items : [{
            id: 'sample-1',
            name: 'YumBurst Gummies',
            price: 699,
            quantity: 1,
            flavour: 'Orange',
            image: '/images/products/orange-gummy.png'
          }], 
          customerInfo 
        }),
      })

      const orderData = await orderResponse.json()
      console.log('✅ Order created:', orderData)

      // Step 3: Open Razorpay
      console.log('Step 3: Opening Razorpay modal...')
      
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Nutri Nest',
        description: 'YumBurst Gummies',
        order_id: orderData.orderId,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        theme: {
          color: '#FF6B35',
        },
        handler: function (response: any) {
          console.log('✅ Payment Success!', response)
          toast.success('Payment successful!')
          clearCart()
          router.push(`/order-success?order_id=${orderData.orderId}`)
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal closed')
            setIsProcessing(false)
          },
        },
      }

      console.log('Creating Razorpay instance...')
      const rzp = new window.Razorpay(options)
      
      rzp.on('payment.failed', function (response: any) {
        console.error('❌ Payment failed:', response.error)
        toast.error('Payment failed: ' + response.error.description)
        setIsProcessing(false)
      })

      console.log('Opening modal...')
      rzp.open()
      console.log('✅ Modal opened successfully!')

    } catch (error: any) {
      console.error('❌ Error:', error)
      toast.error(error.message || 'Payment failed')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Simple Checkout</h1>
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
              <TestTube className="w-4 h-4" />
              <span className="text-sm font-semibold">Test Mode</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              This is a simplified checkout that bypasses complex logic.
            </p>
          </div>

          {/* Customer Info */}
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">{formatPrice(total)}</span>
                </div>
              </>
            ) : (
              <p className="text-gray-600">Using sample item: YumBurst Gummies - ₹699</p>
            )}
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? 'Processing...' : `Pay ${formatPrice(items.length > 0 ? total : 699)}`}
          </button>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Test Card Details:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>Card: 4111 1111 1111 1111</li>
              <li>CVV: 123</li>
              <li>Expiry: 12/25</li>
              <li>Name: Any name</li>
            </ul>
          </div>

          {/* Console Instructions */}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Check Console:</strong> Press F12 to see detailed logs of each step.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
