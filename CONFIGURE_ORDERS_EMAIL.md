# 📧 Configure Orders@nutrinest.in for SMTP

## 🎯 Goal
Set up `Orders@nutrinest.in` to send order notifications automatically.

---

## ✅ Step-by-Step Configuration

### **Step 1: Find Where Your Email is Hosted** (2 mins)

Your email `Orders@nutrinest.in` is hosted somewhere. Let's find out:

#### **Method A: Check Your Current Email Access**

**Question:** How do you currently check this email?

- **Gmail interface?** → You're using Google Workspace
- **Webmail (looks like cPanel)?** → You're using cPanel hosting
- **Outlook?** → You're using Microsoft 365
- **Other provider app?** → Note which one

---

#### **Method B: Check Your Domain Hosting**

1. Find out who hosts `nutrinest.in`:
   - Go to: https://who.is
   - Enter: `nutrinest.in`
   - Look at "Name Servers" or "Registrar"

2. Login to that hosting panel

3. Look for "Email" or "Email Accounts" section

---

### **Step 2: Get SMTP Settings** (3 mins)

Based on where your email is hosted:

---

#### **Option A: cPanel/Shared Hosting** (Most Common)

1. **Login to cPanel**
   - Usually: `https://nutrinest.in:2083`
   - Or your hosting provider's control panel

2. **Go to "Email Accounts"**
   - Click the icon that says "Email Accounts"

3. **Find Orders@nutrinest.in**
   - Look for it in the list
   - Click "Connect Devices" or "Configure Mail Client"

4. **Copy These Settings:**
   ```
   Outgoing Mail Server (SMTP):
   - Server: mail.nutrinest.in (or smtp.nutrinest.in)
   - Port: 465 (with SSL) OR 587 (with TLS)
   - Username: Orders@nutrinest.in
   - Password: [Your email password]
   ```

5. **Take a screenshot** or write them down!

---

#### **Option B: Google Workspace** (If using Gmail interface)

1. **Enable App Password:**
   - Go to: https://myaccount.google.com
   - Security → 2-Step Verification (enable if not enabled)
   - App passwords → Create new

2. **Copy These Settings:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=Orders@nutrinest.in
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx  (16-char app password)
   ```

---

#### **Option C: Microsoft 365 / Outlook**

1. **Copy These Settings:**
   ```
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=Orders@nutrinest.in
   SMTP_PASSWORD=[Your email password]
   ```

---

#### **Option D: Contact Your Hosting Provider**

If you can't find the settings, contact support and say:

> "I need SMTP settings for Orders@nutrinest.in to send emails from my application. Please provide the SMTP host, port, and whether to use SSL/TLS."

---

### **Step 3: Add to `.env.local`** (2 mins)

Open `/Users/nikhilesh/Documents/nutri-nest/.env.local` and add:

```bash
# ==========================================
# EMAIL CONFIGURATION
# ==========================================

# Admin Email (who receives order notifications)
ADMIN_EMAIL=Orders@nutrinest.in

# SMTP Settings (Uncomment and fill based on your hosting)

# For cPanel/Shared Hosting:
SMTP_HOST=mail.nutrinest.in           # Or smtp.nutrinest.in
SMTP_PORT=465                          # Or 587
SMTP_SECURE=true                       # true for 465, false for 587
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_email_password      # Your actual email password
SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"

# For Google Workspace:
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=Orders@nutrinest.in
# SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx    # App password
# SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"

# For Microsoft 365:
# SMTP_HOST=smtp.office365.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=Orders@nutrinest.in
# SMTP_PASSWORD=your_email_password
# SMTP_FROM="Nutri Nest <Orders@nutrinest.in>"
```

**Important:** Uncomment (remove `#`) ONLY the section that matches your email provider!

---

### **Step 4: Test the Configuration** (3 mins)

1. **Start the app:**
   ```bash
   cd /Users/nikhilesh/Documents/nutri-nest
   npm run dev
   ```

2. **Place a test order:**
   - Go to: http://localhost:3000
   - Add item to cart
   - Checkout
   - Complete payment

3. **Check your inbox:**
   - You should receive an email at `Orders@nutrinest.in`
   - Within 30 seconds
   - If not, check spam folder

---

### **Step 5: Troubleshooting** (if emails don't arrive)

#### **Error: "Authentication failed"**
❌ **Problem:** Wrong password or username
✅ **Fix:** Double-check SMTP_USER and SMTP_PASSWORD

#### **Error: "Connection timeout"**
❌ **Problem:** Wrong SMTP_HOST or SMTP_PORT
✅ **Fix:** 
- Try `mail.nutrinest.in` instead of `smtp.nutrinest.in`
- Try port `587` instead of `465` (and change SMTP_SECURE to false)

#### **Error: "Certificate error"**
❌ **Problem:** SSL/TLS mismatch
✅ **Fix:**
- For port 465: `SMTP_SECURE=true`
- For port 587: `SMTP_SECURE=false`

#### **No error but no email**
❌ **Problem:** Email might be in spam or blocked
✅ **Fix:** 
- Check spam folder in Orders@nutrinest.in
- Check your hosting email logs
- Try sending to another email first

---

### **Step 6: Common SMTP Settings by Hosting Provider**

#### **Hostinger:**
```bash
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_password
```

#### **Namecheap:**
```bash
SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_password
```

#### **GoDaddy:**
```bash
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_password
```

#### **Bluehost:**
```bash
SMTP_HOST=mail.nutrinest.in
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=your_password
```

---

## 🎯 Quick Checklist

- [ ] I know where my email is hosted
- [ ] I have the SMTP host (mail.nutrinest.in or smtp.nutrinest.in)
- [ ] I have the SMTP port (465 or 587)
- [ ] I know if SSL is enabled (true for 465, false for 587)
- [ ] I have my email password
- [ ] I added all settings to `.env.local`
- [ ] I uncommented the correct SMTP settings
- [ ] I restarted the app (`npm run dev`)
- [ ] I placed a test order
- [ ] I received the email ✅

---

## 📞 Need Help?

### **Can't find settings?**
- Contact your hosting provider support
- Ask: "What are the SMTP settings for Orders@nutrinest.in?"

### **Emails not working?**
- Check spam folder
- Verify password is correct
- Try both `mail.nutrinest.in` and `smtp.nutrinest.in`
- Try both port 465 and 587

### **Want to test SMTP settings first?**
- Use: https://www.gmass.co/smtp-test
- Enter your settings before adding to .env.local

---

## ✅ Once Working

When you receive test emails successfully:

1. ✅ Keep those exact settings in `.env.local`
2. ✅ Set `TEST_MODE=false` for production
3. ✅ Deploy to production
4. ✅ Test with real order

**Done! Your customers and you will receive emails! 📧**

