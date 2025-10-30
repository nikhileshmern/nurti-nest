# 📧 SMTP Email Setup Guide

## Quick Setup (5 Minutes)

Your email service now uses **SMTP (Nodemailer)** instead of third-party services. This gives you more flexibility and control!

---

## Step 1: Install Nodemailer (1 minute)

```bash
cd /Users/nikhilesh/Documents/nutri-nest
npm install nodemailer
```

---

## Step 2: Choose Your SMTP Provider

Pick one of these options based on what you have:

### 🟢 **Option A: Gmail (Easiest - Free)**

**Perfect for**: Testing, small businesses, getting started quickly

**Setup**:

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Name it "Nutri Nest"
   - Copy the 16-character password

3. **Add to `.env.local`**:
```bash
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # App password (remove spaces)
SMTP_FROM="Nutri Nest <your-email@gmail.com>"
```

**Limits**: 500 emails/day (plenty for most stores)

---

### 🔵 **Option B: Custom Domain Email (Recommended for Production)**

**Perfect for**: Professional emails (orders@mynutrinest.in)

**Prerequisites**: 
- You have hosting (cPanel, Hostinger, GoDaddy, etc.)
- You have created an email account

**Setup**:

1. **Get SMTP Details from Your Hosting**:
   - Login to cPanel/hosting control panel
   - Go to "Email Accounts"
   - Click "Configure Email Client"
   - Find SMTP settings (usually: `mail.yourdomain.com`)

2. **Common Settings**:
   - **Host**: `mail.yourdomain.com` or `smtp.yourdomain.com`
   - **Port**: Usually `587` (or `465` for SSL)
   - **Username**: Your full email (orders@mynutrinest.in)
   - **Password**: Your email password

3. **Add to `.env.local`**:
```bash
# Custom Domain SMTP
SMTP_HOST=mail.mynutrinest.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=orders@mynutrinest.in
SMTP_PASSWORD=your-email-password
SMTP_FROM="Nutri Nest <orders@mynutrinest.in>"
```

**Benefits**: 
- Professional appearance
- Unlimited emails (typically)
- Better deliverability

---

### 🟡 **Option C: SendGrid (Free Tier)**

**Perfect for**: High volume, better deliverability

**Setup**:

