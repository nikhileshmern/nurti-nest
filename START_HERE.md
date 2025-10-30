# 🎯 START HERE - Production Setup Checklist

Follow these steps in order. Check off each one as you complete it!

---

## 📦 STEP 1: Install Packages (3 mins)

Open Terminal and run:

```bash
# If you get permission errors, run this first:
sudo chown -R $(whoami) ~/.npm
# Enter your Mac password when prompted

# Then install packages:
cd /Users/nikhilesh/Documents/nutri-nest
npm install nodemailer @types/nodemailer twilio
```

**✅ Success when you see:** "added X packages"

---

## 🔑 STEP 2: Gather Credentials (15 mins)

### **A. Razorpay Live Keys**

⚠️ **IMPORTANT:** Test keys (`rzp_test_xxx`) will show "Test Mode" badge in payment!

1. Go to: https://dashboard.razorpay.com
2. Switch to **"Live Mode"** (top right toggle)
3. Settings → API Keys → Generate Live Keys
4. Copy both keys:
   ```
   Key ID: rzp_live_xxxxx  ← Must start with "rzp_live_"
   Secret: xxxxx
   ```

**Why this matters:**
- `rzp_test_xxx` → Shows "Test Mode" badge ❌
- `rzp_live_xxx` → No badge, production ready ✅

**✅ I have my Razorpay LIVE keys (not test!)**

---

### **B. Shiprocket Details**

1. Go to: https://app.shiprocket.in
2. Settings → Pickup Locations
3. Copy EXACT warehouse name (with spaces, caps, etc.)
4. Note your login email and password

**Example:** `Nutri Nest Warehouse - Mumbai`

**✅ I have my Shiprocket email, password, and pickup location name**

---

### **C. GoDaddy Email Password**

1. Go to: https://account.godaddy.com
2. Email & Office
3. Find Orders@nutrinest.in
4. Reset password if you don't know it
5. Save the password!

**✅ I have the password for Orders@nutrinest.in**

---

### **D. Twilio WhatsApp (Optional - Can Skip)**

1. Go to: https://www.twilio.com/try-twilio
2. Sign up (free)
3. Copy Account SID and Auth Token
4. Join WhatsApp sandbox from your phone

**✅ I have Twilio credentials (or skipping for now)**

---

## ⚙️ STEP 3: Configure .env.local (5 mins)

Open `/Users/nikhilesh/Documents/nutri-nest/.env.local` in your code editor.

**Replace/Update these values:**

```bash
# Razorpay LIVE (CHANGE FROM TEST!)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_live_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Shiprocket
SHIPROCKET_EMAIL=your-email@example.com
SHIPROCKET_PASSWORD=your_password
SHIPROCKET_PICKUP_LOCATION="Exact Warehouse Name"

# GoDaddy Email (Choose based on your type)
ADMIN_EMAIL=Orders@nutrinest.in
SMTP_HOST=smtpout.secureserver.net    # For Workspace Email
# SMTP_HOST=mail.nutrinest.in          # For cPanel (use this if above doesn't work)
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_godaddy_password
SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"

# WhatsApp (Optional)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886

# CRITICAL: Turn off test mode!
NEXT_PUBLIC_TEST_MODE=false
TEST_MODE=false
```

**✅ I updated .env.local with all my credentials**

---

## 🧪 STEP 4: Test Locally (10 mins)

### **A. Build & Start**

```bash
cd /Users/nikhilesh/Documents/nutri-nest
npm run build
npm run dev
```

**✅ Build successful, server running on localhost:3000**

---

### **B. Place Test Order**

1. Open: http://localhost:3000
2. Add product to cart
3. Go to checkout
4. Fill YOUR details (email, phone)
5. Place order
6. Pay with test card:
   ```
   Card: 4111 1111 1111 1111
   CVV: 123
   Expiry: 12/25
   ```

**✅ Payment successful**

---

### **C. Verify (Within 1 minute!)**

Check these 5 things:

1. **Your Email**
   - Check inbox for order confirmation
   - **✅ Email received**

2. **Admin Email (Orders@nutrinest.in)**
   - Check inbox for admin notification
   - **✅ Admin email received**

3. **WhatsApp (if configured)**
   - Check your phone
   - **✅ WhatsApp received** (or ⏭️ skipped)

4. **Supabase Database**
   - Go to supabase.com
   - Check orders table
   - **✅ Order in database**

5. **Shiprocket Dashboard**
   - Go to app.shiprocket.in
   - Check for new shipment
   - **✅ Shipment created**

---

## 🎉 SUCCESS!

### **If all 5 work:**
✅ Your system is production-ready!
✅ Ready to deploy!

### **If something doesn't work:**
Check the troubleshooting section in `PRODUCTION_SETUP_COMPLETE.md`

---

## 🔐 STEP 5: Configure Forgot Password (5 mins)

**NEW FEATURE ADDED!** ✨

### **Quick Setup:**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Authentication → Settings
4. Set **Site URL**: `http://localhost:3000` (for testing)
5. Add **Redirect URLs**:
   ```
   http://localhost:3000/reset-password
   https://mynutrinest.in/reset-password
   ```
6. Save

**✅ Forgot password is now working!**

**Read:** `FORGOT_PASSWORD_QUICK_SETUP.md` for details

---

## 🚀 STEP 6: Deploy (5 mins)

### **Quick Deploy with Vercel:**

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
- Copy ALL variables from `.env.local`
- Paste into Vercel environment variables
- Deploy!

---

## 🔗 STEP 7: Configure Razorpay Webhook

**CRITICAL - Don't skip!**

1. Get your production URL (from Vercel)
2. Go to: https://dashboard.razorpay.com
3. Settings → Webhooks
4. Create webhook:
   - URL: `https://your-domain.com/api/razorpay/webhook`
   - Events: payment.captured, payment.failed
   - Secret: (same as in .env.local)
5. Set Active = ON

**✅ Webhook configured**

---

## 🎯 STEP 8: Test Production

1. Place real order on production site
2. Verify all 5 notifications work
3. Monitor first 5-10 orders

**✅ Production tested and working!**

---

## 📋 Quick Troubleshooting

### **No email?**
- Check spam folder
- Try port 587: `SMTP_PORT=587` and `SMTP_SECURE=false`

### **No shipment?**
- Check pickup location name is EXACT
- Verify Shiprocket credentials

### **Payment fails?**
- Verify you're using `rzp_live_` keys (not `rzp_test_`)

### **Still stuck?**
Read: `PRODUCTION_SETUP_COMPLETE.md` for detailed help

---

## 📚 All Documentation

- **START_HERE.md** ← You are here!
- **PRODUCTION_SETUP_COMPLETE.md** - Detailed guide
- **GODADDY_SMTP_CONFIG.md** - Email setup
- **WHATSAPP_SETUP_GUIDE.md** - WhatsApp setup
- **FINAL_PRODUCTION_CHECKLIST.md** - Final checks

---

## ⏱️ Time Estimate

| Step | Time |
|------|------|
| Install packages | 3 mins |
| Gather credentials | 15 mins |
| Configure .env | 5 mins |
| Test locally | 10 mins |
| Deploy | 5 mins |
| **Total** | **~40 mins** |

---

## 🎉 You're Ready to Go Live!

Follow the steps above. If you get stuck, check the detailed guides.

**Good luck! 🚀**

