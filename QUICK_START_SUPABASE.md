# 🚀 Quick Start: Supabase Integration

## ⚡ TL;DR - What You Need to Do

Your payment flow works, but orders aren't being saved to the database. Here's how to fix it:

### **5-Minute Setup**

1. **Create Supabase Project**
   - Go to: https://supabase.com
   - Click "New Project"
   - Wait 2 minutes for it to initialize

2. **Get Your Credentials**
   - Go to: Project Settings → API
   - Copy:
     - Project URL
     - anon public key
     - service_role key

3. **Update `.env.local`**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Run Database Schema**
   - Supabase Dashboard → SQL Editor
   - New Query
   - Copy/paste `supabase-schema.sql`
   - Click Run

5. **Verify Setup**
   ```bash
   node verify-supabase.js
   ```

6. **Restart Dev Server**
   ```bash
   npm run dev
   ```

7. **Test It**
   - Go to checkout
   - Make a test order
   - Check Supabase → Table Editor → orders
   - You should see your order! 🎉

---

## ✅ What This Fixes

### **Before (Broken):**
```
Customer pays → Order created in Razorpay → ❌ Not saved to database
                                            → Webhook fails (can't find order)
                                            → No tracking info
                                            → Customer can't view order history
```

### **After (Working):**
```
Customer pays → Order created in Razorpay → ✅ Saved to Supabase (status: pending)
                                            → Payment success
                                            → ✅ Updated in database (status: paid)
                                            → ✅ Shipment created
                                            → ✅ AWB saved to database
                                            → ✅ Customer can view in /orders
                                            → ✅ Customer can track shipment
```

---

## 📊 What Gets Stored

Every order saves this to Supabase:

```typescript
{
  id: "uuid",                           // Auto-generated
  user_email: "customer@example.com",   // From form
  status: "pending",                     // Then "paid" → "shipped"
  subtotal: 699,                         // In rupees
  shipping: 50,                          // In rupees
  total: 749,                            // In rupees
  razorpay_order_id: "order_XXX",       // From Razorpay
  shiprocket_awb: "TEST1234567890",     // From Shiprocket (after shipment)
  tracking_url: "https://...",           // Tracking link
  address_json: {                        // Customer address
    name, email, phone, address, 
    city, state, pincode
  },
  items: [                               // Order items
    { id, name, price, quantity, flavour }
  ],
  created_at: "2025-10-29T...",         // Auto-generated
  updated_at: "2025-10-29T..."          // Auto-updated
}
```

---

## 🔄 Order Lifecycle

```
1. Customer submits checkout
   └─▶ CREATE order in Razorpay
       └─▶ INSERT into Supabase (status: "pending")

2. Customer completes payment
   └─▶ Razorpay webhook triggered
       └─▶ UPDATE Supabase (status: "paid")

3. Webhook creates shipment
   └─▶ Call Shiprocket API
       └─▶ UPDATE Supabase (status: "shipped", awb: "XXX", tracking_url: "...")

4. Customer views order
   └─▶ SELECT from Supabase WHERE user_email = "..."
       └─▶ Display order history with tracking link
```

---

## 🧪 Testing in Test Mode

Your app is currently in **test mode** (`NEXT_PUBLIC_TEST_MODE=true`):

✅ **Razorpay:** Test cards work, no real money
✅ **Shiprocket:** Mock shipments, fake AWB numbers
✅ **Supabase:** Real database, orders actually saved
✅ **Emails:** Logged to console, not sent

This means:
- Database works normally
- Orders are actually saved
- You can see them in Supabase dashboard
- Everything else is simulated

---

## 🔍 How to Verify It's Working

### **Check 1: Terminal Logs (After Checkout)**
```bash
Processing order: { items: 2, total: 699 }
🎯 Creating Razorpay order via API...
✅ Razorpay order created: order_XXX
💾 Saving order to database...
✅ Order saved to database: uuid  ← YOU SHOULD SEE THIS
```

