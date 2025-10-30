# 🔐 Hybrid Authentication Setup Guide

## ✅ What's Been Implemented

Your Nutri Nest e-commerce platform now supports **HYBRID AUTHENTICATION**:
- ✅ **Guest Checkout** - Users can order without creating an account
- ✅ **User Accounts** - Users can sign up, login, and track all their orders
- ✅ **Automatic Pre-fill** - Logged-in users get their info pre-filled at checkout
- ✅ **Order Tracking** - Authenticated users see all orders in their account

---

## 📋 Setup Instructions

### **Step 1: Run the Authentication SQL Schema**

1. Open your **Supabase Dashboard**: https://supabase.com/dashboard
2. Go to your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the contents of `supabase-auth-setup.sql`
6. Click **Run** (or press Cmd/Ctrl + Enter)

✅ **What this does:**
- Creates `profiles` table for user data
- Adds `user_id` column to `orders` table
- Sets up Row Level Security (RLS) policies
- Creates automatic profile creation trigger
- Enables both guest and authenticated orders

### **Step 2: Enable Supabase Authentication**

1. In Supabase Dashboard, go to **Authentication** → **Settings**
2. Under **Email Auth**, make sure:
   - ✅ **Enable email sign-ups** is ON
   - ✅ **Enable email confirmations** (optional - can be OFF for testing)
3. Click **Save**

### **Step 3: Configure Environment Variables**

