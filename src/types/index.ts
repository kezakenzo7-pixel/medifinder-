export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'pharmacist' | 'user' | 'patient'
  avatar?: string
  createdAt: string
  phone?: string
  address?: string
  dateOfBirth?: string
  bloodGroup?: string
  allergies?: string[]
  chronicConditions?: string[]
  lastLogin?: Date
  pharmacyId?: string
  firstName?: string
  lastName?: string
  gender?: string
  height?: string
  weight?: string
  medications?: string
  emergencyContact?: string
  emergencyPhone?: string
  city?: string
  country?: string
}

export interface Medicine {
  id: string
  name: string
  description: string
  category: string
  manufacturer: string
  price: number
  priceRWF: number
  stock: number
  dosage: string
  prescriptionRequired: boolean
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
  addedBy: string
  pharmacyId?: string
}

export interface Pharmacy {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  coordinates: {
    lat: number
    lng: number
  }
  rating: number
  licenseNumber: string
  operatingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  deliveryAvailable: boolean
  deliveryRadius: number
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
  verified: boolean
}

export interface Order {
  id: string
  userId: string
  pharmacyId: string
  medicines: OrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'cash' | 'card' | 'upi' | 'netbanking'
  deliveryAddress: string
  deliveryType: 'pickup' | 'delivery'
  estimatedDeliveryTime?: Date
  actualDeliveryTime?: Date
  prescriptionUrl?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  medicineId: string
  medicineName: string
  quantity: number
  price: number
  totalPrice: number
}

export interface Payment {
  id: string
  orderId: string
  amount: number
  method: 'cash' | 'card' | 'upi' | 'netbanking'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  gatewayResponse?: any
  createdAt: Date
  processedAt?: Date
}

export interface Report {
  id: string
  type: 'sales' | 'inventory' | 'orders' | 'customers'
  title: string
  description: string
  data: any
  generatedBy: string
  pharmacyId?: string
  dateRange: {
    start: Date
    end: Date
  }
  createdAt: Date
  fileUrl?: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export interface CartItem {
  medicine: Medicine
  quantity: number
  pharmacyId: string
}
