'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import toast from 'react-hot-toast'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  flavour: string
  quantity: number
}

export interface AppliedCoupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  description: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  appliedCoupon: AppliedCoupon | null
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nutri-nest-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }

    // Load coupon from localStorage
    const savedCoupon = localStorage.getItem('nutri-nest-coupon')
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon))
      } catch (error) {
        console.error('Error loading coupon from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('nutri-nest-cart', JSON.stringify(items))
  }, [items])

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('nutri-nest-coupon', JSON.stringify(appliedCoupon))
    } else {
      localStorage.removeItem('nutri-nest-coupon')
    }
  }, [appliedCoupon])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        const updatedItems = prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
        return updatedItems
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
    
    // Show toast notification after state update
    const existingItem = items.find(i => i.id === item.id)
    if (existingItem) {
      toast.success(`${item.name} quantity updated!`)
    } else {
      toast.success(`${item.name} added to cart!`)
    }
    
    // Automatically open cart drawer
    setIsCartOpen(true)
  }

  const removeItem = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === id)
      if (item) {
        toast.success(`${item.name} removed from cart!`)
      }
      return prevItems.filter(i => i.id !== id)
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setAppliedCoupon(null) // Also clear coupon when cart is cleared
    toast.success('Cart cleared!')
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        setAppliedCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
