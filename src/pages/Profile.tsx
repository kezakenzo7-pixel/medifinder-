import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import OrderHistory from '../components/OrderHistory'
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Edit as Edit2, 
  Save, 
  X, 
  Shield, 
  Heart, 
  Clock, 
  Package, 
  FileText, 
  Camera, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Activity,
  Droplet,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  Pill,
  Syringe,
  Thermometer,
  HeartPulse
} from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  bloodGroup: string
  allergies: string[]
  chronicConditions: string[]
}

const Profile = () => {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1234567890',
    address: user?.address || '123 Main St, City, State 12345',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    bloodGroup: user?.bloodGroup || 'O+',
    allergies: user?.allergies || ['Penicillin', 'Peanuts'],
    chronicConditions: user?.chronicConditions || ['Hypertension', 'Diabetes']
  })

  const [newAllergy, setNewAllergy] = useState('')
  const [newCondition, setNewCondition] = useState('')

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to backend
  }

  const handleLogout = () => {
    logout()
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setProfile({
        ...profile,
        allergies: [...profile.allergies, newAllergy.trim()]
      })
      setNewAllergy('')
    }
  }

  const removeAllergy = (index: number) => {
    setProfile({
      ...profile,
      allergies: profile.allergies.filter((_, i) => i !== index)
    })
  }

  const addCondition = () => {
    if (newCondition.trim()) {
      setProfile({
        ...profile,
        chronicConditions: [...profile.chronicConditions, newCondition.trim()]
      })
      setNewCondition('')
    }
  }

  const removeCondition = (index: number) => {
    setProfile({
      ...profile,
      chronicConditions: profile.chronicConditions.filter((_, i) => i !== index)
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50'
      case 'Processing': return 'text-blue-600 bg-blue-50'
      case 'Cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const orderHistory = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      medicines: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
      pharmacy: 'HealthPlus Pharmacy',
      total: 165.50,
      status: 'Delivered'
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      medicines: ['Ibuprofen 400mg'],
      pharmacy: 'MediCare Store',
      total: 25.00,
      status: 'Delivered'
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      medicines: ['Vitamin D3', 'Multivitamin'],
      pharmacy: 'QuickMeds',
      total: 45.00,
      status: 'Processing'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      {/* Medical Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <HeartPulse className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Medical Profile</h1>
                <p className="text-teal-100">Manage your health information and preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500/20 backdrop-blur-sm hover:bg-red-500/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Tabs */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2">
          <div className="flex space-x-1">
            {[
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'medical', label: 'Medical History', icon: Stethoscope },
              { id: 'orders', label: 'Order History', icon: Package }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

        {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-teal-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-full p-2">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                      <User className="h-4 w-4 text-teal-500" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-teal-500" />
                      <span>Email Address</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-teal-500" />
                      <span>Phone Number</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-teal-500" />
                      <span>Home Address</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-teal-500" />
                      <span>Date of Birth</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-teal-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-2">
                    <Droplet className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Medical Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                      <Droplet className="h-4 w-4 text-red-500" />
                      <span>Blood Group</span>
                    </label>
                    <select
                      value={profile.bloodGroup}
                      onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="O+">O+ (Universal Donor)</option>
                      <option value="O-">O- (Universal Donor)</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+ (Universal Recipient)</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  {/* Health Status Card */}
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500 rounded-full p-2">
                        <HeartPulse className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Health Status</h4>
                        <p className="text-sm text-green-700">All vitals normal</p>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500 rounded-full p-2">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Emergency Contact</h4>
                        <p className="text-sm text-blue-700">+1-800-MEDICAL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Allergies Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-red-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-2">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Medical Allergies</h3>
                </div>
                
                <div className="space-y-3">
                  {profile.allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-500 rounded-full p-1">
                          <AlertCircle className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-medium text-red-900">{allergy}</span>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeAllergy(index)}
                          className="text-red-600 hover:text-red-800 bg-red-100 rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                        placeholder="Add new medical allergy..."
                        className="flex-1 px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <button
                        onClick={addAllergy}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
                      >
                        <Save className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Chronic Conditions Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full p-2">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Chronic Conditions</h3>
                </div>
                
                <div className="space-y-3">
                  {profile.chronicConditions.map((condition, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-500 rounded-full p-1">
                          <Activity className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-medium text-purple-900">{condition}</span>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeCondition(index)}
                          className="text-purple-600 hover:text-purple-800 bg-purple-100 rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="Add new chronic condition..."
                        className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={addCondition}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
                      >
                        <Save className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Medical Summary Card */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-full p-3">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-teal-900">Medical Summary</h4>
                    <p className="text-sm text-teal-700">Complete health overview and recommendations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">{profile.allergies.length}</div>
                    <div className="text-xs text-teal-600">Allergies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{profile.chronicConditions.length}</div>
                    <div className="text-xs text-purple-600">Conditions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{profile.bloodGroup}</div>
                    <div className="text-xs text-red-600">Blood Type</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full p-2">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Order History</h3>
              </div>
              <OrderHistory userId={user?.id} userRole={user?.role} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
