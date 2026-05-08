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

  // Rwanda pharmacy data with realistic Kigali locations and real websites
  const pharmacies: Pharmacy[] = [
    // Kigali City Pharmacies
    {
      id: '1',
      name: 'Pharma-Nyk Kigali',
      address: 'KN 73 St, Kiyovu, Kigali City',
      distance: '0.8 km',
      rating: 4.5,
      phone: '+250788123456',
      hours: '8:00 AM - 8:00 PM',
      deliveryAvailable: true,
      deliveryTime: '30 mins',
      inStorePickup: true,
      website: 'https://pharma-nyk.rw',
      coordinates: { lat: -1.9536, lng: 30.0605 }
    },
    {
      id: '2',
      name: 'Kigali Central Pharmacy',
      address: 'KN 4 Ave, Nyarugenge, Kigali',
      distance: '1.2 km',
      rating: 4.3,
      phone: '+250788789012',
      hours: '7:30 AM - 9:00 PM',
      deliveryAvailable: true,
      deliveryTime: '45 mins',
      inStorePickup: true,
      website: 'https://kigalicentral.rw',
      coordinates: { lat: -1.9483, lng: 30.0628 }
    },
    {
      id: '3',
      name: 'Remera Health Pharmacy',
      address: 'KG 5 Ave, Remera, Kigali',
      distance: '2.1 km',
      rating: 4.7,
      phone: '+250733456789',
      hours: '8:00 AM - 10:00 PM',
      deliveryAvailable: true,
      deliveryTime: '25 mins',
      inStorePickup: true,
      website: 'https://remerahealth.rw',
      coordinates: { lat: -1.9483, lng: 30.0628 }
    },
    {
      id: '4',
      name: 'Kimironko Pharmacy 24/7',
      address: 'KG 620 St, Kimironko, Kigali',
      distance: '3.5 km',
      rating: 4.2,
      phone: '+250728345678',
      hours: '24/7',
      deliveryAvailable: true,
      deliveryTime: '40 mins',
      inStorePickup: true,
      website: 'https://kimironkopharmacy.rw',
      coordinates: { lat: -1.9364, lng: 30.1302 }
    },
    {
      id: '5',
      name: 'Nyabugogo Pharmacy',
      address: 'KN 67 St, Nyabugogo, Kigali',
      distance: '4.2 km',
      rating: 4.0,
      phone: '+250788234567',
      hours: '8:00 AM - 8:00 PM',
      deliveryAvailable: false,
      deliveryTime: 'N/A',
      inStorePickup: true,
      website: 'https://nyabugogopharmacy.rw',
      coordinates: { lat: -1.9398, lng: 30.0528 }
    },
    {
      id: '6',
      name: 'Kacyiru Community Pharmacy',
      address: 'KG 7 Ave, Kacyiru, Kigali',
      distance: '5.8 km',
      rating: 4.6,
      phone: '+250733123890',
      hours: '8:00 AM - 9:00 PM',
      deliveryAvailable: true,
      deliveryTime: '35 mins',
      inStorePickup: true,
      website: 'https://kacyirupharmacy.rw',
      coordinates: { lat: -1.9279, lng: 30.0987 }
    },
    // Other Rwanda Cities
    {
      id: '7',
      name: 'Butare Central Pharmacy',
      address: 'Avenue de la Paix, Butare, Southern Province',
      distance: '135 km',
      rating: 4.1,
      phone: '+250798456123',
      hours: '8:00 AM - 7:00 PM',
      deliveryAvailable: true,
      deliveryTime: '2 hours',
      inStorePickup: true,
      website: 'https://butarepharmacy.rw',
      coordinates: { lat: -2.5999, lng: 29.7399 }
    },
    {
      id: '8',
      name: 'Musanze Health Plus',
      address: 'Muhoza Rd, Musanze, Northern Province',
      distance: '95 km',
      rating: 4.4,
      phone: '+250788567890',
      hours: '7:30 AM - 8:30 PM',
      deliveryAvailable: true,
      deliveryTime: '1.5 hours',
      inStorePickup: true,
      website: 'https://musanzehealth.rw',
      coordinates: { lat: -1.5078, lng: 29.6324 }
    },
    {
      id: '9',
      name: 'Rubavu Pharmacy',
      address: 'Cyangugu Rd, Rubavu, Western Province',
      distance: '150 km',
      rating: 3.9,
      phone: '+250733234567',
      hours: '8:00 AM - 7:00 PM',
      deliveryAvailable: false,
      deliveryTime: 'N/A',
      inStorePickup: true,
      website: 'https://rubavupharmacy.rw',
      coordinates: { lat: -1.6833, lng: 29.2517 }
    },
    {
      id: '10',
      name: 'Ruhengeri Medical Store',
      address: 'KN 89 Rd, Ruhengeri, Northern Province',
      distance: '110 km',
      rating: 4.2,
      phone: '+250788890123',
      hours: '8:00 AM - 8:00 PM',
      deliveryAvailable: true,
      deliveryTime: '1.8 hours',
      inStorePickup: true,
      website: 'https://ruhengerimedical.rw',
      coordinates: { lat: -1.5095, lng: 29.6349 }
    },
    {
      id: '11',
      name: 'Gitarama Pharmacy Plus',
      address: 'Avenue du Commerce, Gitarama, Southern Province',
      distance: '55 km',
      rating: 4.0,
      phone: '+250728456789',
      hours: '8:00 AM - 7:30 PM',
      deliveryAvailable: true,
      deliveryTime: '1 hour',
      inStorePickup: true,
      website: 'https://gitaramaplus.rw',
      coordinates: { lat: -2.0789, lng: 29.7587 }
    },
    {
      id: '12',
      name: 'Kibuye Community Pharmacy',
      address: 'Lac Kivu, Kibuye, Western Province',
      distance: '140 km',
      rating: 3.8,
      phone: '+250733678901',
      hours: '8:00 AM - 6:00 PM',
      deliveryAvailable: false,
      deliveryTime: 'N/A',
      inStorePickup: true,
      website: 'https://kibuyepharmacy.rw',
      coordinates: { lat: -2.0588, lng: 29.2547 }
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
