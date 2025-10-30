# Razorpay Not Showing - Complete Debugging Guide

## Quick Test First

### Test 1: Direct Razorpay Test (Isolate the Issue)
1. Go to: `http://localhost:3000/test-razorpay.html`
2. Click "Open Razorpay Payment Modal"
3. **Does the modal open?**
   - ✅ **YES** → The issue is in the Next.js integration
   - ❌ **NO** → Razorpay itself is blocked/not loading

## If Direct Test Works (Next.js Integration Issue)

### Step 1: Clear Everything
```bash
# Clear browser cache completely
Hard reload: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Step 2: Check Console Logs
Open browser console (F12) and look for:

**Expected Flow:**
```
🧪 Test Mode: Loading Razorpay with test key...
Order details: {orderId: "...", amount: 69900, currency: "INR", ...}
✅ Razorpay script loaded successfully
🚀 === INITIALIZING RAZORPAY ===
Parameters: {...}
✅ Razorpay object found on window
🧪 Opening Razorpay test checkout...
Payment options: {...}
✅ Razorpay modal opened
```

**Common Issues:**

1. **Missing "Razorpay script loaded"**
   - Script not loading
   - Check Network tab
   - Check for CORS errors

2. **"Razorpay object not found"**
   - Script loaded but object missing
   - Timing issue
   - Try increasing timeout

3. **No logs at all**
   - Payment button not triggering
   - Check if form validation is blocking
   - Check if items in cart

## If Direct Test DOESN'T Work (Razorpay Loading Issue)

### Possible Causes:

1. **Internet/Network Issues**
   - Razorpay servers unreachable
   - Firewall blocking
   - VPN interfering

2. **Browser Extensions**
   - Ad blockers
   - Privacy extensions
   - Script blockers

3. **Browser Issues**
   - Old browser version
   - Cookies disabled
   - JavaScript disabled

### Solutions:

1. **Try Incognito Mode**
   - Disables most extensions
   - Fresh session

2. **Try Different Browser**
   - Chrome
   - Firefox
   - Safari
   - Edge

3. **Check Network Tab**
   - Look for `checkout.razorpay.com` request
   - Should show 200 OK status
   - If 4xx/5xx, Razorpay has issues

4. **Disable Extensions**
   - Turn off ad blockers
   - Turn off privacy tools
   - Try again

## Specific Error Messages

### "Payment Failed" Alert Immediately
**Cause**: Script not loading or initialization error
**Fix**:
- Check console for specific error
- Clear cache and reload
- Try test-razorpay.html

### Button Just Spins
**Cause**: Script loading but not initializing
**Fix**:
- Check if Razorpay object exists: `console.log(window.Razorpay)`
- Increase timeout in code
- Check for JavaScript errors

### Nothing Happens
**Cause**: Form validation or event not firing
**Fix**:
- Fill all required fields
- Check console for errors
- Verify items in cart

## Manual Console Tests

Open browser console on checkout page and run:

### Test 1: Check if Razorpay loaded
```javascript
console.log('Razorpay available:', !!window.Razorpay);
```
Should show: `Razorpay available: true`

### Test 2: Manually trigger Razorpay
```javascript
const options = {
  key: 'rzp_test_1DP5mmOlF5G5ag',
  amount: 69900,
  currency: 'INR',
  name: 'Test',
  handler: (res) => console.log('Success:', res),
};
const rzp = new Razorpay(options);
rzp.open();
```
Should open modal immediately.

### Test 3: Load script manually
```javascript
const script = document.createElement('script');
script.src = 'https://checkout.razorpay.com/v1/checkout.js';
script.onload = () => console.log('✅ Loaded');
script.onerror = () => console.log('❌ Failed');
document.head.appendChild(script);
```
Should show: `✅ Loaded`

## Environment Check

### Verify Environment Variables
Create `.env.local` with:
```env
NEXT_PUBLIC_TEST_MODE=true
TEST_MODE=true
```

### Verify Test Mode Detection
On checkout page, console should show:
```
🧪 Test mode detected: true
```

## Still Not Working?

### Last Resort Options:

1. **Use Simple Fallback**
   - Temporarily use auto-simulation mode
   - Shows success without modal
   - At least flow works

2. **Check Razorpay Status**
   - Visit: https://status.razorpay.com
   - Check if services are up

3. **Contact Razorpay Support**
   - They can check your account
   - Verify test key is valid

4. **Share Debug Info**
   - Console logs (screenshot)
   - Network tab (screenshot)
   - Browser version
   - Operating system

## What to Share for Help

If still stuck, share:

1. **Console Logs** (F12 → Console tab)
   - Full log from clicking Pay button
   - Any red error messages

2. **Network Tab** (F12 → Network tab)
   - Filter for "razorpay"
   - Show status of checkout.js request

3. **Environment**
   - Browser: Chrome/Firefox/Safari/Edge
   - Version: (Check in browser settings)
   - OS: Mac/Windows/Linux
   - Node version: `node --version`

4. **Test Results**
   - Did test-razorpay.html work? Yes/No
   - Did manual console test work? Yes/No
   - Does incognito mode work? Yes/No

## Quick Fixes Checklist

- [ ] Hard refresh browser (Cmd+Shift+R)
- [ ] Clear .next folder and restart dev server
- [ ] Try test-razorpay.html
- [ ] Try incognito mode
- [ ] Try different browser
- [ ] Disable ad blockers
- [ ] Check internet connection
- [ ] Verify .env.local exists with test mode
- [ ] Check console for errors
- [ ] Check network tab for razorpay script
- [ ] Run manual console tests
- [ ] Fill all form fields properly
- [ ] Ensure items in cart

## Success Indicators

When it works, you'll see:
- ✅ Razorpay modal opens with white overlay
- ✅ Payment options tabs visible (Cards/UPI/etc)
- ✅ Nutri Nest branding in modal
- ✅ Amount displayed correctly
- ✅ Can enter card details
- ✅ QR code visible for UPI

If you see all these, you're good!
