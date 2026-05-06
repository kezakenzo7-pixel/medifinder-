import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Bell,
  MapPin,
  Phone,
  Mail,
  Heart,
  Pill,
  BarChart3,
  Settings,
  MoreVertical
} from 'lucide-react'
import { theme } from '../styles/theme'

const Dashboard = () => {
  const { user } = useAuth()
  const { notifications } = useNotifications()
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalMedicines: 0,
    activeUsers: 0,
    pendingOrders: 0
  })

  useEffect(() => {
    // Load dashboard stats
    const loadStats = () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const medicines = JSON.parse(localStorage.getItem('medicines') || '[]')
      
      setStats({
        totalUsers: users.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0),
        totalMedicines: medicines.length,
        activeUsers: users.filter((u: any) => u.status === 'active').length,
        pendingOrders: orders.filter((o: any) => o.status === 'pending').length
      })
    }

    loadStats()
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: '#00897B',
      bgColor: '#E0F2F1',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: '#546E7A',
      bgColor: '#ECEFF1',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: `RWF ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: '#FF6B6B',
      bgColor: '#FFE5E5',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Total Medicines',
      value: stats.totalMedicines,
      icon: Package,
      color: '#4CAF50',
      bgColor: '#E8F5E8',
      change: '+5%',
      changeType: 'positive'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'placed an order',
      time: '2 minutes ago',
      icon: ShoppingCart,
      color: '#00897B'
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'registered new account',
      time: '15 minutes ago',
      icon: Users,
      color: '#546E7A'
    },
    {
      id: 3,
      user: 'Admin',
      action: 'added new medicine',
      time: '1 hour ago',
      icon: Package,
      color: '#4CAF50'
    },
    {
      id: 4,
      user: 'Dr. Wilson',
      action: 'updated prescription',
      time: '2 hours ago',
      icon: FileText,
      color: '#FF6B6B'
    }
  ]

  const upcomingEvents = [
    {
      title: 'Staff Meeting',
      date: 'Today, 3:00 PM',
      type: 'meeting'
    },
    {
      title: 'Inventory Check',
      date: 'Tomorrow, 10:00 AM',
      type: 'task'
    },
    {
      title: 'Medical Supply Delivery',
      date: 'Friday, 2:00 PM',
      type: 'delivery'
    }
  ]

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your medical store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: stat.color }}
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <button className="text-sm text-teal-700 hover:text-teal-800 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${activity.color}20` }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: activity.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors">
                <Package className="h-5 w-5" />
                <span className="font-medium">Add Medicine</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <Users className="h-5 w-5" />
                <span className="font-medium">Add User</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Generate Report</span>
              </button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Server</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-yellow-600">78% Used</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
