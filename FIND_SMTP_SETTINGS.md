# 🔍 How to Find Your SMTP Settings for Orders@nutrinest.in

## Method 1: Check Your Email Client

If you already use this email in Outlook/Thunderbird/Apple Mail:

1. Open your email client
2. Go to **Account Settings**
3. Look for **Outgoing Server (SMTP)** section
4. Copy all the settings you see

---

## Method 2: cPanel/Hosting Panel

### For Most Hosting Providers:

1. **Login to cPanel**
   - Usually at: `https://nutrinest.in:2083`
   - Or: `https://cpanel.yourhost.com`

2. **Go to Email Accounts**
   - Find "Email Accounts" icon
   - Click on it

3. **Find Your Email**
   - Look for `Orders@nutrinest.in`
   - Click "Connect Devices" or "Configure Mail Client"

4. **Copy SMTP Settings**
   You'll see something like:
   ```
   Outgoing Server (SMTP)
   Server: mail.nutrinest.in
   Port: 465 (SSL) or 587 (TLS)
   Username: Orders@nutrinest.in
   Authentication: Password
   ```

---

## Method 3: Contact Your Hosting Provider

If you can't find the settings:

### **Questions to Ask Your Host:**

> "I need SMTP settings for Orders@nutrinest.in to send transactional emails from my app. Please provide:
> - SMTP Host/Server
> - SMTP Port (587 or 465)
> - Whether to use SSL/TLS
> - Authentication method"

### **Common Hosting Providers:**

**Hostinger Support:**
- Live Chat: https://hostinger.com
- Or check: https://support.hostinger.com/en/articles/1583229-email-client-setup

**GoDaddy Support:**
- Settings: https://www.godaddy.com/help/server-and-port-settings-for-workspace-email-6949

**Namecheap Support:**
- Settings: https://www.namecheap.com/support/knowledgebase/article.aspx/1090/email/how-to-set-up-an-email-client

**Bluehost:**
- SMTP: mail.yourdomain.com, Port 465 (SSL) or 587 (TLS)

---

## Method 4: Test Common Configurations

Try these common patterns:

### Pattern 1: mail.yourdomain.com
```
SMTP_HOST=mail.nutrinest.in
SMTP_PORT=465
SMTP_SECURE=true
```

### Pattern 2: smtp.yourdomain.com
```
SMTP_HOST=smtp.nutrinest.in
SMTP_PORT=587
SMTP_SECURE=false
```

### Pattern 3: Server hostname
```
SMTP_HOST=server123.hostingprovider.com
SMTP_PORT=465
SMTP_SECURE=true
```

---

## Testing Your Settings

Once you have the settings, test them here:
https://www.gmass.co/smtp-test

Enter your:
- SMTP Server
- Port
- Username (Orders@nutrinest.in)
- Password
- Send a test email

If it works ✅ → Use those settings in .env.local!

---

## Quick Reference Card

Fill this out once you find your settings:

```
SMTP_HOST=___________________________
SMTP_PORT=___________________________
SMTP_SECURE=_________________________  (true or false)
SMTP_USER=Orders@nutrinest.in
SMTP_PASSWORD=_______________________
```

Then copy to your `.env.local` file!

