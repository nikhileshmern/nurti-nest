'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Calendar, Eye, Lock, Database, Users, Mail } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-white">
              Your privacy is important to us. Learn how we collect, use, and protect your information
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

      {/* Privacy Content */}
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
                  Introduction
                </h2>
                <div className="prose prose-lg max-w-none text-text leading-relaxed">
                  <p className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                    <strong>L&C BIOTECH LLP</strong> ("we", "our", or "us") operates the Nutri Nest website and is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
                  </p>
                  <p>
                    By using our website, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </div>
              </motion.section>

              {/* Information We Collect */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Information We Collect
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-primary mb-2">Personal Information</h4>
                    <ul className="text-text leading-relaxed space-y-1">
                      <li>• Name and contact information (email, phone number)</li>
                      <li>• Shipping and billing addresses</li>
                      <li>• Payment information (processed securely through Razorpay)</li>
                      <li>• Account credentials and preferences</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-primary mb-2">Usage Information</h4>
                    <ul className="text-text leading-relaxed space-y-1">
                      <li>• Website usage patterns and preferences</li>
                      <li>• Device information and browser type</li>
                      <li>• IP address and location data</li>
                      <li>• Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* How We Use Information */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  How We Use Your Information
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Order Processing",
                      content: "To process and fulfill your orders, including shipping and delivery"
                    },
                    {
                      title: "Customer Service",
                      content: "To provide customer support and respond to your inquiries"
                    },
                    {
                      title: "Account Management",
                      content: "To create and manage your account, including preferences and settings"
                    },
                    {
                      title: "Marketing Communications",
                      content: "To send you promotional materials and newsletters (with your consent)"
                    },
                    {
                      title: "Website Improvement",
                      content: "To analyze website usage and improve our services and user experience"
                    },
                    {
                      title: "Legal Compliance",
                      content: "To comply with legal obligations and protect our rights"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-primary mb-2">{item.title}</h4>
                      <p className="text-text leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Information Sharing */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Information Sharing
                </h3>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-text leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="space-y-2 text-text">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and conducting business (e.g., Razorpay for payments, shipping partners)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Consent:</strong> With your explicit consent for specific purposes</span>
                    </li>
                  </ul>
                </div>
              </motion.section>

              {/* Data Security */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Data Security
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <p className="text-text leading-relaxed mb-4">
                    We implement appropriate security measures to protect your personal information:
                  </p>
                  <ul className="space-y-2 text-text">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>SSL Encryption:</strong> All data transmission is encrypted using SSL technology</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Secure Payment Processing:</strong> Payment information is processed securely through Razorpay</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Regular Security Updates:</strong> Regular updates and security patches</span>
                    </li>
                  </ul>
                </div>
              </motion.section>

              {/* Cookies */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Cookies and Tracking
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-text leading-relaxed">
                    We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences. By continuing to use our website, you consent to our use of cookies.
                  </p>
                </div>
              </motion.section>

              {/* Your Rights */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="border-l-4 border-accent-1 pl-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Your Rights
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-text leading-relaxed mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="space-y-2 text-text">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Access:</strong> Request access to your personal information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Correction:</strong> Request correction of inaccurate information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Deletion:</strong> Request deletion of your personal information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Opt-out:</strong> Unsubscribe from marketing communications</span>
                    </li>
                  </ul>
                </div>
              </motion.section>

              {/* Contact Information */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </h3>
                <p className="text-text leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-text">
                  <p><strong>Email:</strong> support@mynutrinest.in</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> 8-2-269/19/382/A, INDIRA NAGAR, BANJARA HILLS Hyderabad TELANGANA 500034</p>
                </div>
              </motion.section>

              {/* Policy Updates */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="bg-gradient-to-r from-primary/5 to-accent-1/5 p-6 rounded-lg border border-primary/10"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Policy Updates
                </h3>
                <p className="text-text leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </motion.section>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
