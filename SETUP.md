# Nutri Nest Setup Guide

This guide will help you set up the complete Nutri Nest e-commerce application.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase Database

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the SQL to create all tables and sample data

3. **Get your Supabase credentials**:
   - Go to Settings > API
   - Copy your Project URL and anon key

### 3. Set Up Razorpay

1. **Create a Razorpay account** at [razorpay.com](https://razorpay.com)

2. **Get your API keys**:
   - Go to Settings > API Keys
   - Copy your Key ID and Key Secret

3. **Set up webhooks**:
   - Go to Settings > Webhooks
   - Add webhook URL: `https://yourdomain.com/api/razorpay/webhook`
   - Select events: `payment.captured`

### 4. Set Up Shiprocket (Optional)

1. **Create a Shiprocket account** at [shiprocket.in](https://shiprocket.in)

2. **Get your credentials**:
   - Email and password for API access

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Shiprocket Configuration (Optional)
SHIPROCKET_EMAIL=your_shiprocket_email
SHIPROCKET_PASSWORD=your_shiprocket_password
SHIPROCKET_BASE_URL=https://apiv2.shiprocket.in

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🗄️ Database Schema

The application uses the following tables:

- **products**: Store product information
- **combos**: Store combo offers
- **orders**: Store customer orders
- **newsletter_subscribers**: Store newsletter signups
- **contact_messages**: Store contact form submissions

## 🔧 API Endpoints

- `POST /api/razorpay/create-order`: Create payment orders
- `POST /api/razorpay/webhook`: Handle payment webhooks
- `POST /api/contact`: Handle contact form submissions
- `POST /api/newsletter`: Handle newsletter subscriptions

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Update Webhook URLs

After deployment, update your Razorpay webhook URL to:
`https://yourdomain.vercel.app/api/razorpay/webhook`

## 🧪 Testing the Application

### 1. Test Product Pages
- Visit `/products` to see the product grid
- Click on individual products to see product details
- Test the cart functionality

### 2. Test Checkout Flow
- Add products to cart
- Go to `/cart` to review items
- Proceed to `/checkout`
- Test the payment flow (use Razorpay test mode)

### 3. Test Contact Forms
- Visit `/contact` and submit the contact form
- Test newsletter subscription

## 🔍 Troubleshooting

### Common Issues

1. **Supabase Connection Issues**:
   - Verify your Supabase URL and keys
   - Check if RLS policies are properly set

2. **Razorpay Payment Issues**:
   - Ensure you're using the correct API keys
   - Check webhook configuration

3. **Build Errors**:
   - Run `npm run lint` to check for issues
   - Ensure all environment variables are set

### Getting Help

- Check the console for error messages
- Verify all environment variables are set correctly
- Ensure all API credentials are valid

## 📱 Features Checklist

- ✅ Responsive design
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Payment integration
- ✅ Order tracking
- ✅ Contact forms
- ✅ Newsletter subscription
- ✅ SEO optimization
- ✅ Animations and interactions

## 🎨 Customization

### Colors
Update colors in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    orange: '#FFA726',
    red: '#D32F2F',
  },
  background: {
    cream: '#FFF8F1',
  },
  text: {
    gray: '#333333',
  },
}
```

### Content
- Update product information in the database
- Modify text content in component files
- Add your own images and branding

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Regularly update dependencies

---

**Ready to launch your Nutri Nest e-commerce store!** 🚀
