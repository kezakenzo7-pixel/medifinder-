import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { rwandanMedicines } from '../data/rwandaMedicines'
import type { Medicine } from '../data/rwandaMedicines'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Eye, 
  Save, 
  X, 
  Upload,
  AlertCircle,
  CheckCircle,
  Package,
  DollarSign,
  Calendar,
  Building,
  User
} from 'lucide-react'

interface MedicineFormData {
  name: string
  genericName: string
  description: string
  category: string
  manufacturer: string
  priceRWF: number
  priceUSD?: number
  stock: number
  rating: number
  reviews: number
  prescriptionRequired: boolean
  inStock: boolean
  dosage: string
  form: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'ointment' | 'drops'
  expiryDate: string
  batchNumber: string
  storageConditions: string
  sideEffects: string[]
  contraindications: string[]
  availablePharmacies: {
    pharmacyId: string
    quantity: number
    lastUpdated: string
  }[]
  badge?: string
  discount?: number
  features?: string[]
}

const MedicineCRUD = ({ userRole }: { userRole: 'admin' | 'pharmacist' }) => {
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const [medicines, setMedicines] = useState<any[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState<any | null>(null)
  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    genericName: '',
    description: '',
    category: 'pain-relief',
    manufacturer: '',
    priceRWF: 0,
    stock: 0,
    rating: 5,
    reviews: 0,
    prescriptionRequired: false,
    inStock: true,
    dosage: '',
    form: 'tablet',
    expiryDate: '',
    batchNumber: '',
    storageConditions: '',
    sideEffects: [],
    contraindications: [],
    availablePharmacies: []
  })
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    // Load medicines from localStorage or use Rwandan medicines data
    const savedMedicines = localStorage.getItem('customMedicines')
    if (savedMedicines) {
      try {
        const parsedMedicines = JSON.parse(savedMedicines)
        setMedicines(parsedMedicines as any)
        setFilteredMedicines(parsedMedicines as any)
      } catch (error) {
        console.error('Error loading medicines from localStorage:', error)
        setMedicines(rwandanMedicines as any)
        setFilteredMedicines(rwandanMedicines as any)
      }
    } else {
      setMedicines(rwandanMedicines as any)
      setFilteredMedicines(rwandanMedicines as any)
    }
  }, [])

  const loadMockData = () => {
    // Mock data for demonstration
    const mockMedicines: any[] = [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        genericName: 'Paracetamol',
        description: 'Used for fever and mild pain relief',
        category: 'pain-relief',
        manufacturer: 'PharmaCorp',
        priceRWF: 300,
        priceUSD: 0.3,
        stock: 150,
        dosage: '500mg',
        prescriptionRequired: false,
        rating: 4.5,
        reviews: 120,
        inStock: true,
        expiryDate: '2025-12-31',
        batchNumber: 'BATCH001',
        storageConditions: 'Store below 25°C',
        sideEffects: [],
        contraindications: [],
        availablePharmacies: [],
        form: 'tablet'
                      },
      {
        id: '2',
        name: 'Amoxicillin 250mg',
        genericName: 'Amoxicillin',
        description: 'Antibiotic for bacterial infections',
        category: 'antibiotics',
        manufacturer: 'MediTech',
        priceRWF: 2500,
        stock: 75,
        dosage: '250mg',
        prescriptionRequired: true,
        rating: 4.7,
        reviews: 89,
        inStock: true,
        expiryDate: '2025-11-30',
        batchNumber: 'BATCH002',
        storageConditions: 'Store below 25°C',
        sideEffects: [],
        contraindications: [],
        availablePharmacies: [],
        form: 'capsule'
                      },
      {
        id: '3',
        name: 'Vitamin C 1000mg',
        genericName: 'Ascorbic Acid',
        description: 'Immune system support supplement',
        category: 'supplements',
        manufacturer: 'NatureWell',
        priceRWF: 8750,
        stock: 200,
        dosage: '1000mg',
        prescriptionRequired: false,
        rating: 4.8,
        reviews: 156,
        inStock: true,
        expiryDate: '2026-01-31',
        batchNumber: 'BATCH003',
        storageConditions: 'Store below 25°C',
        sideEffects: [],
        contraindications: [],
        availablePharmacies: [],
        form: 'tablet'
                      },
      {
        id: '4',
        name: 'Ibuprofen 400mg',
        genericName: 'Ibuprofen',
        description: 'Anti-inflammatory for pain and fever',
        category: 'pain-relief',
        manufacturer: 'PharmaCorp',
        priceRWF: 1500,
        stock: 0,
        dosage: '400mg',
        prescriptionRequired: false,
        rating: 4.3,
        reviews: 98,
        inStock: false,
        expiryDate: '2025-09-30',
        batchNumber: 'BATCH004',
        storageConditions: 'Store below 25°C',
        sideEffects: [],
        contraindications: [],
        availablePharmacies: [],
        form: 'tablet'
                      },
      {
        id: '5',
        name: 'Metformin 500mg',
        genericName: 'Metformin',
        description: 'Oral diabetes medication',
        category: 'diabetes',
        manufacturer: 'MediTech',
        priceRWF: 15990,
        stock: 45,
        dosage: '500mg',
        prescriptionRequired: true,
        rating: 4.6,
        reviews: 134,
        inStock: true,
        expiryDate: '2025-10-31',
        batchNumber: 'BATCH005',
        storageConditions: 'Store below 25°C',
        sideEffects: [],
        contraindications: [],
        availablePharmacies: [],
        form: 'tablet'
                      }
    ]

    setMedicines(mockMedicines as any)
    setFilteredMedicines(mockMedicines as any)
    localStorage.setItem('medicines', JSON.stringify(mockMedicines))
  }

  useEffect(() => {
    let filtered = medicines

    if (searchTerm) {
      filtered = filtered.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(med => med.category === selectedCategory)
    }

    setFilteredMedicines(filtered)
  }, [medicines, searchTerm, selectedCategory])

  const handleAddMedicine = () => {
    setEditingMedicine(null)
    setFormData({
      name: '',
      genericName: '',
      description: '',
      category: '',
      manufacturer: '',
      priceRWF: 0,
      stock: 0,
      dosage: '',
      prescriptionRequired: false,
      rating: 5,
      reviews: 0,
      inStock: true,
      expiryDate: '',
      batchNumber: '',
      storageConditions: '',
      sideEffects: [],
      contraindications: [],
      availablePharmacies: [],
      form: 'tablet'
          })
    setShowModal(true)
  }

  const handleEditMedicine = (medicine: any) => {
    setEditingMedicine(medicine)
    setFormData({
      name: medicine.name,
      genericName: medicine.genericName,
      description: medicine.description,
      category: medicine.category,
      manufacturer: medicine.manufacturer,
      priceRWF: medicine.priceRWF,
      stock: medicine.stock,
      dosage: medicine.dosage,
      prescriptionRequired: medicine.prescriptionRequired,
      rating: medicine.rating,
      reviews: medicine.reviews,
      inStock: medicine.inStock,
      expiryDate: medicine.expiryDate,
      batchNumber: medicine.batchNumber,
      storageConditions: medicine.storageConditions,
      sideEffects: medicine.sideEffects,
      contraindications: medicine.contraindications,
      availablePharmacies: medicine.availablePharmacies,
      form: medicine.form
          })
    setShowModal(true)
  }

  const handleDeleteMedicine = async (id: string) => {
    const medicineToDelete = medicines.find(med => med.id === id)
    if (!medicineToDelete) return
    
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setIsLoading(true)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const updatedMedicines = medicines.filter(med => med.id !== id)
        setMedicines(updatedMedicines)
        localStorage.setItem('medicines', JSON.stringify(updatedMedicines))
        
        // Log the delete activity
        logActivity('delete', `Deleted medicine: ${medicineToDelete.name}`)
        
        // Add success notification
        addNotification({
          title: 'Medicine Deleted',
          message: `${medicineToDelete.name} has been deleted successfully.`,
          type: 'warning'
        })
      } catch (error) {
        console.error('Error deleting medicine:', error)
        addNotification({
          title: 'Delete Failed',
          message: 'Failed to delete medicine. Please try again.',
          type: 'error'
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const validateForm = () => {
    const errors: string[] = []
    
    if (!formData.name.trim()) errors.push('Medicine name is required')
    if (!formData.description.trim()) errors.push('Description is required')
    if (!formData.category) errors.push('Category is required')
    if (!formData.manufacturer.trim()) errors.push('Manufacturer is required')
    if (!formData.dosage.trim()) errors.push('Dosage is required')
    if (formData.priceRWF <= 0) errors.push('Price must be greater than 0')
    if (formData.stock < 0) errors.push('Stock cannot be negative')
    
    return errors
  }
  const logActivity = (action: string, details: string) => {
    const activity = {
      id: Date.now().toString(),
      userId: user?.id || 'unknown',
      userName: user?.name || userRole,
      action,
      role: userRole,
      timestamp: new Date().toISOString(),
      details,
      type: action === 'login' ? 'login' : action === 'delete' ? 'delete' : editingMedicine ? 'update' : 'create'
    }
    
    // Save activity log
    const activities = JSON.parse(localStorage.getItem('systemActivities') || '[]')
    activities.push(activity)
    localStorage.setItem('systemActivities', JSON.stringify(activities))
  }

  const handleSaveMedicine = async () => {
    const errors = validateForm()
    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'))
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let updatedMedicines: any[]
      
      if (editingMedicine) {
        // Update existing medicine
        updatedMedicines = medicines.map(med => 
          med.id === editingMedicine.id 
            ? {
                ...med, 
                ...formData
              }
            : med
        )
        logActivity('update', `Updated medicine: ${formData.name}`)
      } else {
        // Add new medicine
        const newMedicine: any = {
          id: Date.now().toString(),
          ...formData
        }
        updatedMedicines = [...medicines, newMedicine]
        logActivity('create', `Added new medicine: ${formData.name}`)
      }
      
      setMedicines(updatedMedicines)
      localStorage.setItem('medicines', JSON.stringify(updatedMedicines))
      
      // Add success notification
      addNotification({
        title: editingMedicine ? 'Medicine Updated' : 'Medicine Added',
        message: `${formData.name} has been ${editingMedicine ? 'updated' : 'added'} successfully.`,
        type: 'success'
      })
      
      setShowModal(false)
    } catch (error) {
      console.error('Error saving medicine:', error)
      addNotification({
        title: 'Operation Failed',
        message: 'Failed to save medicine. Please try again.',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' }
    if (stock < 20) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-50' }
    return { text: 'In Stock', color: 'text-green-600 bg-green-50' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Medicine Management</h1>
            <p className="text-gray-600 mt-1">
              {userRole === 'admin' ? 'Manage all medicines in the system' : 'Manage your pharmacy inventory'}
            </p>
          </div>
          
          <button
            onClick={handleAddMedicine}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Medicine</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Medicines</p>
              <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Stock</p>
              <p className="text-2xl font-bold text-green-600">
                {medicines.filter(m => m.stock > 0).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">
                {medicines.filter(m => m.stock > 0 && m.stock < 20).length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {medicines.filter(m => m.stock === 0).length}
              </p>
            </div>
            <X className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Medicine List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicine
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manufacturer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => {
                const stockStatus = getStockStatus(medicine.stock)
                return (
                  <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                        <div className="text-sm text-gray-500">{medicine.dosage}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {medicine.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {medicine.manufacturer}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{medicine.priceRWF}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${
                        medicine.stock === 0 ? 'text-red-600' : 
                        medicine.stock < 20 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {medicine.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                      {medicine.prescriptionRequired && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Rx
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditMedicine(medicine)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMedicine(medicine.id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No medicines found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input"
                  placeholder="e.g., Paracetamol 500mg"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                  className="input"
                  placeholder="e.g., PharmaCorp"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                  className="input"
                  placeholder="e.g., 500mg"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={formData.priceRWF}
                  onChange={(e) => setFormData({...formData, priceRWF: parseFloat(e.target.value)})}
                  className="input"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  className="input"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="input"
                  rows={3}
                  placeholder="Enter medicine description..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.prescriptionRequired}
                    onChange={(e) => setFormData({...formData, prescriptionRequired: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Prescription Required</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMedicine}
                disabled={isLoading}
                className="btn btn-primary flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>{editingMedicine ? 'Update' : 'Add'} Medicine</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicineCRUD
