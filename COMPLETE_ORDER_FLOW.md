# 🔄 Complete E-Commerce Order Flow

## 📊 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        NUTRI NEST E-COMMERCE                        │
│                     Complete Order Flow Diagram                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   Customer  │────▶│  Next.js    │────▶│  Razorpay   │────▶│  Shiprocket  │
│   Frontend  │     │   Backend   │     │   Payment   │     │   Shipping   │
└─────────────┘     └─────────────┘     └─────────────┘     └──────────────┘
       │                   │                    │                    │
       │                   ▼                    │                    │
       │            ┌─────────────┐             │                    │
       │            │   Supabase  │◀────────────┴────────────────────┘
       │            │   Database  │
       │            └─────────────┘
       │                   │
       └───────────────────┴─────▶ [Email Notifications]
```

---

## 🎯 Complete Flow Step-by-Step

### **Phase 1: Shopping & Cart Management**

```
Customer Browses Products
         │
         ├─▶ Views Product Cards
         ├─▶ Selects Flavour
         ├─▶ Clicks "Add to Cart"
         │
         ▼
CartContext (in-memory)
         │
         ├─▶ Stores: {id, name, price, quantity, flavour, image}
         ├─▶ Updates cart count in header
         └─▶ Cart drawer shows items
```

**Files Involved:**
- `/context/CartContext.tsx` - Cart state management
- `/components/ProductCard.tsx` - Add to cart button
- `/components/CartDrawer.tsx` - Cart sidebar

---

### **Phase 2: Checkout Process**

```
Customer Clicks "Checkout"
         │
         ▼
/checkout page loads
         │
         ├─▶ Displays order summary
         ├─▶ Shows customer info form
         ├─▶ Applies coupons (optional)
         ├─▶ Fetches shipping rates (on pincode change)
         │
         ▼
Customer Fills Form:
  - Name, Email, Phone
  - Address, City, State, Pincode
         │
         ▼
Customer Clicks "Place Order"
```

**Files Involved:**
- `/app/checkout/page.tsx` - Checkout UI & form handling

**Data Collected:**
```typescript
{
  name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  pincode: string
}
```

---

### **Phase 3: Order Creation**

```
POST /api/razorpay/create-order
         │
         ├─▶ Calculate Totals:
         │     - Subtotal = Σ(item.price × item.quantity)
         │     - Shipping = subtotal > 500 ? 0 : 50
         │     - Total = subtotal + shipping
         │     - Amount in Paisa = total × 100
         │
         ├─▶ Create Razorpay Order:
         │     POST https://api.razorpay.com/v1/orders
         │     {
         │       amount: amountInPaisa,
         │       currency: "INR",
         │       receipt: "internal_id"
         │     }
         │     └─▶ Returns: { id: "order_XXX", amount, currency }
         │
         └─▶ Save to Supabase:
               INSERT INTO orders {
                 user_email,
                 status: 'pending',
                 subtotal,
                 shipping,
                 total,
                 razorpay_order_id,
                 address_json,
                 items
               }
               └─▶ Returns: { id: uuid }
```

**Files Involved:**
- `/app/api/razorpay/create-order/route.ts`
- `/lib/supabase.ts`

**Database State:**
```sql
orders table:
  id: uuid
  razorpay_order_id: "order_XXX"
  status: "pending"  ← Order created but not paid yet
  shiprocket_awb: NULL
  tracking_url: NULL
```

---

### **Phase 4: Payment Processing**

```
Razorpay Checkout Modal Opens
         │
         ├─▶ Loads: checkout.razorpay.com/v1/checkout.js
         ├─▶ Initializes with:
         │     {
         │       key: RAZORPAY_KEY_ID,
         │       amount: amount,
         │       currency: "INR",
         │       order_id: "order_XXX",
         │       prefill: { name, email, phone },
         │       handler: onSuccess,
         │       modal: { ondismiss: onCancel }
         │     }
         │
         ▼
Customer Enters Card Details
         │
         ├─▶ Test Mode Cards:
         │     - 4111 1111 1111 1111 (Success)
         │     - 4000 0000 0000 0002 (Declined)
         │     - Any CVV, Future expiry
         │
         ▼
