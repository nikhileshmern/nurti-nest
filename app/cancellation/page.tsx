'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, RefreshCw, Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-accent-1 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <RefreshCw className="w-8 h-8 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">
                Cancellation & Refund Policy
              </h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-white">
              Our customer-friendly cancellation and refund policy for your peace of mind
            </p>
          </motion.div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-accent-1 hover:text-primary transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Policy Content */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-orange-200 overflow-hidden">
            {/* Last Updated */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 px-8 py-6 border-b border-orange-200">
              <div className="flex items-center text-text">
                <Calendar className="w-5 h-5 mr-2 text-accent-1" />
                <span className="font-semibold">Last updated: October 19th, 2025</span>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8 space-y-8">
              {/* Introduction */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-primary mb-4 font-poppins">
                  Our Policy
                </h2>
                <div className="prose prose-lg max-w-none text-text leading-relaxed">
                  <p className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                    <strong>L&C BIOTECH LLP</strong> believes in helping its customers as far as possible, and has therefore a <strong>liberal cancellation policy</strong>. Under this policy:
                  </p>
                </div>
              </motion.section>

              {/* Cancellation Policy */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Cancellation Policy
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-text leading-relaxed">
                      Cancellations will be considered only if the request is made within <strong>Same day of placing the order</strong>. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
                    <p className="text-text leading-relaxed">
                      <strong>L&C BIOTECH LLP</strong> does not accept cancellation requests for <strong>perishable items</strong> like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Damaged/Defective Items */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Damaged or Defective Items
                </h3>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-text leading-relaxed">
                    In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within <strong>Same day of receipt of the products</strong>.
                  </p>
                </div>
              </motion.section>

              {/* Product Expectations */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Product Not as Expected
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-text leading-relaxed">
                    In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong>Same day of receiving the product</strong>. The Customer Service Team after looking into your complaint will take an appropriate decision.
                  </p>
                </div>
              </motion.section>

              {/* Warranty Items */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Warranty Items
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-text leading-relaxed">
                    In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
                  </p>
                </div>
              </motion.section>

              {/* Refund Processing */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Refund Processing
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <p className="text-text leading-relaxed">
                    In case of any Refunds approved by the <strong>L&C BIOTECH LLP</strong>, it'll take <strong>3-5 days</strong> for the refund to be processed to the end customer.
                  </p>
                </div>
              </motion.section>

              {/* Disclaimer */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Disclaimer
                </h3>
                <p className="text-text leading-relaxed">
                  The above content is created at L&C BIOTECH LLP's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.
                </p>
              </motion.section>

              {/* Important Notes */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="bg-gradient-to-r from-primary/5 to-accent-1/5 p-6 rounded-lg border border-primary/10"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Important Notes
                </h3>
                <ul className="space-y-2 text-text">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>All cancellation requests must be made within the same day of placing the order</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Report damaged or defective items within the same day of receipt</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Perishable items cannot be cancelled but can be refunded if quality issues are established</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Refunds are processed within 3-5 days after approval</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Contact our customer service team for any queries or complaints</span>
                  </li>
                </ul>
              </motion.section>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
