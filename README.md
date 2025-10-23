# Nutri Nest - YumBurst Gummies E-commerce

A complete, production-ready Next.js 14 e-commerce application for L&C Biotech's Nutri Nest brand, featuring YumBurst eye-care gummies for kids.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **E-commerce Flow**: Complete cart → checkout → payment → order tracking
- **Payment Integration**: Razorpay for secure payments
- **Shipping Integration**: Shiprocket for order fulfillment
- **Database**: Supabase for data storage and authentication
- **Responsive Design**: Mobile-first approach with beautiful animations
- **SEO Optimized**: Complete metadata and Open Graph tags

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Payments**: Razorpay
- **Shipping**: Shiprocket API
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nutri-nest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Razorpay Configuration
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   # Shiprocket Configuration
   SHIPROCKET_EMAIL=your_shiprocket_email
   SHIPROCKET_PASSWORD=your_shiprocket_password
   SHIPROCKET_BASE_URL=https://apiv2.shiprocket.in

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - This will create all necessary tables and sample data

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses the following main tables:

- **products**: Store product information (YumBurst gummies)
- **combos**: Store combo offers and discounts
- **orders**: Store customer orders and payment information
- **newsletter_subscribers**: Store newsletter signups
- **contact_messages**: Store contact form submissions

## 🎨 Design System

### Colors
- **Primary Orange**: #FFA726
- **Pomegranate Red**: #D32F2F
- **Background Cream**: #FFF8F1
- **Text Gray**: #333333

### Typography
- **Headings**: Poppins (300, 400, 500, 600, 700)
- **Body**: Inter (300, 400, 500, 600)

## 📱 Pages

- **Home**: Hero section, featured products, benefits, testimonials, FAQ
- **Products**: Product grid with filtering and search
- **Product Detail**: Individual product pages with detailed information
- **Combos**: Special combo offers and discounts
- **Learn**: Educational content about eye health
- **About**: Company information and team
- **Contact**: Contact form and company details
- **Cart**: Shopping cart with item management
- **Checkout**: Payment and shipping information
- **Order Success**: Order confirmation and tracking

## 🔧 API Routes

- `POST /api/razorpay/create-order`: Create Razorpay payment order
- `POST /api/razorpay/webhook`: Handle Razorpay payment webhooks
- `POST /api/contact`: Handle contact form submissions
- `POST /api/newsletter`: Handle newsletter subscriptions

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:

- Supabase credentials
- Razorpay credentials
- Shiprocket credentials
- App URL for production

## 🔐 Security Features

- Row Level Security (RLS) enabled on all Supabase tables
- Secure payment processing with Razorpay
- Input validation and sanitization
- HTTPS enforcement
- CSRF protection

## 📊 Analytics & Monitoring

The application is ready for integration with:
- Google Analytics
- Facebook Pixel
- Hotjar
- Sentry for error monitoring

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📈 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Framer Motion animations optimized for performance
- Tailwind CSS for minimal bundle size
- Supabase for efficient database queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to L&C Biotech. All rights reserved.

## 🆘 Support

For support and questions:
- Email: support@nutri-nest.com
- Phone: +91 98765 43210
- Website: [nutri-nest.com](https://nutri-nest.com)

---

**Nutri Nest** - Healthy Eyes Start with a YumBurst! 👁️✨
