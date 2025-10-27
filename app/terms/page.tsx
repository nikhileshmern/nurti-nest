'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Calendar, MapPin, Mail } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
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
              <FileText className="w-8 h-8 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-white">
              Please read these terms carefully before using our website or purchasing our products
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

      {/* Terms Content */}
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
                  <p>
                    For the purpose of these Terms and Conditions, the term "we", "us", "our" used anywhere on this page shall mean <strong>L&C BIOTECH LLP</strong>, whose registered/operational office is <strong>8-2-269/19/382/A, INDIRA NAGAR, BANJARA HILLS Hyderabad TELANGANA 500034</strong>. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
                  </p>
                  <p>
                    Your use of the website and/or purchase from us are governed by following Terms and Conditions:
                  </p>
                </div>
              </motion.section>

              {/* Terms Sections */}
              {[
                {
                  title: "Website Content",
                  content: "The content of the pages of this website is subject to change without notice."
                },
                {
                  title: "Accuracy and Liability",
                  content: "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law."
                },
                {
                  title: "Use at Your Own Risk",
                  content: "Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements."
                },
                {
                  title: "Intellectual Property",
                  content: "Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions."
                },
                {
                  title: "Trademarks",
                  content: "All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website."
                },
                {
                  title: "Unauthorized Use",
                  content: "Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense."
                },
                {
                  title: "External Links",
                  content: "From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information."
                },
                {
                  title: "Linking to Our Website",
                  content: "You may not create a link to our website from another website or document without L&C BIOTECH LLP's prior written consent."
                },
                {
                  title: "Governing Law",
                  content: "Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India."
                },
                {
                  title: "Payment Authorization",
                  content: "We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time."
                }
              ].map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="border-l-4 border-accent-1 pl-6"
                >
                  <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                    {section.title}
                  </h3>
                  <p className="text-text leading-relaxed">
                    {section.content}
                  </p>
                </motion.section>
              ))}

              {/* Disclaimer */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 font-poppins">
                  Disclaimer
                </h3>
                <p className="text-text leading-relaxed">
                  The above content is created at L&C BIOTECH LLP's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.
                </p>
              </motion.section>

              
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
