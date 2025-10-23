'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQProps {
  faqs: FAQItem[]
}

export default function FAQ({ faqs }: FAQProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group"
        >
          <motion.button
            onClick={() => toggleItem(faq.id)}
            className="w-full flex items-center justify-between text-left p-6 hover:bg-gray-50 transition-colors duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
              >
                <HelpCircle className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 font-poppins group-hover:text-orange-600 transition-colors">
                {faq.question}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-2 hover:bg-orange-100 rounded-full transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-orange-500" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {openItems.includes(faq.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <motion.div 
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="px-6 pb-6 pt-2"
                >
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border-l-4 border-orange-500">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