Your `.env.local` should already have these (verify they're correct):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret

# Test Mode
NEXT_PUBLIC_TEST_MODE=true
TEST_MODE=true
```

### **Step 4: Restart Your Dev Server**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🎯 How It Works

### **For Guest Users:**

1. User goes to `/checkout`
2. Sees banner: "Guest Checkout - Want to track orders? Login or Sign Up"
3. Fills in shipping info manually
4. Order is saved with:
   - `user_id`: `null`
   - `user_email`: their email
5. Can't view orders in `/orders` (shows login prompt)

### **For Logged-In Users:**

1. User goes to `/checkout`
2. Sees banner: "Logged in as user@email.com"
3. Form is **pre-filled** with their name, email, phone
4. Order is saved with:
   - `user_id`: their UUID
   - `user_email`: their email
5. Can view all orders in `/orders` page
6. Can view profile in `/profile` page

---

## 📱 User Flow Examples

### **Scenario 1: Guest Makes Order → Creates Account Later**

```
1. Guest orders (email: john@example.com)
   └─ Order saved with user_id=null, user_email=john@example.com

2. Later, John signs up with same email
   └─ Account created

3. John logs in and views orders
   └─ Shows all orders matching his email (guest + authenticated)
```

### **Scenario 2: User Signs Up First → Orders**

```
1. User creates account
   └─ Profile created in profiles table

2. User goes to checkout
   └─ Name, email pre-filled automatically

3. User completes order
   └─ Order saved with user_id + email
   
4. User can view in /orders immediately
```

---

## 🔒 Security Features

### **Row Level Security (RLS)**

**Profiles Table:**
- ✅ Users can only view their own profile
- ✅ Users can only update their own profile
- ✅ Anyone can create profile during signup

**Orders Table:**
- ✅ Users see orders where `user_id` matches OR `email` matches
- ✅ Guest users can't access `/orders` without login
- ✅ Service role (webhooks) can update any order

---

## 🧪 Testing the Flow

### **Test 1: Guest Checkout**

```bash
1. DON'T login
2. Add product to cart
3. Go to /checkout
4. Should see: "Guest Checkout" banner with Login/Sign Up buttons
5. Fill form and complete order
6. ✅ Order should save successfully
```

### **Test 2: Authenticated Checkout**

```bash
1. Go to /signup
2. Create account (use real email format)
3. Login at /login
4. Go to /checkout
5. Should see: "Logged in as your@email.com"
6. Form should be pre-filled
7. Complete order
8. Go to /orders
9. ✅ Should see your order
```

### **Test 3: Order History**

```bash
1. As logged-in user
2. Go to /orders
3. ✅ Should see all your orders
4. Click on order to expand details
5. ✅ Should see tracking info, items, etc.
```

---

## 📊 Database Schema

### **profiles table**
```sql
id          UUID (primary key, references auth.users)
email       VARCHAR (user's email)
full_name   VARCHAR (user's full name)
phone       VARCHAR (phone number)
avatar_url  TEXT (profile picture URL)
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### **orders table (updated)**
```sql
id                  UUID (primary key)
user_id            UUID (nullable - null for guest orders)
user_email         VARCHAR (always set)
status             VARCHAR (pending, paid, shipped, delivered)
subtotal           INTEGER (in paise)
shipping           INTEGER (in paise)
total              INTEGER (in paise)
razorpay_order_id  VARCHAR
shiprocket_awb     VARCHAR
tracking_url       TEXT
address_json       JSONB
items              JSONB
created_at         TIMESTAMP
updated_at         TIMESTAMP
```

---

## 🎨 UI Components

### **Checkout Banner**

**When Logged In:**
```
┌─────────────────────────────────────────┐
│ 👤 Logged in as user@email.com          │
│    Your order will be saved to account  │
│                          View Profile → │
└─────────────────────────────────────────┘
```

**When Guest:**
```
┌─────────────────────────────────────────┐
│ 🔓 Guest Checkout                       │
│    Want to track orders? Login or sign up│
│                  [Login] [Sign Up]      │
└─────────────────────────────────────────┘
```

---

## 🔧 Files Modified

### **New Files:**
- `supabase-auth-setup.sql` - Authentication schema
- `HYBRID_AUTH_SETUP.md` - This guide

### **Modified Files:**
- `lib/supabase.ts` - Added auth methods
- `context/AuthContext.tsx` - Already had auth support
- `app/checkout/page.tsx` - Added user banner, pre-fill, userId
- `app/api/razorpay/create-order/route.ts` - Save user_id with orders
- `app/orders/page.tsx` - Query by user_id or email
- `app/login/page.tsx` - Already configured
- `app/signup/page.tsx` - Already configured
- `components/Header.tsx` - Already had auth UI

---

## 🚀 What This Enables

### **Business Benefits:**
1. ✅ Lower cart abandonment (no forced signup)
2. ✅ User accounts for loyal customers
3. ✅ Order history and tracking
4. ✅ Marketing to registered users
5. ✅ Personalized experience

### **Technical Benefits:**
1. ✅ Secure authentication with Supabase
2. ✅ Automatic session management
3. ✅ RLS for data security
4. ✅ Support for both flows in one codebase
5. ✅ Easy migration of guest orders to accounts

---

## 📈 Next Steps (Optional Enhancements)

### **Priority 1:**
- [ ] Email verification for signups
- [ ] Password reset flow
- [ ] Guest order tracking by order ID

### **Priority 2:**
- [ ] Saved addresses for logged-in users
- [ ] Wishlist functionality
- [ ] Order notifications via email

### **Priority 3:**
- [ ] Social login (Google, Facebook)
- [ ] Loyalty points/rewards
- [ ] Referral system

---

## ❓ Troubleshooting

### **Issue: "Cannot login"**

**Solution:**
1. Check Supabase credentials in `.env.local`
2. Verify email auth is enabled in Supabase dashboard
3. Check browser console for errors

### **Issue: "Orders not showing"**

**Solution:**
1. Verify you ran `supabase-auth-setup.sql`
2. Check that `user_id` column exists in orders table
3. Verify RLS policies are set up

### **Issue: "Form not pre-filling"**

**Solution:**
1. Verify you're logged in (check header for user icon)
2. Profile should exist in `profiles` table
3. Check browser console for auth errors

---

## 🎊 You're All Set!

Your e-commerce platform now has **industry-standard hybrid authentication**!

Test it out:
1. Run `npm run dev`
2. Sign up at `/signup`
3. Make a test order
4. View it at `/orders`

**This is the same flow used by:**
- Amazon
- Shopify stores
- WooCommerce
- BigCommerce

**Congratulations on building a complete e-commerce platform!** 🚀

