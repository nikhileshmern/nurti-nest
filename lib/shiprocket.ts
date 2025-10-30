import axios from 'axios'
import { isTestMode, getTestModeConfig, generateMockShipmentResponse, generateMockTrackingResponse } from './test-utils'

const SHIPROCKET_BASE_URL = process.env.SHIPROCKET_BASE_URL || 'https://apiv2.shiprocket.in'

interface ShiprocketAuthResponse {
  token: string
}

export interface CreateShipmentData {
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

export interface ShippingRateRequest {
  pickup_postcode: string
  delivery_postcode: string
  weight: number // in kg
  cod: 0 | 1 // 0 for prepaid, 1 for COD
}

export interface CourierServiceability {
  courier_name: string
  courier_company_id: number
  rate: number
  estimated_delivery_days: string
  cod: number
  is_surface: boolean
  is_rto_address_available: boolean
}

export interface ShipmentResponse {
  order_id: number
  shipment_id: number
  awb_code?: string
  awb?: string
  courier_name?: string
  courier_company_id?: number
  status: string
  tracking_url?: string
}

export interface TrackingData {
  awb_code: string
  current_status: string
  shipment_status: string
  shipment_track: Array<{
    date: string
    status: string
    activity: string
    location: string
  }>
  shipment_track_activities: Array<{
    date: string
    status: string
    activity: string
    location: string
    'sr-status': string
    'sr-status-label': string
  }>
}

let authToken: string | null = null
let tokenExpiry: number | null = null

export async function getShiprocketToken(): Promise<string> {
  // Check if token exists and hasn't expired (tokens typically last 10 days)
  if (authToken && tokenExpiry && Date.now() < tokenExpiry) {
    return authToken
  }

  if (isTestMode()) {
    console.log('🧪 Test Mode: Using mock Shiprocket token')
    authToken = 'test_token_' + Date.now()
    tokenExpiry = Date.now() + (10 * 24 * 60 * 60 * 1000) // 10 days
    return authToken
  }

  try {
    console.log('🔐 Authenticating with Shiprocket...')
    const response = await axios.post(`${SHIPROCKET_BASE_URL}/v1/external/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    })

    authToken = response.data.token
    tokenExpiry = Date.now() + (9 * 24 * 60 * 60 * 1000) // 9 days for safety
    
    if (!authToken) {
      throw new Error('No token received from Shiprocket')
    }
    
    console.log('✅ Shiprocket authentication successful')
    return authToken
  } catch (error) {
    console.error('❌ Shiprocket authentication failed:', error)
    throw new Error('Failed to authenticate with Shiprocket')
  }
}

export async function getShippingRates(data: ShippingRateRequest): Promise<CourierServiceability[]> {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Generating mock shipping rates', data)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Return mock shipping rates
    return [
      {
        courier_name: 'Test Express',
        courier_company_id: 1,
        rate: 50,
        estimated_delivery_days: '2-3',
        cod: data.cod,
        is_surface: false,
        is_rto_address_available: true,
      },
      {
        courier_name: 'Test Standard',
        courier_company_id: 2,
        rate: 30,
        estimated_delivery_days: '4-5',
        cod: data.cod,
        is_surface: true,
        is_rto_address_available: true,
      },
    ]
  }

  try {
    const token = await getShiprocketToken()
    
    const response = await axios.get(`${SHIPROCKET_BASE_URL}/v1/external/courier/serviceability/`, {
      params: data,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data.data.available_courier_companies || []
  } catch (error) {
    console.error('❌ Failed to get shipping rates:', error)
    throw new Error('Failed to calculate shipping rates')
  }
}

export async function createShipment(data: CreateShipmentData): Promise<ShipmentResponse> {
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
    
    console.log('📦 Creating Shiprocket shipment for order:', data.order_id)
    const response = await axios.post(`${SHIPROCKET_BASE_URL}/v1/external/orders/create/adhoc`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('✅ Shipment created successfully:', response.data)
    return response.data
  } catch (error: any) {
    console.error('❌ Shiprocket shipment creation failed:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Failed to create shipment')
  }
}

export async function getTrackingInfo(awb: string): Promise<TrackingData> {
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
    
    const response = await axios.get(`${SHIPROCKET_BASE_URL}/v1/external/courier/track/awb/${awb}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    return response.data.tracking_data
  } catch (error) {
    console.error('❌ Shiprocket tracking failed:', error)
    throw new Error('Failed to get tracking information')
  }
}

export async function generateAWB(shipment_id: number, courier_id: number): Promise<any> {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Generating mock AWB for shipment:', shipment_id)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      awb_code: `TEST${Date.now()}`,
      courier_name: 'Test Courier',
      response: {
        data: {
          awb_code: `TEST${Date.now()}`,
        }
      }
    }
  }

  try {
    const token = await getShiprocketToken()
    
    const response = await axios.post(
      `${SHIPROCKET_BASE_URL}/v1/external/courier/assign/awb`,
      {
        shipment_id,
        courier_id,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('❌ Failed to generate AWB:', error)
    throw new Error('Failed to generate AWB')
  }
}

export async function schedulePickup(shipment_id: number): Promise<any> {
  if (isTestMode()) {
    console.log('🧪 Test Mode: Scheduling mock pickup for shipment:', shipment_id)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      pickup_scheduled_date: new Date().toISOString(),
      pickup_token_number: `TEST${Date.now()}`,
    }
  }

  try {
    const token = await getShiprocketToken()
    
    const response = await axios.post(
      `${SHIPROCKET_BASE_URL}/v1/external/courier/generate/pickup`,
      {
        shipment_id: [shipment_id],
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('❌ Failed to schedule pickup:', error)
    throw new Error('Failed to schedule pickup')
  }
}
