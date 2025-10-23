# Quick Start Guide

## 🚀 Get the App Running (Demo Mode)

The app is now configured to run in **demo mode** without requiring Supabase setup. This means you can see the full UI and functionality without database configuration.

### 1. The app should now work without errors!

The Supabase error has been fixed. The app will now run in demo mode with sample data.

### 2. To set up full functionality later:

1. **Create a `.env.local` file** in the root directory with:

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

2. **Set up Supabase database** using the `supabase-schema.sql` file

3. **Configure Razorpay** for payments

4. **Configure Shiprocket** for shipping

## 🎉 Current Status

Your Nutri Nest app should now be running perfectly in demo mode with:
- ✅ Beautiful UI with all components
- ✅ Sample products (Orange & Pomegranate gummies)
- ✅ Shopping cart functionality
- ✅ All pages working
- ✅ No Supabase errors

**The app is ready to use!** 🚀
