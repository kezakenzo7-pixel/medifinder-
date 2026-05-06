import React, { useState, useEffect } from 'react'
import { Order } from '../types'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  X, 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  Phone,
  DollarSign,
  Eye,
  Download,
  RefreshCw,
  AlertCircle
} from 'lucide-react'

const OrderHistory = ({ userId, userRole }: { userId?: string; userRole?: string }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const statusOptions = [
    { value: 'all', label: 'All Orders', color: 'text-gray-600 bg-gray-50' },
    { value: 'pending', label: 'Pending', color: 'text-yellow-600 bg-yellow-50' },
    { value: 'confirmed', label: 'Confirmed', color: 'text-blue-600 bg-blue-50' },
    { value: 'preparing', label: 'Preparing', color: 'text-purple-600 bg-purple-50' },
    { value: 'ready', label: 'Ready', color: 'text-green-600 bg-green-50' },
    { value: 'delivered', label: 'Delivered', color: 'text-green-600 bg-green-50' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-red-600 bg-red-50' }
  ]

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ]

  useEffect(() => {
    loadOrders()
  }, [userId])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter, dateFilter])

  const loadOrders = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock order data
    const mockOrders: Order[] = [
      {
        id: 'ORD001',
        userId: userId || '3',
        pharmacyId: '1',
        medicines: [
          { medicineId: '1', medicineName: 'Paracetamol 500mg', quantity: 2, price: 4.99, totalPrice: 9.98 },
          { medicineId: '3', medicineName: 'Vitamin C 1000mg', quantity: 1, price: 8.99, totalPrice: 8.99 }
        ],
        totalAmount: 18.97,
        status: 'delivered',
        paymentStatus: 'paid',
        paymentMethod: 'card',
        deliveryAddress: '123 Main St, City, State 12345',
        deliveryType: 'delivery',
        estimatedDeliveryTime: new Date('2024-01-15T14:00:00'),
        actualDeliveryTime: new Date('2024-01-15T13:30:00'),
        createdAt: new Date('2024-01-15T10:30:00'),
        updatedAt: new Date('2024-01-15T13:30:00')
      },
      {
        id: 'ORD002',
        userId: userId || '3',
        pharmacyId: '2',
        medicines: [
          { medicineId: '2', medicineName: 'Amoxicillin 250mg', quantity: 1, price: 12.99, totalPrice: 12.99 }
        ],
        totalAmount: 12.99,
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'upi',
        deliveryAddress: '456 Oak Ave, City, State 67890',
        deliveryType: 'pickup',
        estimatedDeliveryTime: new Date('2024-01-16T16:00:00'),
        createdAt: new Date('2024-01-15T11:15:00'),
        updatedAt: new Date('2024-01-15T11:30:00')
      },
      {
        id: 'ORD003',
        userId: userId || '3',
        pharmacyId: '1',
        medicines: [
          { medicineId: '4', medicineName: 'Ibuprofen 400mg', quantity: 3, price: 6.99, totalPrice: 20.97 }
        ],
        totalAmount: 20.97,
        status: 'preparing',
        paymentStatus: 'paid',
        paymentMethod: 'netbanking',
        deliveryAddress: '789 Pine Rd, City, State 11111',
        deliveryType: 'delivery',
        estimatedDeliveryTime: new Date('2024-01-16T18:00:00'),
        createdAt: new Date('2024-01-14T09:45:00'),
        updatedAt: new Date('2024-01-15T10:00:00')
      },
      {
        id: 'ORD004',
        userId: userId || '3',
        pharmacyId: '3',
        medicines: [
          { medicineId: '5', medicineName: 'Metformin 500mg', quantity: 2, price: 15.99, totalPrice: 31.98 }
        ],
        totalAmount: 31.98,
        status: 'ready',
        paymentStatus: 'paid',
        paymentMethod: 'cash',
        deliveryAddress: '321 Elm St, City, State 22222',
        deliveryType: 'pickup',
        estimatedDeliveryTime: new Date('2024-01-15T17:00:00'),
        createdAt: new Date('2024-01-14T14:20:00'),
        updatedAt: new Date('2024-01-15T09:00:00')
      },
      {
        id: 'ORD005',
        userId: userId || '3',
        pharmacyId: '2',
        medicines: [
          { medicineId: '1', medicineName: 'Paracetamol 500mg', quantity: 1, price: 4.99, totalPrice: 4.99 },
          { medicineId: '5', medicineName: 'Metformin 500mg', quantity: 1, price: 15.99, totalPrice: 15.99 }
        ],
        totalAmount: 20.98,
        status: 'cancelled',
        paymentStatus: 'refunded',
        paymentMethod: 'card',
        deliveryAddress: '654 Maple Dr, City, State 33333',
        deliveryType: 'delivery',
        createdAt: new Date('2024-01-13T16:45:00'),
        updatedAt: new Date('2024-01-14T10:30:00')
      }
    ]

    setOrders(mockOrders)
    setIsLoading(false)
  }

  const filterOrders = () => {
    let filtered = orders

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.medicines.some(med => med.medicineName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Filter by date
    const now = new Date()
    if (dateFilter !== 'all') {
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.createdAt)
            return orderDate.toDateString() === now.toDateString()
          })
          break
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(order => new Date(order.createdAt) >= weekAgo)
          break
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(order => new Date(order.createdAt) >= monthAgo)
          break
        case 'year':
          const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(order => new Date(order.createdAt) >= yearAgo)
          break
      }
    }

    setFilteredOrders(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'preparing': return <Package className="h-4 w-4" />
      case 'ready': return <CheckCircle className="h-4 w-4" />
      case 'delivered': return <Truck className="h-4 w-4" />
      case 'cancelled': return <X className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'confirmed': return 'text-blue-600 bg-blue-50'
      case 'preparing': return 'text-purple-600 bg-purple-50'
      case 'ready': return 'text-green-600 bg-green-50'
      case 'delivered': return 'text-green-600 bg-green-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <DollarSign className="h-4 w-4" />
      case 'upi': return <Phone className="h-4 w-4" />
      case 'netbanking': return <MapPin className="h-4 w-4" />
      case 'cash': return <DollarSign className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Date', 'Status', 'Total Amount', 'Payment Method', 'Delivery Type'].join(','),
      ...filteredOrders.map(order => [
        order.id,
        formatDate(order.createdAt),
        order.status,
        order.totalAmount.toFixed(2),
        order.paymentMethod,
        order.deliveryType
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const totalSpent = filteredOrders
    .filter(order => order.status === 'delivered')
    .reduce((total, order) => total + order.totalAmount, 0)

  const totalOrders = filteredOrders.length
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending' || order.status === 'confirmed').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Order History</h1>
            <p className="text-gray-600 mt-1">
              {userRole === 'admin' ? 'View all customer orders' : 'Track your medicine orders'}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={loadOrders}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`h-5 w-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={exportOrders}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-blue-900">{totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-900">{pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Spent</p>
                <p className="text-2xl font-bold text-green-900">${totalSpent.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID or medicine name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {dateOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicines
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.medicines.slice(0, 2).map((med, index) => (
                          <div key={index} className="text-sm text-gray-900">
                            {med.medicineName} x {med.quantity}
                          </div>
                        ))}
                        {order.medicines.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{order.medicines.length - 2} more
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        {getPaymentMethodIcon(order.paymentMethod)}
                        <span>{order.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        {order.deliveryType === 'delivery' ? (
                          <Truck className="h-4 w-4" />
                        ) : (
                          <Package className="h-4 w-4" />
                        )}
                        <span className="capitalize">{order.deliveryType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        {order.status === 'delivered' && (
                          <button className="p-1 text-green-600 hover:text-green-800 transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
