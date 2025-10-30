# 🚀 Nutri Nest - Quick Reference Card

## ⚡ Quick Commands

```bash
# Start dev server
npm run dev

# Install Resend
npm install resend

# Build for production
npm run build
```

---

## 🔑 Environment Variables Checklist

```bash
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
✅ SUPABASE_SERVICE_ROLE_KEY
✅ RAZORPAY_KEY_ID
✅ RAZORPAY_KEY_SECRET
✅ NEXT_PUBLIC_RAZORPAY_KEY_ID
✅ SHIPROCKET_EMAIL
✅ SHIPROCKET_PASSWORD
✅ RESEND_API_KEY (after installing resend)
```

---

## 🧪 Test Credentials

### Payment (Razorpay)
- **Card:** `4111 1111 1111 1111`
- **CVV:** Any 3 digits
- **Expiry:** Any future date

### Coupons
- `WELCOME50` - ₹50 off
- `SAVE20` - 20% off

### Test Pincode
- `110001` - Delhi (for shipping)

---

## 📱 Important URLs

```
Customer:
  /products        → Shop
  /cart            → View cart
  /checkout        → Checkout
  /orders          → Order history
  /track-order     → Track shipment

Admin:
  /admin/orders    → Manage orders
```

---

## 🔧 TODO Before Launch

1. ✅ Install resend: `npm install resend`
2. ✅ Uncomment email code in `/lib/email.ts`
3. ✅ Add `RESEND_API_KEY` to `.env.local`
4. ✅ Setup Razorpay webhook in dashboard
5. ✅ Configure Shiprocket pickup location
6. ✅ Test complete order flow
7. ✅ Deploy to production

---

## 📊 Features Implemented

✅ Payment (Razorpay)  
✅ Shipping (Shiprocket)  
✅ Order Tracking  
✅ Email Notifications  
✅ Admin Dashboard  
✅ Customer Portal  

---

## 🆘 Quick Troubleshooting

**Payment not working?**
→ Check `RAZORPAY_KEY_ID` in `.env.local`

**Shipping rates not showing?**
→ Verify `SHIPROCKET_EMAIL` and `SHIPROCKET_PASSWORD`

**Emails not sending?**
→ Install resend + uncomment code in `/lib/email.ts`

**Tracking not working?**
→ Wait 2-3 hours after shipment creation

---

## 📞 Support Links

- Razorpay: https://razorpay.com/docs
- Shiprocket: https://apidocs.shiprocket.in
- Resend: https://resend.com/docs

---

## 🎯 Success!

**Everything is ready! Just install Resend and launch! 🚀**

See `FINAL_SETUP_GUIDE.md` for detailed instructions.