Razorpay Processes Payment
         │
         ├─▶ Success: Calls handler()
         │     └─▶ Frontend redirects to /order-success
         │
         └─▶ Failure: Calls payment.failed event
               └─▶ Shows error toast
```

**Files Involved:**
- `/app/checkout/page.tsx` - Razorpay initialization
- External: `checkout.razorpay.com/v1/checkout.js`

**Payment Response:**
```typescript
{
  razorpay_payment_id: "pay_XXX",
  razorpay_order_id: "order_XXX",
  razorpay_signature: "signature_hash"
}
```

---

### **Phase 5: Webhook Processing**

```
Razorpay Triggers Webhook
         │
         ▼
POST /api/razorpay/webhook
         │
         ├─▶ Verify Signature (Production):
         │     HMAC SHA256(body, WEBHOOK_SECRET)
         │     └─▶ If invalid: Return 400
         │
         ├─▶ Parse Event:
         │     event.event === 'payment.captured'
         │     └─▶ Extract: order_id, payment_id
         │
         ▼
Update Order Status in Supabase:
         │
         └─▶ UPDATE orders
               SET status = 'paid'
               WHERE razorpay_order_id = order_id
               RETURNING *
```

**Files Involved:**
- `/app/api/razorpay/webhook/route.ts`

**Database State:**
```sql
orders table:
  status: "paid"  ← Order paid, ready for shipment
```

---

### **Phase 6: Shipment Creation**

```
After Order Status = 'paid'
         │
         ▼
Create Shiprocket Shipment
         │
         ├─▶ Authenticate with Shiprocket:
         │     POST /v1/external/auth/login
         │     { email, password }
         │     └─▶ Returns: { token }
         │
         ├─▶ Create Shipment:
         │     POST /v1/external/orders/create/adhoc
         │     {
         │       order_id,
         │       order_date,
         │       pickup_location: "Primary",
         │       billing_*: customer details,
         │       shipping_*: customer details,
         │       order_items: [{ name, sku, units, selling_price }],
         │       payment_method: "Prepaid",
         │       dimensions: { length, breadth, height, weight }
         │     }
         │     └─▶ Returns: { shipment_id, order_id }
         │
         ├─▶ Generate AWB:
         │     POST /v1/external/courier/assign/awb
         │     { shipment_id, courier_id }
         │     └─▶ Returns: { awb_code, courier_name }
         │
         └─▶ Schedule Pickup:
               POST /v1/external/courier/generate/pickup
               { shipment_id }
               └─▶ Returns: { pickup_scheduled: true }
```

**Files Involved:**
- `/lib/shiprocket.ts` - Shiprocket API client
- `/app/api/razorpay/webhook/route.ts` - Calls shipment creation

**Test Mode Behavior:**
```typescript
// In test mode (NEXT_PUBLIC_TEST_MODE=true):
{
  awb_code: "TEST1234567890",
  courier_name: "Test Courier",
  tracking_url: "https://shiprocket.co/tracking/TEST1234567890"
}
```

---

### **Phase 7: Update Order with Tracking**

```
After AWB Generated
         │
         ▼
Update Order in Supabase:
         │
         └─▶ UPDATE orders
               SET 
                 status = 'shipped',
                 shiprocket_awb = awb_code,
                 tracking_url = tracking_url
               WHERE id = order_id
```

**Database State:**
```sql
orders table:
  status: "shipped"
  shiprocket_awb: "TEST1234567890"
  tracking_url: "https://shiprocket.co/tracking/TEST1234567890"
```

---

### **Phase 8: Email Notifications**

```
Order Confirmation Email
         │
         ├─▶ Triggered after: status = 'paid'
         ├─▶ Sent to: customer email
         └─▶ Contains:
               - Order number
               - Items purchased
               - Total amount
               - Delivery address
               - "Track your order" link

Shipment Notification Email
         │
         ├─▶ Triggered after: status = 'shipped'
         ├─▶ Sent to: customer email
         └─▶ Contains:
               - AWB tracking number
               - Courier name
               - Tracking URL
               - Estimated delivery
