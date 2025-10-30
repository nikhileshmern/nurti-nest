# 🧪 ₹1 Test Product - Production Testing Guide

## 🎯 Purpose

Test your complete production order flow with **real integrations** for only ₹1!

This allows you to test:
- ✅ Real Razorpay payment (₹1 charge)
- ✅ Real Supabase database entry
- ✅ Real Shiprocket shipment creation
- ✅ Real email notifications (if configured)
- ✅ Real WhatsApp messages (if configured)

---

## 📦 What You're Adding

**Product Details:**
- **Name:** 🧪 Test Product - ₹1
- **Price:** ₹1.00 (100 paise)
- **Slug:** test-product-rs1
- **Stock:** 999 units
- **Purpose:** Testing only

---

## ⚡ Quick Setup (2 Minutes)

### **Step 1: Add Test Product to Database**

1. **Go to:** https://supabase.com/dashboard
2. **Select** your project
3. **Click:** SQL Editor (left sidebar)
4. **Click:** "New Query"
5. **Copy** the contents of `add-test-product.sql`
6. **Paste** into SQL Editor
7. **Click:** Run (or press Cmd/Ctrl + Enter)

**Expected Output:**
```
Success. 1 rows affected.

id                                  name                    slug                price  stock
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  🧪 Test Product - ₹1  test-product-rs1    100    999
```

✅ **Done!** Test product is now live!

---

### **Step 2: View the Product**

1. **Restart your server** (if running):
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Go to:** http://localhost:3000/products

3. **You should see:** "🧪 Test Product - ₹1" in the product list

---

## 🧪 Testing the Complete Flow

### **Test Scenario: Complete Order Journey**

1. **Add to Cart:**
   - Go to: http://localhost:3000/products
   - Click on "🧪 Test Product - ₹1"
   - Click "Add to Cart"

2. **Go to Checkout:**
   - Click cart icon
   - Click "Proceed to Checkout"

