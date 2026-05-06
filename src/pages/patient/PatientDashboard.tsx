import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../contexts/NotificationContext'
import { useCart } from '../../contexts/CartContext'
import { mockMedicineService } from '../../services/mockApi'
import { mockPharmacyService } from '../../services/mockApi'
import { 
  User, 
  ShoppingCart, 
  FileText, 
  Calendar, 
  Heart, 
  Pill, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Plus,
  ChevronRight,
  Package,
  CreditCard,
  Settings,
  Bell,
  Stethoscope,
  Thermometer,
  Droplet,
  Search,
  Filter
} from 'lucide-react'

const PatientDashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const { addToCart } = useCart()
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [searchQuery, setSearchQuery] = useState('')
  const [medicines, setMedicines] = useState([
    { id: '1', name: 'Paracetamol', description: 'Pain reliever', priceRWF: 500, price: 500, stock: 100, category: 'Pain Relief' },
    { id: '2', name: 'Amoxicillin', description: 'Antibiotic', priceRWF: 1200, price: 1200, stock: 50, category: 'Antibiotics' },
    { id: '3', name: 'Vitamin C', description: 'Supplement', priceRWF: 300, price: 300, stock: 200, category: 'Vitamins' },
    { id: '4', name: 'Ibuprofen', description: 'Anti-inflammatory', priceRWF: 800, price: 800, stock: 75, category: 'Pain Relief' }
  ])
  const [pharmacies, setPharmacies] = useState([
    { id: '1', name: 'Kigali Central Pharmacy', address: 'KN 123 St, Kigali', city: 'Kigali', distance: '1.2 km' },
    { id: '2', name: 'Remera Pharmacy', address: 'KG 456 Ave, Kigali', city: 'Kigali', distance: '2.5 km' },
    { id: '3', name: 'Nyabugogo Pharmacy', address: 'NY 789 Rd, Kigali', city: 'Kigali', distance: '3.1 km' }
  ])
  const [nearbyPharmacies, setNearbyPharmacies] = useState([
    { id: '1', name: 'Kigali Central Pharmacy', address: 'KN 123 St, Kigali', city: 'Kigali', distance: '1.2 km' },
    { id: '2', name: 'Remera Pharmacy', address: 'KG 456 Ave, Kigali', city: 'Kigali', distance: '2.5 km' },
    { id: '3', name: 'Nyabugogo Pharmacy', address: 'NY 789 Rd, Kigali', city: 'Kigali', distance: '3.1 km' }
  ])
  const [selectedMedicine, setSelectedMedicine] = useState(null)
  const [patientStats, setPatientStats] = useState({
    totalOrders: 0,
    activePrescriptions: 0,
    upcomingAppointments: 0,
    totalSpent: 0,
    healthScore: 85,
    lastCheckup: '2024-01-15'
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [medications, setMedications] = useState([])

  useEffect(() => {
    loadPatientData()
    loadMedicines()
    loadPharmacies()
  }, [])

  const loadMedicines = async () => {
    try {
      const result = await mockMedicineService.getMedicines()
      if (result.success && result.data) {
        setMedicines(result.data)
      }
    } catch (error) {
      console.error('Error loading medicines:', error)
      // Fallback to mock data
      setMedicines([
        { id: '1', name: 'Paracetamol', description: 'Pain reliever', priceRWF: 500, price: 500, stock: 100, category: 'Pain Relief' },
        { id: '2', name: 'Amoxicillin', description: 'Antibiotic', priceRWF: 1200, price: 1200, stock: 50, category: 'Antibiotics' },
        { id: '3', name: 'Vitamin C', description: 'Supplement', priceRWF: 300, price: 300, stock: 200, category: 'Vitamins' },
        { id: '4', name: 'Ibuprofen', description: 'Anti-inflammatory', priceRWF: 800, price: 800, stock: 75, category: 'Pain Relief' }
      ])
    }
  }

  const loadPharmacies = async () => {
    try {
      const result = await mockPharmacyService.getPharmacies()
      if (result.success && result.data) {
        setPharmacies(result.data)
        // Find nearby pharmacies based on user location
        if (user?.city) {
          const nearby = result.data.filter(pharmacy => 
            pharmacy.city === user.city || pharmacy.region === user.city
          )
          setNearbyPharmacies(nearby)
        }
      }
    } catch (error) {
      console.error('Error loading pharmacies:', error)
      // Fallback to mock data
      const mockPharmacies = [
        { id: '1', name: 'Kigali Central Pharmacy', address: 'KN 123 St, Kigali', city: 'Kigali', distance: '1.2 km' },
        { id: '2', name: 'Remera Pharmacy', address: 'KG 456 Ave, Kigali', city: 'Kigali', distance: '2.5 km' },
        { id: '3', name: 'Nyabugogo Pharmacy', address: 'NY 789 Rd, Kigali', city: 'Kigali', distance: '3.1 km' }
      ]
      setPharmacies(mockPharmacies)
      setNearbyPharmacies(mockPharmacies)
    }
  }

  const handleSearchMedicines = async (query) => {
    console.log('handleSearchMedicines called with:', query)
    setSearchQuery(query)
    if (query.trim()) {
      try {
        const result = await mockMedicineService.getMedicines()
        if (result.success && result.data) {
          const filtered = result.data.filter(medicine => 
            medicine.name.toLowerCase().includes(query.toLowerCase()) ||
            medicine.description.toLowerCase().includes(query.toLowerCase())
          )
          setMedicines(filtered)
        }
      } catch (error) {
        console.error('Error searching medicines:', error)
      }
    } else {
      loadMedicines()
    }
  }

  const handleAddToCart = (medicine) => {
    console.log('handleAddToCart called with:', medicine)
    try {
      addToCart(medicine as any, 1, 'pharmacy-001')
      addNotification({
        title: 'Success',
        message: 'Medicine added to cart successfully',
        type: 'success'
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleFindPharmacies = (medicine) => {
    console.log('handleFindPharmacies called with:', medicine)
    setSelectedMedicine(medicine)
    // For now, just show all nearby pharmacies
    // In a real app, you would filter by medicine availability
    setNearbyPharmacies(pharmacies)
    addNotification({
      title: 'Pharmacies Found',
      message: `Found ${pharmacies.length} pharmacies near you`,
      type: 'success'
    })
  }

  const testNavigation = (path) => {
    console.log('Attempting to navigate to:', path)
    try {
      navigate(path)
      console.log('Navigation successful to:', path)
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  const loadPatientData = () => {
    // Load patient's orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const userOrders = orders.filter(order => order.userId === user?.id)
    
    // Load patient's appointments (mock data for now)
    const appointments = [
      {
        id: 1,
        doctor: 'Dr. Sarah Johnson',
        specialty: 'General Physician',
        date: '2024-01-20',
        time: '10:00 AM',
        type: 'checkup',
        status: 'confirmed'
      },
      {
        id: 2,
        doctor: 'Dr. Michael Chen',
        specialty: 'Cardiologist',
        date: '2024-01-25',
        time: '2:30 PM',
        type: 'consultation',
        status: 'pending'
      }
    ]

    // Load patient's medications (mock data for now)
    const meds = [
      {
        id: 1,
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Twice daily',
        nextDose: '8:00 PM',
        remaining: 15,
        prescribedBy: 'Dr. Sarah Johnson'
      },
      {
        id: 2,
        name: 'Vitamin D',
        dosage: '1000 IU',
        frequency: 'Once daily',
        nextDose: '9:00 AM',
        remaining: 30,
        prescribedBy: 'Dr. Michael Chen'
      }
    ]

    setPatientStats({
      totalOrders: userOrders.length,
      activePrescriptions: meds.length,
      upcomingAppointments: appointments.filter(apt => apt.status === 'confirmed').length,
      totalSpent: userOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
      healthScore: 85,
      lastCheckup: '2024-01-15'
    })

    setRecentOrders(userOrders.slice(0, 3))
    setUpcomingAppointments(appointments)
    setMedications(meds)
  }

  const healthMetrics = [
    {
      title: 'Health Score',
      value: `${patientStats.healthScore}%`,
      icon: Heart,
      color: '#EF4444',
      bgColor: '#FEE2E2',
      status: 'good'
    },
    {
      title: 'Active Prescriptions',
      value: patientStats.activePrescriptions,
      icon: Pill,
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      status: 'active'
    },
    {
      title: 'Upcoming Appointments',
      value: patientStats.upcomingAppointments,
      icon: Calendar,
      color: '#10B981',
      bgColor: '#D1FAE5',
      status: 'scheduled'
    },
    {
      title: 'Total Orders',
      value: patientStats.totalOrders,
      icon: ShoppingCart,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      status: 'completed'
    }
  ]

  const quickActions = [
    {
      title: 'Buy Medicine',
      description: 'Browse and buy medicines',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      link: '/search'
    },
    {
      title: 'View Prescriptions',
      description: 'Manage your prescriptions',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      link: '/patient/prescriptions'
    },
    {
      title: 'Find Pharmacies',
      description: 'Locate nearby pharmacies',
      icon: MapPin,
      color: 'from-green-500 to-green-600',
      link: '/pharmacies'
    },
    {
      title: 'Shopping Cart',
      description: 'View your cart',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      link: '/cart'
    },
    {
      title: 'Health Profile',
      description: 'View medical history',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      link: '/patient/profile'
    },
    {
      title: 'Profile Settings',
      description: 'Manage your account',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      link: '/patient/profile'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50" key={`dashboard-${Date.now()}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Portal</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name} <span className="text-xs text-blue-600">(v2.1)</span></p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  console.log('Test button clicked!')
                  alert('Button clicked successfully!')
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>Test Click</span>
              </button>
              <button 
                onClick={() => testNavigation('/notifications')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </button>
              <button 
                onClick={() => testNavigation('/patient/profile')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Health Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{patientStats.healthScore}%</div>
              <div className="text-blue-100">Health Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{patientStats.activePrescriptions}</div>
              <div className="text-blue-100">Active Prescriptions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{patientStats.upcomingAppointments}</div>
              <div className="text-blue-100">Upcoming Appointments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">RWF {patientStats.totalSpent.toLocaleString()}</div>
              <div className="text-blue-100">Total Spent</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200 hover:border-blue-300 group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <div className="flex items-center text-blue-600 mt-3 group-hover:text-blue-700">
                    <span className="text-sm font-medium">Get Started</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Why Choose MediCare+</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              onClick={() => testNavigation('/about/quality')}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-green-300 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">100% Authentic</h3>
              <p className="text-gray-600 text-sm leading-relaxed">All medicines are sourced from verified manufacturers and pharmacies</p>
              <div className="flex items-center text-green-600 mt-4 group-hover:text-green-700">
                <span className="text-sm font-medium">Learn More</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => testNavigation('/delivery')}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-blue-300 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Fast Delivery</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Get your medicines delivered within 30 minutes or less</p>
              <div className="flex items-center text-blue-600 mt-4 group-hover:text-blue-700">
                <span className="text-sm font-medium">Track Order</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => testNavigation('/support')}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-purple-300 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Expert Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Our healthcare experts are available 24/7 to help you</p>
              <div className="flex items-center text-purple-600 mt-4 group-hover:text-purple-700">
                <span className="text-sm font-medium">Contact Us</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => testNavigation('/health')}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-red-300 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Health First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Your health and wellness is our top priority</p>
              <div className="flex items-center text-red-600 mt-4 group-hover:text-red-700">
                <span className="text-sm font-medium">Health Tips</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Medicine Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Search Medicines</h2>
                  <Link to="/search" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Advanced Search
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for medicines..."
                      value={searchQuery}
                      onChange={(e) => handleSearchMedicines(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button 
                    onClick={() => testNavigation('/search')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
                
                {/* Featured Medicines */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {medicines.slice(0, 4).map((medicine) => (
                    <div key={medicine.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{medicine.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-blue-600">
                              RWF {(medicine.priceRWF || medicine.price).toLocaleString()}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleFindPharmacies(medicine)}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                              >
                                Find Pharmacies
                              </button>
                              <button
                                onClick={() => handleAddToCart(medicine)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nearby Pharmacies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Nearby Pharmacies</h2>
                  <Link to="/pharmacies" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {nearbyPharmacies.slice(0, 3).map((pharmacy) => (
                    <div key={pharmacy.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{pharmacy.name}</h3>
                          <p className="text-sm text-gray-600">{pharmacy.address}</p>
                          <p className="text-xs text-gray-500">{pharmacy.city}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{pharmacy.distance || '2.5 km'}</div>
                        <div className="text-xs text-green-600">Open Now</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Current Medications</h2>
                  <Link to="/patient/prescriptions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Pill className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{med.name}</h3>
                          <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                          <p className="text-xs text-gray-500">Next dose: {med.nextDose}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{med.remaining} left</div>
                        <div className="text-xs text-gray-500">Dr. {med.prescribedBy.split(' ')[1]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  <Link to="/profile/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.medicines?.length || 0} items</p>
                            <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">RWF {order.totalAmount?.toLocaleString() || 0}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No orders yet</p>
                      <Link to="/search" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                  <Link to="/appointments" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Stethoscope className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{apt.doctor}</h3>
                            <p className="text-sm text-gray-600">{apt.specialty}</p>
                            <p className="text-xs text-gray-500">{apt.date} • {apt.time}</p>
                          </div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {apt.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Health Tips</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Droplet className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Stay Hydrated</h3>
                      <p className="text-xs text-gray-600">Drink at least 8 glasses of water daily</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Daily Exercise</h3>
                      <p className="text-xs text-gray-600">30 minutes of moderate activity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Regular Sleep</h3>
                      <p className="text-xs text-gray-600">7-8 hours of quality sleep</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Emergency Contact</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span className="text-red-800">911 (Emergency)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span className="text-red-800">+250 788 123 456 (Hospital)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
