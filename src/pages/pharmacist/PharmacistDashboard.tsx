import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Settings, 
  BarChart3,
  FileText,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  Stethoscope,
  Pill,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface PharmacistStats {
  totalMedicines: number
  lowStockItems: number
  todayOrders: number
  todayRevenue: number
  pendingOrders: number
  deliveredOrders: number
}

interface MedicineInventory {
  id: string
  name: string
  category: string
  stock: number
  price: number
  manufacturer: string
  expiryDate: string
  prescriptionRequired: boolean
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

interface RecentOrder {
  id: string
  customerName: string
  customerPhone: string
  medicines: Array<{ name: string; quantity: number }>
  totalAmount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'
  orderType: 'pickup' | 'delivery'
  date: string
  time: string
}

const PharmacistDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<PharmacistStats>({
    totalMedicines: 0,
    lowStockItems: 0,
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  })
  const [medicines, setMedicines] = useState<MedicineInventory[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')

  // Mock data for demonstration
  useEffect(() => {
    setStats({
      totalMedicines: 156,
      lowStockItems: 8,
      todayOrders: 24,
      todayRevenue: 1847.50,
      pendingOrders: 6,
      deliveredOrders: 18
    })

    setMedicines([
      { id: 'MED001', name: 'Paracetamol 500mg', category: 'Pain Relief', stock: 45, price: 4.99, manufacturer: 'PharmaCorp', expiryDate: '2024-12-31', prescriptionRequired: false, status: 'in-stock' },
      { id: 'MED002', name: 'Amoxicillin 250mg', category: 'Antibiotics', stock: 12, price: 12.99, manufacturer: 'MediTech', expiryDate: '2024-08-15', prescriptionRequired: true, status: 'low-stock' },
      { id: 'MED003', name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 0, price: 6.99, manufacturer: 'HealthPlus', expiryDate: '2024-10-20', prescriptionRequired: false, status: 'out-of-stock' },
      { id: 'MED004', name: 'Cetirizine 10mg', category: 'Allergy', stock: 67, price: 8.99, manufacturer: 'PharmaCorp', expiryDate: '2025-02-28', prescriptionRequired: false, status: 'in-stock' },
      { id: 'MED005', name: 'Metformin 500mg', category: 'Diabetes', stock: 8, price: 15.99, manufacturer: 'MediTech', expiryDate: '2024-09-10', prescriptionRequired: true, status: 'low-stock' }
    ])

    setRecentOrders([
      { id: 'ORD001', customerName: 'John Doe', customerPhone: '+1234567890', medicines: [{ name: 'Paracetamol 500mg', quantity: 2 }], totalAmount: 9.98, status: 'pending', orderType: 'pickup', date: '2024-01-15', time: '10:30 AM' },
      { id: 'ORD002', customerName: 'Jane Smith', customerPhone: '+1234567891', medicines: [{ name: 'Amoxicillin 250mg', quantity: 1 }], totalAmount: 12.99, status: 'confirmed', orderType: 'delivery', date: '2024-01-15', time: '11:15 AM' },
      { id: 'ORD003', customerName: 'Bob Johnson', customerPhone: '+1234567892', medicines: [{ name: 'Cetirizine 10mg', quantity: 1 }], totalAmount: 8.99, status: 'preparing', orderType: 'pickup', date: '2024-01-15', time: '09:45 AM' },
      { id: 'ORD004', customerName: 'Alice Brown', customerPhone: '+1234567893', medicines: [{ name: 'Metformin 500mg', quantity: 2 }], totalAmount: 31.98, status: 'ready', orderType: 'delivery', date: '2024-01-15', time: '08:30 AM' },
      { id: 'ORD005', customerName: 'Charlie Wilson', customerPhone: '+1234567894', medicines: [{ name: 'Ibuprofen 400mg', quantity: 3 }], totalAmount: 20.97, status: 'delivered', orderType: 'pickup', date: '2024-01-14', time: '03:20 PM' }
    ])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50'
      case 'ready': return 'text-blue-600 bg-blue-50'
      case 'preparing': return 'text-purple-600 bg-purple-50'
      case 'confirmed': return 'text-yellow-600 bg-yellow-50'
      case 'pending': return 'text-orange-600 bg-orange-50'
      case 'out-of-stock': return 'text-red-600 bg-red-50'
      case 'low-stock': return 'text-yellow-600 bg-yellow-50'
      case 'in-stock': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <CheckCircle className="h-4 w-4" />
      case 'low-stock': return <AlertTriangle className="h-4 w-4" />
      case 'out-of-stock': return <AlertCircle className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const statCards = [
    {
      title: 'Total Medicines',
      value: stats.totalMedicines,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems,
      icon: AlertTriangle,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100',
      change: '+2',
      changeType: 'negative'
    },
    {
      title: "Today's Orders",
      value: stats.todayOrders,
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: "Today's Revenue",
      value: `$${stats.todayRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      change: '-3',
      changeType: 'positive'
    },
    {
      title: 'Delivered Today',
      value: stats.deliveredOrders,
      icon: Truck,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      change: '+8',
      changeType: 'positive'
    }
  ]

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">Pharmacist Dashboard</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Stethoscope className="h-4 w-4" />
                <span>Pharmacist</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines, orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-1">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="card p-6 hover-lift">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 bg-gradient-to-r ${stat.bgColor} rounded-xl`}>
                          <Icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                        </div>
                        <div className={`flex items-center space-x-1 text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.changeType === 'positive' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          <span>{stat.change}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <p className="text-gray-600">{stat.title}</p>
                    </div>
                  )
                })}
              </div>

              {/* Inventory Status and Recent Orders */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Low Stock Alert */}
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Low Stock Alert</h3>
                    <Link to="/pharmacist/inventory" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {medicines.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock').map((medicine) => (
                      <div key={medicine.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getStatusColor(medicine.status)}`}>
                            {getStockStatusIcon(medicine.status)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{medicine.name}</p>
                            <p className="text-sm text-gray-600">{medicine.category} • {medicine.manufacturer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{medicine.stock} units</p>
                          <p className="text-sm text-gray-600">${medicine.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                    <Link to="/pharmacist/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customerName} • {order.time}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {order.orderType === 'delivery' ? (
                              <Truck className="h-3 w-3 text-blue-600" />
                            ) : (
                              <Package className="h-3 w-3 text-green-600" />
                            )}
                            <span className="text-xs text-gray-500">{order.orderType}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${order.totalAmount}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/pharmacist/medicines/add" className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Add Medicine</span>
                  </Link>
                  <Link to="/pharmacist/inventory/low-stock" className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Restock Items</span>
                  </Link>
                  <Link to="/pharmacist/orders/pending" className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Process Orders</span>
                  </Link>
                  <Link to="/pharmacist/reports" className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Generate Report</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
          {selectedTab !== 'overview' && (
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {navigationTabs.find(tab => tab.id === selectedTab)?.label}
              </h3>
              <p className="text-gray-600">
                This section is under development. Full inventory management and order processing features will be available here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default PharmacistDashboard