### **Check 2: Supabase Dashboard**
1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Select "orders" table
4. You should see your order with:
   - ✅ user_email filled
   - ✅ status: "pending"
   - ✅ razorpay_order_id filled
   - ✅ address_json has customer details
   - ✅ items array has products

### **Check 3: Trigger Webhook**
Visit in browser:
```
http://localhost:3000/api/razorpay/webhook?order_id=order_XXX
```

Then check Supabase again:
- ✅ status changed to "shipped"
- ✅ shiprocket_awb filled
- ✅ tracking_url filled

### **Check 4: View Orders Page**
1. Go to `/orders` (must be logged in)
2. You should see your order
3. Click tracking link
4. Tracking page should work

---

## 🚨 Common Issues

### **Issue: "Failed to save order to database"**

**Symptoms:**
```bash
❌ Database save failed: { code: 'PGRST116' }
⚠️ Test Mode: Database save failed but continuing anyway
```

**Cause:** Tables don't exist OR credentials wrong

**Fix:**
1. Run `node verify-supabase.js`
2. Follow its instructions
3. Make sure `.env.local` has correct values
4. Restart dev server

### **Issue: Orders not showing in `/orders` page**

**Cause:** Not logged in OR user email doesn't match

**Fix:**
1. Make sure you're logged in
2. Use same email in checkout that you logged in with
3. Check browser console for errors

### **Issue: Webhook fails with "Order not found"**

**Cause:** Order wasn't saved to database

**Fix:**
1. Check if order creation logs show "✅ Order saved to database"
2. If not, check Supabase credentials
3. Verify tables exist
4. Try creating order again

---

## 📁 Files Changed

### **Modified:**
- `/app/api/razorpay/create-order/route.ts` - Now saves to Supabase

### **Already Working (No Changes):**
- `/app/api/razorpay/webhook/route.ts` - Updates order status
- `/lib/supabase.ts` - Database client
- `/app/orders/page.tsx` - Displays orders
- `supabase-schema.sql` - Database schema

---

## 📚 Documentation

### **Quick Reference:**
- This file - Quick setup guide

### **Detailed Guides:**
- `SUPABASE_COMPLETE_SETUP.md` - Full setup with screenshots
- `SUPABASE_INTEGRATION_SUMMARY.md` - Complete summary of changes
- `COMPLETE_ORDER_FLOW.md` - Detailed flow diagrams

### **Schema:**
- `supabase-schema.sql` - Database schema to run in Supabase

### **Verification:**
- `verify-supabase.js` - Script to verify setup

---

## 🎯 Success Criteria

You know it's working when:

- [ ] `node verify-supabase.js` shows ✅ for everything
- [ ] Terminal logs show "✅ Order saved to database"
- [ ] Supabase dashboard shows your order
- [ ] Webhook updates order status
- [ ] `/orders` page shows your orders
- [ ] Tracking link works

---

## 💡 Pro Tips

1. **Keep Supabase Dashboard Open**
   - Watch orders appear in real-time
   - See status changes as they happen
   - Debug issues faster

2. **Use Table Editor**
   - Quickly view all orders
   - Check field values
   - Manually test updates

3. **Check Updated_at Timestamp**
   - Shows when order was last modified
   - Useful for debugging webhook delays

4. **Use SQL Editor for Queries**
   ```sql
   -- See all orders
   SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
   
   -- See orders by status
   SELECT * FROM orders WHERE status = 'pending';
   
   -- See orders with shipments
   SELECT * FROM orders WHERE shiprocket_awb IS NOT NULL;
   ```

---

## 🎉 You're Ready!

Once setup is complete:

1. **Test the complete flow:**
   - Add to cart → Checkout → Pay → Check database

2. **See it in action:**
   - Order appears in Supabase
   - Status updates automatically
   - Tracking info saved
   - Customer can view history

3. **Move to production:**
   - Set `NEXT_PUBLIC_TEST_MODE=false`
   - Use live Razorpay keys
   - Configure real Shiprocket account
   - Test with real orders

**Your complete e-commerce backend is now operational! 🚀**

