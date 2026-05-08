import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { Medicine } from '../types'

interface CartItem {
  medicine: Medicine
  quantity: number
  pharmacyId: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { medicine: Medicine; quantity: number; pharmacyId: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { medicineId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { medicine, quantity, pharmacyId } = action.payload
      const existingItemIndex = state.items.findIndex(item => item.medicine.id === medicine.id)
      
      let newItems: CartItem[]
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item
        newItems = [...state.items, { medicine, quantity, pharmacyId }]
      }
      
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.medicine.priceRWF * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.medicine.id !== action.payload)
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.medicine.priceRWF * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const { medicineId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: medicineId })
      }
      
      const newItems = state.items.map(item =>
        item.medicine.id === medicineId
          ? { ...item, quantity }
          : item
      )
      
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.medicine.priceRWF * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    }
    
    case 'CLEAR_CART':
      return initialState
    
    case 'LOAD_CART': {
      const items = action.payload
      return {
        items,
        total: items.reduce((sum, item) => sum + (item.medicine.priceRWF * item.quantity), 0),
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
      }
    }
    
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addToCart: (medicine: Medicine, quantity: number, pharmacyId: string) => void
  removeFromCart: (medicineId: string) => void
  updateQuantity: (medicineId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        localStorage.removeItem('cart')
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (medicine: Medicine, quantity: number, pharmacyId: string) => {
    if (quantity <= 0) return
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: { medicine, quantity, pharmacyId }
    })
  }

  const removeFromCart = (medicineId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: medicineId })
  }

  const updateQuantity = (medicineId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { medicineId, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
