'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart, Star, Heart, Shield, Truck, RotateCcw, User, Send, CreditCard } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import FAQ from '@/components/FAQ'

// Sample product data - in production, this would come from Supabase
const productData = {
  'yumburst-orange-gummies': {
    id: '1',
    name: 'YumBurst Orange Gummies',
    slug: 'yumburst-orange-gummies',
    flavour: 'Orange',
    description: 'Delicious orange-flavored eye-care gummies packed with essential nutrients for healthy vision. Made with natural ingredients and fortified with vitamins A, C, and E.',
    longDescription: 'Our YumBurst Orange Gummies are specially formulated for children aged 4+ to support healthy vision development. Each gummy contains a perfect blend of essential nutrients including Vitamin A for night vision, Lutein and Zeaxanthin for blue light protection, and Vitamin C & E for antioxidant support. Made with natural orange flavoring and no artificial colors, these gummies are 100% vegan and safe for daily consumption.',
    price: 699,
    originalPrice: 899,
    image_url: '/images/products/orange-gummy.png',
    stock: 50,
    rating: 4.8,
    reviewCount: 234,
    benefits: [
      'Supports visual clarity and eye development',
      'Filters harmful blue light from digital devices',
      'Rich in antioxidants for overall eye health',
      '100% vegan and kid-safe ingredients',
      'Natural orange flavor kids love'
    ],
    ingredients: [
      'Vitamin A (Retinol)',
      'Lutein',
      'Zeaxanthin', 
      'Vitamin C',
      'Vitamin E',
      'Natural Orange Flavor',
      'Pectin',
      'Organic Cane Sugar'
    ],
    nutritionFacts: {
      servingSize: '2 gummies',
      servingsPerContainer: '30',
      calories: '15',
      totalCarbohydrates: '3g',
      sugars: '2g',
      vitaminA: '100%',
      vitaminC: '50%',
      vitaminE: '25%',
      lutein: '10mg',
      zeaxanthin: '2mg'
    },
    reviews: [
      {
        id: '1',
        name: 'Priya Sharma',
        rating: 5.0,
        date: '2024-10-15',
        comment: 'My 6-year-old loves these! She asks for them every morning. I\'ve noticed her eyes seem less strained after screen time. Great product!',
        verified: true
      },
      {
        id: '2',
        name: 'Rahul Verma',
        rating: 4.5,
        date: '2024-10-10',
        comment: 'Perfect solution for kids who spend time on tablets for online classes. The orange flavor is delicious and my kids think it\'s a treat!',
        verified: true
      },
      {
        id: '3',
        name: 'Anjali Patel',
        rating: 4.0,
        date: '2024-10-05',
        comment: 'Good quality gummies with natural ingredients. My daughter is picky but she enjoys these. Noticed improvement in her eye comfort.',
        verified: true
      },
      {
        id: '4',
        name: 'Vikram Singh',
        rating: 5.0,
        date: '2024-09-28',
        comment: 'As a parent concerned about screen time, these gummies give me peace of mind. Easy to give, tasty, and effective. Highly recommended!',
        verified: true
      },
      {
        id: '5',
        name: 'Sneha Gupta',
        rating: 4.8,
        date: '2024-09-20',
        comment: 'Best eye care gummies for kids! No artificial colors, 100% vegan, and my son loves the orange flavor. Worth every penny.',
        verified: true
      }
    ],
    faqs: [
      {
        id: '1',
        question: 'What age group are these gummies suitable for?',
        answer: 'YumBurst Orange Gummies are specially formulated for children aged 4 years and above. For children under 4, please consult with your pediatrician before use.'
      },
      {
        id: '2',
        question: 'How many gummies should my child take daily?',
        answer: 'The recommended dosage is 2 gummies per day. This provides the optimal amount of vitamins and nutrients for supporting eye health. Do not exceed the recommended daily dose.'
      },
      {
        id: '3',
        question: 'Are these gummies safe for daily consumption?',
        answer: 'Yes, absolutely! Our gummies are made with 100% natural ingredients, are vegan-friendly, and contain no artificial colors or preservatives. They are safe for daily consumption as directed.'
      },
      {
        id: '4',
        question: 'How long does one bottle last?',
        answer: 'Each bottle contains 60 gummies, which provides a 30-day supply when taking the recommended dose of 2 gummies per day.'
      },
      {
        id: '5',
        question: 'Can adults take these gummies too?',
        answer: 'While these gummies are formulated specifically for children, adults can also benefit from them. However, adults may need to take additional supplements to meet their full daily nutritional requirements.'
      },
      {
        id: '6',
        question: 'Do these gummies really help with blue light protection?',
        answer: 'Yes! Our gummies contain Lutein and Zeaxanthin, which are scientifically proven to filter harmful blue light and protect the eyes from digital screen exposure. Combined with Vitamin A, C, and E, they provide comprehensive eye protection.'
      }
    ]
  },
  'yumburst-pomegranate-gummies': {
    id: '2',
    name: 'YumBurst Pomegranate Gummies',
    slug: 'yumburst-pomegranate-gummies',
    flavour: 'Pomegranate',
    description: 'Tasty pomegranate-flavored gummies rich in antioxidants for optimal eye health. Contains lutein and zeaxanthin for blue light protection.',
    longDescription: 'Our YumBurst Pomegranate Gummies combine the power of pomegranate antioxidants with essential eye health nutrients. These delicious gummies are perfect for children who love fruity flavors while getting the nutrition they need for healthy vision. Each gummy is packed with Lutein and Zeaxanthin for blue light protection, Vitamin A for eye development, and natural pomegranate antioxidants.',
    price: 699,
    originalPrice: 899,
    image_url: '/images/products/pomogranate-gummy.png',
    stock: 30,
    rating: 4.8,
    reviewCount: 234,
    benefits: [
      'Rich in pomegranate antioxidants',
      'Protects against blue light damage',
      'Supports healthy vision development',
      'Natural pomegranate flavor',
      '100% vegan and gluten-free'
    ],
    ingredients: [
      'Vitamin A (Retinol)',
      'Lutein',
      'Zeaxanthin',
      'Vitamin C',
      'Vitamin E',
      'Natural Pomegranate Flavor',
      'Pectin',
      'Organic Cane Sugar'
    ],
    nutritionFacts: {
      servingSize: '2 gummies',
      servingsPerContainer: '30',
      calories: '15',
      totalCarbohydrates: '3g',
      sugars: '2g',
      vitaminA: '100%',
      vitaminC: '50%',
      vitaminE: '25%',
      lutein: '10mg',
      zeaxanthin: '2mg'
    },
    reviews: [
      {
        id: '1',
        name: 'Kavita Reddy',
        rating: 4.8,
        date: '2024-10-18',
        comment: 'The pomegranate flavor is a hit with my kids! They love the taste and I love knowing they\'re getting antioxidants and eye protection. Win-win!',
        verified: true
      },
      {
        id: '2',
        name: 'Amit Desai',
        rating: 5.0,
        date: '2024-10-12',
        comment: 'Excellent product! My daughter has been taking these for a month and her eye doctor noticed improvement. The pomegranate flavor is unique and delicious.',
        verified: true
      },
      {
        id: '3',
        name: 'Meera Iyer',
        rating: 4.0,
        date: '2024-10-08',
        comment: 'Great alternative to orange flavor. My son prefers this one. Quality is top-notch and I trust the ingredients.',
        verified: true
      },
      {
        id: '4',
        name: 'Rohan Kapoor',
        rating: 4.7,
        date: '2024-10-01',
        comment: 'These gummies are fantastic! My kids used to complain about eye strain after online classes, but not anymore. Highly effective!',
        verified: true
      },
      {
        id: '5',
        name: 'Divya Nair',
        rating: 5.0,
        date: '2024-09-25',
        comment: 'Love that these are 100% vegan and gluten-free. The pomegranate antioxidants are an added bonus. My whole family takes these!',
        verified: true
      }
    ],
    faqs: [
      {
        id: '1',
        question: 'What makes pomegranate gummies different from orange flavor?',
        answer: 'Both flavors contain the same essential eye health nutrients. The pomegranate variant has additional pomegranate-derived antioxidants that provide extra protection against oxidative stress. It\'s simply a matter of flavor preference!'
      },
      {
        id: '2',
        question: 'Are these suitable for children with allergies?',
        answer: 'Our pomegranate gummies are 100% vegan, gluten-free, and contain no common allergens like dairy, nuts, or soy. However, if your child has specific allergies, please check the ingredient list or consult with your doctor.'
      },
      {
        id: '3',
        question: 'How should I store these gummies?',
        answer: 'Store in a cool, dry place away from direct sunlight. Keep the bottle tightly closed. Do not refrigerate. Keep out of reach of children to prevent overconsumption.'
      },
      {
        id: '4',
        question: 'Can I give these to my child along with other vitamins?',
        answer: 'Generally yes, but we recommend consulting with your pediatrician if your child is taking other supplements to avoid exceeding recommended daily intake of certain vitamins.'
      },
      {
        id: '5',
        question: 'What if my child doesn\'t like the pomegranate flavor?',
        answer: 'No problem! We also offer Orange flavor gummies with the same beneficial nutrients. Many parents keep both flavors on hand for variety.'
      },
      {
        id: '6',
        question: 'Are there any side effects?',
        answer: 'Our gummies are made with natural ingredients and are generally well-tolerated. In rare cases, children might experience mild digestive discomfort. If any adverse reactions occur, discontinue use and consult your doctor.'
      }
    ]
  }
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: ''
  })
  const [hoverRating, setHoverRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const product = productData[params.slug as keyof typeof productData]

  // Calculate discount percentage if original price exists
  const discountPercentage = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (!product) {
    return (
      <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-4">
            Product Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <a href="/products" className="btn-primary">
            View All Products
          </a>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      flavour: product.flavour,
    })
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Simulate API call - in production, this would save to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    setReviewForm({ name: '', rating: 5, comment: '' })
    setSubmitting(false)
    
    // Show success message (you could add a toast notification here)
    alert('Thank you for your review! It will be published after verification.')
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-br from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-base font-bold shadow-lg">
                  {discountPercentage}% OFF
                </div>
              )}
              <Image
                src={product.image_url}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-primary-red font-medium mb-4">{product.flavour}</p>
              
              {/* Rating with Review Count */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-700 font-medium">{product.rating}</span>
                <span className="text-gray-500">• {product.reviewCount} reviews</span>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl font-bold text-primary-orange">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-2xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
                {discountPercentage > 0 && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    Save {discountPercentage}%
                  </div>
                )}
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits:</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-primary-orange rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>
                
                <button
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
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">100% Safe</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-600">Kid Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'nutrition', label: 'Nutrition Facts' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-orange text-primary-orange'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div
                className="prose max-w-none"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary-orange rounded-full"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Nutrition Facts</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">Serving Size:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.servingSize}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Servings per Container:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.servingsPerContainer}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Calories:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.calories}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Carbohydrates:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.totalCarbohydrates}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Sugars:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.sugars}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Vitamin A:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.vitaminA} RDA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Vitamin C:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.vitaminC} RDA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Vitamin E:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.vitaminE} RDA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Lutein:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.lutein}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Zeaxanthin:</span>
                      <span className="ml-2 font-semibold">{product.nutritionFacts.zeaxanthin}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-8"
          >
            Customer Reviews
          </motion.h2>

          {/* Write a Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoverRating || reviewForm.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </motion.button>
                    ))}
                    <span className="ml-2 text-sm text-gray-700 font-medium">
                      {reviewForm.rating}.0
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-xs font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  required
                  rows={2}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Share your experience..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold flex items-center justify-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Review'}</span>
              </motion.button>
            </form>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-900 font-poppins">{review.name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(review.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : i < review.rating
                            ? 'text-yellow-400 fill-current opacity-50'
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 font-semibold">{review.rating}</span>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-8"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <FAQ faqs={product.faqs} />
        </motion.section>
      </div>
    </main>
  )
}
