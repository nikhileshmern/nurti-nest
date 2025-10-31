import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import { SupabaseProvider } from '@/context/SupabaseContext'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Nutri Nest - Healthy Eyes Start with a YumBurst!',
  description: 'Tasty eye-care gummies for kids aged 4+. Supports visual clarity, is gluten free, and provides antioxidant support. 100% Vegan.',
  keywords: 'eye care gummies, kids vitamins, visual clarity, gluten free, vegan supplements',
  authors: [{ name: 'L&C Biotech' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logo/logo-1.png',
  },
  openGraph: {
    title: 'Nutri Nest - Healthy Eyes Start with a YumBurst!',
    description: 'Tasty eye-care gummies for kids aged 4+. Supports visual clarity, is gluten free, and provides antioxidant support. 100% Vegan.',
    url: 'https://nutri-nest.com',
    siteName: 'Nutri Nest',
    images: [
      {
        url: '/images/logo/logo-1.png',
        width: 1200,
        height: 630,
        alt: 'Nutri Nest Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutri Nest - Healthy Eyes Start with a YumBurst!',
    description: 'Tasty eye-care gummies for kids aged 4+. Supports visual clarity, is gluten free, and provides antioxidant support. 100% Vegan.',
    images: ['/images/logo/logo-1.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter bg-background text-text">
        <SupabaseProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
                    color: '#fff',
                    fontWeight: '500',
                  },
                }}
              />
            </CartProvider>
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}