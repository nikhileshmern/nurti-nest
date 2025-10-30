'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TestShipmentPage() {
  const [loading, setLoading] = useState(false)
  const [shipmentData, setShipmentData] = useState<any>(null)

  const createTestShipment = async () => {
    setLoading(true)
    setShipmentData(null)

    try {
      // Simulate creating a shipment in test mode
      const mockShipmentData = {
        order_id: `TEST_ORDER_${Date.now()}`,
        order_date: new Date().toISOString().split('T')[0],
        pickup_location: 'Primary',
        billing_customer_name: 'Test',
        billing_last_name: 'Customer',
        billing_address: '123 Test Street',
        billing_address_2: '',
        billing_city: 'Test City',
        billing_pincode: '110001',
        billing_state: 'Delhi',
        billing_country: 'India',
        billing_email: 'test@example.com',
        billing_phone: '9876543210',
        shipping_is_billing: true,
        shipping_customer_name: 'Test',
        shipping_last_name: 'Customer',
        shipping_address: '123 Test Street',
        shipping_address_2: '',
        shipping_city: 'Test City',
        shipping_pincode: '110001',
        shipping_state: 'Delhi',
        shipping_country: 'India',
        shipping_email: 'test@example.com',
        shipping_phone: '9876543210',
        order_items: [
          {
            name: 'YumBurst Orange Gummies',
            sku: 'yumburst-orange',
            units: 1,
            selling_price: 299,
          },
        ],
        payment_method: 'Prepaid',
        sub_total: 299,
        length: 20,
        breadth: 15,
        height: 10,
        weight: 0.5,
      }

      console.log('🧪 Creating test shipment with data:', mockShipmentData)

      // In test mode, this will return mock data
      const timestamp = Date.now()
      const mockResponse = {
        order_id: 12345,
        shipment_id: 67890,
        awb_code: `TEST${timestamp}`,
        awb: `TEST${timestamp}`,
        tracking_url: `https://shiprocket.co/tracking/TEST${timestamp}`,
        status: 'confirmed',
        courier_name: 'Test Courier',
        courier_company_id: 1,
      }

      console.log('✅ Mock shipment created:', mockResponse)

      setShipmentData(mockResponse)
      toast.success('Test shipment created successfully!')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to create test shipment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            🧪 Test Shiprocket Integration
          </h1>
          <p className="text-gray-600">
            See how Shiprocket shipment creation works in test mode
          </p>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <Package className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Test Mode Active</h3>
              <p className="text-blue-700 text-sm">
                This will create a <strong>mock shipment</strong> in test mode. No real shipment will be created in Shiprocket.
                You'll see a fake AWB number and tracking URL.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Create Shipment Button */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Test Shipment</h2>
          <p className="text-gray-600 mb-6">
            Click the button below to simulate creating a shipment with Shiprocket API.
          </p>
          <button
            onClick={createTestShipment}
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Shipment...
              </>
            ) : (
              <>
                <Truck className="w-5 h-5" />
                Create Test Shipment
              </>
            )}
          </button>
        </div>

        {/* Shipment Result */}
        {shipmentData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900">Shipment Created!</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="font-semibold text-gray-900">{shipmentData.order_id}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Shipment ID</p>
                <p className="font-semibold text-gray-900">{shipmentData.shipment_id}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 md:col-span-2">
                <p className="text-sm text-gray-600 mb-1">AWB / Tracking Number</p>
                <p className="font-mono font-bold text-blue-600 text-lg">{shipmentData.awb_code}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Courier</p>
                <p className="font-semibold text-gray-900">{shipmentData.courier_name}</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="font-semibold text-green-600">{shipmentData.status}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <p className="text-sm text-gray-600 mb-2">Tracking URL</p>
                <a
                  href={shipmentData.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 underline break-all text-sm"
                >
                  {shipmentData.tracking_url}
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This is test data. In production with real Shiprocket credentials,
                this would create an actual shipment and you'd receive a real AWB number from the courier.
              </p>
            </div>
          </motion.div>
        )}

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mt-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Payment Success</h4>
                <p className="text-gray-600 text-sm">
                  After a customer completes payment, Razorpay triggers a webhook
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Create Shipment</h4>
                <p className="text-gray-600 text-sm">
                  The webhook automatically calls Shiprocket API to create a shipment
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Generate AWB</h4>
                <p className="text-gray-600 text-sm">
                  Shiprocket generates an Air Waybill (AWB) tracking number
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Customer Notification</h4>
                <p className="text-gray-600 text-sm">
                  Customer receives email with tracking number and can track their shipment
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

