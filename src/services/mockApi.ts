// Mock API service for production deployment without external dependencies
// This can be easily replaced with real Firebase/Stripe integration later

interface MockResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Mock authentication service
export const mockAuthService = {
  signIn: async (email: string, password: string, selectedRole?: string): Promise<MockResponse<any>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user database
    const users = [
      { id: '1', email: 'admin@medicinefinder.com', password: 'password', role: 'admin', name: 'Admin User', phone: '+250788123456', createdAt: new Date().toISOString() },
      { id: '2', email: 'pharmacist@medicinefinder.com', password: 'password', role: 'pharmacist', name: 'Pharmacist User', phone: '+250788789012', createdAt: new Date().toISOString() },
      { id: '3', email: 'user@medicinefinder.com', password: 'password', role: 'user', name: 'Regular User', phone: '+250788345678', createdAt: new Date().toISOString() }
    ]
    
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      // Check if selected role matches user's actual role
      if (selectedRole && user.role !== selectedRole) {
        return { success: false, error: `This account is registered as a ${user.role}, not a ${selectedRole}` }
      }
      
      const { password, ...userWithoutPassword } = user
      
      // Save user to localStorage for session persistence
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      
      // Add login activity log
      const activity = {
        id: Date.now().toString(),
        userId: user.id,
        action: 'login',
        role: user.role,
        timestamp: new Date().toISOString(),
        details: `User ${user.name} logged in as ${user.role}`
      }
      
      // Save activity log
      const activities = JSON.parse(localStorage.getItem('systemActivities') || '[]')
      activities.push(activity)
      localStorage.setItem('systemActivities', JSON.stringify(activities))
      
      return { success: true, data: userWithoutPassword }
    }
    
    return { success: false, error: 'Invalid credentials' }
  },
  
  signUp: async (userData: any): Promise<MockResponse<any>> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    return { success: true, data: newUser }
  },
  
  signOut: async (): Promise<MockResponse<void>> => {
    localStorage.removeItem('currentUser')
    return { success: true }
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser')
    return userStr ? JSON.parse(userStr) : null
  }
}

// Mock medicine service
export const mockMedicineService = {
  getMedicines: async (): Promise<MockResponse<any[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const medicines = [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        description: 'Pain reliever and fever reducer',
        category: 'Analgesics',
        manufacturer: 'Rwanda Pharma',
        price: 500,
        stock: 100,
        prescriptionRequired: false,
        imageUrl: '/medicines/paracetamol.jpg'
      },
      {
        id: '2',
        name: 'Amoxicillin 250mg',
        description: 'Antibiotic for bacterial infections',
        category: 'Antibiotics',
        manufacturer: 'Global Pharma',
        price: 1200,
        stock: 50,
        prescriptionRequired: true,
        imageUrl: '/medicines/amoxicillin.jpg'
      },
      {
        id: '3',
        name: 'Vitamin D3 1000IU',
        description: 'Vitamin D supplement',
        category: 'Supplements',
        manufacturer: 'Health Plus',
        price: 800,
        stock: 200,
        prescriptionRequired: false,
        imageUrl: '/medicines/vitamind3.jpg'
      },
      {
        id: '4',
        name: 'Ibuprofen 400mg',
        description: 'Anti-inflammatory and pain reliever',
        category: 'Analgesics',
        manufacturer: 'Rwanda Pharma',
        price: 600,
        stock: 150,
        prescriptionRequired: false,
        imageUrl: '/medicines/ibuprofen.jpg'
      },
      {
        id: '5',
        name: 'Cetirizine 10mg',
        description: 'Antihistamine for allergies',
        category: 'Antihistamines',
        manufacturer: 'Rwanda Pharma',
        price: 400,
        stock: 120,
        prescriptionRequired: false,
        imageUrl: '/medicines/cetirizine.jpg'
      }
    ]
    
    return { success: true, data: medicines }
  },
  
  addMedicine: async (medicineData: any): Promise<MockResponse<string>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newMedicine = {
      id: Date.now().toString(),
      ...medicineData,
      createdAt: new Date().toISOString()
    }
    
    // In a real app, this would save to database
    return { success: true, data: newMedicine.id }
  },
  
  updateMedicine: async (id: string, medicineData: any): Promise<MockResponse<void>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real app, this would update database
    return { success: true }
  },
  
  deleteMedicine: async (id: string): Promise<MockResponse<void>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real app, this would delete from database
    return { success: true }
  }
}

