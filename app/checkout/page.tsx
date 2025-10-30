'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Truck, Shield, X, TestTube, User, LogIn } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart, appliedCoupon, setAppliedCoupon } = useCart()
  const { user } = useAuth() // Get current user
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isTestMode, setIsTestMode] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setCustomerInfo(prev => ({
        ...prev,
        name: user.full_name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))
    }
  }, [user])

  // Coupon state (local state for UI, shared state for actual coupon)
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [showCoupons, setShowCoupons] = useState(false)

  // Shipping is always free - no need to fetch rates
  // Keeping state for future if needed
  const [shippingRates, setShippingRates] = useState<any[]>([])
  const [loadingShipping, setLoadingShipping] = useState(false)
  const [customShipping, setCustomShipping] = useState<number>(0) // Always 0 (free)

  // Check if we're in test mode
  useEffect(() => {
    // Check both server and client side test mode flags
    const testMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true'
    setIsTestMode(testMode)
    console.log('🧪 Test mode detected:', testMode)
  }, [])

  // Available coupons (Shipping is always free, so no FREESHIP coupon needed)
  const availableCoupons = {
    'WELCOME50': { discount: 50, type: 'fixed' as const, description: 'Welcome discount' },
    'SAVE10': { discount: 10, type: 'percentage' as const, description: '10% off' },
    'SAVE20': { discount: 20, type: 'percentage' as const, description: '20% off' },
    // 'FREESHIP' removed - shipping is always free now!
  }

  // Featured coupons to display
  const featuredCoupons = [
    { code: 'WELCOME50', ...availableCoupons['WELCOME50'], emoji: '🎁' },
    { code: 'SAVE20', ...availableCoupons['SAVE20'], emoji: '💰' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))

    // Shipping is always free - no need to fetch rates
    // Removed shipping rate fetching
  }

  // Shipping rates fetching disabled - shipping is always free
  // Keeping function for reference if needed in future
  const fetchShippingRates = async (pincode: string) => {
    // Disabled - shipping is always free
    console.log('ℹ️ Shipping rate fetch disabled - shipping is always FREE')
    return
  }

  // Apply coupon
  const handleApplyCoupon = (code?: string) => {
    const upperCode = (code || couponCode).toUpperCase().trim()
    
    if (!upperCode) {
      setCouponError('Please enter a coupon code')
      return
    }

    const coupon = availableCoupons[upperCode as keyof typeof availableCoupons]
    
    if (coupon) {
      setAppliedCoupon({ code: upperCode, ...coupon })
      setCouponError('')
      setCouponCode('')
      setShowCoupons(false)
      toast.success(`Coupon ${upperCode} applied!`)
    } else {
      setCouponError('Invalid coupon code')
      setAppliedCoupon(null)
    }
  }

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
    toast.success('Coupon removed')
  }

  // Calculate discount
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0
    
    const subtotal = getTotalPrice()
    if (appliedCoupon.type === 'percentage') {
      return Math.round((subtotal * appliedCoupon.discount) / 100)
    }
    return appliedCoupon.discount
  }

  // Initialize Razorpay payment
  const initializeRazorpay = (
    razorpayKey: string,
    amount: number,
    currency: string,
    orderId: string,
    customerInfo: any,
    isTestMode: boolean,
    clearCart: () => void,
    router: any,
    setIsProcessing: (val: boolean) => void
  ) => {
    try {
      console.log('🚀 === INITIALIZING RAZORPAY ===')
      console.log('Parameters:', {
        razorpayKey: razorpayKey.substring(0, 15) + '...',
        amount,
        currency,
        orderId,
        customerName: customerInfo.name,
        isTestMode
      })
      
      if (!(window as any).Razorpay) {
        console.error('❌ Razorpay object not found on window')
        toast.error('Payment service not loaded. Please refresh and try again.')
        setIsProcessing(false)
        return
      }
      
      console.log('✅ Razorpay object found on window')

      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: 'Nutri Nest',
        description: 'YumBurst Gummies Order',
        order_id: orderId,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        notes: {
          address: customerInfo.address,
        },
        theme: {
          color: '#FFA726',
        },
        handler: async (response: any) => {
          // Payment successful
          console.log(isTestMode ? '🧪 Test payment successful!' : 'Payment successful!', response)
          toast.success(isTestMode ? '🧪 Test Payment successful!' : 'Payment successful!')
          clearCart()
          router.push(`/order-success?order_id=${orderId}`)
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed')
            toast.error('Payment cancelled')
            setIsProcessing(false)
          },
          escape: true,
          backdropclose: false
        },
      }

      console.log(isTestMode ? '🧪 Opening Razorpay test checkout...' : 'Opening Razorpay checkout...')
      console.log('Payment options:', options)
      
      const rzp = new (window as any).Razorpay(options)
      
      rzp.on('payment.failed', function (response: any) {
        console.error('❌ Payment failed:', response.error)
        toast.error(`Payment failed: ${response.error.description}`)
        setIsProcessing(false)
      })

      rzp.open()
      console.log('✅ Razorpay modal opened')
    } catch (error) {
      console.error('❌ Razorpay initialization error:', error)
      toast.error('Payment initialization failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('='.repeat(50))
    console.log('🚀 PAYMENT FLOW STARTED')
    console.log('='.repeat(50))
    
    setIsProcessing(true)

    try {
      console.log('Step 1: Creating Razorpay order...')
      console.log('Items:', items)
      console.log('Customer Info:', customerInfo)
      console.log('User:', user ? `Logged in (${user.id})` : 'Guest checkout')
      
      // Create Razorpay order (include userId if logged in)
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items, 
          customerInfo,
          discountAmount: calculateDiscount(),
          userId: user?.id || null // Send user ID if logged in
        }),
      })

      console.log('Order API Response Status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Order creation failed:', errorData)
        throw new Error(errorData.error || 'Failed to create order')
      }

      const orderData = await response.json()
      console.log('✅ Order created successfully:', orderData)
      
      const { orderId, amount, currency } = orderData

      // Get Razorpay key from environment
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

      if (!razorpayKey) {
        console.error('Razorpay key not configured. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local')
        toast.error('Payment configuration error. Please add Razorpay keys to .env.local')
        setIsProcessing(false)
        return
      }
      
      console.log('Using Razorpay key:', razorpayKey.substring(0, 15) + '...')
      console.log('Test mode:', isTestMode)

      console.log(isTestMode ? '🧪 Test Mode: Loading Razorpay with test key...' : 'Loading Razorpay...')
      console.log('Order details:', { orderId, amount, currency, razorpayKey })

      // Check if Razorpay script is already loaded
      if ((window as any).Razorpay) {
        console.log('Razorpay script already loaded, initializing payment...')
        initializeRazorpay(razorpayKey, amount, currency, orderId, customerInfo, isTestMode, clearCart, router, setIsProcessing)
      } else {
        // Load Razorpay script
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        
        script.onload = () => {
          console.log('✅ Razorpay script loaded successfully')
          setTimeout(() => {
            initializeRazorpay(razorpayKey, amount, currency, orderId, customerInfo, isTestMode, clearCart, router, setIsProcessing)
          }, 100)
        }

        script.onerror = (error) => {
          console.error('❌ Failed to load Razorpay script:', error)
          toast.error('Payment service unavailable. Please try again.')
          setIsProcessing(false)
        }

        document.head.appendChild(script)
      }
    } catch (error) {
      console.error('='.repeat(50))
      console.error('❌ CHECKOUT ERROR CAUGHT')
      console.error('='.repeat(50))
      console.error('Error details:', error)
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to process payment'
      toast.error(errorMessage + '. Please try again.')
      setIsProcessing(false)
    }
    // Note: Don't set isProcessing to false here - let Razorpay modal handle it
  }

  const discount = calculateDiscount()
  const subtotal = getTotalPrice()
  // Shipping is always FREE! 🎉
  const shipping = 0 // Always free shipping
  const total = subtotal - discount + shipping // shipping is always 0

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
              Checkout
            </h1>
            {isTestMode && (
              <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg">
                <TestTube className="w-4 h-4" />
                <span className="text-sm font-semibold">Test Mode</span>
              </div>
            )}
          </div>
        </div>

        {/* User Status Banner */}
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-full p-2">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900">Logged in as {user.email}</p>
                <p className="text-xs text-green-700">Your order will be saved to your account</p>
              </div>
            </div>
            <Link href="/profile" className="text-sm text-green-600 hover:text-green-700 font-medium">
              View Profile →
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <LogIn className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900">Guest Checkout</p>
                  <p className="text-xs text-blue-700">Want to track your orders? Login or create an account</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link 
                  href={`/login?redirect=/checkout`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href={`/signup?redirect=/checkout`}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Shipping Information
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

          {/* Order Summary */}
          <div className="space-y-6">
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
              
              {/* Coupon Section */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                {!appliedCoupon ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Have a coupon?</label>
                      <button
                        type="button"
                        onClick={() => setShowCoupons(!showCoupons)}
                        className="text-sm font-semibold text-orange-600 hover:text-orange-700 underline"
                      >
                        {showCoupons ? 'Hide' : 'View Coupons'}
                      </button>
                    </div>

                    {/* Available Coupons List */}
                    <AnimatePresence>
                      {showCoupons && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mb-3 space-y-2 overflow-hidden"
                        >
                          {featuredCoupons.map((coupon) => (
                            <motion.button
                              key={coupon.code}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleApplyCoupon(coupon.code)}
                              className="w-full bg-gradient-to-r from-orange-50 to-red-50 border-2 border-dashed border-orange-300 rounded-lg p-3 flex items-center justify-between hover:border-orange-400 transition-all group"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl">{coupon.emoji}</span>
                                <div className="text-left">
                                  <p className="text-sm font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                                    {coupon.code}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {coupon.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-base font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                  {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                                </p>
                                <p className="text-[10px] text-orange-600 font-semibold">Click to apply</p>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError('')
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyCoupon())}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 text-sm border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-semibold rounded-lg transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-xs text-red-600 mt-1">{couponError}</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-300 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🎉</span>
                      <div>
                        <p className="text-sm font-bold text-green-800">{appliedCoupon.code}</p>
                        <p className="text-xs text-green-700">{appliedCoupon.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="p-1.5 hover:bg-green-100 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-green-700" />
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600">Discount</span>
                    <span className="font-semibold text-green-600">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}
                
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

            {/* Payment Security */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-4">
                Secure Payment
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Razorpay Secure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Free Shipping Always! 🎉</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : (
                isTestMode ? `🧪 Test Pay ${formatPrice(total)}` : `Pay ${formatPrice(total)}`
              )}
            </button>
            
            {isTestMode && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">🧪 Test Mode Instructions</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Payment will be simulated automatically</li>
                  <li>• No real money will be charged</li>
                  <li>• Shipment will be created with mock data</li>
                  <li>• Check console for detailed logs</li>
                </ul>
                <div className="mt-3">
                  <Link 
                    href="/payment-flow" 
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
                  >
                    View Complete MCP Payment Flow →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
