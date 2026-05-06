import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Building, 
  Settings, 
  BarChart3,
  FileText,
  Bell,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalPharmacies: number
  totalMedicines: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
}

interface RecentOrder {
  id: string
  customerName: string
  pharmacyName: string
  amount: number
  status: string
  date: string
}

interface RecentUser {
  id: string
  name: string
  email: string
  role: string
  date: string
}

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPharmacies: 0,
    totalMedicines: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')

  // Mock data for demonstration
  useEffect(() => {
    setStats({
      totalUsers: 1247,
      totalPharmacies: 45,
      totalMedicines: 892,
      totalOrders: 3421,
      totalRevenue: 284750,
      pendingOrders: 23
    })

    setRecentOrders([
      { id: 'ORD001', customerName: 'John Doe', pharmacyName: 'MediCare Pharmacy', amount: 45.99, status: 'delivered', date: '2024-01-15' },
      { id: 'ORD002', customerName: 'Jane Smith', pharmacyName: 'HealthPlus', amount: 67.50, status: 'pending', date: '2024-01-15' },
      { id: 'ORD003', customerName: 'Bob Johnson', pharmacyName: 'City Pharmacy', amount: 23.75, status: 'confirmed', date: '2024-01-14' },
      { id: 'ORD004', customerName: 'Alice Brown', pharmacyName: 'MediCare Pharmacy', amount: 89.99, status: 'preparing', date: '2024-01-14' },
      { id: 'ORD005', customerName: 'Charlie Wilson', pharmacyName: 'HealthPlus', amount: 156.25, status: 'delivered', date: '2024-01-13' }
    ])

    setRecentUsers([
      { id: 'USR001', name: 'John Doe', email: 'john@example.com', role: 'user', date: '2024-01-15' },
      { id: 'USR002', name: 'Dr. Sarah Smith', email: 'sarah@pharmacy.com', role: 'pharmacist', date: '2024-01-14' },
      { id: 'USR003', name: 'Admin User', email: 'admin@medicinefinder.com', role: 'admin', date: '2024-01-13' },
      { id: 'USR004', name: 'Jane Wilson', email: 'jane@example.com', role: 'user', date: '2024-01-12' },
      { id: 'USR005', name: 'Dr. Mike Johnson', email: 'mike@pharmacy.com', role: 'pharmacist', date: '2024-01-11' }
    ])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'confirmed': return 'text-blue-600 bg-blue-50'
      case 'preparing': return 'text-purple-600 bg-purple-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />
      case 'pharmacist': return <Stethoscope className="h-4 w-4" />
      case 'user': return <Users className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-50'
      case 'pharmacist': return 'text-blue-600 bg-blue-50'
      case 'user': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Pharmacies',
      value: stats.totalPharmacies,
      icon: Building,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Medicines',
      value: stats.totalMedicines,
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100',
      change: '-5%',
      changeType: 'negative'
    }
  ]

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'pharmacies', label: 'Pharmacies', icon: Building },
    { id: 'medicines', label: 'Medicines', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
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
              <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Administrator</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
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
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
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
                        <div className={`text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <p className="text-gray-600">{stat.title}</p>
                    </div>
                  )
                })}
              </div>

              {/* Recent Orders and Users */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                    <Link to="/admin/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customerName} • {order.pharmacyName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${order.amount}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Users */}
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
                    <Link to="/admin/users" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {getRoleIcon(user.role)}
                            <span>{user.role}</span>
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
                  <Link to="/admin/users/add" className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Add User</span>
                  </Link>
                  <Link to="/admin/pharmacies/add" className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Plus className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Add Pharmacy</span>
                  </Link>
                  <Link to="/admin/medicines/add" className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Plus className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Add Medicine</span>
                  </Link>
                  <Link to="/admin/reports" className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Generate Report</span>
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
                This section is under development. Full CRUD operations and management features will be available here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
