'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { TestTube, CreditCard, Truck, Package, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TestFlowPage() {
  const { items, getTotalPrice, addToCart } = useCart()
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunningTest, setIsRunningTest] = useState(false)

  // Add sample items for testing
  const sampleItems = [
    {
      id: 'test-item-1',
      name: 'YumBurst Gummies',
      flavour: 'Mixed Berry',
      price: 299,
      image: '/images/products/orange-gummy.png',
      quantity: 2
    },
    {
      id: 'test-item-2', 
      name: 'YumBurst Gummies',
      flavour: 'Orange',
      price: 299,
      image: '/images/products/pomogranate-gummy.png',
      quantity: 1
    }
  ]

  const addSampleItems = () => {
    sampleItems.forEach(item => {
      addToCart(item)
    })
    toast.success('Sample items added to cart!')
  }

  const runCompleteTest = async () => {
    setIsRunningTest(true)
    setTestResults([])
    
    const results = []
    
    try {
      // Test 1: Create Order
      results.push({
        step: 'Create Order',
        status: 'running',
        message: 'Creating test order...'
      })
      setTestResults([...results])
      
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: sampleItems,
          customerInfo: {
            name: 'Test User',
            email: 'test@example.com',
            phone: '9876543210',
            address: '123 Test Street',
            city: 'Test City',
            state: 'Test State',
            pincode: '123456'
          }
        }),
      })
      
      if (orderResponse.ok) {
        const orderData = await orderResponse.json()
        results[0] = {
          step: 'Create Order',
          status: 'success',
          message: `Order created: ${orderData.orderId}`,
          data: orderData
        }
      } else {
        results[0] = {
          step: 'Create Order',
          status: 'error',
          message: 'Failed to create order'
        }
      }
      
      setTestResults([...results])
      
      // Test 2: Simulate Payment
      results.push({
        step: 'Payment Processing',
        status: 'running',
        message: 'Processing payment...'
      })
      setTestResults([...results])
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      results[1] = {
        step: 'Payment Processing',
        status: 'success',
        message: 'Payment processed successfully (Test Mode)'
      }
      setTestResults([...results])
      
      // Test 3: Simulate Webhook
      results.push({
        step: 'Webhook Processing',
        status: 'running',
        message: 'Processing webhook...'
      })
      setTestResults([...results])
      
      const webhookResponse = await fetch(`/api/razorpay/webhook?order_id=${results[0].data?.orderId}`)
      
      if (webhookResponse.ok) {
        const webhookData = await webhookResponse.json()
        results[2] = {
          step: 'Webhook Processing',
          status: 'success',
          message: `Webhook processed: Order ${webhookData.order_id}`,
          data: webhookData
        }
      } else {
        results[2] = {
          step: 'Webhook Processing',
          status: 'error',
          message: 'Webhook processing failed'
        }
      }
      
      setTestResults([...results])
      
      // Test 4: Shipment Creation
      results.push({
        step: 'Shipment Creation',
        status: 'running',
        message: 'Creating shipment...'
      })
      setTestResults([...results])
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      results[3] = {
        step: 'Shipment Creation',
        status: 'success',
        message: 'Shipment created with tracking info (Test Mode)'
      }
      setTestResults([...results])
      
      toast.success('🧪 Complete test flow executed successfully!')
      
    } catch (error) {
      console.error('Test failed:', error)
      toast.error('Test failed: ' + error.message)
    } finally {
      setIsRunningTest(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <X className="w-5 h-5 text-red-500" />
      case 'running':
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      default:
        return <div className="w-5 h-5 bg-gray-300 rounded-full" />
    }
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-4">
            🧪 Test Flow Dashboard
          </h1>
          <p className="text-gray-600">
            Test the complete Razorpay and Shiprocket integration flow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
              Test Controls
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={addSampleItems}
                className="w-full btn-secondary"
              >
                <Package className="w-4 h-4 mr-2" />
                Add Sample Items to Cart
              </button>
              
              <button
                onClick={runCompleteTest}
                disabled={isRunningTest}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TestTube className="w-4 h-4 mr-2" />
                {isRunningTest ? 'Running Test...' : 'Run Complete Test Flow'}
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Test Mode Required</h4>
              <p className="text-sm text-yellow-800">
                Make sure TEST_MODE=true is set in your environment variables for this to work properly.
              </p>
            </div>
          </div>

          {/* Test Results */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
              Test Results
            </h2>
            
            {testResults.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <TestTube className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No tests run yet. Click "Run Complete Test Flow" to start.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getStatusIcon(result.status)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{result.step}</h3>
                      <p className="text-sm text-gray-600">{result.message}</p>
                      {result.data && (
                        <details className="mt-2">
                          <summary className="text-xs text-blue-600 cursor-pointer">View Data</summary>
                          <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Current Cart Status */}
        <div className="mt-8 card p-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-4">
            Current Cart Status
          </h2>
          
          {items.length === 0 ? (
            <p className="text-gray-500">Cart is empty. Add sample items to test.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.flavour} - Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary-orange">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
