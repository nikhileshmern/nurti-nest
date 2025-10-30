# 🚀 Quick Start: Hybrid Authentication

## ⚡ 5-Minute Setup

### Step 1: Run SQL (2 minutes)
```bash
1. Open: https://supabase.com/dashboard
2. Go to: SQL Editor → New Query
3. Copy/paste: supabase-auth-setup.sql
4. Click: Run
```

### Step 2: Enable Auth (1 minute)
```bash
1. Go to: Authentication → Settings
2. Enable: Email sign-ups ✓
3. Click: Save
```

### Step 3: Restart (30 seconds)
```bash
npm run dev
```

### Step 4: Test (1 minute)
```bash
1. Go to: http://localhost:3000/signup
2. Create account
3. Go to: /checkout
4. ✅ Form should be pre-filled!
```

---

## 🎯 What You Get

### ✅ Guest Checkout
- Users can order WITHOUT creating account
- Lower cart abandonment
- Faster checkout

### ✅ User Accounts  
- Sign up / Login with Supabase
- Order history at `/orders`
- Profile management

### ✅ Hybrid Flow
- Both work seamlessly
- Best conversion rates
- Industry standard

---

## 📋 Quick Test Checklist

```bash
□ Run supabase-auth-setup.sql
□ Enable email auth in Supabase
□ Restart dev server
□ Test guest checkout (no login)
□ Test signup at /signup
□ Test login at /login
□ Test authenticated checkout (pre-filled form)
□ Test order history at /orders
```

---

## 🆘 Quick Fix

**Not working?**

1. Check `.env.local` has Supabase credentials
2. Verify SQL ran successfully (check Supabase tables)
3. Check browser console for errors
4. Try clearing browser cache/cookies

---

## 📖 Full Docs

Read `HYBRID_AUTH_SETUP.md` for:
- Complete documentation
- Troubleshooting guide
- Security features
- Database schema
- User flows

---

**That's it! You're ready to go! 🚀**

