import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { rwandanMedicines } from '../../data/rwandaMedicines'
import { Order, Medicine, User } from '../../types'
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
  Clock,
  Activity,
  Database,
  UserCheck,
  UserX,
  RefreshCw
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalPharmacies: number
  totalMedicines: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  todayOrders: number
  todayRevenue: number
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

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  phone: string
  createdAt: string
  lastLogin?: string
  status: 'active' | 'inactive' | 'suspended'
}


const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPharmacies: 0,
    totalMedicines: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    todayOrders: 0,
    todayRevenue: 0
  })
  const [activities, setActivities] = useState<SystemActivity[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)

  // Load data from localStorage and mock data
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    setIsLoading(true)
    
    // Load system activities
    const savedActivities = JSON.parse(localStorage.getItem('systemActivities') || '[]')
    setActivities(savedActivities.reverse().slice(0, 50)) // Show latest 50 activities

    // Load medicines from localStorage or use Rwandan medicines
    const savedMedicines = JSON.parse(localStorage.getItem('customMedicines') || '[]')
    const medicinesToShow = savedMedicines.length > 0 ? savedMedicines : rwandanMedicines
    setMedicines(medicinesToShow)

    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(savedOrders)

    // Mock user data
    const mockUsers: AdminUser[] = [
      { id: '1', name: 'Admin User', email: 'admin@medicinefinder.com', role: 'admin', phone: '+250788123456', createdAt: '2024-01-01', lastLogin: new Date().toISOString(), status: 'active' },
      { id: '2', name: 'Pharmacist User', email: 'pharmacist@medicinefinder.com', role: 'pharmacist', phone: '+250788789012', createdAt: '2024-01-02', lastLogin: new Date().toISOString(), status: 'active' },
      { id: '3', name: 'Regular User', email: 'user@medicinefinder.com', role: 'user', phone: '+250788345678', createdAt: '2024-01-03', lastLogin: new Date().toISOString(), status: 'active' }
    ]
    setUsers(mockUsers)

    // Calculate stats
    const today = new Date().toDateString()
    const todayOrders = savedOrders.filter((order: any) => 
      new Date(order.createdAt).toDateString() === today
    )
    const todayRevenue = todayOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0)

    setStats({
      totalUsers: mockUsers.length,
      totalPharmacies: 2, // Mock data
      totalMedicines: savedMedicines.length,
      totalOrders: savedOrders.length,
      totalRevenue: savedOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0),
      pendingOrders: savedOrders.filter((order: any) => order.status === 'pending').length,
      todayOrders: todayOrders.length,
      todayRevenue
    })

    setIsLoading(false)
  }

  const generateDailyReport = () => {
    const today = new Date()
    const todayActivities = activities.filter(activity => 
      new Date(activity.timestamp).toDateString() === today.toDateString()
    )
    const todayOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === today.toDateString()
    )
    
    const report = {
      id: `RPT${Date.now()}`,
      date: today.toISOString(),
      generatedBy: user?.name,
      role: 'admin',
      stats,
      activities: todayActivities,
      orders: todayOrders,
      users: users.filter(user => 
        new Date(user.lastLogin || '').toDateString() === today.toDateString()
      ),
      medicines: medicines,
      crudOperations: {
        medicinesAdded: todayActivities.filter(a => a.action === 'create' && a.details.includes('medicine')).length,
        medicinesUpdated: todayActivities.filter(a => a.action === 'update' && a.details.includes('medicine')).length,
        medicinesDeleted: todayActivities.filter(a => a.action === 'delete' && a.details.includes('medicine')).length,
        totalOperations: todayActivities.filter(a => ['create', 'update', 'delete'].includes(a.action)).length
      },
      summary: {
        totalActivities: todayActivities.length,
        systemHealth: 'Good',
        activeUsers: users.filter(u => u.status === 'active').length,
        revenueGenerated: todayOrders.reduce((sum, order) => sum + order.totalAmount, 0)
      },
      timestamp: new Date().toISOString()
    }

    // Save report to localStorage
    const reports = JSON.parse(localStorage.getItem('dailyReports') || '[]')
    reports.push(report)
    localStorage.setItem('dailyReports', JSON.stringify(reports))

    // Create a formatted text report for better readability
    const reportText = `
DAILY SYSTEM REPORT
===================
Date: ${today.toDateString()}
Generated by: ${user?.name} (Admin)
Generated at: ${new Date().toLocaleString()}

SYSTEM STATISTICS
================
Total Users: ${stats.totalUsers}
Total Pharmacies: ${stats.totalPharmacies}
Total Medicines: ${stats.totalMedicines}
Total Orders: ${stats.totalOrders}
Total Revenue: $${stats.totalRevenue.toLocaleString()}
Today's Orders: ${stats.todayOrders}
Today's Revenue: $${stats.todayRevenue.toLocaleString()}
Pending Orders: ${stats.pendingOrders}

TODAY'S ACTIVITIES (${todayActivities.length})
=================
${todayActivities.map(activity => 
  `- ${new Date(activity.timestamp).toLocaleTimeString()}: ${activity.details} (${activity.role})`
).join('\n')}

TODAY'S ORDERS (${todayOrders.length})
===============
${todayOrders.map(order => 
  `- ${order.id}: $${order.totalAmount} - ${order.status} (${new Date(order.createdAt).toLocaleTimeString()})`
).join('\n')}

CRUD OPERATIONS TODAY
====================
Medicines Added: ${todayActivities.filter(a => a.action === 'create' && a.details.includes('medicine')).length}
Medicines Updated: ${todayActivities.filter(a => a.action === 'update' && a.details.includes('medicine')).length}
Medicines Deleted: ${todayActivities.filter(a => a.action === 'delete' && a.details.includes('medicine')).length}
Total Operations: ${todayActivities.filter(a => ['create', 'update', 'delete'].includes(a.action)).length}

SUMMARY
========
Total Activities: ${todayActivities.length}
System Health: Good
Active Users: ${users.filter(u => u.status === 'active').length}
Revenue Generated: $${todayOrders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
`

    // Download both JSON and text report
    const jsonBlob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const textBlob = new Blob([reportText], { type: 'text/plain' })
    
    // Download JSON report
    const jsonUrl = window.URL.createObjectURL(jsonBlob)
    const jsonLink = document.createElement('a')
    jsonLink.href = jsonUrl
    jsonLink.download = `daily-report-${today.toISOString().split('T')[0]}.json`
    jsonLink.click()
    window.URL.revokeObjectURL(jsonUrl)
    
    // Download text report
    const textUrl = window.URL.createObjectURL(textBlob)
    const textLink = document.createElement('a')
    textLink.href = textUrl
    textLink.download = `daily-report-${today.toISOString().split('T')[0]}.txt`
    textLink.click()
    window.URL.revokeObjectURL(textUrl)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'confirmed': return 'text-blue-600 bg-blue-50'
      case 'preparing': return 'text-purple-600 bg-purple-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      case 'active': return 'text-green-600 bg-green-50'
      case 'inactive': return 'text-gray-600 bg-gray-50'
      case 'suspended': return 'text-red-600 bg-red-50'
      case 'in-stock': return 'text-green-600 bg-green-50'
      case 'low-stock': return 'text-yellow-600 bg-yellow-50'
      case 'out-of-stock': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <UserCheck className="h-4 w-4" />
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
      title: 'Today\'s Orders',
      value: stats.todayOrders,
      icon: Calendar,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Today\'s Revenue',
      value: `${stats.todayRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100',
      change: '+12%',
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
    { id: 'activities', label: 'System Activities', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'medicines', label: 'Medicines', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const filteredActivities = activities.filter(activity =>
    (activity.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (activity.action?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (activity.details?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.role?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  const filteredOrders = orders.filter(order =>
    (order.id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (order.status?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (order.deliveryAddress?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Recent Activities and Orders */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
                    <button 
                      onClick={() => setSelectedTab('activities')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.action)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.details}</p>
                            <p className="text-sm text-gray-600">
                              {activity.userName} • {new Date(activity.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(activity.role)}`}>
                          {getRoleIcon(activity.role)}
                          <span>{activity.role}</span>
                        </span>
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
                    {orders.slice(0, 5).map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.medicines?.[0]?.medicineName || 'Order'} • {order.medicines?.length || 0} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${order.totalAmount || 0}</p>
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
                  <Link to="/admin/users/add" className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Add User</span>
                  </Link>
                  <Link to="/admin/pharmacies/add" className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Plus className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Add Pharmacy</span>
                  </Link>
                  <Link to="/admin/medicines" className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Package className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Manage Medicines</span>
                  </Link>
                  <button 
                    onClick={generateDailyReport}
                    className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Generate Daily Report</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'activities' && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">System Activities</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Showing {filteredActivities.length} of {activities.length} activities
                    </span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredActivities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-gray-600" />
                              </div>
                              <span className="font-medium text-gray-900">{activity.userName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className={`p-1 rounded ${getActivityColor(activity.type)}`}>
                                {getActivityIcon(activity.action)}
                              </div>
                              <span className="text-sm text-gray-900">{activity.action}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{activity.details}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(activity.role)}`}>
                              {getRoleIcon(activity.role)}
                              <span>{activity.role}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {new Date(activity.timestamp).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'users' && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                  <button className="btn btn-primary flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add User</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">ID: {user.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{user.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{user.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {getRoleIcon(user.role)}
                              <span>{user.role}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {new Date(user.createdAt).toLocaleDateString()}
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
                              <button className="p-1 text-red-600 hover:text-red-800">
                                <Trash2 className="h-4 w-4" />
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
                <p className="text-gray-600">Manage medicines, add new products, update inventory, and track stock levels.</p>
                <Link to="/admin/medicines" className="btn btn-primary">
                  Manage Medicines
                </Link>
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
                      Showing {filteredOrders.length} of {orders.length} orders
                    </span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredOrders.map((order: any) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">{order.id}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{order.userId || 'Customer'}</p>
                              <p className="text-sm text-gray-600">{order.deliveryAddress || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">
                              {order.medicines?.length || 0} items
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">
                              ${order.totalAmount || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
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

          {selectedTab === 'reports' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Report Generation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Daily Report</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Generate comprehensive daily report with all system activities and statistics.</p>
                    <button 
                      onClick={generateDailyReport}
                      className="btn btn-primary w-full"
                    >
                      Generate Daily Report
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Database className="h-8 w-8 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Sales Report</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Export sales data and revenue analytics.</p>
                    <button className="btn btn-secondary w-full">
                      Generate Sales Report
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                      <h4 className="font-semibold text-gray-900">User Report</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Export user data and activity statistics.</p>
                    <button className="btn btn-secondary w-full">
                      Generate User Report
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">System Settings</h3>
              <p className="text-gray-600">
                System configuration and settings management will be available here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
