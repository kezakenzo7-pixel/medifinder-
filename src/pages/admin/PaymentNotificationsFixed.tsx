import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, CheckCircle, Clock, DollarSign, User, Phone, Mail } from 'lucide-react'
import { paymentService, PaymentNotification } from '../../services/paymentService'

const PaymentNotifications = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<PaymentNotification[]>([])
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'received'>('all')

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    const allNotifications = paymentService.getPaymentNotifications()
    setNotifications(allNotifications)
  }

  const handleMarkAsRead = (notificationId: string) => {
    paymentService.markNotificationAsRead(notificationId)
    loadNotifications() // Refresh notifications
  }

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'pending') return notification.status === 'pending'
    if (selectedFilter === 'received') return notification.status === 'received'
    return true
  })

  const unreadCount = notifications.filter(n => n.status === 'pending').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'received': return 'text-green-600 bg-green-50'
      case 'confirmed': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'received': return <DollarSign className="h-4 w-4" />
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment Notifications</h1>
          <p className="text-gray-600">Track and manage all payment notifications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {notifications.filter(n => n.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Received</p>
                <p className="text-2xl font-bold text-green-600">
                  {notifications.filter(n => n.status === 'received').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  RWF {notifications
                    .filter(n => n.status === 'received')
                    .reduce((sum, n) => sum + n.amount, 0)
                    .toFixed(2)
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setSelectedFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending ({notifications.filter(n => n.status === 'pending').length})
              </button>
              <button
                onClick={() => setSelectedFilter('received')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'received'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Received ({notifications.filter(n => n.status === 'received').length})
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="card">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {selectedFilter === 'all' && 'All Notifications'}
              {selectedFilter === 'pending' && 'Pending Payments'}
              {selectedFilter === 'received' && 'Received Payments'}
              ({filteredNotifications.length})
            </h2>

            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No notifications found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${getStatusColor(notification.status)}`}>
                          {getStatusIcon(notification.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{notification.message}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{notification.payerName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{notification.payerPhone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>RWF {notification.amount.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                        {notification.status === 'pending' && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="btn btn-primary btn-sm"
                          >
                            Mark as Received
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default PaymentNotifications