```

**Files Involved:**
- `/lib/email.ts` - Email service (Resend)
- `/app/api/razorpay/webhook/route.ts` - Triggers emails

**Test Mode Behavior:**
```typescript
// Emails are logged to console instead of sent
console.log('📧 [TEST MODE] Email:', {
  to: customer.email,
  subject: 'Order Confirmation',
  template: 'order-confirmation'
})
```

---

### **Phase 9: Customer Views Order**

```
Customer Goes to /orders
         │
         ├─▶ Fetch Orders from Supabase:
         │     SELECT * FROM orders
         │     WHERE user_email = customer.email
         │     ORDER BY created_at DESC
         │
         ├─▶ Display Order Cards:
         │     - Order number
         │     - Date
         │     - Status badge
         │     - Items list
         │     - Total amount
         │     - Tracking link (if shipped)
         │
         └─▶ Click "Track Order":
               └─▶ Opens tracking page with AWB
```

**Files Involved:**
- `/app/orders/page.tsx` - Order history
- `/app/track-order/page.tsx` - Shipment tracking

---

### **Phase 10: Order Tracking**

```
Customer Clicks Tracking Link
         │
         ▼
GET /track-order?awb=TEST1234567890
         │
         ├─▶ Fetch Tracking from Shiprocket:
         │     GET /v1/external/courier/track/awb/{awb}
         │     └─▶ Returns: {
         │           current_status,
         │           shipment_track: [
         │             { date, status, activity, location }
         │           ]
         │         }
         │
         └─▶ Display Timeline:
               ├─▶ Order Placed
               ├─▶ Shipped
               ├─▶ In Transit
               ├─▶ Out for Delivery
               └─▶ Delivered
