'use client'

import { motion } from 'framer-motion'
import { Star, Quote, MapPin } from 'lucide-react'

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    location: string
    rating: number
    text: string
    avatar?: string
  }
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative overflow-hidden group"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-1/10 to-accent-2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Quote Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-4"
      >
        <Quote className="w-8 h-8 text-accent-1/30" />
      </motion.div>
      
      <div className="relative z-10 space-y-4">
        {/* Rating */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-1"
        >
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-700 italic leading-relaxed text-lg"
        >
          "{testimonial.text}"
        </motion.p>

        {/* User Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-3 pt-4 border-t border-gray-100"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-gradient-to-br from-accent-1 to-accent-2 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
          >
            {testimonial.name.charAt(0)}
          </motion.div>
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{testimonial.location}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
