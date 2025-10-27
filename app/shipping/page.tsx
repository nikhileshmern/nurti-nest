'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Truck, Calendar, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ShippingPage() {
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
              <Truck className="w-8 h-8 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">
                Shipping & Delivery Policy
              </h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-white">
              Learn about our shipping methods, delivery timelines, and policies
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
                  Shipping Methods
                </h2>
                <div className="prose prose-lg max-w-none text-text leading-relaxed">
                  <p className="mb-4">
                    For <strong>International buyers</strong>, orders are shipped and delivered through registered international courier companies and/or International speed post only.
                  </p>
                  <p>
                    For <strong>domestic buyers</strong>, orders are shipped through registered domestic courier companies and/or speed post only.
                  </p>
                </div>
              </motion.section>

              {/* Delivery Timeline */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Delivery Timeline
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-text leading-relaxed">
                      Orders are shipped within <strong>0-7 days</strong> or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
                    </p>
                  </div>
                  <p className="text-text leading-relaxed">
                    <strong>L&C BIOTECH LLP</strong> is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within <strong>0-7 days</strong> from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
                  </p>
                </div>
              </motion.section>

              {/* Delivery Address */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Delivery Address
                </h3>
                <p className="text-text leading-relaxed">
                  Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
                </p>
              </motion.section>

              {/* Customer Support */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Customer Support
                </h3>
                <p className="text-text leading-relaxed mb-4">
                  For any issues in utilizing our services you may contact our helpdesk:
                </p>
                <div className="bg-gradient-to-r from-primary/10 to-accent-1/10 p-6 rounded-lg border border-primary/20">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-accent-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-text">Phone:</p>
                        <a href="tel:7207182578" className="text-accent-1 hover:text-primary transition-colors">
                          7207182578
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-accent-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-text">Email:</p>
                        <a href="mailto:lncbiotech.healthcare@gmail.com" className="text-accent-1 hover:text-primary transition-colors">
                          lncbiotech.healthcare@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Disclaimer */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Disclaimer
                </h3>
                <p className="text-text leading-relaxed">
                  The above content is created at L&C BIOTECH LLP's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.
                </p>
              </motion.section>

              {/* Additional Information */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="bg-gradient-to-r from-primary/5 to-accent-1/5 p-6 rounded-lg border border-primary/10"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Important Notes
                </h3>
                <ul className="space-y-2 text-text">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Please ensure your delivery address is complete and accurate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Delivery confirmation will be sent to your registered email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Track your order using the tracking number provided</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Contact us immediately if you don't receive your order within the expected timeframe</span>
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
