// Email service using SMTP (Nodemailer)
// To use this, install: npm install nodemailer @types/nodemailer
// And add SMTP credentials to your .env.local

import { isTestMode } from './test-utils'
// @ts-ignore - nodemailer types will be available after installation
import nodemailer from 'nodemailer'

// Create reusable transporter
const createTransporter = () => {
  if (!process.env.SMTP_HOST) {
    console.warn('⚠️ SMTP not configured. Emails will be logged to console.')
    return null
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

interface OrderConfirmationData {
  orderNumber: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
    flavour?: string
  }>
  subtotal: number
  shipping: number
  total: number
  address: {
    name: string
    address: string
    city: string
    state: string
    pincode: string
    phone: string
  }
}

interface ShipmentNotificationData {
  orderNumber: string
  customerName: string
  customerEmail: string
  awbCode: string
  trackingUrl: string
  courierName: string
  estimatedDelivery?: string
}

interface AdminOrderNotificationData {
  orderNumber: string
  orderDate: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: Array<{
    name: string
    quantity: number
    price: number
    flavour?: string
  }>
  subtotal: number
  shipping: number
  total: number
  paymentId: string
  address: {
    name: string
    address: string
    city: string
    state: string
    pincode: string
    phone: string
  }
}

export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Simulating order confirmation email')
    console.log('To:', data.customerEmail)
    console.log('Subject: Order Confirmation - #' + data.orderNumber)
    return { success: true, messageId: 'test_' + Date.now() }
  }

  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('📧 Order confirmation email would be sent to:', data.customerEmail)
      return { success: true, messageId: 'smtp_not_configured' }
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Nutri Nest" <orders@mynutrinest.in>',
      to: data.customerEmail,
      subject: `Order Confirmation - #${data.orderNumber}`,
      html: generateOrderConfirmationHTML(data),
    })

    console.log('✅ Order confirmation email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email service error:', error)
    return { success: false, error }
  }
}

export async function sendShipmentNotificationEmail(data: ShipmentNotificationData) {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Simulating shipment notification email')
    console.log('To:', data.customerEmail)
    console.log('Subject: Order Shipped - #' + data.orderNumber)
    return { success: true, messageId: 'test_' + Date.now() }
  }

  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('📧 Shipment notification email would be sent to:', data.customerEmail)
      return { success: true, messageId: 'smtp_not_configured' }
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Nutri Nest" <orders@mynutrinest.in>',
      to: data.customerEmail,
      subject: `Order Shipped - #${data.orderNumber}`,
      html: generateShipmentNotificationHTML(data),
    })

    console.log('✅ Shipment notification email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email service error:', error)
    return { success: false, error }
  }
}

export async function sendAdminOrderNotification(data: AdminOrderNotificationData) {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Simulating admin order notification email')
    console.log('To:', process.env.ADMIN_EMAIL || 'admin@mynutrinest.in')
    console.log('Subject: 🔔 New Order Received - #' + data.orderNumber)
    return { success: true, messageId: 'test_' + Date.now() }
  }

  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('📧 Admin order notification would be sent')
      return { success: true, messageId: 'smtp_not_configured' }
    }

    const adminEmail = process.env.ADMIN_EMAIL
    
    if (!adminEmail) {
      console.warn('⚠️ ADMIN_EMAIL not configured. Skipping admin notification.')
      return { success: false, error: 'Admin email not configured' }
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Nutri Nest" <orders@mynutrinest.in>',
      to: adminEmail,
      subject: `🔔 New Order Received - #${data.orderNumber}`,
      html: generateAdminOrderNotificationHTML(data),
    })

    console.log('✅ Admin order notification sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Admin email service error:', error)
    return { success: false, error }
  }
}

