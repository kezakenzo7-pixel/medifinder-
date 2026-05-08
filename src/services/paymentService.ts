// Payment service for handling mobile money and notifications
export interface PaymentNotification {
  id: string
  orderId: string
  amount: number
  paymentMethod: string
  payerName: string
  payerPhone: string
  receiverPhone: string
  receiverName: string
  status: 'pending' | 'received' | 'confirmed'
  timestamp: string
  message: string
  type: 'payment_received' | 'payment_initiated'
}

export interface PaymentRequest {
  orderId: string
  amount: number
  paymentMethod: 'mobilemoney' | 'cash' | 'card' | 'upi' | 'netbanking'
  customerName: string
  customerPhone: string
  receiverPhone: string
  receiverName: string
  timestamp: string
}

export const paymentService = {
  // Process mobile money payment
  processMobileMoneyPayment: async (paymentRequest: PaymentRequest): Promise<PaymentNotification> => {
    // Simulate mobile money processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const notification: PaymentNotification = {
      id: Date.now().toString(),
      orderId: paymentRequest.orderId,
      amount: paymentRequest.amount,
      paymentMethod: paymentRequest.paymentMethod,
      payerName: paymentRequest.customerName,
      payerPhone: paymentRequest.customerPhone,
      receiverPhone: paymentRequest.receiverPhone,
      receiverName: paymentRequest.receiverName,
      status: 'received',
      timestamp: new Date().toISOString(),
      message: `Payment of RWF ${paymentRequest.amount.toFixed(2)} received for order ${paymentRequest.orderId}`,
      type: 'payment_received'
    }
    
    // Save notification to localStorage
    const existingNotifications = JSON.parse(localStorage.getItem('paymentNotifications') || '[]')
    existingNotifications.push(notification)
    localStorage.setItem('paymentNotifications', JSON.stringify(existingNotifications))
    
    // Send SMS notification (simulated)
    console.log('SMS sent to receiver:', {
      to: paymentRequest.receiverPhone,
      message: `You have received RWF ${paymentRequest.amount.toFixed(2)} from ${paymentRequest.customerName}. Order ID: ${paymentRequest.orderId}. Thank you for using MediCare+!`
    })
    
    return notification
  },

  // Get payment notifications for receiver
  getPaymentNotifications: (): PaymentNotification[] => {
    const notifications = JSON.parse(localStorage.getItem('paymentNotifications') || '[]')
    return notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  },

  // Mark notification as read
  markNotificationAsRead: (notificationId: string): void => {
    const notifications = JSON.parse(localStorage.getItem('paymentNotifications') || '[]')
    const updatedNotifications = notifications.map((n: PaymentNotification) => 
      n.id === notificationId ? { ...n, status: 'confirmed' as const } : n
    )
    localStorage.setItem('paymentNotifications', JSON.stringify(updatedNotifications))
  },

  // Get pending payments
  getPendingPayments: (): PaymentNotification[] => {
    const notifications = JSON.parse(localStorage.getItem('paymentNotifications') || '[]')
    return notifications.filter(n => n.status === 'pending')
  },

  // Send payment confirmation to customer
  sendPaymentConfirmation: async (customerPhone: string, orderId: string, amount: number): Promise<void> => {
    // Simulate SMS sending
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Payment confirmation sent to customer:', {
      to: customerPhone,
      message: `Your payment of RWF ${amount.toFixed(2)} for order ${orderId} has been confirmed. Thank you for your order!`
    })
  },

  // Generate payment instructions for mobile money
  generateMobileMoneyInstructions: (paymentMethod: string, amount: number, orderId: string): string => {
    switch (paymentMethod) {
      case 'mobilemoney':
        return `Dial *182*1*2*3*4*5# and enter amount ${amount.toFixed(2)}. Reference: ${orderId}`
      case 'card':
        return `Card payment of RWF ${amount.toFixed(2)} processed for order ${orderId}`
      case 'cash':
        return `Please prepare RWF ${amount.toFixed(2)} for delivery. Order: ${orderId}`
      default:
        return `Payment instructions for ${paymentMethod} - Amount: RWF ${amount.toFixed(2)}, Order: ${orderId}`
    }
  }
}
