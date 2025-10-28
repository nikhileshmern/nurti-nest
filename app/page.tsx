'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import TestimonialCard from '@/components/TestimonialCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Monitor, Leaf, Award, Star, Package, ShoppingCart, CreditCard } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'

// All products data - individual and combo products
const individualProducts = [
  {
    id: '1',
    name: 'YumBurst Orange Gummies',
    slug: 'yumburst-orange-gummies',
    flavour: 'Orange',
    description: 'Delicious orange-flavored eye-care gummies packed with essential nutrients for healthy vision.',
    price: 699,
    originalPrice: 899,
    image_url: '/images/products/orange-gummy.png',
    stock: 50,
    category: 'individual'
  },
  {
    id: '2',
    name: 'YumBurst Pomegranate Gummies',
    slug: 'yumburst-pomegranate-gummies',
    flavour: 'Pomegranate',
    description: 'Tasty pomegranate-flavored gummies rich in antioxidants for optimal eye health.',
    price: 699,
    originalPrice: 899,
    image_url: '/images/products/pomogranate-gummy.png',
    stock: 30,
    category: 'individual'
  },
]

const comboProducts = [
  {
    id: 'combo-1',
    name: 'YumBurst Combo Pack',
    slug: 'yumburst-combo-pack',
    flavour: 'Mixed',
    description: 'Get both Orange and Pomegranate flavors at a special price! Perfect for trying both flavors and ensuring variety in your child\'s nutrition.',
    price: 1299,
    originalPrice: 1398,
    discountPercentage: 7,
    image_url: '/images/products/combo-pack.png',
    stock: 25,
    category: 'combo',
    includedProducts: [
      { name: 'YumBurst Orange Gummies', flavour: 'Orange' },
      { name: 'YumBurst Pomegranate Gummies', flavour: 'Pomegranate' }
    ],
    benefits: [
      'Save ₹99 compared to buying separately',
      'Perfect for trying both flavors',
      'Free shipping on orders above ₹500',
      '30-day satisfaction guarantee'
    ]
  }
]

// Combine all products
const allProducts = [...individualProducts, ...comboProducts]

const sampleTestimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'My 6-year-old loves these gummies! They taste great and I can see the difference in his eye health. Highly recommended!',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'Finally found a solution for my daughter\'s screen time concerns. These gummies are a game-changer for digital eye strain.',
  },
  {
    id: '3',
    name: 'Anita Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'As a parent, I\'m always worried about my kids\' nutrition. These gummies give me peace of mind knowing they\'re getting the right nutrients.',
  },
]


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Featured Products Carousel */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-4">
              Our Premium Products
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our delicious range of eye-care gummies, specially formulated for growing kids.
            </p>
          </motion.div>
          
          {/* Products Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {allProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {product.category === 'combo' ? (
                    <ComboCard combo={product} />
                  ) : (
                    <ProductCard product={product} />
                  )}
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent font-poppins mb-4">
              Why Choose Nutri Nest?
            </h2>
            <p className="text-xl text-gray-600">
              We're committed to providing the best eye-care solutions for your children.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <Eye className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold font-poppins text-orange-600">Visual Clarity</h3>
              <p className="text-gray-600">Supports healthy vision development in growing children.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <Monitor className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold font-poppins text-red-600">Blue Light Protection</h3>
              <p className="text-gray-600">Helps filter harmful blue light from screens and devices.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <Leaf className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold font-poppins text-yellow-600">100% Vegan</h3>
              <p className="text-gray-600">Plant-based ingredients that are safe and effective.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold font-poppins text-pink-600">Premium Quality</h3>
              <p className="text-gray-600">Manufactured with the highest quality standards.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-orange-600 bg-clip-text text-transparent font-poppins mb-4">
              What Parents Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from parents who trust Nutri Nest for their children's eye health.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sampleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  )
}

// Combo Card Component
function ComboCard({ combo }: { combo: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      image: combo.image_url,
      flavour: combo.flavour,
    })
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 group relative overflow-hidden flex flex-col h-full"
    >
      {/* Discount Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-4 right-4 z-10 bg-gradient-to-br from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
      >
        {combo.discountPercentage}% OFF
      </motion.div>

      {/* Combo Badge */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-br from-orange-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
        <Package className="w-4 h-4" />
        <span>COMBO</span>
      </div>

      <div className="relative mb-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden"
        >
          <img
            src={combo.image_url}
            alt={combo.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </motion.div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-poppins group-hover:text-accent-1 transition-colors">
            {combo.name}
          </h3>
          <p className="text-sm text-accent-1 font-medium">Special Combo Pack</p>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {combo.description}
        </p>

        {/* Included Products - Collapsible */}
        <div className="bg-accent-1/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-3 flex items-center justify-between hover:bg-accent-1/20 transition-colors"
          >
            <h4 className="text-sm font-semibold text-gray-900">What's Included:</h4>
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 text-accent-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1 px-3 pb-3"
              >
                {combo.includedProducts.map((product: any, idx: number) => (
                  <li key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-accent-1 rounded-full"></span>
                    <span>{product.name} {product.quantity && `(${product.quantity})`}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Rating with Review Count */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-gray-500 ml-1">4.9</span>
          <span className="text-sm text-gray-400">• 187 reviews</span>
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-grow"></div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-accent-1">
            {formatPrice(combo.price)}
          </div>
          <div className="text-lg text-gray-400 line-through">
            {formatPrice(combo.originalPrice)}
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 btn-primary flex items-center justify-center space-x-2 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <ShoppingCart className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Add to Cart</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              handleAddToCart()
              window.location.href = '/checkout'
            }}
            className="flex-1 bg-gradient-to-r from-accent-1 to-accent-2 hover:from-accent-1/90 hover:to-accent-2/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <CreditCard className="w-4 h-4" />
            <span>Buy Now</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
