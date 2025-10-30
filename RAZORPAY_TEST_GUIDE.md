# Razorpay Test Payment Guide

## Overview
The payment flow now shows the **actual Razorpay payment interface** even in test mode, so you can see all the payment options (cards, UPI, wallets, etc.) just like in production.

## How It Works Now

### Test Mode (Localhost)
- Uses Razorpay test key: `rzp_test_1DP5mmOlF5G5ag`
- Shows **real Razorpay payment modal** with all payment options
- Accepts **test payment credentials**
- No real money is charged
- Perfect for testing the complete user experience

### Production Mode
- Uses your actual Razorpay key from environment variables
- Shows real payment modal with real payment processing
- Charges actual money

## Testing the Payment Flow

### Step 1: Add Items to Cart
1. Go to `/products`
2. Add any items to your cart
3. Click on cart icon to view items

### Step 2: Proceed to Checkout
1. Click "Proceed to Checkout"
2. Fill in the shipping information:
   - Full Name
   - Email
   - Phone
   - Address
   - City, State, Pincode

### Step 3: View Payment Modal
1. Click "Pay ₹XXX" button
2. Razorpay payment modal will open
3. You'll see all payment options:
   - **Cards** (Credit/Debit)
   - **UPI** (GPay, PhonePe, Paytm, etc.)
   - **Netbanking**
   - **Wallets** (Paytm, PhonePe, etc.)
   - **EMI**

### Step 4: Use Test Payment Credentials

#### Test Cards (Successful Payment)
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits (e.g., 123)
Expiry: Any future date (e.g., 12/25)
Name: Any name
```

#### Test Cards (Failed Payment - for testing failures)
```
Card Number: 4000 0000 0000 0002
CVV: Any 3 digits
Expiry: Any future date
```

#### Test UPI
```
UPI ID: success@razorpay
(This will simulate a successful payment)

UPI ID: failure@razorpay
(This will simulate a failed payment)
```

#### Test Wallets
- Select any wallet option
- Use credentials: `success@razorpay` / `password`

### Step 5: Complete Payment
1. Enter test credentials
2. Click "Pay" button
3. Wait for success confirmation
4. You'll be redirected to order success page

## Available Test Credentials by Razorpay

### 1. Successful Test Card
- **Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date
- **OTP**: 1234 (if asked)

### 2. Successful Domestic Card
- **Number**: 5104 0600 0000 0008
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### 3. International Card
- **Number**: 4012 0010 3714 1112
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### 4. Failed Payment Card
- **Number**: 4000 0000 0000 0002
- Use this to test payment failure scenarios

### 5. UPI Success
- **VPA**: success@razorpay

### 6. UPI Failure
- **VPA**: failure@razorpay

## Payment Modal Features

When the Razorpay modal opens, you'll see:

### Top Section
- Merchant name: "Nutri Nest"
- Order amount
- Order description

### Payment Methods Tab
- **Cards**: Credit/Debit card payment
- **UPI**: UPI payment (QR code or UPI ID)
- **Netbanking**: All major banks
- **Wallets**: Paytm, PhonePe, etc.
- **EMI**: EMI options (if available)

### Card Payment Fields
- Card Number (16 digits)
- Cardholder Name
- Expiry Date (MM/YY)
- CVV (3 digits on back)
- Save card checkbox (optional)

### UPI Payment Options
- **QR Code**: Scan with any UPI app
- **UPI ID**: Enter your UPI ID
- **UPI Apps**: Direct integration with GPay, PhonePe, etc.

## Testing Different Scenarios

### 1. Successful Payment
```javascript
// Use test card
Card: 4111 1111 1111 1111
CVV: 123
Expiry: 12/25

// Or use test UPI
UPI ID: success@razorpay
```

### 2. Failed Payment
```javascript
// Use failure test card
Card: 4000 0000 0000 0002

// Or use failure UPI
UPI ID: failure@razorpay
```

### 3. Payment Cancellation
- Click "X" button on modal
- Or click outside the modal
- Or press ESC key

## Console Logs

Monitor the browser console to see detailed logs:
```
🧪 Test Mode: Loading Razorpay with test key...
🧪 Opening Razorpay test checkout...
🧪 Test payment successful! {razorpay_payment_id: "...", ...}
```

## Troubleshooting

### Modal Not Opening?
1. Check console for errors
2. Ensure Razorpay script loaded successfully
3. Check network tab for script loading

### Payment Not Processing?
1. Use correct test credentials
2. Check console for error messages
3. Ensure order was created successfully

### "Payment Configuration Error"?
1. Check that test mode is enabled
2. Verify environment variables
3. Check browser console logs

## MCP Integration

For MCP tool integration (when ready):

### 1. Create Order
```typescript
const order = await mcp_rzp_mcp_server_create_order({
  amount: 10000,  // ₹100 in paisa
  currency: 'INR',
  receipt: 'receipt_123'
})
```

### 2. Initiate Payment
```typescript
const payment = await mcp_rzp_mcp_server_initiate_payment({
  amount: 10000,
  order_id: order.id,
  customer_id: 'cust_123'
})
```

### 3. Capture Payment
```typescript
const capture = await mcp_rzp_mcp_server_capture_payment({
  payment_id: payment.id,
  amount: 10000,
  currency: 'INR'
})
```

## Next Steps

1. **Test the Flow**: Go through the complete checkout process
2. **Try Different Payment Methods**: Test cards, UPI, wallets
3. **Test Failures**: Use failure test credentials
4. **Check Order Success Page**: Verify the flow completes
5. **Monitor Console**: Watch for any errors

## Production Deployment

When ready for production:

1. **Get Real Razorpay Keys**:
   - Sign up at https://razorpay.com
   - Get live API keys from dashboard
   - Configure webhook endpoints

2. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_TEST_MODE=false
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_here
   RAZORPAY_KEY_SECRET=your_secret_here
   ```

3. **Test in Production Mode**:
   - Use real payment credentials
   - Verify webhooks are working
   - Test with small amounts first

4. **Deploy**:
   - Deploy to production
   - Monitor payment flows
   - Set up alerts for failed payments

## Support

For Razorpay-specific issues:
- Documentation: https://razorpay.com/docs/
- Test credentials: https://razorpay.com/docs/payments/payments/test-card-details/
- Support: https://razorpay.com/support/
