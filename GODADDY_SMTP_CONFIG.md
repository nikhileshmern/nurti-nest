# 📧 GoDaddy SMTP Configuration for Orders@nutrinest.in

## 🎯 Complete Setup Guide

---

## ✅ Step 1: Determine Your GoDaddy Email Type (2 mins)

### **Login to GoDaddy:**
1. Go to: https://account.godaddy.com
2. Login with your credentials
3. Click "Email & Office" or look for email section

### **Check Which Type You Have:**

**Type A: Workspace Email / Professional Email**
- You see "Microsoft 365" or "Workspace Email"
- Webmail URL: https://email.secureserver.net

**Type B: cPanel Hosting with Email**
- You see "Web Hosting" with email accounts
- Webmail URL: https://nutrinest.in/webmail

---

## 🔧 Step 2: Get Your Configuration

### **FOR TYPE A: Workspace Email / Professional Email**

#### **Quick Copy-Paste Configuration:**

Add this to your `.env.local` file:

```bash
# ==========================================
# EMAIL CONFIGURATION - GoDaddy Workspace
# ==========================================

ADMIN_EMAIL=Orders@nutrinest.in

# GoDaddy Workspace Email SMTP Settings
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_email_password_here
SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"
```

**Replace `your_email_password_here` with the actual password for Orders@nutrinest.in**

---

### **FOR TYPE B: cPanel Hosting**

#### **Quick Copy-Paste Configuration:**

Add this to your `.env.local` file:

```bash
# ==========================================
# EMAIL CONFIGURATION - GoDaddy cPanel
# ==========================================

ADMIN_EMAIL=Orders@nutrinest.in

# GoDaddy cPanel SMTP Settings
SMTP_HOST=mail.nutrinest.in
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_email_password_here
SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"
```

**Replace `your_email_password_here` with the actual password for Orders@nutrinest.in**

---

## 🔑 Step 3: Find Your Email Password (3 mins)

### **If You Don't Remember the Password:**

#### **For Workspace Email:**
1. Go to: https://account.godaddy.com
2. Click "Email & Office"
3. Find Orders@nutrinest.in
4. Click "Manage" or "⋮" menu
5. Click "Reset Password"
6. Set new password
7. **Save it!** You'll need it for SMTP

#### **For cPanel Email:**
1. Go to: https://account.godaddy.com
2. Click "Web Hosting" → "Manage"
3. Click "cPanel Admin"
4. Find "Email Accounts"
5. Find Orders@nutrinest.in
6. Click "Manage" → "Change Password"
7. Set new password
8. **Save it!** You'll need it for SMTP

---

## 🧪 Step 4: Test Configuration (3 mins)

### **1. Update `.env.local`**

Open `/Users/nikhilesh/Documents/nutri-nest/.env.local` and paste the configuration from Step 2 above.

### **2. Restart Application**

```bash
cd /Users/nikhilesh/Documents/nutri-nest
npm run dev
```

### **3. Place Test Order**

1. Go to: http://localhost:3000
2. Add any product to cart
3. Proceed to checkout
4. Fill in your details
5. Complete payment (use test card)
6. Wait 30 seconds

### **4. Check Your Inbox**

- Open: https://email.secureserver.net (Workspace Email)
- Or: https://nutrinest.in/webmail (cPanel)
- Login as: Orders@nutrinest.in
- **Look for order confirmation email**

---

## ✅ Success Criteria

You should receive **2 emails** at Orders@nutrinest.in:

1. **Customer order confirmation** (copy sent to admin)
2. **Admin order notification** (detailed order info)

**Both should arrive within 30 seconds of placing order!**

---

## 🚨 Troubleshooting

### **Error: "Invalid login credentials"**

**Problem:** Wrong password

**Fix:**
1. Reset password in GoDaddy dashboard
2. Use the EXACT password (no extra spaces)
3. Update `.env.local` with new password
4. Restart app

---

### **Error: "Connection timeout"**

**Problem:** Wrong SMTP host

**Fix for Workspace Email:**
```bash
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
```

**Fix for cPanel:**
```bash
SMTP_HOST=mail.nutrinest.in
SMTP_PORT=465
SMTP_SECURE=true
```

Try port 587 with SMTP_SECURE=false if 465 doesn't work:
```bash
SMTP_PORT=587
SMTP_SECURE=false
```

---

### **Error: "Certificate verification failed"**

**Problem:** SSL/TLS mismatch

**Fix:** Try alternative port configuration:
```bash
SMTP_PORT=587
SMTP_SECURE=false
```

---

### **No error but no email received**

**Fixes:**
1. ✅ Check spam/junk folder
2. ✅ Wait 2-3 minutes (sometimes delayed)
3. ✅ Check app logs for errors: `npm run dev` output
4. ✅ Verify email password is correct
5. ✅ Send test email from Orders@nutrinest.in to yourself first

---

## 📊 GoDaddy SMTP Settings Reference

### **Workspace Email / Microsoft 365:**

| Setting | Value |
|---------|-------|
| **SMTP Host** | smtpout.secureserver.net |
| **Port (SSL)** | 465 |
| **Port (TLS)** | 587 |
| **Security** | SSL or TLS |
| **Username** | Orders@nutrinest.in |
| **Password** | Your email password |
| **Authentication** | Required |

**Official Docs:** https://www.godaddy.com/help/server-and-port-settings-for-workspace-email-6949

---

### **cPanel Email:**

| Setting | Value |
|---------|-------|
| **SMTP Host** | mail.nutrinest.in |
| **Port (SSL)** | 465 |
| **Port (TLS)** | 587 |
| **Security** | SSL or TLS |
| **Username** | Orders@nutrinest.in |
| **Password** | Your email password |
| **Authentication** | Required |

---

## 🎯 Quick Checklist

- [ ] I determined my email type (Workspace or cPanel)
- [ ] I have my email password for Orders@nutrinest.in
- [ ] I added correct SMTP settings to `.env.local`
- [ ] I restarted the app (`npm run dev`)
- [ ] I placed a test order
- [ ] I checked Orders@nutrinest.in inbox
- [ ] I received the test emails ✅

---

## 💡 Pro Tips

### **1. Use App-Specific Password (If Available)**

For better security, GoDaddy Workspace supports app passwords:
1. Login to email settings
2. Create app-specific password
3. Use that instead of main password

### **2. Enable Less Secure Apps (If Required)**

If authentication fails:
1. Login to GoDaddy email
2. Settings → Security
3. Enable "Allow less secure apps"

### **3. Check Sending Limits**

GoDaddy has limits:
- **Workspace Email:** 250 emails/day per account
- **cPanel:** 500 emails/hour per account

More than enough for order notifications! ✅

---

## 📞 Need More Help?

### **GoDaddy Support:**
- **Phone:** 480-505-8877
- **Chat:** https://www.godaddy.com/contact-us
- **Help:** https://www.godaddy.com/help

### **Ask Them:**
> "I need SMTP settings for Orders@nutrinest.in to send transactional 
> emails from my application. Can you confirm the SMTP host, port, 
> and whether to use SSL/TLS?"

---

## ✅ Once Working

When emails arrive successfully:

1. ✅ Keep exact settings in `.env.local`
2. ✅ Note them somewhere safe
3. ✅ Continue with other production setup:
   - Razorpay live keys
   - Shiprocket credentials
   - Twilio WhatsApp (optional)
4. ✅ Set `TEST_MODE=false`
5. ✅ Deploy to production

**You're ready to go live! 🚀**