```

**Files Involved:**
- `/app/track-order/page.tsx`
- `/lib/shiprocket.ts` - `trackShipment()`

---

## 🗄️ Complete Database Schema

```sql
CREATE TABLE orders (
  -- Primary Key
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Customer Info
  user_email          VARCHAR(255) NOT NULL,
  
  -- Order Status
  status              VARCHAR(50) DEFAULT 'pending'
                      CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  
  -- Pricing (in currency units, e.g., 699 = ₹699)
  subtotal            INTEGER NOT NULL,
  shipping            INTEGER NOT NULL,
  total               INTEGER NOT NULL,
  
  -- External IDs
  razorpay_order_id   VARCHAR(255),      -- From Razorpay
  shiprocket_awb      VARCHAR(255),      -- From Shiprocket
  
  -- Tracking
  tracking_url        TEXT,
  
  -- Customer Data (JSONB)
  address_json        JSONB NOT NULL,
  -- Structure: { name, email, phone, address, city, state, pincode }
  
  -- Order Items (JSONB Array)
  items               JSONB NOT NULL,
  -- Structure: [{ id, name, price, quantity, flavour }]
  
  -- Timestamps
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_orders_user_email ON orders(user_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

---

## 🔄 Order Status Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                     ORDER STATUS FLOW                           │
└─────────────────────────────────────────────────────────────────┘

pending ──────▶ paid ──────▶ shipped ──────▶ delivered
   │              │             │                 │
   │              │             │                 ▼
   │              │             │             [COMPLETED]
   │              │             │
   │              │             └───────▶ cancelled (admin action)
   │              │
   │              └───────▶ cancelled (admin action)
   │
   └───────▶ cancelled (payment failed or timeout)


Status Definitions:
─────────────────────────────────────────────────────────────────

pending     Order created, awaiting payment
            - Created by: create-order API
            - Duration: Until payment completes (max 15 minutes)
            - Next: paid OR cancelled

paid        Payment successful, ready for shipment
            - Updated by: webhook API
            - Duration: Minutes (auto-creates shipment)
            - Next: shipped OR cancelled

shipped     Shipment created, AWB assigned
            - Updated by: webhook API (after shipment creation)
            - Duration: 2-7 days (courier delivery)
            - Next: delivered OR cancelled

delivered   Package delivered to customer
            - Updated by: webhook from Shiprocket OR admin
            - Duration: Final state
            - Next: None (order complete)

cancelled   Order cancelled (various reasons)
            - Updated by: admin OR system timeout
            - Duration: Final state
            - Next: None
```

---

## 🧪 Test Mode vs Production Mode

### **Test Mode (NEXT_PUBLIC_TEST_MODE=true)**

```
✅ Razorpay:
   - Uses test keys (rzp_test_*)
   - Test cards work (4111...)
   - No real money charged
   - Webhooks can be simulated via GET endpoint

✅ Shiprocket:
   - Mock API responses
   - Generates fake AWB numbers
   - Returns test tracking URLs
   - No actual shipments created

✅ Supabase:
   - Real database operations
   - Orders saved normally
   - Can view in Supabase dashboard

✅ Emails:
   - Logged to console
   - Not actually sent
   - Templates visible in logs

⚠️ Notes:
   - Database errors in test mode are non-critical
   - Webhook signature verification skipped
   - All external API calls mocked
```

### **Production Mode (NEXT_PUBLIC_TEST_MODE=false)**

```
🔴 Razorpay:
   - Uses live keys (rzp_live_*)
   - Real cards only
   - REAL MONEY charged
   - Webhook signature verified

🔴 Shiprocket:
   - Real API calls
   - Actual shipments created
   - Real AWB from courier
   - Pickup scheduled

🔴 Supabase:
   - Critical operations
   - Errors stop the flow
   - Data consistency required

🔴 Emails:
   - Actually sent to customers
   - Uses Resend API
   - Counts against quota

⚠️ Notes:
   - All errors are critical
   - Database failures halt process
   - Webhook security enforced
   - Money transactions are real
```

---

## 🔍 Debugging & Monitoring

### **Key Checkpoints**

1. **Order Creation**
   ```bash
   # Terminal logs to watch:
   Processing order: { items: 2, total: 699, customerInfo: 'test@example.com' }
   🎯 Creating Razorpay order via API...
   ✅ Razorpay order created: order_XXX
   💾 Saving order to database...
   ✅ Order saved to database: uuid
   ```

2. **Payment Success**
   ```bash
   # Browser console:
   🚀 === INITIALIZING RAZORPAY ===
   ✅ Razorpay object found on window
   🧪 Opening Razorpay test checkout...
   ✅ Razorpay modal opened
   🧪 Test payment successful!
   ```

3. **Webhook Processing**
   ```bash
   # Terminal logs:
   🧪 Test Mode: Simulating payment success for order: order_XXX
   💾 Updating order status to 'paid'
   📦 Creating shipment...
   🏷️ Generating AWB...
   ✅ Shipment created and order updated
   ```

4. **Database Verification**
   ```sql
   -- Run in Supabase SQL Editor:
   SELECT 
     id,
     status,
     razorpay_order_id,
     shiprocket_awb,
     created_at
   FROM orders
   ORDER BY created_at DESC
   LIMIT 5;
   ```

---

## ✅ Complete Integration Checklist

Before going live:

### **1. Environment Variables**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Set
- [ ] `RAZORPAY_KEY_ID` - Set
- [ ] `RAZORPAY_KEY_SECRET` - Set
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Set
- [ ] `SHIPROCKET_EMAIL` - Set
- [ ] `SHIPROCKET_PASSWORD` - Set
- [ ] `RESEND_API_KEY` - Set (optional)
- [ ] `NEXT_PUBLIC_TEST_MODE` - Set to `false` for production

### **2. Database Setup**
- [ ] Supabase project created
- [ ] Schema SQL executed
- [ ] Tables exist: `orders`, `products`, `combos`
- [ ] RLS policies configured
- [ ] Test order inserted successfully

### **3. Payment Gateway**
- [ ] Razorpay account created
- [ ] Test keys obtained
- [ ] Live keys obtained (for production)
- [ ] Webhook URL configured
- [ ] Test payment successful

### **4. Shipping Integration**
- [ ] Shiprocket account created
- [ ] Pickup address configured
- [ ] Test shipment created
- [ ] AWB generation works
- [ ] Tracking URL accessible

### **5. Email Service**
- [ ] Resend account created (optional)
- [ ] Domain verified (for production)
- [ ] Templates tested
- [ ] Email delivery confirmed

### **6. Testing Complete Flow**
- [ ] Add product to cart
- [ ] Complete checkout form
- [ ] Payment modal opens
- [ ] Test payment succeeds
- [ ] Order saves to database
- [ ] Webhook updates status
- [ ] Shipment created
- [ ] AWB assigned
- [ ] Email notifications sent
- [ ] Order visible in /orders
- [ ] Tracking page works

---

## 🚀 You're All Set!

When all checkboxes are ✅, your complete e-commerce flow is ready for production! 🎉

