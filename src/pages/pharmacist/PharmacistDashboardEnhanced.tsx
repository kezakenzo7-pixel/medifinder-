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
  ArrowDownRight,
  Activity,
  RefreshCw
} from 'lucide-react'

interface PharmacistStats {
  totalMedicines: number
  lowStockItems: number
  todayOrders: number
  todayRevenue: number
  pendingOrders: number
  deliveredOrders: number
  outOfStockItems: number
}

interface MedicineInventory {
  id: string
  name: string
  category: string
  stock: number
  price: number
  manufacturer: string
  dosage: string
  prescriptionRequired: boolean
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  addedBy: string
  createdAt: string
}

interface Order {
  id: string
  userId: string
  medicines: Array<{ medicineId: string; medicineName: string; quantity: number; price: number; totalPrice: number }>
  totalAmount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  deliveryType: 'pickup' | 'delivery'
  deliveryAddress: string
  createdAt: string
  updatedAt: string
}

interface SystemActivity {
  id: string
  userId: string
  userName: string
  action: string
  role: string
  timestamp: string
  details: string
  type: 'login' | 'create' | 'update' | 'delete' | 'order'
}

const PharmacistDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<PharmacistStats>({
    totalMedicines: 0,
    lowStockItems: 0,
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    outOfStockItems: 0
  })
  const [medicines, setMedicines] = useState<MedicineInventory[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [activities, setActivities] = useState<SystemActivity[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    setIsLoading(true)
    
    // Load medicines from localStorage
    const savedMedicines = JSON.parse(localStorage.getItem('medicines') || '[]')
    setMedicines(savedMedicines)

    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(savedOrders)

    // Load system activities
    const savedActivities = JSON.parse(localStorage.getItem('systemActivities') || '[]')
    setActivities(savedActivities.reverse().slice(0, 20))

    // Calculate stats
    const today = new Date().toDateString()
    const todayOrders = savedOrders.filter((order: Order) => 
      new Date(order.createdAt).toDateString() === today
    )
    const todayRevenue = todayOrders.reduce((sum: number, order: Order) => sum + order.totalAmount, 0)

    const lowStock = savedMedicines.filter((med: MedicineInventory) => med.stock > 0 && med.stock < 20).length
    const outOfStock = savedMedicines.filter((med: MedicineInventory) => med.stock === 0).length

    setStats({
      totalMedicines: savedMedicines.length,
      lowStockItems: lowStock,
      todayOrders: todayOrders.length,
      todayRevenue,
      pendingOrders: savedOrders.filter((order: Order) => order.status === 'pending' || order.status === 'confirmed').length,
      deliveredOrders: savedOrders.filter((order: Order) => order.status === 'delivered').length,
      outOfStockItems: outOfStock
    })

    setIsLoading(false)
  }

  const generateDailyReport = () => {
    const today = new Date()
    const pharmacistOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === today.toDateString()
    )
    
    const report = {
      id: `PHRPT${Date.now()}`,
      date: today.toISOString(),
      generatedBy: user?.name,
      role: 'pharmacist',
      stats,
      orders: pharmacistOrders,
      medicines: medicines,
      activities: activities.filter(activity => 
        new Date(activity.timestamp).toDateString() === today.toDateString() && activity.role === 'pharmacist'
      ),
      timestamp: new Date().toISOString()
    }

    // Save report to localStorage
    const reports = JSON.parse(localStorage.getItem('pharmacistReports') || '[]')
    reports.push(report)
    localStorage.setItem('pharmacistReports', JSON.stringify(reports))

    // Download report as JSON
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pharmacist-report-${today.toISOString().split('T')[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50'
      case 'ready': return 'text-blue-600 bg-blue-50'
      case 'preparing': return 'text-purple-600 bg-purple-50'
      case 'confirmed': return 'text-yellow-600 bg-yellow-50'
      case 'pending': return 'text-orange-600 bg-orange-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <Users className="h-4 w-4" />
      case 'create': return <Plus className="h-4 w-4" />
      case 'update': return <Edit className="h-4 w-4" />
      case 'delete': return <Trash2 className="h-4 w-4" />
      case 'order': return <ShoppingCart className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login': return 'text-blue-600 bg-blue-50'
      case 'create': return 'text-green-600 bg-green-50'
      case 'update': return 'text-yellow-600 bg-yellow-50'
      case 'delete': return 'text-red-600 bg-red-50'
      case 'order': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
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
      title: 'Out of Stock',
      value: stats.outOfStockItems,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100',
      change: '-1',
      changeType: 'positive'
    }
  ]

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const filteredMedicines = medicines.filter((medicine) =>
    (medicine.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (medicine.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (medicine.manufacturer?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  const filteredOrders = orders.filter((order) =>
    (order.id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    order.medicines.some((med) => (med.medicineName?.toLowerCase() || '').includes(searchTerm.toLowerCase()))
  )

  const filteredActivities = activities.filter((activity) =>
    (activity.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (activity.action?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (activity.details?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

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
              
              <button 
                onClick={loadDashboardData}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Refresh"
              >
                <RefreshCw className={`h-5 w-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              
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
                    <h3 className="text-lg font-bold text-gray-900">Stock Alerts</h3>
                    <button 
                      onClick={() => setSelectedTab('inventory')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {medicines.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock').slice(0, 5).map((medicine) => (
                      <div key={medicine.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getStatusColor(medicine.status)}`}>
                            {getStockStatusIcon(medicine.status)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{medicine.name}</p>
                            <p className="text-sm text-gray-600">{medicine.category} • {medicine.dosage}</p>
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
                    <button 
                      onClick={() => setSelectedTab('orders')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.medicines.length} items • {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {order.deliveryType === 'delivery' ? (
                              <Truck className="h-3 w-3 text-blue-600" />
                            ) : (
                              <Package className="h-3 w-3 text-green-600" />
                            )}
                            <span className="text-xs text-gray-500">{order.deliveryType}</span>
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
                  <Link to="/pharmacist/medicines" className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Package className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Manage Medicines</span>
                  </Link>
                  <button 
                    onClick={() => setSelectedTab('inventory')}
                    className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                  >
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Restock Items</span>
                  </button>
                  <button 
                    onClick={() => setSelectedTab('orders')}
                    className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Process Orders</span>
                  </button>
                  <button 
                    onClick={generateDailyReport}
                    className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Daily Report</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'inventory' && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Medicine Inventory</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {filteredMedicines.length} medicines
                    </span>
                    <Link to="/pharmacist/medicines" className="btn btn-primary">
                      Manage Medicines
                    </Link>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredMedicines.map((medicine) => (
                        <tr key={medicine.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{medicine.name}</p>
                              <p className="text-sm text-gray-600">{medicine.dosage}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">{medicine.category}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-medium ${
                              medicine.stock === 0 ? 'text-red-600' : 
                              medicine.stock < 20 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {medicine.stock} units
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">${medicine.price}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              medicine.stock === 0 ? 'out-of-stock' : 
                              medicine.stock < 20 ? 'low-stock' : 'in-stock'
                            )}`}>
                              {getStockStatusIcon(
                                medicine.stock === 0 ? 'out-of-stock' : 
                                medicine.stock < 20 ? 'low-stock' : 'in-stock'
                              )}
                              <span className="ml-1">
                                {medicine.stock === 0 ? 'Out of Stock' : 
                                 medicine.stock < 20 ? 'Low Stock' : 'In Stock'}
                              </span>
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-blue-600 hover:text-blue-800">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-green-600 hover:text-green-800">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'orders' && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Order Management</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {filteredOrders.length} orders
                    </span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">{order.id}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">
                              {order.medicines.length} items
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">
                              ${order.totalAmount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              {order.deliveryType === 'delivery' ? (
                                <Truck className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Package className="h-4 w-4 text-green-600" />
                              )}
                              <span className="text-sm text-gray-900 capitalize">{order.deliveryType}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-blue-600 hover:text-blue-800">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-green-600 hover:text-green-800">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'medicines' && (
            <div className="card p-8 text-center">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Medicine Management</h3>
                <p className="text-gray-600">Manage pharmacy medicines, add new products, update inventory, and track stock levels.</p>
                <Link to="/pharmacist/medicines" className="btn btn-primary">
                  Manage Medicines
                </Link>
              </div>
            </div>
          )}

          {selectedTab === 'activities' && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Showing {filteredActivities.length} activities
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.action)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.details}</p>
                          <p className="text-sm text-gray-600">
                            {activity.userName} • {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{activity.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'reports' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Report Generation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Daily Report</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Generate comprehensive daily report with inventory and order statistics.</p>
                    <button 
                      onClick={generateDailyReport}
                      className="btn btn-primary w-full"
                    >
                      Generate Daily Report
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Package className="h-8 w-8 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Inventory Report</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Export current inventory status and stock levels.</p>
                    <button className="btn btn-secondary w-full">
                      Generate Inventory Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pharmacy Settings</h3>
              <p className="text-gray-600">
                Pharmacy configuration and settings management will be available here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default PharmacistDashboard
