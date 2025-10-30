'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Lock, ArrowRight, KeyRound, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const router = useRouter()

  useEffect(() => {
    // Check if user came from password reset email
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error || !session) {
          toast.error('Invalid or expired reset link. Please request a new one.')
          router.push('/forgot-password')
          return
        }

        setIsValidSession(true)
      } catch (error) {
        console.error('Session check error:', error)
        toast.error('Something went wrong. Please try again.')
        router.push('/forgot-password')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  const validatePassword = (pass: string): boolean => {
    if (pass.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Password updated successfully!')
      setPasswordReset(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)

    } catch (error) {
      console.error('Password reset error:', error)
      toast.error('An error occurred while resetting password')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen py-20 bg-premium-gradient bg-luxury-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-1 mx-auto"></div>
          <p className="text-text-dark mt-4">Verifying reset link...</p>
        </div>
      </main>
    )
  }

  if (!isValidSession) {
    return null
  }

  if (passwordReset) {
    return (
      <main className="min-h-screen py-20 bg-premium-gradient bg-luxury-pattern">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md mx-auto">
            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="card-premium p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-primary mb-4">
                Password Reset Successful! 🎉
              </h2>
              
              <p className="text-text-dark mb-6">
                Your password has been successfully updated. You can now sign in with your new password.
              </p>
              
              <div className="bg-accent-1/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-text-dark">
                  Redirecting to login page in a few seconds...
                </p>
              </div>

              <Link
                href="/login"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Go to Login</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20 bg-premium-gradient bg-luxury-pattern">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <KeyRound className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gradient-logo font-poppins mb-4">
              Reset Password
            </h1>
            <p className="text-text-dark">
              Choose a strong password for your account
            </p>
          </motion.div>

          {/* Reset Password Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card-premium p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-primary mb-2">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-3 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-accent-1 transition-all duration-300 hover:shadow-lg hover-glow"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral hover:text-accent-1 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-sm text-neutral mt-2">
                  Password must be at least 6 characters long
                </p>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-primary mb-2">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-3 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-accent-1 transition-all duration-300 hover:shadow-lg hover-glow"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral hover:text-accent-1 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-500 mt-2">
                    Passwords do not match
                  </p>
                )}
              </motion.div>

              {/* Password Requirements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-neutral/10 rounded-lg p-4"
              >
                <p className="text-sm font-semibold text-primary mb-2">Password Requirements:</p>
                <ul className="text-sm text-text-dark space-y-1">
                  <li className={password.length >= 6 ? 'text-green-600' : ''}>
                    • At least 6 characters long
                  </li>
                  <li className={password && confirmPassword && password === confirmPassword ? 'text-green-600' : ''}>
                    • Both passwords match
                  </li>
                </ul>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || password !== confirmPassword}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Resetting Password...' : 'Reset Password'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8"
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

