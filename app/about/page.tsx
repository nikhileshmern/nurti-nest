'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Award, Users, Target, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Child-First Approach',
      description: 'Every product we create is designed with children\'s health and happiness in mind. We believe in making nutrition fun and accessible.',
    },
    {
      icon: Shield,
      title: 'Safety & Quality',
      description: 'We maintain the highest standards of safety and quality in all our products, ensuring they meet strict regulatory requirements.',
    },
    {
      icon: Award,
      title: 'Scientific Excellence',
      description: 'Our formulations are backed by scientific research and developed by expert nutritionists and pediatricians.',
    },
    {
      icon: Users,
      title: 'Family Values',
      description: 'We understand the challenges parents face and are committed to supporting families in their health journey.',
    },
  ]

  const team = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Nutritionist',
      description: 'Pediatric nutrition expert with 15+ years of experience in child health and development.',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Research',
      description: 'Leading researcher in eye health and vision development, specializing in pediatric nutrition.',
    },
    {
      name: 'Anita Patel',
      role: 'Quality Assurance',
      description: 'Ensures all products meet the highest standards of safety and efficacy for children.',
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
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-6">
            About Nutri Nest
          </h1>
          <p className="text-xl text-gray-600">
            We're L&C Biotech, a company dedicated to creating innovative, 
            science-backed nutritional solutions for children's health and development.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At L&C Biotech, we believe that healthy eyes are the foundation of a child's 
                learning and development. Our mission is to provide parents with safe, effective, 
                and enjoyable nutritional solutions that support their children's vision health.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our Nutri Nest brand, we're making eye care nutrition accessible and 
                appealing to children, helping them develop healthy habits that will benefit 
                them throughout their lives.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-accent-1 to-accent-2 text-white rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold font-poppins mb-4">
                Why Eye Health Matters
              </h3>
              <ul className="space-y-3">
                {[
                  '80% of learning is visual in the first 12 years',
                  'Digital eye strain affects 90% of children',
                  'Proper nutrition can prevent vision problems',
                  'Early intervention is key to healthy development'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <span className="w-2 h-2 bg-accent-2 rounded-full mt-2"></span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
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
            Our Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-accent-1 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
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
            Meet Our Team
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-accent-1 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold"
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-2">
                  {member.name}
                </h3>
                <p className="text-accent-1 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Company Stats */}
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
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-poppins mb-12 text-center"
            >
              Our Impact
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { value: '10K+', label: 'Happy Families', color: 'text-accent-1' },
                { value: '50+', label: 'Cities Served', color: 'text-accent-2' },
                { value: '99%', label: 'Customer Satisfaction', color: 'text-accent-1' },
                { value: '5★', label: 'Average Rating', color: 'text-accent-2' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`text-4xl font-bold ${stat.color} mb-2`}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
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
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Be part of the movement to support children's eye health and development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="/products" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Shop Products
              </motion.a>
              <motion.a 
                href="/contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}
