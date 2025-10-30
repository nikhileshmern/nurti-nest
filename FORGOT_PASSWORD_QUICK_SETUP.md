# 🔐 Forgot Password - Quick Setup (5 Minutes)

## ✅ Feature Already Implemented!

The forgot password feature is **fully coded and ready**! You just need to configure Supabase.

---

## 🚀 Quick Setup (5 Minutes)

### **Step 1: Configure Supabase Email (3 mins)**

1. **Go to:** https://supabase.com/dashboard
2. **Select your project**
3. **Go to:** Authentication → Settings
4. **Find:** "Site URL" section
5. **Set Site URL to:**
   ```
   Production: https://mynutrinest.in
   ```
6. **Add Redirect URLs:**
   ```
   https://mynutrinest.in/reset-password
   http://localhost:3000/reset-password
   ```
7. **Click:** Save

---

### **Step 2: Test Locally (2 mins)**

1. **Start server:**
   ```bash
   npm run dev
   ```

2. **Go to:** http://localhost:3000/login

3. **Click:** "Forgot your password?"

4. **Enter:** Your test email

5. **Check:** Email inbox for reset link

6. **Click:** Reset link

7. **Set:** New password

8. **Login:** With new password

✅ **Done!**

---

## 📧 What Users Experience

### **1. On Login Page:**
```
[Email]
[Password]
→ Forgot your password?  ← Click here!

[Sign In]
```

### **2. Forgot Password Page:**
```
Forgot Password?
No worries! Enter your email and we'll send you reset instructions.

[Email Input]
[Send Reset Link]
```

### **3. Email Received:**
```
Subject: Reset Your Password

Hi there!

Click the link below to reset your password:
[Reset Password Button]

Link expires in 1 hour.
```

### **4. Reset Password Page:**
```
Reset Password

[New Password]      [👁]
[Confirm Password]  [👁]

Password Requirements:
✓ At least 6 characters
✓ Passwords match

[Reset Password]
```

### **5. Success:**
```
Password Reset Successful! 🎉

Redirecting to login...
[Go to Login]
```

---

## 🎯 Routes Added

| Route | Purpose |
|-------|---------|
| `/forgot-password` | User enters email to request reset |
| `/reset-password` | User sets new password after clicking email link |

---

## ✅ Checklist

- [ ] Set Site URL in Supabase
- [ ] Add redirect URLs in Supabase
- [ ] Test locally with your email
- [ ] Verify email arrives
- [ ] Test password reset works
- [ ] Can login with new password

**All done? You're ready! 🚀**

---

## 💡 Production Notes

### **After Deployment:**

1. Update Site URL in Supabase to your production domain
2. Test the flow on production
3. Check email deliverability
4. Monitor Supabase logs for any issues

### **Email Delivery:**

- Uses Supabase's built-in email service
- No additional setup required
- Works out of the box
- Can configure custom SMTP later if needed

---

## 🚨 Common Issues

### **"Email not received"**
→ Check spam folder
→ Verify email is registered
→ Check Supabase logs

### **"Invalid reset link"**
→ Link expires after 1 hour
→ Link is one-time use
→ Request new reset

### **"Can't login after reset"**
→ Make sure using NEW password
→ Check for typos
→ Try password reset again

---

## 📚 Full Documentation

See `FORGOT_PASSWORD_SETUP.md` for:
- Detailed setup instructions
- Email template customization
- Advanced configuration
- Troubleshooting guide
- Security features

---

## 🎉 Summary

**What's Done:**
- ✅ Frontend pages created
- ✅ Auth logic implemented
- ✅ Email integration ready
- ✅ Security features included
- ✅ Beautiful UI matching your design

**What You Do:**
- ✅ Configure Supabase (5 mins)
- ✅ Test the flow (2 mins)
- ✅ Deploy to production

**Total time: 7 minutes** ⏱️

**Feature is production-ready! 🚀**