// Mock pharmacy service
export const mockPharmacyService = {
  getPharmacies: async (): Promise<MockResponse<any[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const pharmacies = [
      {
        id: '1',
        name: 'Kigali Central Pharmacy',
        address: 'KN 4 Ave, Kigali, Rwanda',
        phone: '+250 788 123 456',
        email: 'info@kigalpharmacy.rw',
        coordinates: { lat: -1.9536, lng: 30.0605 },
        rating: 4.5,
        openingHours: '8:00 AM - 8:00 PM',
        services: ['Prescription Filling', 'Health Consultation', 'Delivery Service']
      },
      {
        id: '2',
        name: 'Remera Health Pharmacy',
        address: 'KG 5 Ave, Kigali, Rwanda',
        phone: '+250 788 789 012',
        email: 'contact@remerapharmacy.rw',
        coordinates: { lat: -1.9483, lng: 30.0628 },
        rating: 4.3,
        openingHours: '7:00 AM - 9:00 PM',
        services: ['24/7 Service', 'Emergency Medicine', 'Mobile Delivery']
      }
    ]
    
    return { success: true, data: pharmacies }
  }
}

// Mock order service
export const mockOrderService = {
  createOrder: async (orderData: any): Promise<MockResponse<string>> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newOrder = {
      id: `ORD${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    // In a real app, this would save to database
    return { success: true, data: newOrder.id }
  },
  
  getOrders: async (userId?: string): Promise<MockResponse<any[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const orders = [
      {
        id: 'ORD001',
        userId: '3',
        medicines: [
          { name: 'Paracetamol 500mg', quantity: 2, price: 500 },
          { name: 'Vitamin D3 1000IU', quantity: 1, price: 800 }
        ],
        pharmacy: 'Kigali Central Pharmacy',
        total: 1800,
        status: 'delivered',
        createdAt: '2024-01-15T10:30:00Z',
        deliveryAddress: 'KN 4 Ave, Kigali'
      },
      {
        id: 'ORD002',
        userId: '3',
        medicines: [
          { name: 'Amoxicillin 250mg', quantity: 1, price: 1200 }
        ],
        pharmacy: 'Remera Health Pharmacy',
        total: 1200,
        status: 'processing',
        createdAt: '2024-01-18T14:20:00Z',
        deliveryAddress: 'KG 5 Ave, Kigali'
      }
    ]
    
    const userOrders = userId ? orders.filter(order => order.userId === userId) : orders
    return { success: true, data: userOrders }
  },
  
  updateOrderStatus: async (orderId: string, status: string): Promise<MockResponse<void>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real app, this would update database
    return { success: true }
  }
}

// Mock payment service
export const mockPaymentService = {
  processPayment: async (paymentData: any): Promise<MockResponse<any>> => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate payment processing
    const paymentResult = {
      id: `PAY${Date.now()}`,
      status: 'succeeded',
      amount: paymentData.amount,
      method: paymentData.method,
      transactionId: `TXN${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    
    return { success: true, data: paymentResult }
  },
  
  getPaymentMethods: () => [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', supported: true },
    { id: 'mobile_money', name: 'Mobile Money', icon: '📱', supported: true },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦', supported: true },
    { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: '💵', supported: true }
  ]
}

export default {
  auth: mockAuthService,
  medicines: mockMedicineService,
  pharmacies: mockPharmacyService,
  orders: mockOrderService,
  payments: mockPaymentService
}
