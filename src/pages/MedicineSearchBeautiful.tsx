import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useNotifications } from '../contexts/NotificationContext'
import { rwandanMedicines, rwandanPharmacies, getPharmacyById } from '../data/rwandaMedicines'
import { MapPin, Phone, AlertTriangle, Package, Heart, Eye, Clock, Shield, Truck, Users, Sparkles, Zap, Award, BarChart3, Target, Stethoscope, ChevronDown, X, CheckCircle2, AlertCircle, Search, ShoppingCart, Star, Filter, SlidersHorizontal } from 'lucide-react'
import MedicalDisclaimer from '../components/MedicalDisclaimer'
import MedicalEmergency from '../components/MedicalEmergency'
import MedicalInformation from '../components/MedicalInformation'

// Import the Medicine interface from rwandaMedicines.ts
type Medicine = import('../data/rwandaMedicines').Medicine

const MedicineSearch = () => {
  const { addToCart } = useCart()
  const { addNotification } = useNotifications()
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showMedicalInfo, setShowMedicalInfo] = useState<string | null>(null)

  const categories = [
    { value: 'all', label: 'All Categories', icon: Package },
    { value: 'pain-relief', label: 'Pain Relief', icon: Heart },
    { value: 'antibiotics', label: 'Antibiotics', icon: Shield },
    { value: 'supplements', label: 'Supplements', icon: Sparkles },
    { value: 'cold-flu', label: 'Cold & Flu', icon: Zap },
    { value: 'diabetes', label: 'Diabetes', icon: Target },
    { value: 'heart-health', label: 'Heart Health', icon: Heart },
    { value: 'skin-care', label: 'Skin Care', icon: Sparkles }
  ]

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-10', label: 'Under $10' },
    { value: '10-25', label: '$10 - $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50+', label: 'Over $50' }
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' }
  ]

  // Load Rwandan medicines data
  useEffect(() => {
    setTimeout(() => {
      setMedicines(rwandanMedicines)
      setFilteredMedicines(rwandanMedicines)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = medicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           medicine.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory
      
      const matchesPrice = priceRanges[priceRanges.findIndex(range => range.value === selectedPriceRange)]?.label === 'All Prices' ||
        (selectedPriceRange === '0-10' && medicine.priceRWF <= 10000) ||
        (selectedPriceRange === '10-25' && medicine.priceRWF > 10000 && medicine.priceRWF <= 25000) ||
        (selectedPriceRange === '25-50' && medicine.priceRWF > 25000 && medicine.priceRWF <= 50000) ||
        (selectedPriceRange === '50+' && medicine.priceRWF > 50000)

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.priceRWF - b.priceRWF
        case 'price-high':
          return b.priceRWF - a.priceRWF
        case 'rating':
          return b.rating - a.rating
        case 'popularity':
          return b.reviews - a.reviews
        case 'newest':
          return b.id.localeCompare(a.id)
        default:
          return 0
      }
    })

    setFilteredMedicines(filtered)
  }, [medicines, searchQuery, selectedCategory, selectedPriceRange, sortBy])

  const handleAddToCart = (medicine: Medicine) => {
    console.log('Adding to cart:', medicine)
    try {
      addToCart(medicine, 1, 'pharmacy-001')
      console.log('Successfully added to cart')

      addNotification({
        title: 'Medicine Added',
        message: `${medicine.name} has been added to your order`,
        type: 'success'
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      addNotification({
        title: 'Error',
        message: 'Failed to add medicine to order',
        type: 'error'
      })
    }
  }

  // Debug search functionality
  useEffect(() => {
    console.log('Search query changed:', searchQuery)
    console.log('Filtered medicines count:', filteredMedicines.length)
  }, [searchQuery, filteredMedicines])

  const toggleFavorite = (medicineId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(medicineId)) {
      newFavorites.delete(medicineId)
    } else {
      newFavorites.add(medicineId)
    }
    setFavorites(newFavorites)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return 'bg-red-500 text-white'
      case 'Prescription': return 'bg-blue-500 text-white'
      case '20% OFF': return 'bg-green-500 text-white'
      case 'Low Stock': return 'bg-yellow-500 text-white'
      case 'Out of Stock': return 'bg-gray-500 text-white'
      case 'Premium': return 'bg-purple-500 text-white'
      default: return 'bg-indigo-500 text-white'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Medical Emergency & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <MedicalEmergency />
        <MedicalDisclaimer />
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Medical <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Pharmacy</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional pharmaceutical services with authentic medicines and healthcare products
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Verified Pharmacies</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Package className="h-4 w-4" />
                <span>Authentic Medicines</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>Professional Service</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="flex items-center bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="flex-1 flex items-center">
                  <Search className="h-5 w-5 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search for medicines, brands, or symptoms..."
                    value={searchQuery}
                    onChange={(e) => {
                      console.log('Search input changed:', e.target.value)
                      setSearchQuery(e.target.value)
                    }}
                    className="w-full px-4 py-4 focus:outline-none text-gray-900 placeholder-gray-500"
                  />
                </div>
                <button 
                  onClick={() => console.log('Search button clicked')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{medicines.filter(m => m.inStock).length}</p>
                  <p className="text-sm text-gray-600">In Stock</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{medicines.filter(m => m.prescriptionRequired).length}</p>
                  <p className="text-sm text-gray-600">Prescription</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{medicines.filter(m => m.rating >= 4.5).length}</p>
                  <p className="text-sm text-gray-600">Top Rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            selectedCategory === category.value
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200'
                              : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{category.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setSelectedPriceRange(range.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                          selectedPriceRange === range.value
                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200'
                            : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedPriceRange('all')
                    setSortBy('featured')
                    setSearchQuery('')
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredMedicines.length}</span> results
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMedicines.map((medicine) => (
                <div
                  key={medicine.id}
                  className="group bg-gradient-to-br from-white via-white to-indigo-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-indigo-100 hover:border-indigo-300 transform hover:scale-105 hover:-translate-y-2"
                >
                  {/* Header with Badge and Favorite */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-pulse"></div>
                      <div className="absolute top-12 right-8 w-6 h-6 bg-white rounded-full animate-pulse animation-delay-1000"></div>
                      <div className="absolute bottom-8 left-12 w-4 h-4 bg-white rounded-full animate-pulse animation-delay-2000"></div>
                    </div>

                    {/* Badge */}
                    {medicine.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${getBadgeColor(medicine.badge)} animate-bounce`}>
                          {medicine.badge}
                        </span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(medicine.id)}
                      className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                    >
                      <Heart
                        className={`h-5 w-5 transition-all duration-300 ${
                          favorites.has(medicine.id) ? 'text-red-500 fill-current scale-125' : 'text-gray-400 hover:text-red-400'
                        }`}
                      />
                    </button>

                    {/* Product Icon with Animation */}
                    <div className="relative">
                      <Package className="h-24 w-24 text-white drop-shadow-lg animate-pulse" />
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                    </div>
                    
                    {/* Discount Badge */}
                    {medicine.discount && (
                      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                        -{medicine.discount}%
                      </div>
                    )}

                    {/* Out of Stock Overlay */}
                    {!medicine.inStock && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <AlertCircle className="h-12 w-12 text-white mx-auto mb-2 animate-pulse" />
                          <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    {/* Category and Name */}
                    <div>
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-bold rounded-full">
                          {categories.find(c => c.value === medicine.category)?.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-xl mb-2">{medicine.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{medicine.description}</p>
                    </div>

                    {/* Rating and Manufacturer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(Math.floor(medicine.rating))}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">({medicine.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                        <Shield className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm text-gray-700 font-medium">{medicine.manufacturer}</span>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-bold text-gray-900">RWF {medicine.priceRWF.toLocaleString()}</span>
                          {medicine.priceUSD && (
                            <span className="text-sm text-gray-600 ml-2">(~${medicine.priceUSD})</span>
                          )}
                        </div>
                        {medicine.prescriptionRequired && (
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                            <Stethoscope className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center space-x-2">
                      {medicine.inStock ? (
                        <>
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-bold text-green-600">In Stock ({medicine.stock} available)</span>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-bold text-red-600">Out of Stock</span>
                        </>
                      )}
                    </div>

                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        disabled={!medicine.inStock}
                        onClick={() => handleAddToCart(medicine)}
                        className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                          medicine.inStock
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {medicine.inStock ? (
                          <>
                            <ShoppingCart className="h-5 w-5 inline mr-2" />
                            Buy Now
                          </>
                        ) : (
                          'Out of Stock'
                        )}
                      </button>
                      <button 
                        onClick={() => setShowMedicalInfo(medicine.id)}
                        className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Stethoscope className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredMedicines.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No medicines found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedPriceRange('all')
                    setSortBy('featured')
                    setSearchQuery('')
                  }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Medical Information Modal */}
      {showMedicalInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Medical Information</h2>
              <button
                onClick={() => setShowMedicalInfo(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <MedicalInformation 
                medicine={medicines.find(m => m.id === showMedicalInfo)!} 
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  )
}

export default MedicineSearch
