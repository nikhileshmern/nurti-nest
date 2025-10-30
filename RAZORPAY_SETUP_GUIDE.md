# 🚀 Razorpay Payment Integration - Setup Guide

## ✅ What Was Fixed

The 400 Bad Request error was caused by creating **fake order IDs** instead of using real Razorpay orders. Now the system creates **real Razorpay orders** using your test credentials.

## 📋 Required Setup

### Step 1: Create `.env.local` File

Create a file named `.env.local` in the root of your project with these contents:

```bash
# Razorpay Test Credentials
# Server-side credentials (used in API routes)
RAZORPAY_KEY_ID=rzp_test_RYSNG6FH2SYRQU
RAZORPAY_KEY_SECRET=mwCCfgmXJ0dlME8C4VUs5Alc

# Client-side key (used in frontend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RYSNG6FH2SYRQU

# Test mode flag
NEXT_PUBLIC_TEST_MODE=true
TEST_MODE=true

# Supabase credentials (if you have them)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 2: Restart Development Server

After creating `.env.local`, **restart your Next.js development server**:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 3: Test the Payment Flow

1. Go to `http://localhost:3000/checkout`
2. Fill in the customer information
3. Click "Pay"
4. The Razorpay modal should open with **real payment options**

## 🧪 Test Card Details

Use these test cards in the Razorpay modal:

### ✅ Success Card
- **Card Number:** `4111 1111 1111 1111`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Result:** Payment succeeds

### ❌ Failure Card
- **Card Number:** `4000 0000 0000 0002`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Result:** Payment fails

### 🔐 3D Secure Card (OTP)
- **Card Number:** `5104 0600 0000 0008`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **OTP:** `1234`
- **Result:** Payment succeeds after OTP

## 🔍 How It Works Now

### Before (Broken)
```javascript
// Created fake order IDs
const orderId = `order_${Date.now()}`
// Razorpay rejected these with 400 Bad Request
```

### After (Fixed)
```javascript
// Creates real Razorpay orders via API
const razorpayOrder = await fetch('https://api.razorpay.com/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${credentials}`
  },
  body: JSON.stringify({ amount, currency, receipt })
})
// Returns real order ID like: order_xyz123abc456
```

## 📊 What Happens in the Flow

1. **User clicks "Pay"** → Frontend sends cart data to `/api/razorpay/create-order`
2. **Backend creates Razorpay order** → Calls Razorpay API with credentials
3. **Razorpay returns order ID** → e.g., `order_NXi4t0VQpLqKf2`
4. **Frontend opens modal** → Razorpay checkout with real order ID
5. **User completes payment** → Uses test card details
6. **Payment succeeds** → Order status updated to "paid"

## 🎯 Verify It's Working

Look for these logs in your console:

```
✅ Good logs (working):
🎯 Creating Razorpay order via API...
✅ Razorpay order created: order_NXi4t0VQpLqKf2
✅ Razorpay modal opened

❌ Bad logs (not working):
❌ Razorpay key not configured
❌ Failed to create order
400 Bad Request from api.razorpay.com
```

## 🔐 Security Notes

- ✅ `.env.local` is in `.gitignore` - your keys won't be committed
- ✅ Test keys start with `rzp_test_` - no real money
- ✅ Server keys (SECRET) are only used in API routes
- ✅ Client keys (PUBLIC) are safe to use in browser

## 🚨 Troubleshooting

### Problem: Still getting 400 Bad Request

**Solution:** Make sure you've:
1. Created `.env.local` with correct keys
2. Restarted the dev server
3. Cleared browser cache
4. Check console for "Using Razorpay key: rzp_test_RYSNG6FH..."

### Problem: "Razorpay key not configured" error

**Solution:** 
1. Verify `.env.local` exists in project root
2. Check that `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
3. Restart dev server (environment variables only load on start)

### Problem: Modal opens but no payment options

**Solution:**
1. Check that you're using a valid test key
2. Try a different test card number
3. Check Razorpay dashboard for account status

## 📱 Next Steps

Once payment is working:

1. **Enable webhooks** - Get real-time payment notifications
2. **Add production keys** - Switch from test to live mode
3. **Test all scenarios** - Success, failure, OTP, cancellation
4. **Monitor dashboard** - Check Razorpay dashboard for transactions

## 🎉 You're All Set!

Your payment flow now uses **real Razorpay orders** and should work perfectly in test mode.

Test it now: `http://localhost:3000/checkout`

