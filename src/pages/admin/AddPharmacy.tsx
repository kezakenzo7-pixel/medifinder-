import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building, Mail, Phone, MapPin, Globe, Clock, Star, Loader2 } from 'lucide-react'

const AddPharmacy = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    licenseNumber: '',
    operatingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    deliveryAvailable: false,
    deliveryRadius: 5
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.licenseNumber) {
        setError('Please fill in all required fields')
        setIsLoading(false)
        return
      }

      // Get existing pharmacies from localStorage
      const storedPharmacies = localStorage.getItem('pharmacies')
      const pharmacies = storedPharmacies ? JSON.parse(storedPharmacies) : []
      
      // Check if email already exists
      const emailExists = pharmacies.some((p: any) => p.email === formData.email)
      if (emailExists) {
        setError('Pharmacy with this email already exists')
        setIsLoading(false)
        return
      }

      // Create new pharmacy
      const newPharmacy = {
        id: Date.now().toString(),
        ...formData,
        rating: 0,
        coordinates: { lat: -1.9536, lng: 30.0605 }, // Default Kigali coordinates
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Save to pharmacies
      pharmacies.push(newPharmacy)
      localStorage.setItem('pharmacies', JSON.stringify(pharmacies))

      // Add to activity log
      const activity = {
        id: Date.now().toString(),
        pharmacyId: newPharmacy.id,
        action: 'pharmacy_created',
        timestamp: new Date().toISOString(),
        details: `Pharmacy ${formData.name} was added to the system`
      }
      
      const activities = JSON.parse(localStorage.getItem('systemActivities') || '[]')
      activities.push(activity)
      localStorage.setItem('systemActivities', JSON.stringify(activities))

      setSuccess('Pharmacy created successfully!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        licenseNumber: '',
        operatingHours: {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '9:00 AM - 6:00 PM',
          sunday: 'Closed'
        },
        deliveryAvailable: false,
        deliveryRadius: 5
      })

      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 2000)

    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
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
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Pharmacy</h1>
            <p className="text-gray-600">Register a new pharmacy in the system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Pharmacy Name *</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter pharmacy name"
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter email address"
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter phone number"
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">License Number *</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                      placeholder="Enter license number"
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Address Information</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Full Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter full address"
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Enter city"
                    className="input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">State/Province</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    placeholder="Enter state"
                    className="input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    placeholder="Enter ZIP code"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Operating Hours</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(formData.operatingHours).map(([day, hours]) => (
                  <div key={day} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 capitalize">
                      {day}
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={hours}
                        onChange={(e) => setFormData({
                          ...formData,
                          operatingHours: {
                            ...formData.operatingHours,
                            [day]: e.target.value
                          }
                        })}
                        placeholder="e.g., 9:00 AM - 6:00 PM"
                        className="input pl-10"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Settings */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Delivery Settings</h3>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.deliveryAvailable}
                    onChange={(e) => setFormData({...formData, deliveryAvailable: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Delivery Available</span>
                </label>

                {formData.deliveryAvailable && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Delivery Radius (km)</label>
                    <input
                      type="number"
                      value={formData.deliveryRadius}
                      onChange={(e) => setFormData({...formData, deliveryRadius: parseInt(e.target.value) || 0})}
                      placeholder="Enter delivery radius"
                      className="input"
                      min="1"
                      max="50"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Pharmacy...</span>
                </>
              ) : (
                <>
                  <Building className="h-4 w-4" />
                  <span>Create Pharmacy</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default AddPharmacy
