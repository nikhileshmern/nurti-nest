'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqData = [
    {
      category: 'General Questions',
      icon: 'ℹ️',
      questions: [
        {
          question: 'What is Nutri Nest?',
          answer: 'Nutri Nest is a premium health supplement brand specializing in eye-care gummies for children aged 4+. Our products are designed to support visual clarity, are gluten free, and provide antioxidant support while being 100% vegan and delicious.'
        },
        {
          question: 'Are your products safe for children?',
          answer: 'Yes, all our products are specifically formulated for children aged 4+ and are manufactured in certified facilities following strict safety standards. We use only natural ingredients and follow GMP (Good Manufacturing Practices) guidelines.'
        },
        {
          question: 'What age group are your products suitable for?',
          answer: 'Our eye-care gummies are specifically designed for children aged 4 and above. We recommend consulting with a pediatrician before giving any supplements to children under 4 years of age.'
        },
        {
          question: 'Are your products vegan?',
          answer: 'Yes, all our products are 100% vegan. We do not use any animal-derived ingredients, making them suitable for vegan families and those with dietary restrictions.'
        }
      ]
    },
    {
      category: 'Product Information',
      icon: '🍬',
      questions: [
        {
          question: 'What ingredients are in your eye-care gummies?',
          answer: 'Our gummies contain natural ingredients including lutein, zeaxanthin, vitamin A, vitamin C, and other essential nutrients for eye health. All ingredients are carefully selected and tested for purity and effectiveness.'
        },
        {
          question: 'How many gummies should my child take daily?',
          answer: 'The recommended dosage is 2 gummies per day for children aged 4+. Please follow the instructions on the product packaging and consult with a healthcare provider if you have any concerns.'
        },
        {
          question: 'What if my child doesn\'t like the taste?',
          answer: 'We offer a 30-day satisfaction guarantee. If your child doesn\'t like the taste, you can return the product for a full refund. Our gummies are designed to be naturally sweet and appealing to children.'
        },
        {
          question: 'Do your products contain any allergens?',
          answer: 'Our products are free from common allergens like gluten, dairy, and nuts. However, please check the ingredient list on each product for specific allergen information and consult with your healthcare provider if your child has known allergies.'
        },
        {
          question: 'How long does a bottle last?',
          answer: 'Each bottle contains 60 gummies, which provides a 30-day supply when taken as directed (2 gummies per day).'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      icon: '🚚',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'We typically ship orders within 0-7 days. Delivery takes 3-5 business days within India for domestic orders. International orders may take 7-14 business days depending on the destination.'
        },
        {
          question: 'What shipping methods do you use?',
          answer: 'For domestic orders, we use registered domestic courier companies and speed post. For international orders, we use registered international courier companies and international speed post.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. Please check our shipping policy for more details.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes, you will receive tracking information via email once your order ships. You can use this tracking number to monitor your package\'s progress.'
        },
        {
          question: 'What if my package is damaged during shipping?',
          answer: 'If you receive a damaged package, please contact our customer service within the same day of receipt. We will arrange for a replacement or refund as appropriate.'
        }
      ]
    },
    {
      category: 'Orders & Payments',
      icon: '💳',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, net banking, UPI, and digital wallets. All payments are processed securely through Razorpay.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your payment details on our servers.'
        },
        {
          question: 'Can I cancel my order?',
          answer: 'You can cancel your order within the same day of placing it, provided it hasn\'t been shipped yet. Please contact our customer service for assistance with cancellations.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'Yes, we offer refunds for damaged products, quality issues, or if you\'re not satisfied with your purchase. Refunds are processed within 3-5 days after approval.'
        },
        {
          question: 'Can I modify my order after placing it?',
          answer: 'Order modifications are possible only if the order hasn\'t been processed for shipping. Please contact our customer service immediately if you need to make changes.'
        }
      ]
    },
    {
      category: 'Health & Safety',
      icon: '🏥',
      questions: [
        {
          question: 'Should I consult a doctor before giving these to my child?',
          answer: 'While our products are safe for children, we recommend consulting with a pediatrician or healthcare provider before starting any new supplement regimen, especially if your child has existing health conditions.'
        },
        {
          question: 'Are there any side effects?',
          answer: 'Our products are made with natural ingredients and are generally well-tolerated. However, if you notice any adverse reactions, discontinue use and consult with a healthcare provider.'
        },
        {
          question: 'Can these supplements be taken with other medications?',
          answer: 'If your child is taking any medications, please consult with a healthcare provider before starting our supplements to ensure there are no interactions.'
        },
        {
          question: 'How long should my child take these supplements?',
          answer: 'Our supplements are designed for daily use as part of a healthy lifestyle. The duration depends on your child\'s individual needs and should be discussed with a healthcare provider.'
        }
      ]
    }
  ]

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
              <HelpCircle className="w-8 h-8 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-white">
              Find answers to common questions about our products, shipping, and more
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

      {/* FAQ Content */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-orange-200 overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-gradient-to-r from-orange-100 to-red-100 px-8 py-6 border-b border-orange-200">
                  <h2 className="text-2xl font-bold text-primary font-poppins flex items-center">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    {category.category}
                  </h2>
                </div>

                {/* Questions */}
                <div className="p-8">
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const globalIndex = categoryIndex * 100 + questionIndex
                      const isOpen = openItems.includes(globalIndex)
                      
                      return (
                        <motion.div
                          key={faq.question}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: questionIndex * 0.05 }}
                          className="border border-orange-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300 flex items-center justify-between group"
                          >
                            <h3 className="text-lg font-semibold text-primary font-poppins group-hover:text-accent-1 transition-colors">
                              {faq.question}
                            </h3>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5 text-accent-1" />
                            </motion.div>
                          </button>
                          
                          <motion.div
                            initial={false}
                            animate={{ 
                              height: isOpen ? 'auto' : 0,
                              opacity: isOpen ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-4 bg-white">
                              <p className="text-text leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 bg-gradient-to-r from-primary/10 to-accent-1/10 p-8 rounded-2xl border border-primary/20"
          >
            <h3 className="text-2xl font-bold text-primary mb-4 font-poppins text-center">
              Still Have Questions?
            </h3>
            <p className="text-text text-center mb-6">
              Can't find the answer you're looking for? Our customer support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>Contact Support</span>
              </Link>
              <a 
                href="mailto:support@nutrinest.in" 
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Email Us</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
