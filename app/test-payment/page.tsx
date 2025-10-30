'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, Play, RefreshCw, TestTube } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function TestPaymentPage() {
  const { items, getTotalPrice, clearCart, addItem } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [testMode, setTestMode] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Test User',
    email: 'test@example.com',
    phone: '9876543210',
    address: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    pincode: '123456',
  })

  useEffect(() => {
    // Auto-detect test mode
    const isTest = process.env.NEXT_PUBLIC_TEST_MODE === 'true' || 
                  process.env.TEST_MODE === 'true' ||
                  window.location.hostname === 'localhost'
    setTestMode(isTest)
    console.log('🧪 Test mode detected:', isTest)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const addSampleItems = () => {
    // Add sample items to cart
    addItem({
      id: 'sample-1',
      name: 'YumBurst Orange Gummies',
      price: 299,
      flavour: 'Orange',
      image: '/images/products/orange-gummy.png'
    })
    addItem({
      id: 'sample-2',
      name: 'YumBurst Pomegranate Gummies',
      price: 299,
      flavour: 'Pomegranate',
      image: '/images/products/pomogranate-gummy.png'
    })
    toast.success('Sample items added to cart!')
  }

  const testPaymentFlow = async () => {
    if (items.length === 0) {
      toast.error('Please add items to cart first')
      return
    }

    setIsProcessing(true)

    try {
      console.log('🧪 Starting test payment flow...')
      
      // Step 1: Create Order
      console.log('🧪 Step 1: Creating order...')
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customerInfo }),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || 'Failed to create order')
      }

      const orderData = await orderResponse.json()
      console.log('🧪 Order created:', orderData)
      
      // Step 2: Initiate Payment
      console.log('🧪 Step 2: Initiating payment...')
      const paymentResponse = await fetch('/api/razorpay/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.orderId,
          amount: orderData.amount,
          customerInfo,
          paymentMethod: 'card'
        }),
      })

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json()
        throw new Error(errorData.error || 'Failed to initiate payment')
      }

      const paymentInitData = await paymentResponse.json()
      console.log('🧪 Payment initiated:', paymentInitData)
      
      // Step 3: Capture Payment
      console.log('🧪 Step 3: Capturing payment...')
      const captureResponse = await fetch('/api/razorpay/capture-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: paymentInitData.paymentId,
          amount: orderData.amount,
          currency: orderData.currency
        }),
      })

      if (!captureResponse.ok) {
        const errorData = await captureResponse.json()
        throw new Error(errorData.error || 'Failed to capture payment')
      }

      const captureData = await captureResponse.json()
      console.log('🧪 Payment captured:', captureData)
      
      // Step 4: Complete
      console.log('🧪 Step 4: Completing order...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('🧪 Test payment flow completed successfully!')
      toast.success('🧪 Test payment completed successfully!')
      clearCart()
      router.push(`/order-success?order_id=${orderData.orderId}`)
      
    } catch (error) {
      console.error('🧪 Test payment flow error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`🧪 Test payment failed: ${errorMessage}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-custom">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary-orange hover:text-orange-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900 font-poppins">
              Test Payment Flow
            </h1>
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
              <TestTube className="w-4 h-4" />
              <span className="text-sm font-semibold">Test Mode: {testMode ? 'ON' : 'OFF'}</span>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            Test the complete payment flow with sample data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Test Controls
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={addSampleItems}
                  disabled={isProcessing}
                  className="w-full btn-secondary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Add Sample Items to Cart</span>
                </button>

                <button
                  onClick={testPaymentFlow}
                  disabled={isProcessing || items.length === 0}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>{isProcessing ? 'Testing Payment...' : 'Test Complete Payment Flow'}</span>
                </button>
              </div>

              {testMode && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">✅ Test Mode Active</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• All payments are simulated</li>
                    <li>• No real money is charged</li>
                    <li>• Mock data is used throughout</li>
                    <li>• Check console for detailed logs</li>
                  </ul>
                </div>
              )}

              {!testMode && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Test Mode Disabled</h4>
                  <p className="text-sm text-yellow-800">
                    Set NEXT_PUBLIC_TEST_MODE=true in your environment variables to enable test mode.
                  </p>
                </div>
              )}
            </div>

            {/* Customer Info */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 font-poppins mb-4">
                Test Customer Info
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Order Summary
              </h2>
              
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No items in cart</p>
                  <p className="text-sm text-gray-400 mt-2">Click "Add Sample Items" to start testing</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.flavour}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(item.price)}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                      <span>Total</span>
                      <span className="text-primary-orange">{formatPrice(total)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Test Instructions */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 font-poppins mb-4">
                Test Instructions
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <p className="text-sm text-gray-700">Add sample items to your cart</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <p className="text-sm text-gray-700">Click "Test Complete Payment Flow"</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <p className="text-sm text-gray-700">Watch the payment flow execute step by step</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                  <p className="text-sm text-gray-700">Check console logs for detailed information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
