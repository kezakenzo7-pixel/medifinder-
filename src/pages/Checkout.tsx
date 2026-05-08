import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { CartItem, Payment, Order } from '../types'
import { 
  ShoppingCart, 
  CreditCard, 
  Smartphone, 
  Building, 
  Truck, 
  Package, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Lock
} from 'lucide-react'

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mobilemoney' | 'cash' | 'card' | 'upi' | 'netbanking'>('mobilemoney')
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('delivery')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null)
  const [orderNotes, setOrderNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    if (location.state?.cart) {
      setCart(location.state.cart)
    } else {
      // Load cart from localStorage
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }

    // Pre-fill user information
    if (user) {
      setPhoneNumber(user.phone || '')
    }
  }, [location.state, user])

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + ((item.medicine as any).priceRWF || item.medicine.price) * item.quantity, 0)
    const deliveryFee = deliveryType === 'delivery' ? 5.99 : 0
    const tax = subtotal * 0.08 // 8% tax
    return {
      subtotal,
      deliveryFee,
      tax,
      total: subtotal + deliveryFee + tax
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const totals = calculateTotal()
    const newOrder: Order = {
      id: 'ORD' + Date.now(),
      userId: user?.id || 'guest',
      pharmacyId: cart[0]?.pharmacyId || '1',
      medicines: cart.map(item => ({
        medicineId: item.medicine.id,
        medicineName: item.medicine.name,
        quantity: item.quantity,
        price: (item.medicine as any).priceRWF || item.medicine.price,
        totalPrice: ((item.medicine as any).priceRWF || item.medicine.price) * item.quantity
      })),
      totalAmount: totals.total,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: selectedPaymentMethod,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : 'Pickup from pharmacy',
      deliveryType,
      prescriptionUrl: prescriptionFile ? URL.createObjectURL(prescriptionFile) : undefined,
      notes: orderNotes,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Save order
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    existingOrders.push(newOrder)
    localStorage.setItem('orders', JSON.stringify(existingOrders))
    
    // Create payment notification for mobile money receiver
    const paymentNotification = {
      id: Date.now().toString(),
      orderId: newOrder.id,
      amount: totals.total,
      paymentMethod: selectedPaymentMethod,
      payerName: user?.name || 'Guest User',
      payerPhone: phoneNumber,
      receiverPhone: '+250788123456', // Pharmacy phone number
      receiverName: 'MediCare+ Pharmacy',
      status: 'received',
      timestamp: new Date().toISOString(),
      message: `Payment of RWF ${totals.total.toFixed(2)} received for order ${newOrder.id}`,
      type: 'payment_received'
    }
    
    // Save payment notification
    const existingNotifications = JSON.parse(localStorage.getItem('paymentNotifications') || '[]')
    existingNotifications.push(paymentNotification)
    localStorage.setItem('paymentNotifications', JSON.stringify(existingNotifications))
    
    // Send SMS notification (simulated)
    if (selectedPaymentMethod === 'mobilemoney') {
      console.log('SMS sent to receiver:', {
        to: paymentNotification.receiverPhone,
        message: `You have received RWF ${totals.total.toFixed(2)} from ${paymentNotification.payerName}. Order ID: ${newOrder.id}. Thank you for using MediCare+!`
      })
    }
    
    setOrderId(newOrder.id)
    setOrderPlaced(true)
    setIsProcessing(false)
    
    // Clear cart
    localStorage.removeItem('cart')
    setCart([])
  }

  const paymentMethods = [
    {
      id: 'mobilemoney',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'MoMo, Airtel Money, Tigo Cash',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, Rupay',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks supported',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100'
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: DollarSign,
      description: 'Pay when you receive',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ]

  const totals = calculateTotal()

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="card p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="text-xl font-bold text-gray-900">{orderId}</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-gray-900">${totals.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium text-gray-900">
                  {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Type</span>
                <span className="font-medium text-gray-900 capitalize">{deliveryType}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/profile/orders')}
                className="btn btn-primary w-full"
              >
                View Order Details
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn btn-secondary w-full"
              >
                Continue Shopping
              </button>
            </div>
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
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Shopping</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6 max-w-2xl">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mt-2">
            <span className={`text-sm ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Cart Review
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Delivery & Payment
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Confirmation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Cart Review */}
            {currentStep === 1 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.medicine.name}</h3>
                          <p className="text-sm text-gray-600">{item.medicine.manufacturer}</p>
                          <p className="text-sm text-gray-600">{item.medicine.dosage}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="font-semibold text-gray-900">
                          ${(((item.medicine as any).priceRWF || item.medicine.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => navigate('/search')}
                    className="btn btn-secondary"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    <span>Proceed to Delivery</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Delivery & Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Delivery Information */}
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        deliveryType === 'delivery'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Home Delivery</h3>
                      <p className="text-sm text-gray-600">Get it delivered to your doorstep</p>
                      <p className="text-sm font-medium text-blue-600 mt-2">+$5.99</p>
                    </button>
                    
                    <button
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        deliveryType === 'pickup'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Store Pickup</h3>
                      <p className="text-sm text-gray-600">Pick up from the pharmacy</p>
                      <p className="text-sm font-medium text-green-600 mt-2">Free</p>
                    </button>
                  </div>

                  {deliveryType === 'delivery' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                        <textarea
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="input"
                          rows={3}
                          placeholder="Enter your complete delivery address..."
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="input"
                        placeholder="+1234567890"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes (Optional)</label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="input"
                        rows={2}
                        placeholder="Any special instructions..."
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id as any)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            selectedPaymentMethod === method.id
                              ? 'border-blue-500 bg-gradient-to-r ' + method.bgColor
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${method.color} text-white`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn btn-secondary"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Confirmation</h2>
                
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      {cart.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.medicine.name} x {item.quantity}</span>
                          <span>${(((item.medicine as any).priceRWF || item.medicine.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-gray-400" />
                        <span className="capitalize">{deliveryType}</span>
                      </div>
                      {deliveryType === 'delivery' && deliveryAddress && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{deliveryAddress}</span>
                        </div>
                      )}
                      {phoneNumber && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const Icon = paymentMethods.find(m => m.id === selectedPaymentMethod)?.icon || CreditCard
                        return <Icon className="h-4 w-4 text-gray-400" />
                      })()}
                      <span>{paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Secure Payment</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn btn-secondary"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        <span>Place Order • ${totals.total.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
                </div>
                
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">${totals.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${totals.tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Prescription Upload */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Prescription</span>
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setPrescriptionFile(e.target.files?.[0] || null)}
                  className="text-sm"
                />
                {prescriptionFile && (
                  <p className="text-xs text-blue-700 mt-2">{prescriptionFile.name} uploaded</p>
                )}
              </div>

              {/* Contact Support */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Need help?</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
