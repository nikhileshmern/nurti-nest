# 🚀 Complete Production Setup Guide

## 🎯 Goal
Get your Nutri Nest e-commerce site production-ready and test the complete order flow.

**Time Required: 30-40 minutes**

---

## 📦 PHASE 1: Install Required Packages (3 mins)

### **Step 1: Fix npm permissions (if needed)**

If you get permission errors, run this in Terminal:

```bash
# Fix npm cache permissions
sudo chown -R $(whoami) ~/.npm

# Clear npm cache (alternative)
npm cache clean --force
```

### **Step 2: Install packages**

```bash
cd /Users/nikhilesh/Documents/nutri-nest

# Install email package
npm install nodemailer @types/nodemailer

# Install WhatsApp package (optional but recommended)
npm install twilio
```

**Expected output:** `added X packages` ✅

---

## 🔑 PHASE 2: Gather All Credentials (15 mins)

You need credentials from 4 services. Let's get them all!

---

### **1️⃣ Razorpay Live Keys** (5 mins)

#### **Steps:**
1. Go to: https://dashboard.razorpay.com
2. **Switch to "Live Mode"** (toggle in top right)
3. Go to **Settings** → **API Keys**
4. Click **"Generate Live Keys"** (if not already generated)
5. Copy both keys

#### **Save These:**
```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_key_here
```

#### **Also Get Webhook Secret:**
1. Still in Settings → **Webhooks**
2. If no webhook exists, we'll create it later
3. If webhook exists, copy the **Secret**

```bash
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

---

### **2️⃣ Shiprocket Production** (5 mins)

#### **Steps:**
1. Go to: https://app.shiprocket.in
2. Login with your account
3. Go to **Settings** → **Pickup Locations**
4. Copy the **EXACT name** of your warehouse (case-sensitive!)

#### **Example:**
If it shows: `Nutri Nest Warehouse - Mumbai`
You need to copy EXACTLY that (with spaces, dashes, caps)

#### **Save These:**
```bash
SHIPROCKET_EMAIL=your-shiprocket-email@example.com
SHIPROCKET_PASSWORD=your_shiprocket_password
SHIPROCKET_PICKUP_LOCATION="Nutri Nest Warehouse - Mumbai"
```

**Note:** The pickup location name MUST match EXACTLY!

---

### **3️⃣ Email (GoDaddy SMTP)** (3 mins)

You already have the email: `Orders@nutrinest.in`

#### **Steps:**
1. Go to: https://account.godaddy.com
2. Click **"Email & Office"**
3. Check if you have:
   - **Workspace Email** → Use Config A
   - **cPanel/Web Hosting** → Use Config B

#### **Get Password:**
- If you know the password → Great!
- If not → Reset it:
  1. Find Orders@nutrinest.in in email list
  2. Click "Manage" → "Reset Password"
  3. Set new password and SAVE IT

#### **Configuration A: GoDaddy Workspace**
```bash
ADMIN_EMAIL=Orders@nutrinest.in
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_email_password
SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"
```

#### **Configuration B: GoDaddy cPanel**
```bash
ADMIN_EMAIL=Orders@nutrinest.in
SMTP_HOST=mail.nutrinest.in
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_email_password
SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"
```

---

### **4️⃣ WhatsApp (Twilio)** - OPTIONAL (5 mins)

**Note:** This is optional but highly recommended for customer engagement!

#### **Steps:**
1. Go to: https://www.twilio.com/try-twilio
2. Sign up (FREE $15 credit)
3. Verify your phone number
4. Go to **Console Dashboard**
5. Copy **Account SID** and **Auth Token**
6. Go to **Messaging** → **Try WhatsApp**
7. Follow instructions to join sandbox from your phone
8. Copy the **WhatsApp sandbox number**

#### **Save These:**
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
```

**Skip for now?** That's fine! You can add WhatsApp later.

---

## ⚙️ PHASE 3: Configure `.env.local` (5 mins)

### **Step 1: Open `.env.local`**

```bash
cd /Users/nikhilesh/Documents/nutri-nest
nano .env.local
# Or open in your code editor
```

### **Step 2: Update ALL Settings**

Copy this template and fill in YOUR actual values:

```bash
# ==========================================
# PRODUCTION CONFIGURATION
# ==========================================

# Supabase (Already configured - keep as is)
NEXT_PUBLIC_SUPABASE_URL=your_existing_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_existing_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_existing_service_key

# ==========================================
# Razorpay LIVE MODE (UPDATE THESE!)
# ==========================================
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# ==========================================
# Shiprocket Production (UPDATE THESE!)
# ==========================================
SHIPROCKET_EMAIL=your-shiprocket-email@example.com
SHIPROCKET_PASSWORD=your_shiprocket_password
SHIPROCKET_BASE_URL=https://apiv2.shiprocket.in
SHIPROCKET_PICKUP_LOCATION="Exact Warehouse Name From Shiprocket"

# ==========================================
# Email Configuration (UPDATE THESE!)
# ==========================================
ADMIN_EMAIL=Orders@nutrinest.in

# GoDaddy SMTP (Use the one that matches your setup)
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_godaddy_email_password
SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"

# ==========================================
# WhatsApp (Optional - Add if you set it up)
# ==========================================
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886

# ==========================================
# App Configuration
# ==========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ==========================================
# CRITICAL: DISABLE TEST MODE!
# ==========================================
NEXT_PUBLIC_TEST_MODE=false
TEST_MODE=false
```

### **Step 3: Save the file**

Press `Ctrl+X`, then `Y`, then `Enter` (if using nano)
Or just save (if using code editor)

---

## 🧪 PHASE 4: Test Locally (10 mins)

### **Step 1: Build the Project**

```bash
cd /Users/nikhilesh/Documents/nutri-nest
npm run build
```

**Expected:** Should compile without errors ✅

**If errors:** Check that all packages are installed

---

### **Step 2: Start Development Server**

```bash
npm run dev
```

**Expected:** Server starts on http://localhost:3000 ✅

---

### **Step 3: Place Test Order** (Complete Flow Test)

#### **A. Open the site**
```
http://localhost:3000
```

#### **B. Add product to cart**
- Click on any product
- Add to cart
- View cart

#### **C. Proceed to checkout**
- Fill in your details:
  - Name: Your name
  - Email: Your personal email
  - Phone: Your WhatsApp number
  - Address: Real address

#### **D. Complete payment**
- Click "Place Order"
- Razorpay modal opens
- **Use Razorpay test card:**
  ```
  Card Number: 4111 1111 1111 1111
  CVV: 123
  Expiry: 12/25
  ```
- Click Pay
- Wait for success

---

### **Step 4: Verify Everything Works** (Within 1 minute!)

Check these **5 things** happen automatically:

#### **✅ 1. Customer Email**
- Check YOUR email (the one you used at checkout)
- Subject: "Order Confirmation - Nutri Nest"
- Contains: Order details, items, amount

#### **✅ 2. Admin Email**
- Check Orders@nutrinest.in
- Subject: "New Order Received - #XXXXXX"
- Contains: Full order details, customer info

#### **✅ 3. WhatsApp Message** (if configured)
- Check your WhatsApp
- Message from Twilio number
- Contains: Order confirmation with details

#### **✅ 4. Database Entry**
- Go to: https://supabase.com
- Open your project
- Table Editor → `orders` table
- See your new order with status: `paid`

#### **✅ 5. Shiprocket Shipment**
- Go to: https://app.shiprocket.in
- Dashboard → Orders
- See your new shipment
- Status: "New" or "Pickup Scheduled"
- AWB code generated

---

## 🎯 SUCCESS CRITERIA

All 5 should work! If any fail, see troubleshooting below.

---

## 🚨 TROUBLESHOOTING

### **❌ Payment fails**

**Problem:** Razorpay keys incorrect

**Fix:**
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` starts with `rzp_live_`
- Check you're using LIVE keys, not test keys
- Restart app after changing `.env.local`

---

### **❌ No customer email received**

**Problem:** SMTP settings incorrect

**Fix:**
- Check spam folder first
- Verify `SMTP_PASSWORD` is correct
- Try alternative port:
  ```bash
  SMTP_PORT=587
  SMTP_SECURE=false
  ```
- Check app logs for error messages

---

### **❌ No admin email received**

**Problem:** Same as customer email

**Fix:**
- Check Orders@nutrinest.in inbox and spam
- Verify `ADMIN_EMAIL=Orders@nutrinest.in` is set
- Check both customer and admin use same SMTP settings

---

### **❌ No WhatsApp message**

**Problem:** Twilio config or not in sandbox

**Fix:**
- Check you joined Twilio WhatsApp sandbox
- Verify `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`
- Check Twilio console for delivery status
- **Skip for now if needed** - WhatsApp is optional!

---

### **❌ Order not in database**

**Problem:** Supabase connection or RLS policy

**Fix:**
- Check `SUPABASE_SERVICE_ROLE_KEY` is set
- Verify Supabase URL is correct
- Check browser console for errors
- Check app server logs

---

### **❌ No Shiprocket shipment**

**Problem:** Credentials or pickup location incorrect

**Fix:**
- Verify `SHIPROCKET_EMAIL` and `SHIPROCKET_PASSWORD`
- Check `SHIPROCKET_PICKUP_LOCATION` matches EXACTLY
- Login to Shiprocket manually to verify credentials
- Check pickup location exists in Settings

---

### **❌ "Test mode" still active**

**Problem:** Forgot to disable test mode

**Fix:**
```bash
# In .env.local:
NEXT_PUBLIC_TEST_MODE=false
TEST_MODE=false

