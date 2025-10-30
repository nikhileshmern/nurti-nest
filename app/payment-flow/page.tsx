'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Truck, Shield, TestTube, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

interface PaymentStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'error'
  icon: React.ReactNode
}

export default function PaymentFlowPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [steps, setSteps] = useState<PaymentStep[]>([
    {
      id: 'order',
      title: 'Create Order',
      description: 'Creating Razorpay order using MCP tool',
      status: 'pending',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: 'initiate',
      title: 'Initiate Payment',
      description: 'Initiating payment using Razorpay MCP tool',
      status: 'pending',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'capture',
      title: 'Capture Payment',
      description: 'Capturing authorized payment',
      status: 'pending',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: 'complete',
      title: 'Complete Order',
      description: 'Processing order and creating shipment',
      status: 'pending',
      icon: <Truck className="w-5 h-5" />
    }
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const updateStepStatus = (stepIndex: number, status: PaymentStep['status']) => {
    setSteps((prev: PaymentStep[]) => prev.map((step: PaymentStep, index: number) => 
      index === stepIndex ? { ...step, status } : step
    ))
  }

  const processPaymentFlow = async () => {
    setIsProcessing(true)
    
    try {
      // Step 1: Create Order
      updateStepStatus(0, 'in_progress')
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
      updateStepStatus(0, 'completed')
      setPaymentData(orderData)
      
      // Step 2: Initiate Payment
      updateStepStatus(1, 'in_progress')
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
      updateStepStatus(1, 'completed')
      
      // Step 3: Capture Payment
      updateStepStatus(2, 'in_progress')
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
      updateStepStatus(2, 'completed')
      
      // Step 4: Complete Order
      updateStepStatus(3, 'in_progress')
      
      // Simulate order completion
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      updateStepStatus(3, 'completed')
      
      toast.success('Payment completed successfully!')
      clearCart()
      router.push(`/order-success?order_id=${orderData.orderId}`)
      
    } catch (error) {
      console.error('Payment flow error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`Payment failed: ${errorMessage}`)
      
      // Mark current step as error
      const currentStepIndex = steps.findIndex(step => step.status === 'in_progress')
      if (currentStepIndex !== -1) {
        updateStepStatus(currentStepIndex, 'error')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="container-custom">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-primary-orange hover:text-orange-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900 font-poppins">
              Complete Payment Flow
            </h1>
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
              <TestTube className="w-4 h-4" />
              <span className="text-sm font-semibold">MCP Integration</span>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            This demonstrates the complete Razorpay payment flow using MCP tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Customer Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={customerInfo.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={customerInfo.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Flow Steps */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Payment Flow Steps
              </h2>
              
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
                      step.status === 'completed' 
                        ? 'bg-green-50 border-green-300' 
                        : step.status === 'in_progress'
                        ? 'bg-blue-50 border-blue-300'
                        : step.status === 'error'
                        ? 'bg-red-50 border-red-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : step.status === 'in_progress'
                        ? 'bg-blue-500 text-white'
                        : step.status === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : step.status === 'error' ? (
                        <AlertCircle className="w-5 h-5" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        step.status === 'completed' 
                          ? 'text-green-800' 
                          : step.status === 'in_progress'
                          ? 'text-blue-800'
                          : step.status === 'error'
                          ? 'text-red-800'
                          : 'text-gray-700'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${
                        step.status === 'completed' 
                          ? 'text-green-600' 
                          : step.status === 'in_progress'
                          ? 'text-blue-600'
                          : step.status === 'error'
                          ? 'text-red-600'
                          : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Order Summary
              </h2>
              
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
            </div>

            <button
              onClick={processPaymentFlow}
              disabled={isProcessing || !customerInfo.name || !customerInfo.email || !customerInfo.phone}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing Payment...' : `Start Payment Flow - ${formatPrice(total)}`}
            </button>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🔧 MCP Integration Features</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Create orders using Razorpay MCP tool</li>
                <li>• Initiate payments with MCP integration</li>
                <li>• Capture authorized payments</li>
                <li>• Handle webhooks with MCP tools</li>
                <li>• Fetch payment details and status</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
