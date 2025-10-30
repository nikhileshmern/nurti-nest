# 🗄️ Supabase Complete Integration Guide

## 📋 Table of Contents
1. [Database Setup](#database-setup)
2. [Environment Configuration](#environment-configuration)
3. [Complete Order Flow](#complete-order-flow)
4. [Testing the Integration](#testing-the-integration)
5. [Troubleshooting](#troubleshooting)

---

## 🎯 What Supabase Does in Your App

Supabase is your **database layer** that stores:
- ✅ **Orders** - All customer orders with payment & shipment info
- ✅ **Products** - Your YumBurst Gummies catalog
- ✅ **Combos** - Product bundle offers
- ✅ **Newsletter Subscribers** - Email list
- ✅ **Contact Messages** - Customer inquiries

---

## 🔧 Database Setup

### Step 1: Create Supabase Project

1. Go to: https://supabase.com
2. Click "New Project"
3. Fill in:
   - **Name:** `nutri-nest`
   - **Database Password:** `<create-secure-password>`
   - **Region:** Choose closest to you
4. Wait for project to be created (~2 minutes)

### Step 2: Get Your Credentials

Once created, go to **Project Settings** → **API**:

```bash
# Copy these three values:
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Run Database Schema

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New Query**
3. Copy and paste the entire `supabase-schema.sql` file
4. Click **Run**

This creates all tables:
- ✅ `products` table
- ✅ `combos` table
- ✅ `orders` table ← **Most Important for your flow**
- ✅ `newsletter_subscribers` table
- ✅ `contact_messages` table

---

## ⚙️ Environment Configuration

### Update `.env.local`

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://iocklpyqnmixypclpziyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Replace with YOUR actual values!**

---

## 📊 Database Schema

### Orders Table Structure

```sql
CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()
  user_email          VARCHAR(255) NOT NULL
  status              VARCHAR(50) DEFAULT 'pending'
                      -- 'pending', 'paid', 'shipped', 'delivered', 'cancelled'
  subtotal            INTEGER NOT NULL  -- In paise (69900 = ₹699)
  shipping            INTEGER NOT NULL
  total               INTEGER NOT NULL
  razorpay_order_id   VARCHAR(255)      -- From Razorpay
  shiprocket_awb      VARCHAR(255)      -- From Shiprocket
  tracking_url        TEXT              -- Tracking link
  address_json        JSONB NOT NULL    -- Customer address
  items               JSONB NOT NULL    -- Order items
  created_at          TIMESTAMP DEFAULT NOW()
  updated_at          TIMESTAMP DEFAULT NOW()
);
```

---

## 🔄 Complete Order Flow

### 1. **Order Creation** (After Payment Success)

**File:** `/app/api/razorpay/create-order/route.ts`

```typescript
// Create order data
const orderData = {
  user_email: customerInfo.email,
  status: 'pending',
  subtotal: subtotal,
  shipping: shipping,
  total: total,
  razorpay_order_id: razorpayOrder.id,
  shiprocket_awb: null,
  tracking_url: null,
  address_json: customerInfo,
  items: items
}

// Insert into Supabase
const supabase = createClient()
const { data, error } = await supabase
  .from('orders')
  .insert(orderData)
  .select()
  .single()
```

### 2. **Payment Success → Webhook Triggered**

**File:** `/app/api/razorpay/webhook/route.ts`

```typescript
// Update order status to 'paid'
await supabase
  .from('orders')
  .update({ status: 'paid' })
  .eq('razorpay_order_id', order_id)

// Then create Shiprocket shipment
```

### 3. **Shipment Creation → Update Order**

```typescript
// After creating shipment, update order
await supabase
  .from('orders')
  .update({
    status: 'shipped',
    shiprocket_awb: awb_code,
    tracking_url: tracking_url
  })
  .eq('id', order_id)
```

### 4. **Customer Views Order**

**File:** `/app/orders/page.tsx`

```typescript
// Fetch user's orders
const { data: orders } = await supabase
  .from('orders')
  .select('*')
  .eq('user_email', user.email)
  .order('created_at', { ascending: false })
```

---

## 🎯 Complete Integration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPLETE ORDER FLOW                      │
└─────────────────────────────────────────────────────────────┘

1. Customer Adds to Cart
   └─> In-memory (CartContext)

2. Customer Goes to Checkout
   ├─> Fills address form
   ├─> Applies coupon (optional)
   └─> Clicks "Place Order"

3. Create Razorpay Order
   ├─> API: /api/razorpay/create-order
   ├─> Razorpay order created
   └─> INSERT into Supabase orders table
       └─> status: 'pending'

4. Payment Modal Opens
   ├─> Customer enters card details
   └─> Payment successful

5. Webhook Triggered
   ├─> API: /api/razorpay/webhook
   ├─> UPDATE Supabase: status = 'paid'
   ├─> Send order confirmation email
   ├─> Create Shiprocket shipment
   ├─> Generate AWB
   └─> UPDATE Supabase: status = 'shipped', awb, tracking_url

6. Customer Can Now:
   ├─> View order history (/orders)
   ├─> Track shipment (/track-order?awb=XXX)
   └─> Get email notifications
```

---

## 🔍 Database Queries Used

### Create Order

```typescript
const { data, error } = await supabase
  .from('orders')
  .insert({
    user_email: 'customer@example.com',
    status: 'pending',
    subtotal: 69900,  // ₹699 in paise
    shipping: 5000,   // ₹50
    total: 74900,
    razorpay_order_id: 'order_XXX',
    address_json: { /* address object */ },
    items: [ /* items array */ ]
  })
  .select()
  .single()
```

### Update Order Status

```typescript
const { error } = await supabase
  .from('orders')
  .update({ status: 'paid' })
  .eq('razorpay_order_id', 'order_XXX')
```

### Add Shipment Info

```typescript
const { error } = await supabase
  .from('orders')
  .update({
    status: 'shipped',
    shiprocket_awb: 'TEST1234567890',
    tracking_url: 'https://shiprocket.co/tracking/TEST1234567890'
  })
  .eq('id', 'order-uuid')
```

### Fetch User Orders

```typescript
const { data: orders } = await supabase
  .from('orders')
  .select('*')
  .eq('user_email', 'customer@example.com')
  .order('created_at', { ascending: false })
```

---

## 🧪 Testing the Integration

### Test 1: Check Supabase Connection

```typescript
// In browser console on any page:
const supabase = createClient()
const { data, error } = await supabase
  .from('orders')
  .select('count')

console.log('Orders count:', data)
// Should show count if connected
```

### Test 2: Create Test Order

1. Go to checkout
2. Fill in details
3. Complete payment with test card
4. Check Supabase Dashboard → Table Editor → orders
5. You should see your order!

### Test 3: Check Order Status Updates

After payment:
1. Trigger webhook: `http://localhost:3000/api/razorpay/webhook?order_id=order_XXX`
2. Check Supabase → orders table
3. Status should change: `pending` → `paid` → `shipped`
4. `shiprocket_awb` field should be filled
5. `tracking_url` field should be filled

---

## 🚨 Troubleshooting

### Error: "fetch failed" when updating orders

**Cause:** Supabase Row Level Security (RLS) policies blocking updates

**Solution:** Add policy for updates:

```sql
-- In Supabase SQL Editor
CREATE POLICY "Allow service role to update orders"
ON orders FOR UPDATE
USING (true)
WITH CHECK (true);
```

### Error: "Failed to load orders"

**Cause:** Orders table doesn't exist

**Solution:** Run the `supabase-schema.sql` in SQL Editor

### Orders not showing in `/orders` page

**Cause:** No orders in database OR user not logged in

**Solution:** 
1. Check if user is authenticated
2. Check Supabase → orders table for data
3. Check browser console for errors

### Webhook not saving to database

**Cause:** Network error OR missing service role key

**Solution:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
2. Check terminal logs for error messages
3. Try direct insert in Supabase SQL Editor:

```sql
INSERT INTO orders (user_email, status, subtotal, shipping, total, address_json, items)
VALUES (
  'test@example.com',
  'pending',
  69900,
  5000,
  74900,
  '{"name": "Test User", "email": "test@example.com", "phone": "1234567890", "address": "Test Address", "city": "Test City", "state": "Test State", "pincode": "110001"}',
  '[{"id": "test-1", "name": "Test Product", "price": 699, "quantity": 1}]'
);
```

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Environment variables added to `.env.local`
- [ ] Test order creation works
- [ ] Orders appear in database
- [ ] Webhook updates order status
- [ ] Shiprocket AWB saved to database
- [ ] `/orders` page shows orders
- [ ] Tracking page works with AWB

---

## 📝 Database Access Points

### Where Supabase is Used:

1. **`/lib/supabase.ts`**
   - Client initialization
   - Auto-detects real vs. mock mode

2. **`/app/api/razorpay/create-order/route.ts`**
   - Creates order in database after Razorpay order creation
   - Status: 'pending'

3. **`/app/api/razorpay/webhook/route.ts`**
   - Updates order status after payment
   - Adds shipment info after Shiprocket creation
   - Status: 'pending' → 'paid' → 'shipped'

4. **`/app/orders/page.tsx`**
   - Fetches user orders for display
   - Shows order history

5. **`/app/admin/orders/page.tsx`**
   - Fetches all orders
   - Admin management interface

6. **`/app/api/shiprocket/create-shipment/route.ts`**
   - Fetches order details
   - Updates with shipment info

---

## 🎯 Next Steps

1. **Setup Supabase** (if not done)
   - Create project
   - Run schema
   - Add credentials to `.env.local`

2. **Test Order Flow**
   - Make test purchase
   - Check database
   - Verify webhook updates

3. **Enable RLS Policies**
   - Secure your data
   - Control access

4. **Go to Production**
   - Switch to live Razorpay keys
   - Disable test mode
   - Monitor orders in Supabase

---

## 🔐 Security Best Practices

### Row Level Security (RLS)

Already configured in schema:
- ✅ Anyone can INSERT orders (checkout)
- ✅ Service role can UPDATE orders (webhooks)
- ✅ Users can SELECT their own orders (authenticated)

### API Keys

- **NEVER** commit `.env.local` to git
- **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` to client
- **ALWAYS** use `NEXT_PUBLIC_SUPABASE_ANON_KEY` for client-side

---

## 📊 Monitoring

### Check Order Status

```sql
-- In Supabase SQL Editor
SELECT 
  id,
  user_email,
  status,
  total / 100 as total_rupees,
  razorpay_order_id,
  shiprocket_awb,
  created_at
FROM orders
ORDER BY created_at DESC
LIMIT 10;
```

### Check Failed Orders

```sql
SELECT * FROM orders
WHERE status = 'pending'
AND created_at < NOW() - INTERVAL '1 hour';
```

### Check Shipment Status

```sql
SELECT 
  COUNT(*) as total_orders,
  status,
  COUNT(*) FILTER (WHERE shiprocket_awb IS NOT NULL) as with_awb
FROM orders
GROUP BY status;
```

---

## 🎉 You're All Set!

Your Supabase integration is complete when:
- ✅ Database tables created
- ✅ Environment variables configured  
- ✅ Orders saving to database
- ✅ Webhook updating order status
- ✅ Shipment info being stored
- ✅ Customer can view order history

**Now your complete e-commerce flow works end-to-end!** 🚀

