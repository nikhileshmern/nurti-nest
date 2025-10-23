export interface Product {
  id: string
  name: string
  slug: string
  flavour: string
  description: string
  price: number
  image_url: string
  stock: number
  created_at: string
  updated_at: string
}

export interface Combo {
  id: string
  name: string
  description: string
  price: number
  discount_percentage: number
  included_products: string[]
  image_url: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_email: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  subtotal: number
  shipping: number
  total: number
  razorpay_order_id: string | null
  shiprocket_awb: string | null
  tracking_url: string | null
  address_json: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
  items: {
    id: string
    name: string
    price: number
    quantity: number
    flavour?: string
  }[]
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
      combos: {
        Row: Combo
        Insert: Omit<Combo, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Combo, 'id' | 'created_at' | 'updated_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>
      }
      newsletter_subscribers: {
        Row: NewsletterSubscriber
        Insert: Omit<NewsletterSubscriber, 'id' | 'created_at'>
        Update: Partial<Omit<NewsletterSubscriber, 'id' | 'created_at'>>
      }
      contact_messages: {
        Row: ContactMessage
        Insert: Omit<ContactMessage, 'id' | 'created_at'>
        Update: Partial<Omit<ContactMessage, 'id' | 'created_at'>>
      }
    }
  }
}
