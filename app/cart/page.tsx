'use client'

import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
        <div className="container-custom">
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Add some delicious YumBurst gummies to get started!
            </p>
            <Link href="/products" className="btn-primary">
              Shop Products
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 font-poppins">
                      {item.name}
                    </h3>
                    <p className="text-primary-red font-medium">{item.flavour}</p>
                    <p className="text-2xl font-bold text-primary-orange">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="text-lg font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Clear Cart
              </button>
              
              <Link href="/products" className="text-primary-orange hover:text-orange-600 font-medium transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">
                    Free ✅
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-orange">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 border border-green-200 rounded-lg p-3 mb-6">
                <p className="text-green-800 text-sm font-medium">
                  🎉 FREE Shipping on All Orders!
                </p>
              </div>

              <Link href="/checkout" className="w-full btn-primary flex items-center justify-center space-x-2">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