// Email HTML Templates
function generateOrderConfirmationHTML(data: OrderConfirmationData): string {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        ${item.name}${item.flavour ? ` (${item.flavour})` : ''}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        ₹${item.price.toFixed(2)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">
        ₹${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px;">Thank You for Your Order!</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Order #${data.orderNumber}</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
                Hi ${data.customerName},
              </p>
              <p style="font-size: 16px; color: #374151; margin: 0 0 30px 0;">
                We've received your order and we're getting it ready. We'll notify you once it ships!
              </p>
              
              <!-- Order Items -->
              <h2 style="font-size: 20px; color: #111827; margin: 0 0 20px 0;">Order Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; font-size: 14px; color: #6b7280;">Item</th>
                    <th style="padding: 12px; text-align: center; font-size: 14px; color: #6b7280;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px; color: #6b7280;">Price</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px; color: #6b7280;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
              
              <!-- Order Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                <tr>
                  <td style="padding: 8px 0; text-align: right; color: #6b7280;">Subtotal:</td>
                  <td style="padding: 8px 0 8px 20px; text-align: right; font-weight: 600; width: 120px;">₹${data.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; text-align: right; color: #6b7280;">Shipping:</td>
                  <td style="padding: 8px 0 8px 20px; text-align: right; font-weight: 600;">₹${data.shipping.toFixed(2)}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: bold; color: #111827;">Total:</td>
                  <td style="padding: 12px 0 12px 20px; text-align: right; font-size: 18px; font-weight: bold; color: #f97316;">₹${data.total.toFixed(2)}</td>
                </tr>
              </table>
              
              <!-- Shipping Address -->
              <h2 style="font-size: 20px; color: #111827; margin: 30px 0 15px 0;">Shipping Address</h2>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
                <p style="margin: 0; color: #374151; line-height: 1.6;">
                  <strong>${data.address.name}</strong><br>
                  ${data.address.address}<br>
                  ${data.address.city}, ${data.address.state} - ${data.address.pincode}<br>
                  Phone: ${data.address.phone}
                </p>
              </div>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="https://mynutrinest.in/orders" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View Order Status</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Questions? Contact us at <a href="mailto:support@mynutrinest.in" style="color: #f97316; text-decoration: none;">support@mynutrinest.in</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2025 Nutri Nest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function generateShipmentNotificationHTML(data: ShipmentNotificationData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px;">Your Order is On Its Way! 📦</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Order #${data.orderNumber}</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
                Hi ${data.customerName},
              </p>
              <p style="font-size: 16px; color: #374151; margin: 0 0 30px 0;">
                Great news! Your order has been shipped and is on its way to you.
              </p>
              
              <!-- Tracking Information -->
              <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
                <h2 style="font-size: 18px; color: #1e40af; margin: 0 0 15px 0;">Tracking Information</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af; font-size: 14px;">Tracking Number:</td>
                    <td style="padding: 8px 0; font-weight: 600; font-family: monospace; font-size: 16px; color: #1e3a8a;">${data.awbCode}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af; font-size: 14px;">Courier:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #1e3a8a;">${data.courierName}</td>
                  </tr>
                  ${
                    data.estimatedDelivery
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af; font-size: 14px;">Estimated Delivery:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #1e3a8a;">${data.estimatedDelivery}</td>
                  </tr>
                  `
                      : ''
                  }
                </table>
              </div>
              
              <!-- Track Order Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <a href="${data.trackingUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Track Your Order</a>
                  </td>
                </tr>
              </table>
              
              <p style="font-size: 14px; color: #6b7280; margin: 0; text-align: center;">
                You can also track your order by clicking the link above or visiting our website.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Questions? Contact us at <a href="mailto:support@mynutrinest.in" style="color: #3b82f6; text-decoration: none;">support@mynutrinest.in</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2025 Nutri Nest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function generateAdminOrderNotificationHTML(data: AdminOrderNotificationData): string {
  const itemsHTML = data.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}${item.flavour ? ` (${item.flavour})` : ''}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price.toFixed(2)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">₹${(item.price * item.quantity).toFixed(2)}</td>
    </tr>`).join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Order</title></head>
<body style="margin:0;padding:0;font-family:-apple-system,sans-serif;background:#f9fafb">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
        <tr><td style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:40px;text-align:center;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:32px">🔔 New Order!</h1>
          <p style="color:#fff;margin:10px 0 0;font-size:16px">Order #${data.orderNumber}</p>
          <p style="color:#d1fae5;margin:5px 0 0;font-size:14px">${data.orderDate}</p>
        </td></tr>
        <tr><td style="padding:40px">
          <h2 style="font-size:20px;color:#111827;margin:0 0 15px">👤 Customer</h2>
          <div style="background:#f9fafb;padding:20px;border-radius:8px;margin-bottom:30px">
            <p style="margin:0"><strong>${data.customerName}</strong><br><a href="mailto:${data.customerEmail}">${data.customerEmail}</a><br><a href="tel:${data.customerPhone}">${data.customerPhone}</a><br><br>${data.address.address}<br>${data.address.city}, ${data.address.state} - ${data.address.pincode}</p>
          </div>
          <h2 style="font-size:20px;color:#111827;margin:0 0 20px">📦 Items</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;margin-bottom:20px">
            <thead><tr style="background:#f9fafb">
              <th style="padding:12px;text-align:left">Product</th>
              <th style="padding:12px;text-align:center">Qty</th>
              <th style="padding:12px;text-align:right">Price</th>
              <th style="padding:12px;text-align:right">Total</th>
            </tr></thead>
            <tbody>${itemsHTML}</tbody>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="text-align:right;padding:8px 0">Subtotal:</td><td style="text-align:right;padding:8px 0 8px 20px;font-weight:600;width:120px">₹${data.subtotal.toFixed(2)}</td></tr>
            <tr><td style="text-align:right;padding:8px 0">Shipping:</td><td style="text-align:right;padding:8px 0 8px 20px;font-weight:600">₹${data.shipping.toFixed(2)}</td></tr>
            <tr style="border-top:2px solid #e5e7eb"><td style="text-align:right;padding:12px 0;font-size:18px;font-weight:bold">Total:</td><td style="text-align:right;padding:12px 0 12px 20px;font-size:18px;font-weight:bold;color:#10b981">₹${data.total.toFixed(2)}</td></tr>
          </table>
          <div style="background:#f0fdf4;padding:15px;border-radius:8px;margin:20px 0">
            <p style="margin:0"><strong>✅ Payment Confirmed</strong><br>ID: ${data.paymentId}</p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
