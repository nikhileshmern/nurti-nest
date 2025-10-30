# 🧪 Test Production Flow (Without Email/WhatsApp)

## ✅ You Have Working:
- Razorpay Live
- Shiprocket Production
- Supabase Database
- TEST_MODE=false

## ⏳ Not Configured Yet:
- Email notifications (add later)
- WhatsApp messages (add later)

---

## 🚀 Quick Test Flow (10 mins)

### **Step 1: Start Development Server**

```bash
cd /Users/nikhilesh/Documents/nutri-nest
npm run dev
```

Wait for: "Ready on http://localhost:3000"

---

### **Step 2: Place Test Order**

1. **Open:** http://localhost:3000

2. **Add Product to Cart:**
   - Click any product
   - Add to cart
   - View cart

3. **Go to Checkout:**
   - Fill in your details:
     ```
     Name: Your Name
     Email: your-email@example.com
     Phone: Your phone number
     Address: Real address
     ```

4. **Place Order:**
   - Click "Place Order"
   - Razorpay payment modal opens

5. **Complete Payment:**
   Use Razorpay test card (even in live mode for testing):
   ```
   Card Number: 4111 1111 1111 1111
   CVV: 123
   Expiry: 12/25
   OTP: 123456 (if asked)
   ```

6. **Wait for Success:**
   - Payment processes
   - You'll be redirected to success page

---

### **Step 3: Verify What Works** ✅

#### **A. Check Terminal/Console (Immediately)**

In your terminal where `npm run dev` is running, look for:

```
✅ Payment successful
✅ Order saved to database
✅ Shiprocket shipment created
⚠️ Email not sent (SMTP not configured)
⚠️ WhatsApp not sent (Twilio not configured)
```

**This is NORMAL without email/WhatsApp configured!**

---

#### **B. Check Supabase Database** (30 seconds)

1. Go to: https://supabase.com
2. Open your project
3. Click **Table Editor**
4. Select **`orders`** table
5. **Look for your order:**
   - Order number matches
   - Status = `paid`
   - Amount is correct
   - Customer details present

**✅ Success if order is there!**

---

#### **C. Check Shiprocket Dashboard** (1 minute)

1. Go to: https://app.shiprocket.in
2. Login
3. Go to **Orders** or **Shipments**
4. **Look for your order:**
   - New shipment created
   - Status: "New" or "Pickup Scheduled"
   - AWB code generated
   - Customer details match

**✅ Success if shipment is created!**

---

#### **D. Check Razorpay Dashboard** (30 seconds)

1. Go to: https://dashboard.razorpay.com
2. Make sure you're in **Live Mode**
3. Go to **Transactions** → **Payments**
4. **Look for your payment:**
   - Status: Captured
   - Amount matches
   - Order ID matches

**✅ Success if payment is captured!**

---

## 🎯 Success Criteria

All 3 should work:

- ✅ **Payment captured** (Razorpay dashboard)
- ✅ **Order in database** (Supabase)
- ✅ **Shipment created** (Shiprocket)

**If all 3 work → Your core flow is PRODUCTION READY! 🎉**

---

## ⚠️ What You'll See (Expected)

### **In Terminal/Console:**

```
[Razorpay] Payment captured: pay_xxxxx
[Database] Order saved: #AB12CD34
[Shiprocket] Shipment created: 12345678
[Email] ⚠️ Warning: SMTP not configured - email not sent
[WhatsApp] ⚠️ Warning: Twilio not configured - WhatsApp not sent
```

**This is completely normal! Email/WhatsApp are optional.**

---

## 📋 What Happens Without Email?

### **Customer Experience:**
- ✅ Payment works fine
- ✅ Gets success page
- ✅ Order is processed
- ❌ No order confirmation email (yet)
- ❌ No tracking email (yet)

### **Your Experience:**
- ✅ Order appears in Shiprocket
- ✅ Order saved in database
- ❌ No email notification (yet)
- 👉 You need to check Shiprocket/database manually

**It works, but email makes it much better!**

---

## 🚨 Troubleshooting

### **Error: "Payment failed"**

**Check:**
- Using Razorpay LIVE keys (starts with `rzp_live_`)
- `NEXT_PUBLIC_TEST_MODE=false` in .env.local
- Restart app after changing .env.local

**Fix:** Verify Razorpay keys are correct

---

### **Error: "Order not saved to database"**

**Check:**
- Supabase credentials in .env.local
- Check browser console for errors

**Fix:** Verify `SUPABASE_SERVICE_ROLE_KEY` is set

---

### **Error: "Shiprocket shipment failed"**

**Check:**
- `SHIPROCKET_EMAIL` and `SHIPROCKET_PASSWORD` are correct
- `SHIPROCKET_PICKUP_LOCATION` matches EXACTLY (with spaces, caps)
- Login to Shiprocket manually to verify credentials

**Fix:** 
1. Login to https://app.shiprocket.in
2. Go to Settings → Pickup Locations
3. Copy EXACT name
4. Update .env.local
5. Restart app

---

### **"Connection refused" or "Network error"**

**Check:**
- You have internet connection
- Razorpay/Shiprocket/Supabase are accessible
- No VPN blocking connections

**Fix:** Check your network connection

---

## 💡 Quick Tips

### **1. Check Logs**

Always watch the terminal where `npm run dev` is running:
- It shows what's working
- It shows what's skipped (email, WhatsApp)
- It shows errors if any

### **2. Email is Easy to Add**

When you're ready (takes 5 mins):
```bash
# Add to .env.local:
ADMIN_EMAIL=Orders@nutrinest.in
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_godaddy_password
SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"

# Restart:
npm run dev
```

Then emails will start working automatically! ✅

### **3. WhatsApp is Optional**

You can totally skip WhatsApp for now. Add it later when needed.

---

## ✅ If Everything Works

When you verify:
- ✅ Payment captured
- ✅ Order in database
- ✅ Shipment in Shiprocket

**You're ready to deploy to production!** 🚀

---

## 🌐 Next Step: Deploy

Once local testing works:

```bash
# Deploy to Vercel
vercel --prod

# Then configure Razorpay webhook:
# https://dashboard.razorpay.com → Settings → Webhooks
# URL: https://your-domain.com/api/razorpay/webhook
```

---

## 📧 Add Email Later

When you want to add email:

1. Get GoDaddy email password
2. Add SMTP settings to .env.local
3. Redeploy (or restart locally)
4. Test again

**That's it!** Email starts working immediately.

---

## 📊 Summary

### **Working Now:**
- ✅ Payments (Razorpay)
- ✅ Database (Supabase)
- ✅ Shipping (Shiprocket)

### **Add Later (5 mins each):**
- 📧 Email notifications
- 📱 WhatsApp messages

**Your core business flow works! 🎉**

---

## 🎯 Start Testing Now

```bash
cd /Users/nikhilesh/Documents/nutri-nest
npm run dev

# Then place an order at localhost:3000
# Check the 3 places: Razorpay, Supabase, Shiprocket
```

**Good luck! 🚀**

