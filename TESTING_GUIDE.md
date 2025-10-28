# 🧪 Test Mode Setup Guide

This guide will help you set up and test the Razorpay and Shiprocket integrations without using real APIs or charging actual money.

## Quick Start

### 1. Enable Test Mode

Create a `.env.local` file in your project root with the following content:

```env
# Test Environment Configuration
NEXT_PUBLIC_TEST_MODE=true
TEST_MODE=true

# Supabase Configuration (use your actual Supabase credentials)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay Test Configuration (these are test keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
RAZORPAY_KEY_SECRET=thisisasecret
RAZORPAY_WEBHOOK_SECRET=test_webhook_secret

# Shiprocket Test Configuration (mock responses)
SHIPROCKET_EMAIL=test@nutrinest.com
SHIPROCKET_PASSWORD=test_password
SHIPROCKET_BASE_URL=https://test-api.shiprocket.in

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Start the Development Server

```bash
npm run dev
```

### 3. Test the Complete Flow

1. Visit `http://localhost:3000/test-flow` to access the test dashboard
2. Click "Add Sample Items to Cart" to populate your cart
3. Click "Run Complete Test Flow" to test the entire integration
4. Visit `http://localhost:3000/checkout` to test the checkout process

## What Happens in Test Mode

### 🧪 Razorpay Test Mode
- **Payment Processing**: Simulated automatically after 2 seconds
- **No Real Charges**: No actual money is processed
- **Mock Responses**: All Razorpay API calls return mock data
- **Console Logs**: Detailed logs show what would happen in production

### 🚚 Shiprocket Test Mode
- **Authentication**: Mock token generation
- **Shipment Creation**: Simulated with mock AWB and tracking URLs
- **Tracking Info**: Mock tracking data with realistic status updates
- **No Real Shipments**: No actual packages are created

### 📊 Database Updates
- **Real Database**: Orders are still created in your Supabase database
- **Test Data**: All external API data is mocked
- **Status Updates**: Order statuses are updated as if real APIs were called

## Test Flow Steps

1. **Order Creation**: Creates order in database with mock Razorpay order ID
2. **Payment Simulation**: Simulates successful payment after 2 seconds
3. **Webhook Processing**: Processes payment confirmation and updates order status
4. **Shipment Creation**: Creates mock shipment with tracking information
5. **Order Completion**: Updates order status to "shipped" with tracking details

## Manual Testing

### Test Checkout Flow
1. Add items to cart
2. Go to checkout page
3. Fill in customer information
4. Click "🧪 Test Pay" button
5. Payment will be simulated automatically
6. You'll be redirected to order success page

### Test Webhook Manually
```bash
# Test webhook endpoint directly
curl -X GET "http://localhost:3000/api/razorpay/webhook?order_id=your_order_id"
```

## Console Logs

In test mode, you'll see detailed console logs with 🧪 emoji prefix:
- `🧪 Test Mode: Simulating Razorpay payment...`
- `🧪 Test Mode: Payment successful`
- `🧪 Test Mode: Creating mock shipment...`
- `🧪 Test Mode: Shipment created`

## Switching to Production

When you're ready to go live:

1. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_TEST_MODE=false
   TEST_MODE=false
   
   # Add your real Razorpay credentials
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_real_key
   RAZORPAY_KEY_SECRET=your_real_secret
   RAZORPAY_WEBHOOK_SECRET=your_real_webhook_secret
   
   # Add your real Shiprocket credentials
   SHIPROCKET_EMAIL=your_real_email
   SHIPROCKET_PASSWORD=your_real_password
   SHIPROCKET_BASE_URL=https://apiv2.shiprocket.in
   ```

2. **Test with Real APIs**: Use Razorpay's test mode first
3. **Configure Webhooks**: Set up real webhook endpoints
4. **Go Live**: Switch to live credentials

## Troubleshooting

### Test Mode Not Working
- Check that `NEXT_PUBLIC_TEST_MODE=true` is set
- Restart your development server
- Check browser console for test mode logs

### Database Issues
- Ensure Supabase credentials are correct
- Check that your database schema is set up properly
- Verify the `orders` table exists

### Mock Data Issues
- Check console logs for detailed information
- Verify all test utilities are imported correctly
- Ensure test mode detection is working

## File Structure

```
lib/
├── test-utils.ts          # Test mode utilities and mock data generators
├── razorpay.ts           # Updated with test mode support
└── shiprocket.ts         # Updated with test mode support

app/
├── api/razorpay/
│   ├── create-order/route.ts  # Updated with test mode
│   └── webhook/route.ts       # Updated with test mode and test endpoint
├── checkout/page.tsx          # Updated with test mode indicators
└── test-flow/page.tsx         # New test dashboard
```

## Benefits of This Setup

✅ **No Real Money**: Test payments without charges  
✅ **No Real Shipments**: Test shipping without creating packages  
✅ **Real Database**: Orders are still created for testing  
✅ **Easy Switching**: Simple environment variable toggle  
✅ **Detailed Logs**: See exactly what happens in production  
✅ **Complete Flow**: Test the entire customer journey  

This setup allows you to thoroughly test your payment and shipping integration before going live with real APIs!
