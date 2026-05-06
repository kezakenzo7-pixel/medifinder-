import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Ruler,
  FileText,
  Shield,
  Camera,
  Edit2,
  Save,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const PatientProfile = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    height: '',
    weight: '',
    allergies: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: '',
    address: '',
    city: '',
    country: 'Rwanda'
  })

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(' ') : ['', '']
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        bloodType: user.bloodGroup || '',
        height: user.height || '',
        weight: user.weight || '',
        allergies: user.allergies ? user.allergies.join(', ') : '',
        medications: user.medications || '',
        emergencyContact: user.emergencyContact || '',
        emergencyPhone: user.emergencyPhone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || 'Rwanda'
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      setIsEditing(false)
      setSaveStatus('success')
      
      // Update user data
      const updatedUser = {
        ...user,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodType,
        height: formData.height,
        weight: formData.weight,
        allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()).filter(a => a) : [],
        medications: formData.medications,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        role: user?.role || 'user'
      }
      
      updateUser(updatedUser)
      
      // Update localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex(u => u.id === user?.id)
      if (userIndex !== -1) {
        users[userIndex] = updatedUser
        localStorage.setItem('users', JSON.stringify(users))
      }
      
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data to original user data
    if (user) {
      const nameParts = user.name ? user.name.split(' ') : ['', '']
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        bloodType: user.bloodGroup || '',
        height: user.height || '',
        weight: user.weight || '',
        allergies: user.allergies ? user.allergies.join(', ') : '',
        medications: user.medications || '',
        emergencyContact: user.emergencyContact || '',
        emergencyPhone: user.emergencyPhone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || 'Rwanda'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-2xl border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                Patient Profile
              </h1>
              <p className="text-white/90 mt-3 text-xl font-light">Manage your personal and medical information</p>
            </div>
            <div className="flex items-center space-x-4">
              {saveStatus === 'success' && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/90 text-white rounded-xl border border-green-400 animate-pulse shadow-lg backdrop-blur">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Profile updated successfully</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/90 text-white rounded-xl border border-red-400 shadow-lg backdrop-blur">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Error updating profile</span>
                </div>
              )}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/30"
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="font-medium">Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/30"
                  >
                    <X className="h-4 w-4" />
                    <span className="font-medium">Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Save className="h-4 w-4" />
                    <span className="font-medium">Save</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture and Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
              <div className="text-center">
                <div className="relative inline-block group">
                  <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-110">
                    <User className="h-24 w-24 text-white" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-6 right-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110">
                      <Camera className="h-6 w-6" />
                    </button>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-white/80 mb-6 text-lg">{formData.email}</p>
                <div className="flex items-center justify-center space-x-6 text-sm text-white/90">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30">
                    <Calendar className="h-4 w-4 text-yellow-300" />
                    <span className="text-white font-medium">{formData.dateOfBirth ? new Date(formData.dateOfBirth).getFullYear() : 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span className="text-white font-medium">{formData.bloodType || 'Not specified'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Health Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30 backdrop-blur">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">Weight</span>
                  </div>
                  <span className="text-xl font-bold text-blue-300 drop-shadow">
                    {formData.weight || 'Not specified'} kg
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 backdrop-blur">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Ruler className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">Height</span>
                  </div>
                  <span className="text-xl font-bold text-green-300 drop-shadow">
                    {formData.height || 'Not specified'} cm
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl border border-red-400/30 backdrop-blur">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">Blood Type</span>
                  </div>
                  <span className="text-xl font-bold text-red-300 drop-shadow">
                    {formData.bloodType || 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-emerald-600 transition-colors">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm ${
                      isEditing ? 'border-emerald-200 bg-white hover:border-emerald-300' : 'border-emerald-100 bg-emerald-50 cursor-not-allowed'
                    }`}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-emerald-600 transition-colors">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm ${
                      isEditing ? 'border-emerald-200 bg-white hover:border-emerald-300' : 'border-emerald-100 bg-emerald-50 cursor-not-allowed'
                    }`}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-emerald-600 transition-colors">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm ${
                      isEditing ? 'border-emerald-200 bg-white hover:border-emerald-300' : 'border-emerald-100 bg-emerald-50 cursor-not-allowed'
                    }`}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-emerald-600 transition-colors">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm ${
                      isEditing ? 'border-emerald-200 bg-white hover:border-emerald-300' : 'border-emerald-100 bg-emerald-50 cursor-not-allowed'
                    }`}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-emerald-600 transition-colors">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm ${
                      isEditing ? 'border-emerald-200 bg-white hover:border-emerald-300' : 'border-emerald-100 bg-emerald-50 cursor-not-allowed'
                    }`}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-emerald-600 transition-colors">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm ${
                      isEditing ? 'border-emerald-200 bg-white hover:border-emerald-300' : 'border-emerald-100 bg-emerald-50 cursor-not-allowed'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Medical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
                  <input
                    type="text"
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="List current medications"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="List any known allergies"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Emergency contact name"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Emergency contact phone"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Street address"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="City"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <option value="Rwanda">Rwanda</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Burundi">Burundi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientProfile
