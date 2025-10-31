'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Heart, CreditCard } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    flavour: string
    description: string
    price: number
    originalPrice?: number
    image_url: string
    stock: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      flavour: product.flavour,
    })
  }

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 group relative overflow-hidden flex flex-col h-full"
    >
      {/* Floating discount badge removed; shown near price instead */}

      {/* Wishlist Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
      >
        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
      </motion.button>

      <Link href={`/products/${product.slug}`} className="block relative mb-4">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </Link>

      <div className="space-y-4">
        <div>
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-lg font-semibold text-gray-900 font-poppins hover:text-primary-orange transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-primary-red font-medium">{product.flavour}</p>
          <p className="text-xs text-gray-500">30 Nos</p>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Rating with Review Count */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </motion.div>
          ))}
          <span className="text-sm text-gray-500 ml-1">4.8</span>
          <span className="text-sm text-gray-400">• 234 reviews</span>
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-grow"></div>

        {/* Pricing */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary-orange">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-xs font-bold text-white bg-gradient-to-br from-red-500 to-pink-600 px-2 py-1 rounded-full shadow">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <ShoppingCart className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (product.stock > 0) {
                handleAddToCart()
                window.location.href = '/checkout'
              }
            }}
            disabled={product.stock === 0}
            className="flex-1 bg-gradient-to-r from-accent-1 to-accent-2 hover:from-accent-1/90 hover:to-accent-2/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-4 h-4" />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Buy Now'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
