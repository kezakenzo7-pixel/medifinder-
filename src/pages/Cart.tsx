import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { Medicine } from '../types'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  ArrowRight,
  Package,
  DollarSign,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const Cart = () => {
  const navigate = useNavigate()
  const { state, removeFromCart, updateQuantity, clearCart } = useCart()

  const handleCheckout = () => {
    if (state.items.length === 0) return
    navigate('/checkout', { state: { cart: state.items } })
  }

  const handleQuantityChange = (medicineId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(medicineId)
    } else {
      updateQuantity(medicineId, newQuantity)
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600' }
    if (stock < 10) return { text: 'Low Stock', color: 'text-yellow-600' }
    return { text: 'In Stock', color: 'text-green-600' }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any medicines to your cart yet.</p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/search')}
              className="w-full btn btn-primary flex items-center justify-center space-x-2"
            >
              <Package className="h-5 w-5" />
              <span>Browse Medicines</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full btn btn-secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">
                {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            {state.items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center space-x-1"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear Cart</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {state.items.map((item) => {
                  const stockStatus = getStockStatus(item.medicine.stock)
                  return (
                    <div key={item.medicine.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Medicine Image */}
                        <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="h-10 w-10 text-blue-600" />
                        </div>
                        
                        {/* Medicine Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {item.medicine.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {item.medicine.manufacturer} • {item.medicine.dosage}
                              </p>
                              <div className="flex items-center space-x-3 mb-3">
                                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                  {item.medicine.category}
                                </span>
                                {item.medicine.prescriptionRequired && (
                                  <span className="bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>Rx Required</span>
                                  </span>
                                )}
                                <span className={`text-xs font-medium ${stockStatus.color}`}>
                                  {stockStatus.text}
                                </span>
                              </div>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.medicine.id)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          
                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-gray-700">Quantity:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(item.medicine.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.medicine.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                  disabled={item.quantity >= item.medicine.stock}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              {item.quantity >= item.medicine.stock && (
                                <span className="text-xs text-yellow-600">Max stock reached</span>
                              )}
                            </div>
                            
                            {/* Price */}
                            <div className="text-right">
                              <div className="text-sm text-gray-500">
                                ${item.medicine.priceRWF} × {item.quantity}
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                ${(item.medicine.priceRWF * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">$5.99</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${(state.total * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${(state.total + 5.99 + (state.total * 0.08)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full btn btn-primary flex items-center justify-center space-x-2 mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Security Badge */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/search')}
                className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
