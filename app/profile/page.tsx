'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Phone, MapPin, Edit, Save, X, LogOut, Package, Heart, Settings } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, loading, signOut, updateProfile } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    full_name: '',
    phone: '',
    address: '',
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      setEditData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        address: user.address || '',
      })
    }
  }, [user])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (user) {
      setEditData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        address: user.address || '',
      })
    }
  }

  const handleSave = async () => {
    try {
      const success = await updateProfile(editData)
      if (success) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
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
    <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 font-poppins">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEdit}
                      className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </motion.button>
                  ) : (
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Email (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-background rounded-xl">
                      <Mail className="w-5 h-5 text-neutral" />
                      <span className="text-text-dark">{user.email}</span>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="full_name"
                        value={editData.full_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-accent-1 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-background rounded-xl">
                        <User className="w-5 h-5 text-neutral" />
                        <span className="text-text-dark">{user.full_name || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-accent-1 transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-background rounded-xl">
                        <Phone className="w-5 h-5 text-neutral" />
                        <span className="text-text-dark">{user.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-accent-1 transition-all duration-300"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <div className="flex items-start space-x-3 p-3 bg-background rounded-xl">
                        <MapPin className="w-5 h-5 text-neutral mt-1" />
                        <span className="text-text-dark">{user.address || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Account Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-4">
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <Link 
                    href="/orders" 
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-background transition-colors"
                  >
                    <Package className="w-5 h-5 text-accent-1" />
                    <span className="text-text-dark">My Orders</span>
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-background transition-colors"
                  >
                    <Heart className="w-5 h-5 text-accent-2" />
                    <span className="text-text-dark">Wishlist</span>
                  </Link>
                  <Link 
                    href="/settings" 
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-background transition-colors"
                  >
                    <Settings className="w-5 h-5 text-neutral" />
                    <span className="text-text-dark">Settings</span>
                  </Link>
                </div>
              </div>

              {/* Sign Out */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-3">
                  Sign Out
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Sign out of your account on this device.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </motion.button>
              </div>

              {/* Account Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-4">
                  Account Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-dark">Member since</span>
                    <span className="text-primary font-semibold">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-dark">Total orders</span>
                    <span className="text-primary font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-dark">Points earned</span>
                    <span className="text-primary font-semibold">0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link 
              href="/" 
              className="text-primary hover:text-accent-1 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
