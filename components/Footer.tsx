'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setEmail('')
        alert('Successfully subscribed to newsletter!')
      } else {
        alert('Failed to subscribe. Please try again.')
      }
    } catch (error) {
      alert('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 text-text relative overflow-hidden border-t-2 border-orange-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <img 
                src="/images/logo/logo-2.png" 
                alt="Nutri Nest Logo" 
                className="h-28 w-auto object-contain"
              />
            </motion.div>
            <p className="text-text/80 text-sm leading-relaxed">
              L&C Biotech's premium eye-care gummies for kids. Healthy eyes start with a YumBurst!
            </p>
            <div className="flex space-x-4">
              {[
                // { icon: Facebook, href: '#' },
                { icon: Instagram, href: 'https://www.instagram.com/mynutrinest.in?igsh=ZmxneWNncGMwdHR0' },
                // { icon: Twitter, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-accent-1/20 hover:bg-gradient-to-br hover:from-accent-1 hover:to-accent-2 rounded-full flex items-center justify-center text-accent-1 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
                <h3 className="text-lg font-semibold mb-4 font-poppins ">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/products', label: 'Products' },
                { href: '/learn', label: 'Learn' },
                { href: '/about', label: 'About Us' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="text-text hover:text-accent-1 transition-colors duration-300 flex items-center group"
                  >
                    <motion.span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 font-poppins text-">Support</h3>
            <ul className="space-y-3">
              {[
                { href: '/contact', label: 'Contact Us' },
                { href: '/faq', label: 'FAQ' },
                { href: '/shipping', label: 'Shipping & Delivery Policy' },
                { href: '/cancellation', label: 'Cancellation & Refund Policy' },
                { href: '/terms', label: 'Terms & Conditions' },
                { href: '/privacy', label: 'Privacy Policy' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="text-text hover:text-accent-1 transition-colors duration-300 flex items-center group"
                  >
                    <motion.span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 font-poppins ">Stay Updated</h3>
            <p className="text-text/80 text-sm mb-4 leading-relaxed">
              Subscribe to get updates on new products and health tips!
            </p>
            <motion.form 
              onSubmit={handleNewsletterSubmit} 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-accent-1/30 rounded-xl text-text placeholder-text/50 focus:outline-none focus:border-accent-1 focus:ring-2 focus:ring-accent-1/20 transition-all duration-300"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-sm py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-accent-1/30 mt-8 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-text">
            {[
              { icon: Mail, text: 'support@mynutrinest.in' },
              { icon: Phone, text: '+91 7207182578' },
              { icon: MapPin, text: 'hyderabad' }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 hover:text-accent-2 transition-colors duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-8 h-8 bg-gradient-to-br from-accent-1 to-accent-2 rounded-full flex items-center justify-center"
                >
                  <contact.icon className="w-4 h-4 text-white" />
                </motion.div>
                <span>{contact.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="border-t border-accent-1/30 mt-8 pt-8 text-center text-text/70 text-sm"
        >
          <p>&copy; 2025 L&C Biotech. All rights reserved. | Nutri Nest - Healthy Eyes Start with a YumBurst!</p>
        </motion.div>
      </div>
    </footer>
  )
}
