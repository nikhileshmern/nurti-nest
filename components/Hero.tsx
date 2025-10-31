'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Heart, Eye, Monitor, Leaf, Award } from 'lucide-react'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
      try {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      } catch {}
    }
  }, [])

  const perfStyle = useMemo(() => ({
    willChange: 'transform, opacity',
    transform: 'translateZ(0)',
    WebkitBackfaceVisibility: 'hidden' as const,
    backfaceVisibility: 'hidden' as const,
  }), [])

  return (
        <section
          className="min-h-[85vh] flex items-center relative overflow-hidden w-full bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12"
        >
      {/* Animated Background Elements */}
      
      {/* Large Gradient Background Blobs */}
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-30"
        style={perfStyle}
        animate={{ 
          y: reduced ? 0 : [0, -30, 0],
          x: reduced ? 0 : [0, 20, 0],
          scale: reduced ? 1 : [1, 1.1, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-200 to-pink-200 rounded-full blur-3xl opacity-30"
        style={perfStyle}
        animate={{ 
          y: reduced ? 0 : [0, 30, 0],
          x: reduced ? 0 : [0, -20, 0],
          scale: reduced ? 1 : [1, 1.2, 1]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Large Floating Orbs */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full blur-xl"
        style={perfStyle}
        animate={{ 
          y: reduced ? 0 : [0, -20, 0],
          x: reduced ? 0 : [0, 10, 0],
          scale: reduced ? 1 : [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-red-300/30 to-pink-300/30 rounded-full blur-lg"
        style={perfStyle}
        animate={{ 
          y: reduced ? 0 : [0, 20, 0],
          x: reduced ? 0 : [0, -15, 0],
          scale: reduced ? 1 : [1, 1.2, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-orange-300/25 to-red-300/25 rounded-full blur-md"
        style={perfStyle}
        animate={{ 
          y: reduced ? 0 : [0, -30, 0],
          x: reduced ? 0 : [0, 20, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional Floating Shapes */}
      <motion.div 
        className="absolute top-40 left-1/4 w-20 h-20 bg-gradient-to-br from-orange-300/25 to-yellow-300/25 rounded-full blur-lg"
        style={perfStyle}
        animate={{ 
          y: reduced ? 0 : [0, 25, 0],
          rotate: reduced ? 0 : [0, 180, 360]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div 
        className="absolute bottom-40 right-1/3 w-14 h-14 bg-gradient-to-br from-red-300/20 to-pink-300/20 rounded-full blur-md"
        style={perfStyle}
        animate={{ 
          y: reduced ? 0 : [0, -15, 0],
          x: reduced ? 0 : [0, 15, 0],
          scale: reduced ? 1 : [1, 1.3, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Small Floating Particles - Random positions */}
      {[...Array(isMobile ? 8 : 20)].map((_, i) => {
        const randomTop = Math.random() * 90 + 5; // 5% to 95%
        const randomLeft = Math.random() * 90 + 5; // 5% to 95%
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              ...perfStyle,
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
              background: i % 2 === 0 ? 'rgba(251, 146, 60, 0.35)' : 'rgba(251, 113, 133, 0.3)',
            }}
            animate={reduced ? { opacity: 0.4 } : {
              y: [0, -30 - (i % 3) * 10, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3 + (i * 0.3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15
            }}
          />
        );
      })}

      {/* Pulsing Gradient Circles */}
      <motion.div 
        className="absolute top-1/3 left-10 w-40 h-40 bg-gradient-to-br from-orange-300/15 to-transparent rounded-full"
        style={perfStyle}
        animate={{ 
          scale: reduced ? 1 : [1, 1.5, 1],
          opacity: reduced ? 0.3 : [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-tl from-red-300/15 to-transparent rounded-full"
        style={perfStyle}
        animate={{ 
          scale: reduced ? 1 : [1, 1.4, 1],
          opacity: reduced ? 0.2 : [0.2, 0.6, 0.2]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="w-full">
          <div className="w-full">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center w-full">
              <div className="w-full">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 "
              >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight text-text tracking-tight"
            >
              <div className="mb-2">Healthy Eyes</div>
              <div className="mb-4">Start with a</div>
              <motion.div 
                className="text-accent-1 drop-shadow-lg font-extrabold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 1.2
                }}
              >
                <div className="flex">
                  {["Y", "u", "m", "B", "u", "r", "s", "t", "!"].map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ 
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{ 
                        opacity: 1,
                        scale: [0, 1.3, 1]
                      }}
                      transition={{ 
                        duration: 0.6,
                        delay: 1.5 + (index * 0.15),
                        ease: "easeOut"
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.h1>
            
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-text/80 leading-relaxed max-w-2xl mt-6 font-medium"
                      >
              Tasty eye-care gummies for kids aged 4+. Supports visual clarity, 
              is gluten free, and provides antioxidant support. 100% Vegan.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products" className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center text-lg">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/learn" className="border-2 border-accent-1 text-accent-1 hover:bg-accent-1 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
                Learn More
              </Link>
            </motion.div>

            {/* Benefits */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 gap-6 pt-8 max-w-lg"
            >
                        <div className="flex items-center space-x-3">
                          <Leaf className="w-5 h-5 text-accent-1" />
                          <span className="text-sm text-text font-medium">100% Vegan</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-accent-1" />
                          <span className="text-sm text-text font-medium">Kid-Safe</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-accent-1" />
                          <span className="text-sm text-text font-medium">Premium Quality</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Monitor className="w-5 h-5 text-accent-1" />
                          <span className="text-sm text-text font-medium">Gluten Free</span>
                        </div>
            </motion.div>
              </motion.div>
              </div>
              
              {/* Right Content - Animated Product Showcase */}
              <div className="w-full h-[500px] relative flex items-center justify-center">
                {/* Animated Glow Effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-red-400/10 rounded-full blur-3xl"
                  style={perfStyle}
                  animate={{ 
                    scale: reduced ? 1 : [1, 1.2, 1],
                    opacity: reduced ? 0.4 : [0.3, 0.6, 0.3],
                    rotate: reduced ? 0 : [0, 360]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Pomegranate Product (Left) - with orange shadow */}
                <motion.div 
                  initial={{ opacity: 0, x: -200, y: -100, rotate: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 360,
                    scale: 1
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 1 },
                    x: { duration: 1.5, delay: 1, ease: "easeOut" },
                    y: { duration: 1.5, delay: 1, ease: "easeOut" },
                    rotate: { duration: 1.5, delay: 1, ease: "easeInOut" },
                    scale: { duration: 1.5, delay: 1, ease: "easeOut" }
                  }}
                  className="absolute left-0 z-10"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(249, 115, 22, 0.25))',
                    transform: 'translateX(-35%)'
                  }}
                >
                  <Link href="/products/yumburst-pomegranate-gummies" className="cursor-pointer">
                    <motion.img
                      src="/images/hero/bg-hero-1.png"
                      alt="Nutri Nest Pomegranate Power Gummies"
                      className="w-[26rem] h-auto object-contain"
                      style={perfStyle}
                      animate={{
                        rotate: reduced ? 0 : [-5, -8, -5],
                        y: reduced ? 0 : [0, -15, 0]
                      }}
                      transition={{
                        rotate: { 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.5
                        },
                        y: { 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.5
                        }
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 0,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </Link>
                  {/* Glow Ring for Pomegranate Product */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-2xl"
                    style={perfStyle}
                    animate={{ 
                      scale: reduced ? 1 : [1, 1.3, 1],
                      opacity: reduced ? 0.6 : [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Orange Product (Right) - with red shadow */}
                <motion.div 
                  initial={{ opacity: 0, x: 200, y: -100, rotate: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: -360,
                    scale: 1
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 1.8 },
                    x: { duration: 1.5, delay: 1.8, ease: "easeOut" },
                    y: { duration: 1.5, delay: 1.8, ease: "easeOut" },
                    rotate: { duration: 1.5, delay: 1.8, ease: "easeInOut" },
                    scale: { duration: 1.5, delay: 1.8, ease: "easeOut" }
                  }}
                  className="absolute right-0 z-20"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(239, 68, 68, 0.25))',
                    transform: 'translateX(35%)'
                  }}
                >
                  <Link href="/products/yumburst-orange-gummies" className="cursor-pointer">
                    <motion.img
                      src="/images/hero/bg-hero-2.png"
                      alt="Nutri Nest Orange Power Gummies"
                      className="w-[26rem] h-auto object-contain"
                      style={perfStyle}
                      animate={{
                        rotate: reduced ? 0 : [5, 8, 5],
                        y: reduced ? 0 : [0, 15, 0]
                      }}
                      transition={{
                        rotate: { 
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3.3
                        },
                        y: { 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3.3
                        }
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 0,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </Link>
                  {/* Glow Ring for Orange Product */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-2xl"
                    style={perfStyle}
                    animate={{ 
                      scale: reduced ? 1 : [1, 1.3, 1],
                      opacity: reduced ? 0.6 : [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                </motion.div>

                {/* Sparkle Effects Around Products */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${20 + Math.sin(i * 30) * 30}%`,
                      left: `${30 + Math.cos(i * 30) * 35}%`,
                    }}
                    animate={{ 
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
