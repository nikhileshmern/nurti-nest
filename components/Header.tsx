'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { ShoppingCart, Menu, X, Heart, User, LogOut, Package } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CartDrawer from './CartDrawer'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { getTotalItems, isCartOpen, setIsCartOpen } = useCart()
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Learn', href: '/learn' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 shadow-lg sticky top-0 z-50 border-b-2 border-orange-200 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-text" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
          </button>

          {/* Logo - Center */}
          <Link href="/" className="flex items-center absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none">
            <img 
              src="/images/logo/logo-2.png" 
              alt="Nutri Nest Logo" 
              className="h-28 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - Center on desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-accent-1'
                      : 'text-text hover:text-accent-1'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-1 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Cart & User Menu - Right */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-orange-100 rounded-full transition-colors"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-orange-600 hover:text-orange-500 transition-colors duration-200" />
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold pointer-events-none"
                  style={{ minWidth: '20px', minHeight: '20px' }}
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-1 hover:opacity-80 transition-opacity"
                  aria-label="User menu"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {(user.full_name || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-[60]"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Profile</span>
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">My Orders</span>
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Heart className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Wishlist</span>
                        </Link>
                        
                        <div className="border-t border-gray-200 my-2"></div>
                        
                        <button
                          onClick={() => {
                            signOut()
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-orange-100 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                
                </button>

                {/* Account Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[60]"
                    >
                      <Link
                        href="/login"
                        className="flex items-center space-x-3 px-4 py-2 text-text hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center space-x-3 px-4 py-2 text-text hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-2 font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-accent-1'
                          : 'text-text hover:text-accent-1'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
