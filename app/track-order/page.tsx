'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Package, MapPin, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface TrackingActivity {
  date: string
  status: string
  activity: string
  location: string
}

interface TrackingData {
  awb_code: string
  current_status: string
  shipment_status: string
  shipment_track_activities: TrackingActivity[]
}

export default function TrackOrderPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const awb = searchParams.get('awb')

  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchAwb, setSearchAwb] = useState(awb || '')

  useEffect(() => {
    if (awb) {
      fetchTracking(awb)
    }
  }, [awb])

  const fetchTracking = async (awbCode: string) => {
    if (!awbCode.trim()) {
      toast.error('Please enter an AWB/tracking number')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/shiprocket/tracking?awb=${awbCode}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tracking information')
      }

      setTrackingData(data.tracking)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tracking'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchTracking(searchAwb)
  }

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('delivered')) return <CheckCircle className="w-6 h-6 text-green-500" />
    if (lowerStatus.includes('transit') || lowerStatus.includes('picked')) return <Truck className="w-6 h-6 text-blue-500" />
    if (lowerStatus.includes('pending') || lowerStatus.includes('manifest')) return <Clock className="w-6 h-6 text-yellow-500" />
    return <Package className="w-6 h-6 text-gray-500" />
  }

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('delivered')) return 'bg-green-100 text-green-800'
    if (lowerStatus.includes('transit') || lowerStatus.includes('picked')) return 'bg-blue-100 text-blue-800'
    if (lowerStatus.includes('pending') || lowerStatus.includes('manifest')) return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Enter your AWB/tracking number to track your shipment
          </p>
        </div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchAwb}
              onChange={(e) => setSearchAwb(e.target.value)}
              placeholder="Enter AWB/Tracking Number"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </form>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 flex items-center gap-4"
          >
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Tracking Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Fetching tracking information...</p>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Current Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                {getStatusIcon(trackingData.current_status)}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {trackingData.current_status}
                  </h2>
                  <p className="text-gray-600">AWB: {trackingData.awb_code}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(trackingData.shipment_status)}`}>
                  {trackingData.shipment_status}
                </span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange-500" />
                Shipment Timeline
              </h3>

              <div className="space-y-6">
                {trackingData.shipment_track_activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-orange-500' : 'bg-gray-300'}`} />
                      {index < trackingData.shipment_track_activities.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 my-2" />
                      )}
                    </div>

                    {/* Activity Details */}
                    <div className="flex-1 pb-6">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{activity.activity}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.date).toLocaleString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="mt-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        {!trackingData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Tracking Information Yet
            </h3>
            <p className="text-gray-600 mb-4">
              Enter your AWB/tracking number above to see your shipment details
            </p>
            <div className="text-sm text-gray-500">
              <p>You can find your tracking number in:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Order confirmation email</li>
                <li>Your profile → Order History</li>
                <li>SMS notification</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

