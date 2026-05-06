import React, { useState } from 'react'
import { MapPin, Phone, Clock, Star, Navigation, Filter, Search } from 'lucide-react'

interface Pharmacy {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  phone: string
  hours: string
  deliveryAvailable: boolean
  deliveryTime: string
  inStorePickup: boolean
  website: string
  coordinates: {
    lat: number
    lng: number
  }
}

const PharmacyFinder = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'delivery' | '24hours'>('all')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Mock pharmacy data
  const pharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'HealthPlus Pharmacy',
      address: '123 Main St, Downtown, City 10001',
      distance: '0.5 km',
      rating: 4.5,
      phone: '+1 (555) 123-4567',
      hours: '8:00 AM - 10:00 PM',
      deliveryAvailable: true,
      deliveryTime: '30 mins',
      inStorePickup: true,
      website: 'https://healthplus-pharmacy.com',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: '2',
      name: 'MediCare Store',
      address: '456 Oak Ave, Westside, City 10002',
      distance: '1.2 km',
      rating: 4.2,
      phone: '+1 (555) 987-6543',
      hours: '9:00 AM - 9:00 PM',
      deliveryAvailable: true,
      deliveryTime: '45 mins',
      inStorePickup: true,
      website: 'https://medicare-store.com',
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    {
      id: '3',
      name: 'QuickMeds 24/7',
      address: '789 Highway Rd, North District, City 10003',
      distance: '2.0 km',
      rating: 4.0,
      phone: '+1 (555) 246-8135',
      hours: '24/7',
      deliveryAvailable: true,
      deliveryTime: '1 hour',
      inStorePickup: true,
      website: 'https://quickmeds.com',
      coordinates: { lat: 40.7489, lng: -73.9680 }
    },
    {
      id: '4',
      name: 'Community Pharmacy',
      address: '321 Elm St, Eastside, City 10004',
      distance: '3.5 km',
      rating: 4.7,
      phone: '+1 (555) 369-2580',
      hours: '8:00 AM - 8:00 PM',
      deliveryAvailable: false,
      deliveryTime: 'N/A',
      inStorePickup: true,
      website: 'https://community-pharmacy.com',
      coordinates: { lat: 40.7282, lng: -73.9942 }
    }
  ]

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFilter === 'delivery') {
      return matchesSearch && pharmacy.deliveryAvailable
    } else if (selectedFilter === '24hours') {
      return matchesSearch && pharmacy.hours === '24/7'
    }
    
    return matchesSearch
  })

  const getDirections = (pharmacy: Pharmacy) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.coordinates.lat},${pharmacy.coordinates.lng}`
    window.open(url, '_blank')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Find Nearby Pharmacies</h1>
        <p className="text-gray-600">Locate pharmacies near you with delivery options</p>
      </div>

      {/* Search and Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search pharmacies by name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('delivery')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'delivery'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => setSelectedFilter('24hours')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === '24hours'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              24/7
            </button>
          </div>

          <button
            onClick={getUserLocation}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Navigation className="h-4 w-4" />
            <span>Use My Location</span>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Pharmacies Near You ({filteredPharmacies.length})</h3>
          
          {filteredPharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="card p-5 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{pharmacy.name}</h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{pharmacy.distance} • {pharmacy.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{pharmacy.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{pharmacy.phone}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{pharmacy.hours}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {pharmacy.deliveryAvailable && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Delivery ({pharmacy.deliveryTime})
                  </span>
                )}
                {pharmacy.inStorePickup && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    In-store Pickup
                  </span>
                )}
                {pharmacy.hours === '24/7' && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    24/7
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => getDirections(pharmacy)}
                  className="btn btn-primary btn-sm flex items-center space-x-1"
                >
                  <Navigation className="h-3 w-3" />
                  <span>Directions</span>
                </button>
                <button
                  onClick={() => window.open(`tel:${pharmacy.phone}`, '_self')}
                  className="btn btn-secondary btn-sm"
                >
                  Call
                </button>
                <button
                  onClick={() => window.open(pharmacy.website, '_blank')}
                  className="btn btn-secondary btn-sm"
                >
                  Website
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="lg:sticky lg:top-4">
          <div className="card p-4 h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-3" />
              <p className="font-medium">Interactive Map</p>
              <p className="text-sm">Map integration would go here</p>
              <p className="text-xs mt-2">Showing {filteredPharmacies.length} pharmacies</p>
            </div>
          </div>
          
          <div className="card p-4 mt-4">
            <h4 className="font-semibold mb-3">Quick Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pharmacies:</span>
                <span className="font-medium">{filteredPharmacies.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">With Delivery:</span>
                <span className="font-medium">
                  {filteredPharmacies.filter(p => p.deliveryAvailable).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">24/7 Available:</span>
                <span className="font-medium">
                  {filteredPharmacies.filter(p => p.hours === '24/7').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Rating:</span>
                <span className="font-medium">
                  {(filteredPharmacies.reduce((sum, p) => sum + p.rating, 0) / filteredPharmacies.length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PharmacyFinder
