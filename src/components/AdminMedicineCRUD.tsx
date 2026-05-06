import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { rwandanMedicines } from '../data/rwandaMedicines'

import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Save, 
  X, 
  Package,
  DollarSign,
  Shield,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  Download,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface Medicine {
  id: string
  name: string
  genericName: string
  description: string
  category: string
  manufacturer: string
  priceRWF: number
  stock: number
  prescriptionRequired: boolean
  dosage: string
  form: string
  rating: number
  reviews: number
  inStock: boolean
  expiryDate: string
  batchNumber: string
  storageConditions: string
  sideEffects: string[]
  contraindications: string[]
  availablePharmacies: any[]
  updatedAt?: string
}

const AdminMedicineCRUD = () => {
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null)
  const [showReports, setShowReports] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    description: '',
    category: 'pain-relief',
    manufacturer: '',
    priceRWF: 0,
    stock: 0,
    prescriptionRequired: false,
    dosage: '',
    form: 'tablet'
  })

  // Inventory tracking state
  const [inventoryLogs, setInventoryLogs] = useState<any[]>([])
  const [stockMovements, setStockMovements] = useState<any[]>([])

  // Debug logging
  console.log('AdminMedicineCRUD component loaded', { user })
  console.log('Medicines state:', medicines)
  console.log('Loading state:', isLoading)

  // Load inventory logs
  useEffect(() => {
    const savedLogs = localStorage.getItem('inventoryLogs')
    if (savedLogs) {
      try {
        setInventoryLogs(JSON.parse(savedLogs))
      } catch (error) {
        console.error('Error loading inventory logs:', error)
      }
    }

    const savedMovements = localStorage.getItem('stockMovements')
    if (savedMovements) {
      try {
        setStockMovements(JSON.parse(savedMovements))
      } catch (error) {
        console.error('Error loading stock movements:', error)
      }
    }
  }, [])

  // Log inventory changes
  const logInventoryChange = (action: string, medicine: any, oldStock?: number, newStock?: number) => {
    const log = {
      id: Date.now().toString(),
      action,
      medicineId: medicine.id,
      medicineName: medicine.name,
      oldStock: oldStock || medicine.stock,
      newStock: newStock || medicine.stock,
      timestamp: new Date().toISOString(),
      userId: user?.id,
      userRole: 'admin',
      userName: user?.name
    }

    const updatedLogs = [log, ...inventoryLogs]
    setInventoryLogs(updatedLogs)
    localStorage.setItem('inventoryLogs', JSON.stringify(updatedLogs))

    // Also track stock movements for reporting
    const movement = {
      id: Date.now().toString(),
      type: action === 'add' ? 'in' : action === 'delete' ? 'out' : 'adjustment',
      medicineId: medicine.id,
      medicineName: medicine.name,
      quantity: action === 'delete' ? (oldStock || 0) - (newStock || 0) : (newStock || 0) - (oldStock || 0),
      timestamp: new Date().toISOString(),
      userId: user?.id,
      userName: user?.name
    }

    const updatedMovements = [movement, ...stockMovements]
    setStockMovements(updatedMovements)
    localStorage.setItem('stockMovements', JSON.stringify(updatedMovements))
  }

  useEffect(() => {
    console.log('Loading medicines data...')
    console.log('Available rwandanMedicines:', rwandanMedicines.length)
    
    // Always start with Rwandan medicines as base
    const baseMedicines = [...rwandanMedicines]
    console.log('Base medicines loaded:', baseMedicines.length)
    
    // Try to load custom medicines from localStorage
    const savedMedicines = localStorage.getItem('customMedicines')
    if (savedMedicines) {
      try {
        const parsedMedicines = JSON.parse(savedMedicines)
        console.log('Loaded custom medicines from localStorage:', parsedMedicines.length)
        // Combine base medicines with custom medicines
        const allMedicines = [...baseMedicines, ...parsedMedicines]
        console.log('Total medicines after combining:', allMedicines.length)
        setMedicines(allMedicines)
        setFilteredMedicines(allMedicines)
      } catch (error) {
        console.error('Error loading custom medicines:', error)
        console.log('Using only base Rwandan medicines')
        setMedicines(baseMedicines)
        setFilteredMedicines(baseMedicines)
      }
    } else {
      // Use only Rwandan medicines as default
      console.log('No custom medicines found, using base Rwandan medicines:', baseMedicines.length)
      setMedicines(baseMedicines)
      setFilteredMedicines(baseMedicines)
    }
    setIsLoading(false)
    console.log('Medicines loading completed')
  }, [])

  useEffect(() => {
    // Filter medicines based on search term
    const filtered = medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMedicines(filtered)
  }, [medicines, searchTerm])

  const handleAddMedicine = () => {
    setEditingMedicine(null)
    setFormData({
      name: '',
      genericName: '',
      description: '',
      category: 'pain-relief',
      manufacturer: '',
      priceRWF: 0,
      stock: 0,
      prescriptionRequired: false,
      dosage: '',
      form: 'tablet'
    })
    setShowModal(true)
  }

  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine)
    setFormData({
      name: medicine.name,
      genericName: medicine.genericName,
      description: medicine.description,
      category: medicine.category,
      manufacturer: medicine.manufacturer,
      priceRWF: medicine.priceRWF,
      stock: medicine.stock,
      prescriptionRequired: medicine.prescriptionRequired,
      dosage: medicine.dosage,
      form: medicine.form
    })
    setShowModal(true)
  }

  const handleDeleteMedicine = (medicineId: string) => {
    const medicineToDelete = medicines.find(m => m.id === medicineId)
    if (medicineToDelete) {
      if (window.confirm(`Are you sure you want to delete "${medicineToDelete.name}"? This will remove all stock (${medicineToDelete.stock} units).`)) {
        const oldStock = medicineToDelete.stock
        const updatedMedicines = medicines.filter(m => m.id !== medicineId)
        setMedicines(updatedMedicines)
        localStorage.setItem('customMedicines', JSON.stringify(updatedMedicines))
        
        // Log the inventory change
        logInventoryChange('delete', medicineToDelete, oldStock, 0)
        
        addNotification({
          title: 'Medicine Deleted',
          message: `${medicineToDelete.name} has been deleted. ${oldStock} units removed from inventory.`,
          type: 'success'
        })
      }
    }
  }

  const handleSaveMedicine = () => {
    if (!formData.name || !formData.description || !formData.manufacturer) {
      addNotification({
        title: 'Validation Error',
        message: 'Please fill in all required fields',
        type: 'error'
      })
      return
    }

    if (editingMedicine) {
      // Update existing medicine
      const oldStock = editingMedicine.stock
      const updatedMedicines = medicines.map(medicine =>
        medicine.id === editingMedicine.id
          ? {
              ...medicine,
              ...formData,
              updatedAt: new Date().toISOString()
            }
          : medicine
      )
      setMedicines(updatedMedicines)
      localStorage.setItem('customMedicines', JSON.stringify(updatedMedicines))
      
      // Log inventory change if stock changed
      if (oldStock !== formData.stock) {
        const updatedMedicine = updatedMedicines.find(m => m.id === editingMedicine.id)
        if (updatedMedicine) {
          logInventoryChange('edit', updatedMedicine, oldStock, formData.stock)
        }
      }
      
      addNotification({
        title: 'Medicine Updated',
        message: `${formData.name} has been updated successfully`,
        type: 'success'
      })
    } else {
      // Add new medicine
      const newMedicine: Medicine = {
        id: Date.now().toString(),
        ...formData,
        rating: 5,
        reviews: 0,
        inStock: true,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        batchNumber: `BATCH${Date.now()}`,
        storageConditions: 'Store below 25°C, protect from moisture',
        sideEffects: [],
        contraindications: [],
        availablePharmacies: [],
        updatedAt: new Date().toISOString()
      }
      const updatedMedicines = [...medicines, newMedicine]
      setMedicines(updatedMedicines)
      localStorage.setItem('customMedicines', JSON.stringify(updatedMedicines))
      
      // Log inventory addition
      logInventoryChange('add', newMedicine, 0, formData.stock)
      
      addNotification({
        title: 'Medicine Added',
        message: `${formData.name} has been added with ${formData.stock} units in stock`,
        type: 'success'
      })
    }

    setShowModal(false)
  }

  const categories = [
    { value: 'pain-relief', label: 'Pain Relief' },
    { value: 'antibiotics', label: 'Antibiotics' },
    { value: 'supplements', label: 'Supplements' },
    { value: 'cold-flu', label: 'Cold & Flu' },
    { value: 'heart-health', label: 'Heart Health' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'stomach', label: 'Stomach' },
    { value: 'skin-care', label: 'Skin Care' },
    { value: 'emergency', label: 'Emergency' }
  ]

  const forms = ['tablet', 'capsule', 'syrup', 'injection', 'cream', 'ointment', 'drops']

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Debug fallback - only show if not loading and no medicines
  if (!isLoading && medicines.length === 0) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Medicine Management</h1>
          <p className="text-gray-600">Manage medicines - add, edit, delete, and track inventory</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-red-500">No medicines found. Please check console for errors.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Medicine Management</h1>
        <p className="text-gray-600">Manage medicines - add, edit, delete, and track inventory</p>
      </div>

      {/* Search and Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowReports(!showReports)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>Reports</span>
          </button>
          <button
            onClick={handleAddMedicine}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Medicine List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                      <div className="text-sm text-gray-500">{medicine.manufacturer}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {medicine.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${medicine.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {medicine.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    RWF {medicine.priceRWF.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditMedicine(medicine)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMedicine(medicine.id)}
                        className="text-red-600 hover:text-red-900"
                      >
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

      {/* Reports Section */}
      {showReports && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Inventory Reports</h2>
            <button
              onClick={() => setShowReports(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Stock In Report */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-800">Medicines Added</h3>
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="space-y-2">
                {stockMovements
                  .filter(m => m.type === 'in')
                  .slice(0, 5)
                  .map(movement => (
                    <div key={movement.id} className="flex items-center justify-between bg-white rounded p-2">
                      <div className="flex items-center space-x-2">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{movement.medicineName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(movement.timestamp).toLocaleDateString()} by {movement.userName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">+{movement.quantity}</p>
                        <p className="text-xs text-gray-500">units</p>
                      </div>
                    </div>
                  ))}
                {stockMovements.filter(m => m.type === 'in').length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No medicines added yet</p>
                )}
              </div>
            </div>

            {/* Stock Out Report */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-800">Medicines Removed</h3>
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div className="space-y-2">
                {stockMovements
                  .filter(m => m.type === 'out')
                  .slice(0, 5)
                  .map(movement => (
                    <div key={movement.id} className="flex items-center justify-between bg-white rounded p-2">
                      <div className="flex items-center space-x-2">
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{movement.medicineName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(movement.timestamp).toLocaleDateString()} by {movement.userName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-600">-{movement.quantity}</p>
                        <p className="text-xs text-gray-500">units</p>
                      </div>
                    </div>
                  ))}
                {stockMovements.filter(m => m.type === 'out').length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No medicines removed yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-900">{medicines.length}</p>
                  <p className="text-sm text-blue-700">Total Medicines</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-900">
                    {medicines.reduce((sum, m) => sum + m.stock, 0)}
                  </p>
                  <p className="text-sm text-green-700">Total Stock</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-900">
                    {stockMovements.filter(m => m.type === 'in').reduce((sum, m) => sum + m.quantity, 0)}
                  </p>
                  <p className="text-sm text-purple-700">Total Added</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-900">
                    {stockMovements.filter(m => m.type === 'out').reduce((sum, m) => sum + Math.abs(m.quantity), 0)}
                  </p>
                  <p className="text-sm text-orange-700">Total Removed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                const reportData = {
                  generatedAt: new Date().toISOString(),
                  generatedBy: user?.name,
                  summary: {
                    totalMedicines: medicines.length,
                    totalStock: medicines.reduce((sum, m) => sum + m.stock, 0),
                    totalAdded: stockMovements.filter(m => m.type === 'in').reduce((sum, m) => sum + m.quantity, 0),
                    totalRemoved: stockMovements.filter(m => m.type === 'out').reduce((sum, m) => sum + Math.abs(m.quantity), 0)
                  },
                  stockMovements: stockMovements,
                  inventoryLogs: inventoryLogs
                }
                
                const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `admin-inventory-report-${new Date().toISOString().split('T')[0]}.json`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
                
                addNotification({
                  title: 'Report Exported',
                  message: 'Admin inventory report has been downloaded successfully',
                  type: 'success'
                })
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter medicine name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Generic Name
                </label>
                <input
                  type="text"
                  value={formData.genericName}
                  onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter generic name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer *
                </label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter manufacturer name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (RWF)
                  </label>
                  <input
                    type="number"
                    value={formData.priceRWF}
                    onChange={(e) => setFormData({ ...formData, priceRWF: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 500mg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form
                </label>
                <select
                  value={formData.form}
                  onChange={(e) => setFormData({ ...formData, form: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {forms.map(form => (
                    <option key={form} value={form}>{form.charAt(0).toUpperCase() + form.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="prescriptionRequired"
                  checked={formData.prescriptionRequired}
                  onChange={(e) => setFormData({ ...formData, prescriptionRequired: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="prescriptionRequired" className="ml-2 text-sm text-gray-700">
                  Prescription Required
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMedicine}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingMedicine ? 'Update' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMedicineCRUD
