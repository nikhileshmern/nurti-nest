'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Heart, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

// Recommended Products Carousel Component
function RecommendedProducts({ items, onClose, addItem }: { items: any[], onClose: () => void, addItem: any }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Available products data
  const availableProducts = [
    {
      id: '1',
      name: 'Orange Gummies',
      slug: 'yumburst-orange-gummies',
      flavour: 'Orange',
      price: 699,
      image_url: '/images/products/orange-gummy.png',
      emoji: '🍊'
    },
    {
      id: '2', 
      name: 'Pomegranate',
      slug: 'yumburst-pomegranate-gummies',
      flavour: 'Pomegranate',
      price: 699,
      image_url: '/images/products/pomogranate-gummy.png',
      emoji: '🍇'
    },
    {
      id: 'combo-1',
      name: 'Combo Pack',
      slug: 'yumburst-combo-pack',
      flavour: 'Mixed',
      price: 1299,
      image_url: '/images/products/combo-pack.png',
      emoji: '🎁'
    }
  ]

  // Filter out products already in cart
  const cartItemIds = items.map(item => item.id)
  const recommendedProducts = availableProducts.filter(product => !cartItemIds.includes(product.id))

  // Only show if there are recommendations
  if (recommendedProducts.length === 0) return null

  const cardsPerView = 2
  const maxIndex = Math.max(0, recommendedProducts.length - cardsPerView)

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const visibleProducts = recommendedProducts.slice(currentIndex, currentIndex + cardsPerView)

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      flavour: product.flavour,
    })
  }

  return (
    <div className="px-4 py-3 border-b border-orange-200">
      <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center">
        <Heart className="w-3.5 h-3.5 text-red-500 mr-1" fill="currentColor" />
        You May Also Like
      </h3>

      <div className="flex items-center space-x-2">
        {/* Left Arrow */}
        {recommendedProducts.length > cardsPerView && (
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-1.5 bg-white hover:bg-orange-50 rounded-full shadow-sm border border-orange-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-orange-600" />
          </button>
        )}

        {/* Product Cards */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            animate={{ x: -currentIndex * 100 + '%' }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 35,
              mass: 0.8
            }}
            className="flex gap-2"
          >
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 bg-white rounded-lg p-2 border border-orange-200 shadow-sm hover:shadow-md transition-all"
                style={{ width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 0.25}rem)` }}
              >
                <Link 
                  href={`/products/${product.slug}`} 
                  onClick={onClose}
                  className="block mb-2"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden mx-auto mb-1.5 shadow-sm bg-gray-50">
                    <Image src={product.image_url} alt={product.name} width={48} height={48} className="w-12 h-12 object-contain" />
                  </div>
                  <h4 className="text-[10px] font-bold text-gray-900 text-center line-clamp-1 mb-0.5">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent text-center">
                    {formatPrice(product.price)}
                  </p>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-1 px-2 rounded text-[10px] transition-all duration-200 flex items-center justify-center space-x-1 shadow-sm"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add</span>
                </motion.button>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Arrow */}
        {recommendedProducts.length > cardsPerView && (
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="p-1.5 bg-white hover:bg-orange-50 rounded-full shadow-sm border border-orange-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-orange-600" />
          </button>
        )}
      </div>
    </div>
  )
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, clearCart, addItem, appliedCoupon, setAppliedCoupon } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [showCoupons, setShowCoupons] = useState(false)

  // Available coupons (Shipping is always free, so no FREESHIP coupon needed)
  const availableCoupons = {
    'WELCOME50': { discount: 50, type: 'fixed' as const, description: 'Welcome discount' },
    'SAVE10': { discount: 10, type: 'percentage' as const, description: '10% off' },
    'SAVE20': { discount: 20, type: 'percentage' as const, description: '20% off' },
    // Hidden BOGO coupon, accepted when typed but not shown in lists
    'NUTRINEST50': { discount: 0, type: 'bogo' as unknown as 'fixed', description: 'BOGO' },
    // 'FREESHIP' removed - shipping is always free now!
  }

  // Featured coupons to display
  const featuredCoupons = [
    { code: 'WELCOME50', ...availableCoupons['WELCOME50'], emoji: '🎁' },
    { code: 'SAVE20', ...availableCoupons['SAVE20'], emoji: '💰' },
  ]

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  // Clean input error when drawer closes (keep applied coupon across pages)
  useEffect(() => {
    if (!isOpen) {
      setCouponCode('')
      setCouponError('')
    }
  }, [isOpen])

  // Apply coupon (supports hidden BOGO)
  const handleApplyCoupon = (code?: string) => {
    const upperCode = (code || couponCode).toUpperCase().trim()
    
    if (!upperCode) {
      setCouponError('Please enter a coupon code')
      return
    }

    const coupon = availableCoupons[upperCode as keyof typeof availableCoupons] as any
    
    if (!coupon) {
      setCouponError('Invalid coupon code')
      setAppliedCoupon(null)
      return
    }

    // Special handling for BOGO
    if (upperCode === 'NUTRINEST50') {
      const totalUnits = items.reduce((sum, it) => sum + it.quantity, 0)
      if (totalUnits < 2) {
        setCouponError('Add one more item to use this Buy 1 Get 1 offer')
        return
      }
      // Note: Email validation will happen at checkout (cart drawer doesn't have customer email)
    }

    setAppliedCoupon({ code: upperCode, ...coupon })
    setCouponError('')
    setCouponCode('')
    setShowCoupons(false)
  }

  // Auto-apply BOGO when user adds the second item after entering code
  useEffect(() => {
    const upper = couponCode.toUpperCase().trim()
    const totalUnits = items.reduce((sum, it) => sum + it.quantity, 0)
    if (upper === 'NUTRINEST50' && !appliedCoupon && totalUnits >= 2) {
      const coupon = availableCoupons['NUTRINEST50' as keyof typeof availableCoupons] as any
      setAppliedCoupon({ code: 'NUTRINEST50', ...coupon })
      setCouponError('')
      setShowCoupons(false)
    }
    if ((appliedCoupon as any)?.type === 'bogo') {
      if (totalUnits === 3) {
        setCouponError('Add one more item to get another free!')
      } else {
        setCouponError('')
      }
    }
  }, [items])

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  // Calculate discount (includes BOGO, max 2 free)
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0
    
    const subtotal = getTotalPrice()
    if ((appliedCoupon as any).type === 'bogo') {
      // BOGO: one free for every pair; cap free units to 2 and choose cheapest units
      const totalUnits = items.reduce((sum, it) => sum + it.quantity, 0)
      if (totalUnits < 2) return 0
      const freeUnits = Math.min(Math.floor(totalUnits / 2), 2)
      const unitPrices: number[] = []
      items.forEach(it => { for (let i = 0; i < it.quantity; i++) unitPrices.push(it.price) })
      unitPrices.sort((a, b) => a - b)
      return unitPrices.slice(0, freeUnits).reduce((s, p) => s + p, 0)
    }
    if (appliedCoupon.type === 'percentage') {
      return Math.round((subtotal * appliedCoupon.discount) / 100)
    }
    return appliedCoupon.discount
  }

  const discount = calculateDiscount()
  const subtotal = getTotalPrice()
  const shipping = 0 // Always FREE shipping! 🎉
  const total = subtotal - discount + shipping // shipping is always 0

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  // Only render on client side
  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            onClick={onClose}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            data-cart-backdrop="true"
          />
          
          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col overflow-hidden"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              maxWidth: '448px',
              width: '100%'
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <h2 id="cart-drawer-title" className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins">
                  Cart ({getTotalItems()})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-orange-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto bg-white overscroll-contain" style={{ scrollbarWidth: 'thin' }}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  >
                    <ShoppingBag className="w-12 h-12 text-orange-500" />
                  </motion.div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add some delicious YumBurst gummies to get started!
                  </p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Shop Products
                  </Link>
                </div>
              ) : (
                <div className="p-3 space-y-2">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-orange-50/50 to-white rounded-lg p-3 border border-orange-100 shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-14 h-14 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-xs truncate">
                            {item.name}
                          </h3>
                          <p className="text-accent-2 text-[10px] font-medium">
                            {item.flavour}
                          </p>
                          <p className="text-sm font-bold text-accent-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 bg-white hover:bg-orange-50 rounded-full flex items-center justify-center border border-orange-200 transition-all"
                          >
                            <Minus className="w-3 h-3 text-orange-600" />
                          </button>
                          
                          <span className="w-6 text-center text-xs font-semibold text-orange-600">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 bg-white hover:bg-orange-50 rounded-full flex items-center justify-center border border-orange-200 transition-all"
                          >
                            <Plus className="w-3 h-3 text-orange-600" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="border-t border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 flex-shrink-0"
              >
                {/* You May Also Like Carousel */}
                <RecommendedProducts items={items} onClose={onClose} addItem={addItem} />
                
                {/* Coupon Section */}
                <div className="px-4 pt-2 pb-3">{/* Added wrapper with padding */}
                <div className="mb-3">
                  {!appliedCoupon ? (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-gray-700">Have a coupon?</label>
                        <button
                          onClick={() => setShowCoupons(!showCoupons)}
                          className="text-xs font-semibold text-orange-600 hover:text-orange-700 underline"
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
                            className="mb-2 space-y-2 overflow-hidden"
                          >
                            {featuredCoupons.map((coupon) => (
                              <motion.button
                                key={coupon.code}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleApplyCoupon(coupon.code)}
                                className="w-full bg-gradient-to-r from-orange-50 to-red-50 border-2 border-dashed border-orange-300 rounded-lg p-2.5 flex items-center justify-between hover:border-orange-400 transition-all group"
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-xl">{coupon.emoji}</span>
                                  <div className="text-left">
                                    <p className="text-xs font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                                      {coupon.code}
                                    </p>
                                    <p className="text-[10px] text-gray-600">
                                      {coupon.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                    {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                                  </p>
                                  <p className="text-[9px] text-orange-600 font-semibold">Click to apply</p>
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
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          placeholder="Enter code"
                          className="flex-1 px-3 py-1.5 text-sm border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleApplyCoupon()}
                          className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-semibold rounded-lg transition-all"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-red-600 mt-1">{couponError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-300 rounded-lg p-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🎉</span>
                        <div>
                          <p className="text-xs font-bold text-green-800">{appliedCoupon.code}</p>
                          <p className="text-[10px] text-green-700">{appliedCoupon.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="p-1 hover:bg-green-100 rounded-full transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-green-700" />
                      </button>
                    </div>
                  )}
                </div>
                </div>{/* Close coupon section wrapper */}

                {/* Price Summary */}
                <div className="px-4 pb-4 space-y-2">{/* Added wrapper with padding */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount</span>
                      <span className="font-semibold text-green-600">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-gray-900">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <div className="border-t border-orange-300 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <Link
                      href="/checkout"
                      onClick={onClose}
                      className="w-full btn-primary flex items-center justify-center space-x-2 text-sm py-2.5"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={clearCart}
                        className="flex-1 bg-white hover:bg-red-50 text-red-600 font-medium py-2 px-3 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200 flex items-center justify-center space-x-1.5 text-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                      
                      <Link
                        href="/products"
                        onClick={onClose}
                        className="flex-1 bg-white hover:bg-orange-50 text-orange-600 font-medium py-2 px-3 rounded-lg border border-orange-200 hover:border-orange-300 transition-all duration-200 flex items-center justify-center space-x-1.5 text-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Continue</span>
                      </Link>
                    </div>
                  </div>
                </div>{/* Close price summary and buttons wrapper */}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
