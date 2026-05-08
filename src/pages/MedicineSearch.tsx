import React, { useState, useEffect } from 'react'
import { Search, Filter, ShoppingCart, Star, MapPin, Phone, Clock, ChevronDown, Pill, Package, AlertCircle, Check } from 'lucide-react'
import { mockMedicineService } from '../services/mockApi'
import { useCart } from '../contexts/CartContext'
// import type { Medicine } from '../data/rwandaMedicines'

const MedicineSearch = () => {
  const { addToCart } = useCart()
  const [medicines, setMedicines] = useState<any[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const categories = [
    { value: 'all', label: 'All Categories', icon: Package },
    { value: 'pain-relief', label: 'Pain Relief', icon: Pill },
    { value: 'antibiotics', label: 'Antibiotics', icon: AlertCircle },
    { value: 'vitamins', label: 'Vitamins & Supplements', icon: Pill },
    { value: 'cold-flu', label: 'Cold & Flu', icon: Pill },
    { value: 'allergy', label: 'Allergy', icon: AlertCircle },
    { value: 'digestive', label: 'Digestive Health', icon: Pill },
    { value: 'first-aid', label: 'First Aid', icon: Package }
  ]

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const result = await mockMedicineService.getMedicines()
        if (result.success && result.data) {
          setMedicines(result.data as any)
          setFilteredMedicines(result.data as any)
        }
      } catch (error) {
        console.error('Error fetching medicines:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMedicines()
  }, [])

  useEffect(() => {
    let filtered = medicines

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((medicine: any) =>
        ((medicine as any).name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        ((medicine as any).description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        ((medicine as any).manufacturer || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((medicine: any) => ((medicine as any).category || '') === selectedCategory)
    }

    // Sort
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'name':
          return ((a as any).name || '').localeCompare((b as any).name || '')
        case 'price-low':
          return ((a as any).priceRWF || 0) - ((b as any).priceRWF || 0)
        case 'price-high':
          return ((b as any).priceRWF || 0) - ((a as any).priceRWF || 0)
        case 'stock':
          return ((b as any).stock || 0) - ((a as any).stock || 0)
        default:
          return 0
      }
    })

    setFilteredMedicines(filtered)
  }, [medicines, searchTerm, selectedCategory, sortBy])

  const handleAddToCart = (medicine: any) => {
    addToCart(medicine as any, 1, 'pharmacy-001')
    setAddedToCart((medicine as any).id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading medicines...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Medicine</h1>
              <p className="text-gray-600">Search from thousands of available medicines</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-initial">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, manufacturer, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full lg:w-96 pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                          selectedCategory === category.value
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{category.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="stock">Stock Availability</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredMedicines.length}</span> medicines found
          </p>
          <div className="text-sm text-gray-500">
            Showing all available medicines
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <div key={medicine?.id || ''} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{medicine?.name || ''}</h3>
                    <p className="text-gray-600 text-sm mb-3">{medicine?.description || ''}</p>
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                        {medicine?.category || ''}
                      </span>
                      <span className="text-xs text-gray-500">{medicine?.manufacturer || ''}</span>
                    </div>
                  </div>
                  {medicine?.prescriptionRequired && (
                    <div className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>Rx Required</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {(medicine as any)?.priceRWF?.toFixed(2) || '0.00'}
                      </div>
                      <div className={`text-sm font-medium ${
                        (medicine as any)?.stock > 10 ? 'text-green-600' : 
                        (medicine as any)?.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {(medicine as any)?.stock > 0 ? `${(medicine as any)?.stock} in stock` : 'Out of stock'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">4.8 (124 reviews)</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleAddToCart(medicine as any)}
                      disabled={(medicine as any)?.stock === 0}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                        (medicine as any)?.stock === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : addedToCart === (medicine as any)?.id
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {addedToCart === (medicine as any)?.id ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          <span>Buy</span>
                        </>
                      )}
                    </button>
                    <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <Star className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSortBy('name')
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicineSearch
