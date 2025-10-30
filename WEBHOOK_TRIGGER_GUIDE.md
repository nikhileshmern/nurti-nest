# 🔔 How to Trigger Webhook and Create Shipment

## Your Recent Order

**Order ID:** `order_RZEo5TQ4AjBmhI`  
**Payment ID:** `pay_RZEoK0mwwEFE2O`  
**Status:** Payment Successful ✅  
**Shipment:** Not created yet ❌

---

## 🎯 Create Shipment Now

### **Step 1: Trigger Webhook**

Open this URL in your browser:

```
http://localhost:3000/api/razorpay/webhook?order_id=order_RZEo5TQ4AjBmhI
```

### **Step 2: Check Terminal Logs**

You should see:
```bash
🧪 Test Mode: Simulating webhook processing...
📧 Order confirmation email would be sent to: nikhilesh@onepgr.us
🧪 Test Mode: Creating mock shipment...
🧪 Test Mode: Shipment created TEST1234567890
📧 Shipment notification email would be sent to: nikhilesh@onepgr.us
🧪 Test Mode: Webhook processed successfully
```

### **Step 3: Verify Shipment Created**

Visit any of these pages:

1. **Orders:** http://localhost:3000/orders
2. **Admin:** http://localhost:3000/admin/orders
3. **Track:** http://localhost:3000/track-order

---

## 🧪 Test Mode Behavior

In test mode:
- ✅ Webhook must be manually triggered
- ✅ Shipment uses mock data
- ✅ AWB is fake: `TEST1234567890`
- ✅ Emails logged to console
- ✅ No real Shiprocket API calls

---

## 📊 What You'll See After Webhook

### In Orders Page:
```
Order #RZEo5TQ4
Status: Shipped 📦
AWB: TEST1734567890
[Track Order] button
```

### In Admin Dashboard:
```
| Order ID  | Customer        | Status  | AWB           | Actions |
|-----------|-----------------|---------|---------------|---------|
| RZEo5TQ4  | nikhi test      | shipped | TEST123456... | [View]  |
```

### In Tracking Page:
```
📦 Shipment Status: In Transit
AWB: TEST1234567890

Timeline:
✅ Order Placed - Nutri Nest Warehouse
🚚 Picked Up - Nutri Nest Warehouse
```

---

## 🔧 Production Setup

In production, webhook will auto-trigger when you:

1. Add webhook URL in Razorpay Dashboard:
   ```
   https://yourdomain.com/api/razorpay/webhook
   ```

2. Set webhook secret in `.env.local`:
   ```bash
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

3. Disable test mode:
   ```bash
   NEXT_PUBLIC_TEST_MODE=false
   TEST_MODE=false
   ```

---

## ✅ Summary

**Current Status:**
- Payment: ✅ Successful
- Webhook: ❌ Not triggered
- Shipment: ❌ Not created

**Action Required:**
1. Open webhook URL above
2. Check terminal for logs
3. Visit orders page to see shipment

---

**Let's get your shipment created! 🚀**

