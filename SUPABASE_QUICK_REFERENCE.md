# 🎯 Supabase Quick Reference Card

## ⚡ 30-Second Summary

**Problem:** Orders weren't being saved to database  
**Solution:** Added Supabase save in create-order route  
**Status:** ✅ Fixed! Just needs Supabase setup  

---

## 🚀 5-Minute Setup

```bash
# 1. Create project at https://supabase.com
# 2. Get credentials (Project Settings → API)
# 3. Add to .env.local:

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# 4. Run schema in Supabase SQL Editor:
#    Copy/paste supabase-schema.sql

# 5. Verify:
node verify-supabase.js

# 6. Restart:
npm run dev
```

---

## 🔄 Order Flow (What Happens)

```
1. Checkout → Create order → 💾 Save to Supabase (pending)
2. Pay → Webhook → 💾 Update to paid
3. Shipment → Webhook → 💾 Update to shipped + AWB
4. View → /orders → 📖 Fetch from Supabase
```

---

## 📊 Database Tables

### **orders** (Main table)
```sql
id                  UUID (auto)
user_email          VARCHAR
status              VARCHAR (pending → paid → shipped → delivered)
subtotal, shipping, total    INTEGER
razorpay_order_id   VARCHAR
shiprocket_awb      VARCHAR
tracking_url        TEXT
address_json        JSONB
items               JSONB
created_at, updated_at       TIMESTAMP
```

---

## ✅ Verification Steps

```bash
# 1. Check environment
node verify-supabase.js
# Should show: ✅ SUPABASE FULLY CONFIGURED

# 2. Make test order
npm run dev
# Go to checkout → Pay with test card (4111 1111 1111 1111)

# 3. Check terminal logs
# Look for: "✅ Order saved to database: uuid"

# 4. Check Supabase dashboard
# Table Editor → orders → See your order

# 5. Trigger webhook
# Visit: http://localhost:3000/api/razorpay/webhook?order_id=order_XXX

# 6. Check order updated
# Refresh Supabase → See status: shipped, AWB filled

# 7. View in app
# Go to /orders → See order with tracking link
```

---

## 🐛 Common Issues

### ❌ "Failed to save order to database"
**Fix:** Run `node verify-supabase.js` and follow instructions

### ❌ Orders not showing in `/orders`
**Fix:** Make sure you're logged in with same email as checkout

### ❌ Webhook fails with "Order not found"
**Fix:** Check that create-order logs show "✅ Order saved to database"

### ❌ Tables don't exist
**Fix:** Run `supabase-schema.sql` in Supabase SQL Editor

---

## 📚 Documentation Map

| Need | Read This |
|------|-----------|
| Quick setup | `QUICK_START_SUPABASE.md` |
| Detailed guide | `SUPABASE_COMPLETE_SETUP.md` |
| Flow diagrams | `COMPLETE_ORDER_FLOW.md` |
| What changed | `SUPABASE_INTEGRATION_SUMMARY.md` |
| Full summary | `INTEGRATION_COMPLETE.md` |
| This card | `SUPABASE_QUICK_REFERENCE.md` |

---

## 🎯 Success Criteria

✅ `node verify-supabase.js` passes  
✅ Terminal shows "Order saved to database"  
✅ Supabase dashboard shows order  
✅ Webhook updates order status  
✅ `/orders` page displays order  
✅ Tracking link works  

---

## 🧪 Test Mode

Currently active: `NEXT_PUBLIC_TEST_MODE=true`

- ✅ Razorpay: Test cards, no real money
- ✅ Shiprocket: Mock shipments, fake AWB
- ✅ Supabase: **Real database** (intentional!)
- ✅ Emails: Console logs only

---

## 🔑 Key Files

**Modified:**
- `app/api/razorpay/create-order/route.ts` - Now saves to DB

**Key Files:**
- `lib/supabase.ts` - DB client
- `app/api/razorpay/webhook/route.ts` - Updates orders
- `app/orders/page.tsx` - Displays orders
- `supabase-schema.sql` - Database schema

**Tools:**
- `verify-supabase.js` - Automated verification

---

## 💡 Pro Tips

1. **Keep Supabase Dashboard Open**
   - Watch orders in real-time
   - See status changes instantly

2. **Check Terminal Logs**
   - Look for success messages
   - Catch errors early

3. **Use Test Mode**
   - Safe testing
   - Database works normally
   - No real transactions

4. **Run Verification Script**
   - Before starting
   - After changes
   - When troubleshooting

---

## 🎊 You're Ready!

**Setup:** 5 minutes  
**Documentation:** Comprehensive  
**Testing:** Built-in  
**Support:** Multiple guides  

Just set up Supabase and you're operational! 🚀

---

**Quick Start:** Read `QUICK_START_SUPABASE.md`