# Then restart:
npm run dev
```

---

## ✅ PHASE 5: Final Checklist

Before going live, verify:

- [ ] All 5 components work in local test ✅
- [ ] Customer receives email within 30 seconds
- [ ] Admin receives email within 30 seconds
- [ ] WhatsApp works (or skipped for now)
- [ ] Order appears in database
- [ ] Shipment created in Shiprocket
- [ ] No errors in console/terminal
- [ ] `TEST_MODE=false` is set
- [ ] All real credentials are in `.env.local`

---

## 🌐 PHASE 6: Deploy to Production (5 mins)

### **Option A: Deploy to Vercel (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd /Users/nikhilesh/Documents/nutri-nest
vercel --prod
```

**During deployment:**
- Vercel will ask for environment variables
- Add ALL the variables from your `.env.local`
- Or add them later in Vercel dashboard

---

### **Option B: Use Vercel Dashboard**

1. Go to: https://vercel.com
2. Click "New Project"
3. Import your Git repository
4. Add environment variables (from `.env.local`)
5. Click "Deploy"

---

### **Configure Razorpay Webhook** (CRITICAL!)

After deployment:

1. Get your production URL (e.g., https://nutrinest.vercel.app)
2. Go to Razorpay Dashboard → Settings → Webhooks
3. Click "Create Webhook"
4. URL: `https://your-domain.com/api/razorpay/webhook`
5. Select events:
   - ✅ payment.captured
   - ✅ payment.failed
6. Enter webhook secret (same as in `.env.local`)
7. Set Active = ON
8. Save

---

## 🎉 YOU'RE LIVE!

### **Post-Launch Monitoring**

For the first 5-10 orders:

1. ✅ Monitor all notifications arrive
2. ✅ Check orders in database
3. ✅ Verify shipments in Shiprocket
4. ✅ Track customer feedback
5. ✅ Monitor for any errors

---

## 📊 Quick Reference Card

| Service | Dashboard URL | What to Monitor |
|---------|---------------|-----------------|
| **Razorpay** | dashboard.razorpay.com | Payments, webhooks |
| **Shiprocket** | app.shiprocket.in | Shipments, pickups |
| **Supabase** | supabase.com | Orders table |
| **GoDaddy** | account.godaddy.com | Email delivery |
| **Twilio** | console.twilio.com | WhatsApp delivery |
| **Vercel** | vercel.com | Deployment, logs |

---

## 💰 Expected Costs

For 100 orders/month:

| Service | Cost |
|---------|------|
| Razorpay | ~2% per transaction |
| Shiprocket | ₹30-80 per shipment |
| GoDaddy Email | Already paid (domain hosting) |
| Twilio WhatsApp | ₹80-160/month |
| Supabase | FREE (on free tier) |
| Vercel | FREE (on hobby tier) |

**Total Fixed Costs: ~₹80-160/month** (just WhatsApp)

---

## 📞 Support Contacts

**Razorpay:** https://razorpay.com/support
**Shiprocket:** https://support.shiprocket.in
**GoDaddy:** 480-505-8877
**Twilio:** https://support.twilio.com
**Supabase:** https://supabase.com/support

---

## 🎯 Summary

### **What You Need to Do:**

1. **Install packages** (3 mins)
   ```bash
   npm install nodemailer @types/nodemailer twilio
   ```

2. **Gather credentials** (15 mins)
   - Razorpay live keys
   - Shiprocket email, password, pickup location
   - GoDaddy email password
   - Twilio WhatsApp (optional)

3. **Configure `.env.local`** (5 mins)
   - Add all credentials
   - Set `TEST_MODE=false`

4. **Test locally** (10 mins)
   - Build: `npm run build`
   - Run: `npm run dev`
   - Place test order
   - Verify all 5 components work

5. **Deploy** (5 mins)
   - Deploy to Vercel
   - Configure webhook
   - Test with real order

**Total Time: 40 minutes to production! 🚀**

---

## ✅ Ready to Start?

Follow the phases in order. If you get stuck, check the troubleshooting section or the detailed guides:

- `GODADDY_SMTP_CONFIG.md` - GoDaddy email setup
- `WHATSAPP_SETUP_GUIDE.md` - Twilio WhatsApp setup
- `FINAL_PRODUCTION_CHECKLIST.md` - Final checks before launch

**You've got this! Let's go live! 🎉**

