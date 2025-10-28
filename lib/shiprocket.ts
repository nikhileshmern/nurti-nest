import axios from 'axios'
import { isTestMode, getTestModeConfig, generateMockShipmentResponse, generateMockTrackingResponse } from './test-utils'

const SHIPROCKET_BASE_URL = process.env.SHIPROCKET_BASE_URL || 'https://apiv2.shiprocket.in'

interface ShiprocketAuthResponse {
  token: string
}

interface CreateShipmentData {
  order_id: string
  order_date: string
  pickup_location: string
  billing_customer_name: string
  billing_last_name: string
  billing_address: string
  billing_address_2: string
  billing_city: string
  billing_pincode: string
  billing_state: string
  billing_country: string
  billing_email: string
  billing_phone: string
  shipping_is_billing: boolean
  shipping_customer_name: string
  shipping_last_name: string
  shipping_address: string
  shipping_address_2: string
  shipping_city: string
  shipping_pincode: string
  shipping_state: string
  shipping_country: string
  shipping_email: string
  shipping_phone: string
  order_items: Array<{
    name: string
    sku: string
    units: number
    selling_price: number
  }>
  payment_method: string
  sub_total: number
  length: number
  breadth: number
  height: number
  weight: number
}

let authToken: string | null = null

export async function getShiprocketToken(): Promise<string> {
  if (authToken) {
    return authToken as string
  }

  if (isTestMode()) {
    console.log('🧪 Test Mode: Using mock Shiprocket token')
    authToken = 'test_token_' + Date.now()
    return authToken
  }

  try {
    const response = await axios.post(`${SHIPROCKET_BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    })

    authToken = response.data.token
    if (!authToken) {
      throw new Error('No token received from Shiprocket')
    }
    return authToken
  } catch (error) {
    console.error('Shiprocket authentication failed:', error)
    throw new Error('Failed to authenticate with Shiprocket')
  }
}

export async function createShipment(data: CreateShipmentData): Promise<any> {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Creating mock shipment...', data)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockResponse = generateMockShipmentResponse(data.order_id)
    console.log('🧪 Test Mode: Shipment created', mockResponse)
    return mockResponse
  }

  try {
    const token = await getShiprocketToken()
    
    const response = await axios.post(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Shiprocket shipment creation failed:', error)
    throw new Error('Failed to create shipment')
  }
}

export async function getTrackingInfo(awb: string): Promise<any> {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Getting mock tracking info for AWB:', awb)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockResponse = generateMockTrackingResponse(awb)
    console.log('🧪 Test Mode: Tracking info retrieved', mockResponse)
    return mockResponse
  }

  try {
    const token = await getShiprocketToken()
    
    const response = await axios.get(`${SHIPROCKET_BASE_URL}/courier/track/awb/${awb}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Shiprocket tracking failed:', error)
    throw new Error('Failed to get tracking information')
  }
}