1. **Sign up** at [SendGrid.com](https://sendgrid.com)
   - Free tier: 100 emails/day

2. **Create API Key**:
   - Dashboard → Settings → API Keys
   - Create API Key with "Mail Send" permission

3. **Verify Domain** (optional but recommended):
   - Settings → Sender Authentication
   - Verify your domain

4. **Add to `.env.local`**:
```bash
# SendGrid SMTP
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Your API key
SMTP_FROM="Nutri Nest <orders@mynutrinest.in>"
```

---

### 🟣 **Option D: AWS SES (Advanced)**

**Perfect for**: Very high volume, lowest cost

**Setup**:

1. **Sign up** for [AWS SES](https://aws.amazon.com/ses/)
   - First 62,000 emails/month FREE
   - Then $0.10 per 1000 emails

2. **Verify Email/Domain** in SES console

3. **Create SMTP Credentials**:
   - SES Console → SMTP Settings
   - Create SMTP credentials
   - Download credentials

4. **Request Production Access** (starts in sandbox mode)

5. **Add to `.env.local`**:
```bash
# AWS SES SMTP
SMTP_HOST=email-smtp.us-east-1.amazonaws.com  # Change region as needed
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
SMTP_FROM="Nutri Nest <orders@mynutrinest.in>"
```

---

## Step 3: Configure Environment Variables

Add chosen configuration to `.env.local`:

```bash
# Example with Gmail (choose one from above)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourname@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM="Nutri Nest <yourname@gmail.com>"
```

---

## Step 4: Test Email Sending

**Restart your dev server**:
```bash
npm run dev
```

**Test by placing an order**:
1. Add item to cart
2. Go to checkout
3. Fill in your email address
4. Complete order
5. Check your email inbox!

**Check logs** for confirmation:
```
✅ Order confirmation email sent: <message-id>
```

---

## 🔧 Troubleshooting

### Issue: "Connection timeout"

**Solutions**:
1. Check if SMTP_HOST is correct
2. Try different port (587 vs 465)
3. Check if your hosting/firewall blocks SMTP
4. Verify credentials are correct

### Issue: "Authentication failed"

**Gmail**: 
- Make sure you're using App Password (not regular password)
- Enable 2FA first

**Custom Domain**:
- Use full email as username (orders@domain.com)
- Check if password has special characters (wrap in quotes)

**SendGrid**:
- Username must be exactly `apikey`
- Password is your full API key (starts with SG.)

### Issue: "Email not delivered"

1. **Check spam folder**
2. **Verify sender email** is correct
3. **Gmail**: Mark first email as "Not Spam"
4. **SendGrid/SES**: Verify your domain for better deliverability

### Issue: "Daily limit exceeded"

**Gmail**: 500 emails/day limit
- Use SendGrid or AWS SES for higher volume
- Or create multiple Gmail accounts

---

## 📊 Comparison Table

| Provider | Free Limit | Cost | Setup Time | Best For |
|----------|-----------|------|------------|----------|
| **Gmail** | 500/day | Free | 2 mins | Testing, small stores |
| **Custom Domain** | Varies | Included with hosting | 3 mins | Professional look |
| **SendGrid** | 100/day | $0 - $15/mo | 5 mins | Medium volume |
| **AWS SES** | 62,000/mo | $0.10/1000 | 10 mins | High volume, lowest cost |

---

## 🎯 Recommended Setup Path

### For Testing (Right Now):
→ **Gmail** - Quick and easy, perfect for testing

### For Production (When Launching):
→ **Custom Domain Email** - Professional and included with hosting

### For Scale (If You Grow):
→ **AWS SES** or **SendGrid** - Better deliverability and analytics

---

## 📧 Email Templates Included

Your emails are already professionally designed with:
- ✅ Beautiful HTML templates
- ✅ Responsive design (mobile-friendly)
- ✅ Order confirmation with full details
- ✅ Shipment notification with tracking link
- ✅ Brand colors and styling

---

## 🔐 Security Best Practices

1. **Never commit .env.local** to Git (already in .gitignore)
2. **Use App Passwords** for Gmail (not main password)
3. **Rotate SMTP passwords** periodically
4. **Monitor email logs** for suspicious activity
5. **Set up SPF/DKIM records** for custom domains (ask your hosting provider)

---

## 🚀 Production Checklist

Before going live:

- [ ] Install nodemailer: `npm install nodemailer`
- [ ] Choose SMTP provider
- [ ] Add SMTP credentials to `.env.local`
- [ ] Test sending emails
- [ ] Check spam folder and mark as "Not Spam"
- [ ] Verify "from" address is correct
- [ ] Test both order confirmation and shipment emails
- [ ] Monitor first few orders closely

---

## 💡 Pro Tips

1. **Use Custom Domain for Production**
   - emails@mynutrinest.in looks more professional than gmail.com
   - Better deliverability
   - Customers trust it more

2. **Set Up SPF/DKIM Records**
   - Ask your hosting provider to set these up
   - Drastically improves email deliverability
   - Prevents emails from going to spam

3. **Monitor Email Bounces**
   - Check if emails are being rejected
   - Remove invalid email addresses
   - Keep your sender reputation clean

4. **Test Everything**
   - Send to different email providers (Gmail, Yahoo, Outlook)
   - Check on mobile and desktop
   - Verify all links work

---

## 📞 Need Help?

### Gmail Issues:
- [Gmail SMTP Setup Guide](https://support.google.com/mail/answer/7126229)
- [Create App Password](https://myaccount.google.com/apppasswords)

### SendGrid Issues:
- [SendGrid Support](https://docs.sendgrid.com/)
- [SMTP Integration](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)

### AWS SES Issues:
- [SES Documentation](https://docs.aws.amazon.com/ses/)
- [SMTP Credentials](https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html)

---

## ✅ Summary

**What You Need to Do**:
1. Run: `npm install nodemailer` (30 seconds)
2. Choose SMTP provider (Gmail recommended for testing)
3. Add 5 env variables to `.env.local` (2 minutes)
4. Test by placing an order (1 minute)

**Total Time**: ~5 minutes

**Result**: Professional order confirmation and shipment emails sent automatically! 📧✨

---

*Last Updated: October 29, 2025*

