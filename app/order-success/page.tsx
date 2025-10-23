'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, Truck, Home, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-4">
            Order Successful!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing Nutri Nest! Your order has been confirmed and will be processed shortly.
          </p>

          {orderId && (
            <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h2>
              <p className="text-gray-600">Order ID: {orderId}</p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
              What Happens Next?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  We'll prepare your order within 1-2 business days
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Shipping</h3>
                <p className="text-sm text-gray-600">
                  Your order will be shipped and you'll receive tracking details
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">
                  Expect delivery within 3-5 business days
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary flex items-center justify-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            <Link href="/" className="btn-secondary flex items-center justify-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800 text-sm">
              If you have any questions about your order, please contact us at{' '}
              <a href="mailto:support@nutri-nest.com" className="underline">
                support@nutri-nest.com
              </a>{' '}
              or call us at{' '}
              <a href="tel:+919876543210" className="underline">
                +91 98765 43210
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
