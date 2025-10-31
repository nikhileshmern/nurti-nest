'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Truck, CheckCircle, Clock, XCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase'
import type { Order } from '@/lib/database.types'

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Allow both logged-in users and guests to view orders
    // Guests can view by email (future enhancement: by order ID)
    if (!loading) {
      fetchOrders()
    }
  }, [user, loading])

  const fetchOrders = async () => {
    try {
      const supabase = createClient()
      
      if (user) {
        // Logged-in user: fetch orders by user_id OR email (for backward compatibility)
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .or(`user_id.eq.${user.id},user_email.eq.${user.email}`)
          .order('created_at', { ascending: false })

        if (error) throw error
        setOrders(data || [])
      } else {
        // Guest user: show empty state with option to login or track by order ID
        setOrders([])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load orders')
    } finally {
      setLoadingOrders(false)
    }
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'shipped':
        return <Truck className="w-6 h-6 text-blue-500" />
      case 'paid':
        return <Clock className="w-6 h-6 text-yellow-500" />
      case 'pending':
        return <Package className="w-6 h-6 text-gray-500" />
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-500" />
      default:
        return <Package className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'paid':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading || loadingOrders) {
    return (
      <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text  mb-4">
              My Orders
            </h1>
            <p className="text-gray-600">
              Track and manage your orders
            </p>
          </motion.div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping now!
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Browse Products
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Order #{order.id.substring(0, 8).toUpperCase()}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <p className="text-lg font-bold text-gray-900 mt-2">
                          ₹{order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Tracking Info */}
                    {order.shiprocket_awb && (
                      <div className="bg-blue-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                            <p className="font-mono font-semibold text-gray-900">
                              {order.shiprocket_awb}
                            </p>
                          </div>
                          <Link
                            href={`/track-order?awb=${order.shiprocket_awb}`}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Truck className="w-4 h-4" />
                            Track Order
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors font-medium"
                    >
                      {expandedOrders.has(order.id) ? (
                        <>
                          <ChevronUp className="w-5 h-5" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-5 h-5" />
                          View Details
                        </>
                      )}
                    </button>
                  </div>

                  {/* Order Details (Expandable) */}
                  {expandedOrders.has(order.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-6 bg-gray-50"
                    >
                      {/* Order Items */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-4">
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                {item.flavour && (
                                  <p className="text-sm text-gray-600">Flavour: {item.flavour}</p>
                                )}
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-gray-900">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Delivery Address</h4>
                        <div className="bg-white rounded-lg p-4">
                          <p className="font-medium text-gray-900">{order.address_json.name}</p>
                          <p className="text-gray-600">{order.address_json.address}</p>
                          <p className="text-gray-600">
                            {order.address_json.city}, {order.address_json.state} - {order.address_json.pincode}
                          </p>
                          <p className="text-gray-600 mt-2">Phone: {order.address_json.phone}</p>
                          <p className="text-gray-600">Email: {order.address_json.email}</p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                        <div className="bg-white rounded-lg p-4 space-y-2">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>₹{order.shipping.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>₹{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Back to Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link 
              href="/profile" 
              className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
            >
              ← Back to Profile
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

