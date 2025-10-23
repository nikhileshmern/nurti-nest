/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nutri Nest Color Palette - Orange & Pomegranate Theme
        'primary': '#FB923C',           // Primary - Vibrant Orange
        'background': '#FFF7ED',        // Background - Cream / Soft Orange
        'accent-1': '#F97316',          // Accent 1 - Deep Orange
        'accent-2': '#EC4899',          // Accent 2 - Pomegranate Pink
        'neutral': '#B4B4B4',           // Neutral Gray - Soft Gray
        'highlight': '#EF4444',         // Highlight - Red/Pomegranate
        'text': '#7C2D12',             // Text - Dark Orange Brown
        
        // Semantic color mappings
        'logo-orange': '#FB923C',        // Primary orange color
        'logo-cream': '#FFF7ED',         // Background from logo
        'accent-orange': '#F97316',      // Deep Orange for buttons
        'accent-pomegranate': '#EC4899', // Pomegranate for accents
        'neutral-gray': '#B4B4B4',       // Soft Gray for borders
        'natural-red': '#EF4444',        // Red for highlights
        'text-dark': '#7C2D12',         // Dark Orange Brown for text
        
        // Premium gradients using orange & pomegranate colors
        'gradient-logo': 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
        'gradient-natural': 'linear-gradient(135deg, #EF4444 0%, #FB923C 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFF7ED 0%, #FB923C 100%)',
        'gradient-primary': 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
        'gradient-highlight': 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)',
        
        // Legacy mappings for existing code compatibility
        'primary-orange': '#FB923C',
        'primary-red': '#EF4444',
        'soft-shadow': '#B4B4B4',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'slide-left': 'slideLeft 0.8s ease-out',
        'slide-right': 'slideRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'rotate-in': 'rotateIn 0.8s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-180deg) scale(0.8)', opacity: '0' },
          '100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37, 0 0 10px #D4AF37, 0 0 15px #D4AF37' },
          '100%': { boxShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37, 0 0 30px #D4AF37' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
