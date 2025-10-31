'use client'

import { motion } from 'framer-motion'
import { BookOpen, Eye, Shield, Heart, Lightbulb, Users } from 'lucide-react'

export default function LearnPage() {
  const benefits = [
    {
      icon: Eye,
      title: 'Visual Clarity',
      description: 'Our gummies contain essential nutrients like Vitamin A, Lutein, and Zeaxanthin that support healthy vision development in growing children.',
    },
    {
      icon: Shield,
      title: 'Gluten Free',
      description: 'Made without gluten, formulated for gentle digestion and suitable for a gluten‑free lifestyle.',
    },
    {
      icon: Heart,
      title: 'Antioxidant Support',
      description: 'Rich in antioxidants that help combat oxidative stress and support overall eye health and development.',
    },
    {
      icon: BookOpen,
      title: 'Educational Value',
      description: 'Teaching kids about the importance of eye health through fun, tasty gummies that they actually want to eat.',
    },
  ]

  const tips = [
    {
      title: 'Limit Screen Time',
      description: 'Encourage breaks every 20 minutes when using digital devices. Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.',
    },
    {
      title: 'Outdoor Activities',
      description: 'Spend at least 1-2 hours outdoors daily. Natural light helps regulate eye development and reduces the risk of myopia.',
    },
    {
      title: 'Proper Nutrition',
      description: 'Include foods rich in Vitamin A, Omega-3 fatty acids, and antioxidants in your child\'s diet. Our gummies provide these essential nutrients.',
    },
    {
      title: 'Regular Eye Checkups',
      description: 'Schedule annual eye exams for your child, even if they don\'t show signs of vision problems. Early detection is key.',
    },
  ]

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-6">
            Learn About Eye Health
          </h1>
          <p className="text-xl text-gray-600">
            Discover how proper nutrition and care can support your child's vision development 
            and protect their eyes in our digital world.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-12 text-center"
          >
            How YumBurst Gummies Help
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Eye Health Tips */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-12 text-center"
          >
            Eye Health Tips for Parents
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Nutrition Facts */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-1 to-accent-2 text-white rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold font-poppins mb-4">
                  Essential Nutrients for Eye Health
                </h2>
                <p className="text-xl text-accent-2/90 mb-6">
                  Our YumBurst gummies are packed with scientifically-proven nutrients 
                  that support healthy vision development.
                </p>
                <ul className="space-y-3">
                  {[
                    'Vitamin A - Essential for night vision and eye development',
                    'Gluten Free - Made without gluten',
                    'Vitamin C & E - Powerful antioxidants for eye protection',
                    'Omega-3 Fatty Acids - Support retinal health'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <span className="w-2 h-2 bg-accent-2 rounded-full"></span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 text-gray-900"
                >
                  <h3 className="text-2xl font-bold font-poppins mb-4">
                    Daily Nutrition
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Vitamin A', value: '100% RDA' },
                      { name: 'Lutein', value: '10mg' },
                      { name: 'Zeaxanthin', value: '2mg' },
                      { name: 'Vitamin C', value: '50% RDA' }
                    ].map((nutrient, index) => (
                      <motion.div 
                        key={nutrient.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-center"
                      >
                        <span>{nutrient.name}</span>
                        <span className="font-semibold">{nutrient.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-4">
              Ready to Support Your Child's Eye Health?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start their journey to better vision with YumBurst gummies today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="/products" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Shop Now
              </motion.a>
              <motion.a 
                href="/contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Ask Questions
              </motion.a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}
