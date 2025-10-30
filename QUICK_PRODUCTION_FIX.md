# 🚀 Quick Production Fix Guide

## 2 Critical Fixes (10 Minutes Total)

---

## Fix #1: Shiprocket Pickup Location (2 minutes)

### Problem
Webhook code uses hardcoded `'Primary'` which may not exist in your Shiprocket account.

### Solution

**Step 1**: Get your pickup location name from Shiprocket
- Login to [Shiprocket Dashboard](https://app.shiprocket.in)
- Go to Settings → Pickup Locations
- Copy the exact name (e.g., "Main Warehouse", "Delhi Office", etc.)

**Step 2**: Add to `.env.local`
```bash
SHIPROCKET_PICKUP_LOCATION="Your Exact Pickup Location Name"
```

**Step 3**: Update code in `app/api/razorpay/webhook/route.ts`

Find line 88 (inside `createShipment` call):
```typescript
// Change from:
pickup_location: 'Primary',

// To:
pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
```

✅ Done! Shiprocket will now use your actual pickup location.

---

## Fix #2: Enable Email Service with SMTP (5 minutes)

### Problem
Email functions are currently just logging to console (not sending real emails).

### Solution - Using SMTP (Better!)

**Step 1**: Install Nodemailer (30 seconds)
```bash
cd /Users/nikhilesh/Documents/nutri-nest
npm install nodemailer
```

**Step 2**: Choose SMTP Provider (Pick One)

#### Option A: Gmail (Easiest - 2 mins)
1. Enable 2FA on Gmail
2. Create App Password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx  # App password (remove spaces)
SMTP_FROM="Nutri Nest <your-email@gmail.com>"
```

#### Option B: Custom Domain (Best for Production - 3 mins)
1. Get SMTP settings from your hosting (cPanel)
2. Add to `.env.local`:
```bash
SMTP_HOST=mail.mynutrinest.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=orders@mynutrinest.in
SMTP_PASSWORD=your-email-password
SMTP_FROM="Nutri Nest <orders@mynutrinest.in>"
```

#### Option C: SendGrid (Free 100/day - 3 mins)
1. Sign up at sendgrid.com
2. Create API key
3. Add to `.env.local`:
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.your-api-key-here
SMTP_FROM="Nutri Nest <orders@mynutrinest.in>"
```

**Step 3**: Restart Server
```bash
npm run dev
```

✅ Done! Emails will now be sent via SMTP.
✅ Code is already updated - no manual changes needed!

**See SMTP_SETUP_GUIDE.md for detailed instructions**

---

## Verification Steps (5 minutes)

### Test in Test Mode First:

```bash
# Keep test mode enabled
NEXT_PUBLIC_TEST_MODE=true
TEST_MODE=true

# Restart server
npm run dev
```

**Test Order Flow:**
1. Add item to cart
2. Go to checkout
3. Fill form with your email
4. Place order
5. Complete payment
6. Check your email inbox
7. Verify Shiprocket dashboard for shipment

✅ If everything works, proceed to production.

---

## Switch to Production (2 minutes)

### Update `.env.local`:

```bash
# Disable test mode
NEXT_PUBLIC_TEST_MODE=false
TEST_MODE=false

# Use Razorpay live keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_key

# Add Shiprocket production credentials
SHIPROCKET_EMAIL=your@business.com
SHIPROCKET_PASSWORD=your_production_password
SHIPROCKET_PICKUP_LOCATION="Your Pickup Location Name"

# Add email API key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Production URL
NEXT_PUBLIC_APP_URL=https://mynutrinest.in
```

### Restart and Deploy:

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to your hosting (e.g., Vercel)
vercel --prod
```

---

## 🎯 Summary

### Before Production:
- [x] Add `SHIPROCKET_PICKUP_LOCATION` to env
- [x] Update webhook code to use env variable
- [x] Install `resend` package
- [x] Add `RESEND_API_KEY` to env
- [x] Uncomment email sending code in `lib/email.ts`
- [x] Test with test credentials
- [x] Switch to production credentials
- [x] Deploy

### After These Fixes:
✅ Orders will be created in Razorpay
✅ Payments will be processed
✅ Database will save order details
✅ Shiprocket will create real shipments
✅ AWB codes will be generated
✅ Pickups will be scheduled
✅ Customers will receive confirmation emails (via SMTP)
✅ Tracking emails will be sent (via SMTP)
✅ Professional HTML email templates included

### Time Estimate:
- Fix #1: 2 minutes
- Fix #2: 5 minutes
- Testing: 5 minutes
- Deployment: 2 minutes
- **Total: 14 minutes**

---

## 🆘 Troubleshooting

### Issue: "Pickup location not found"
**Solution**: Double-check the name matches exactly in Shiprocket dashboard (case-sensitive)

### Issue: "Email not sending"
**Solution**: 
1. Verify SMTP credentials are correct
2. Check server logs for specific error
3. Try different SMTP port (587 vs 465)
4. For Gmail: Make sure using App Password (not regular password)
5. Check spam folder

### Issue: "Shipment creation failed"
**Solution**:
1. Verify Shiprocket credentials are correct
2. Check if you have credits in Shiprocket account
3. Ensure pickup location exists and is active

---

## 📞 Need Help?

If you encounter any issues:
1. Check the full logs in terminal
2. Review the `PRODUCTION_READINESS_REPORT.md` for detailed flow
3. Review the `SMTP_SETUP_GUIDE.md` for detailed email setup
4. Test in test mode first before going live
5. Monitor the first few orders closely

**You're ready to go! 🚀**

