// WhatsApp messaging service using Twilio
// To use: npm install twilio
// Get credentials from: https://console.twilio.com

import { isTestMode } from './test-utils'

// Lazy load Twilio (only imported when needed)
let twilioClient: any = null

const getTwilioClient = () => {
  if (twilioClient) return twilioClient

  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn('⚠️ Twilio not configured. WhatsApp messages will be logged only.')
    return null
  }

  try {
    // @ts-ignore - twilio types will be available after installation
    const twilio = require('twilio')
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )
    return twilioClient
  } catch (error) {
    console.error('❌ Failed to initialize Twilio:', error)
    return null
  }
}

interface OrderWhatsAppData {
  orderNumber: string
  customerName: string
  customerPhone: string
  items: Array<{
    name: string
    quantity: number
  }>
  total: number
  orderUrl?: string
}

interface ShipmentWhatsAppData {
  orderNumber: string
  customerName: string
  customerPhone: string
  awbCode: string
  trackingUrl: string
  courierName: string
}

/**
 * Send WhatsApp message for order confirmation
 */
export async function sendOrderWhatsApp(data: OrderWhatsAppData) {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Simulating WhatsApp order confirmation')
    console.log('To:', data.customerPhone)
    console.log('Message: Order confirmed #' + data.orderNumber)
    return { success: true, messageId: 'test_wa_' + Date.now() }
  }

  const client = getTwilioClient()
  
  if (!client) {
    console.log('📱 WhatsApp message would be sent to:', data.customerPhone)
    return { success: true, messageId: 'whatsapp_not_configured' }
  }

  try {
    // Format phone number (must include country code)
    const formattedPhone = formatPhoneNumber(data.customerPhone)
    
    // Create message content
    const message = generateOrderMessage(data)

    // Send via Twilio WhatsApp
    const response = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Your Twilio WhatsApp number
      to: `whatsapp:${formattedPhone}`,
      body: message,
    })

    console.log('✅ WhatsApp order confirmation sent:', response.sid)
    return { success: true, messageId: response.sid }
  } catch (error: any) {
    console.error('❌ WhatsApp send error:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Send WhatsApp message for shipment tracking
 */
export async function sendShipmentWhatsApp(data: ShipmentWhatsAppData) {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Simulating WhatsApp shipment notification')
    console.log('To:', data.customerPhone)
    console.log('Message: Order shipped #' + data.orderNumber)
    return { success: true, messageId: 'test_wa_' + Date.now() }
  }

  const client = getTwilioClient()
  
  if (!client) {
    console.log('📱 WhatsApp shipment message would be sent to:', data.customerPhone)
    return { success: true, messageId: 'whatsapp_not_configured' }
  }

  try {
    const formattedPhone = formatPhoneNumber(data.customerPhone)
    const message = generateShipmentMessage(data)

    const response = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`,
      body: message,
    })

    console.log('✅ WhatsApp shipment notification sent:', response.sid)
    return { success: true, messageId: response.sid }
  } catch (error: any) {
    console.error('❌ WhatsApp send error:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Format phone number to include country code
 */
function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '')
  
  // If doesn't start with country code, assume India (+91)
  if (!cleaned.startsWith('91') && cleaned.length === 10) {
    cleaned = '91' + cleaned
  }
  
  return '+' + cleaned
}

/**
 * Generate order confirmation message
 */
function generateOrderMessage(data: OrderWhatsAppData): string {
  const itemsList = data.items
    .map(item => `• ${item.name} (${item.quantity}x)`)
    .join('\n')

  return `
🎉 *Order Confirmed!*

Hi ${data.customerName}! 👋

Thank you for your order from Nutri Nest.

📦 *Order #${data.orderNumber}*

*Items:*
${itemsList}

💰 *Total Paid:* ₹${data.total}

Your order is being prepared and will be shipped soon. You'll receive another message with tracking details once it's dispatched.

${data.orderUrl ? `\n🔗 Track your order: ${data.orderUrl}` : ''}

Need help? Reply to this message or call us at +91-XXXXXXXXXX

Thank you for choosing Nutri Nest! 🌟
  `.trim()
}

/**
 * Generate shipment tracking message
 */
function generateShipmentMessage(data: ShipmentWhatsAppData): string {
  return `
📦 *Order Shipped!*

Hi ${data.customerName}! 👋

Great news! Your order has been shipped.

📋 *Order #${data.orderNumber}*

🚚 *Courier:* ${data.courierName}
📍 *Tracking ID:* ${data.awbCode}

🔗 *Track your shipment:*
${data.trackingUrl}

Your order should arrive within 3-5 business days.

Questions? Reply to this message!

Thank you for shopping with Nutri Nest! 💚
  `.trim()
}

/**
 * Send custom WhatsApp message
 */
export async function sendCustomWhatsApp(phone: string, message: string) {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Simulating custom WhatsApp message')
    console.log('To:', phone)
    console.log('Message:', message.substring(0, 50) + '...')
    return { success: true, messageId: 'test_wa_' + Date.now() }
  }

  const client = getTwilioClient()
  
  if (!client) {
    console.log('📱 WhatsApp message would be sent')
    return { success: true, messageId: 'whatsapp_not_configured' }
  }

  try {
    const formattedPhone = formatPhoneNumber(phone)

    const response = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`,
      body: message,
    })

    console.log('✅ WhatsApp message sent:', response.sid)
    return { success: true, messageId: response.sid }
  } catch (error: any) {
    console.error('❌ WhatsApp send error:', error.message)
    return { success: false, error: error.message }
  }
}

