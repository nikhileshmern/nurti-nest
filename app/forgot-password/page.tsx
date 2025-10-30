'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowRight, KeyRound, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  const { resetPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const success = await resetPassword(email)
      if (success) {
        setEmailSent(true)
      }
    } catch (error) {
      console.error('Password reset error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (emailSent) {
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
                <Mail className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-primary mb-4">
                Check Your Email! 📧
              </h2>
              
              <p className="text-text-dark mb-2">
                We've sent password reset instructions to:
              </p>
              
              <p className="font-semibold text-accent-1 mb-6">
                {email}
              </p>
              
              <div className="bg-neutral/10 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-text-dark">
                  <strong>Next steps:</strong>
                </p>
                <ol className="list-decimal list-inside text-sm text-text-dark mt-2 space-y-1">
                  <li>Check your inbox (and spam folder)</li>
                  <li>Click the reset link in the email</li>
                  <li>Set your new password</li>
                  <li>Sign in with your new password</li>
                </ol>
              </div>

              <p className="text-sm text-neutral mb-6">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setEmailSent(false)}
                  className="text-accent-1 hover:text-accent-2 font-semibold"
                >
                  try again
                </button>
              </p>

              <Link
                href="/login"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
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
              Forgot Password?
            </h1>
            <p className="text-text-dark">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </motion.div>

          {/* Forgot Password Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card-premium p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-primary mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-accent-1 transition-all duration-300 hover:shadow-lg hover-glow"
                    placeholder="Enter your email"
                  />
                </div>
                <p className="text-sm text-neutral mt-2">
                  Enter the email address associated with your account
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Reset Link'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            {/* Back to Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-6"
            >
              <Link 
                href="/login" 
                className="text-accent-1 hover:text-accent-2 transition-colors font-medium inline-flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="card-premium p-6 mt-6"
          >
            <h3 className="font-semibold text-primary mb-2">Need help?</h3>
            <p className="text-sm text-text-dark">
              If you're having trouble resetting your password, please contact our support team.
            </p>
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