3. **Fill Details:**
   - Enter your real details (you'll get notifications)
   - Use your real phone number (for WhatsApp if configured)
   - Use your real email (for email notifications)
   - Enter valid address and pincode

4. **Place Order:**
   - Click "Place Order"
   - Razorpay modal opens

5. **Complete Payment:**
   - **Production Payment:** ₹1 will be charged to your card
   - Use test card for testing:
     ```
     Card: 4111 1111 1111 1111
     CVV: 123
     Expiry: 12/25
     ```
   - Or use your real card (only ₹1 will be charged)

6. **Verify Everything:**

   **Within 1 minute, check:**
   
   a. **Razorpay Dashboard** (https://dashboard.razorpay.com)
      - Payment status: Captured
      - Amount: ₹1.00
      - ✅ Success!

   b. **Supabase Database** (https://supabase.com)
      - Table Editor → orders
      - New order with status: "paid"
      - Amount: 100 (paise)
      - ✅ Success!

   c. **Shiprocket Dashboard** (https://app.shiprocket.in)
      - New shipment created
      - AWB code generated
      - Status: "New" or "Pickup Scheduled"
      - ✅ Success!

   d. **Your Email Inbox**
      - Order confirmation email
      - Admin notification email (if configured)
      - ✅ Success!

   e. **Your WhatsApp**
      - Order confirmation message (if configured)
      - ✅ Success!

---

## ✅ Success Criteria

All 5 should work:

- ✅ **Payment captured** in Razorpay (₹1)
- ✅ **Order saved** in Supabase
- ✅ **Shipment created** in Shiprocket
- ✅ **Email received** (if SMTP configured)
- ✅ **WhatsApp received** (if Twilio configured)

**If all 5 work → Your production setup is PERFECT! 🎉**

---

## 💰 Cost Analysis

### **Per Test:**
- Razorpay fee: ~₹0.02 (2% of ₹1)
- Shiprocket: Free (shipment created but you can cancel)
- Email: Free (SMTP)
- WhatsApp: ~₹0.80-1.60 per message
- **Total: ~₹2-3 per test**

### **Recommendation:**
Test 2-3 times to verify everything works consistently.

**Total testing cost: ₹6-9** ✅ Very affordable!

---

## 🧹 After Testing (Cleanup)

### **Option A: Delete Test Product (Recommended)**

Once you've confirmed everything works:

1. **Go to:** Supabase SQL Editor
2. **Copy** contents of `remove-test-product.sql`
3. **Paste** and **Run**
4. **Verify:** Test product is removed

```sql
DELETE FROM products WHERE slug = 'test-product-rs1';
```

---

### **Option B: Update Stock to 0 (Hide It)**

If you want to keep it for future testing:

```sql
UPDATE products 
SET stock = 0 
WHERE slug = 'test-product-rs1';
```

This hides it from the store (out of stock) but keeps it in database.

---

### **Option C: Keep It (Not Recommended)**

You can keep it, but:
- ⚠️ Customers might accidentally buy it
- ⚠️ Looks unprofessional
- ⚠️ Confuses real product catalog

**Best practice: Delete after testing!**

---

## 🎯 Testing Checklist

Before going live, test these scenarios:

### **Scenario 1: Basic Order Flow**
- [ ] Add ₹1 product to cart
- [ ] Complete checkout
- [ ] Payment succeeds
- [ ] Order in database
- [ ] Shipment created
- [ ] Notifications received

### **Scenario 2: With Coupon**
- [ ] Apply "WELCOME50" coupon
- [ ] Final price adjusts correctly
- [ ] Order reflects discounted price

### **Scenario 3: Logged-in User**
- [ ] Login to account
- [ ] Form pre-fills user details
- [ ] Order linked to user account
- [ ] Order visible in profile

### **Scenario 4: Guest Checkout**
- [ ] Logout
- [ ] Complete order as guest
- [ ] Everything still works

### **Scenario 5: Cancel & Refund** (Optional)
- [ ] Login to Razorpay
- [ ] Refund the ₹1 payment
- [ ] Money returned to account

---

## 🚨 Troubleshooting

### **Product Not Showing?**

**Check:**
1. SQL ran successfully in Supabase
2. Server restarted after adding product
3. Browser cache cleared (Cmd+Shift+R)
4. Product stock is not 0

**Fix:**
```bash
# Restart server
npm run dev

# Hard refresh browser
Cmd + Shift + R
```

---

### **Payment Fails?**

**Check:**
1. `TEST_MODE=false` in .env.local
2. Using Razorpay LIVE keys
3. Razorpay account active
4. Amount is at least ₹1 (100 paise)

---

### **Shipment Not Created?**

**Check:**
1. Shiprocket credentials correct
2. Pickup location name exact match
3. Valid pincode entered
4. Shiprocket account active

**Debug:**
Check terminal logs for error messages

---

### **No Notifications?**

**Email:**
- SMTP not configured (add later)
- Check spam folder
- Verify SMTP credentials

**WhatsApp:**
- Twilio not configured (optional)
- Not in sandbox (for production)

**Note:** Order flow works even without notifications!

---

## 💡 Pro Tips

### **Tip 1: Test Multiple Scenarios**
Don't just test once! Try:
- Different addresses
- Different payment methods
- With and without coupons
- Logged in vs guest
- Different browsers

### **Tip 2: Monitor First Real Orders**
After going live:
- Check first 5-10 orders closely
- Verify all integrations work
- Monitor for any errors
- Be ready to support customers

### **Tip 3: Keep Test Cards Handy**
For future testing:
```
Success: 4111 1111 1111 1111
Failure: 4000 0000 0000 0002
```

### **Tip 4: Document Issues**
If anything fails:
- Screenshot the error
- Check browser console (F12)
- Check terminal logs
- Note the exact step that failed

---

## 📊 What Gets Created Per Test

**In Razorpay:**
- 1 order
- 1 payment
- ₹1 charge

**In Supabase:**
- 1 order record
- Full order details
- Customer information

**In Shiprocket:**
- 1 shipment
- 1 AWB code
- Pickup scheduled

**Notifications:**
- 2 emails (customer + admin)
- 1 WhatsApp message

**You can cancel/refund everything after testing!**

---

## 🎉 After Successful Test

### **You've Verified:**
- ✅ Payment integration works
- ✅ Database saves correctly
- ✅ Shipping integration works
- ✅ Notification system works
- ✅ Complete flow is seamless

### **You're Ready To:**
- ✅ Delete test product
- ✅ Deploy to production
- ✅ Accept real orders
- ✅ Go live! 🚀

---

## 📚 Files Created

1. **`add-test-product.sql`**
   - Adds ₹1 test product to database
   - Run in Supabase SQL Editor

2. **`remove-test-product.sql`**
   - Removes test product after testing
   - Run in Supabase SQL Editor

3. **`TEST_PRODUCT_GUIDE.md`** (this file)
   - Complete testing guide

---

## ✅ Quick Commands

### **Add Test Product:**
```sql
-- Copy from: add-test-product.sql
-- Paste in: Supabase SQL Editor
```

### **Remove Test Product:**
```sql
-- Copy from: remove-test-product.sql
-- Paste in: Supabase SQL Editor
```

### **Restart Server:**
```bash
npm run dev
```

### **View Products:**
```
http://localhost:3000/products
```

---

## 🎯 Summary

**Setup Time:** 2 minutes
**Test Time:** 5 minutes per test
**Cost:** ₹2-3 per test
**Value:** Priceless! 💯

**Test your complete production setup safely and affordably!**

---

## 🚀 Ready to Test?

1. ✅ Add test product (SQL above)
2. ✅ Restart server
3. ✅ Go to /products
4. ✅ Complete order flow
5. ✅ Verify all 5 integrations
6. ✅ Delete test product
7. ✅ Go live! 🎉

**Good luck with testing! 🧪**

