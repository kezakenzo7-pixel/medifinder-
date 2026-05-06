import React, { useState } from 'react'
import { 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Shield, 
  Truck,
  Building,
  User,
  Calendar,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react'

const MedicalEmergency = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeEmergency, setActiveEmergency] = useState<string | null>(null)

  const emergencyServices = [
    {
      id: 'emergency-912',
      name: 'Emergency Medical Services',
      number: '912',
      description: 'For life-threatening emergencies, accidents, and critical medical situations',
      icon: Truck,
      color: 'red',
      priority: 'critical'
    },
    {
      id: 'poison-114',
      name: 'Poison Control Center',
      number: '114',
      description: 'For poisoning, drug overdose, and toxic substance exposure',
      icon: AlertTriangle,
      color: 'orange',
      priority: 'high'
    },
    {
      id: 'mental-health',
      name: 'Mental Health Crisis Line',
      number: '117',
      description: 'For mental health emergencies, suicide prevention, and psychological crises',
      icon: Heart,
      color: 'purple',
      priority: 'high'
    },
    {
      id: 'police-999',
      name: 'Police Emergency',
      number: '999',
      description: 'For security emergencies, accidents requiring police assistance',
      icon: Shield,
      color: 'blue',
      priority: 'medium'
    }
  ]

  const majorHospitals = [
    {
      name: 'Kigali University Teaching Hospital (CHUK)',
      address: 'KG 179 Ave, Kigali',
      phone: '+250788123456',
      emergency: true,
      coordinates: 'Lat: -1.9536, Lng: 30.0606',
      services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics', 'ICU']
    },
    {
      name: 'King Faisal Hospital',
      address: 'KG 643 St, Kiyovu, Kigali',
      phone: '+250788789012',
      emergency: true,
      coordinates: 'Lat: -1.9488, Lng: 30.0583',
      services: ['Emergency', 'Cardiology', 'Oncology', 'Neurology', 'Orthopedics']
    },
    {
      name: 'Masaka Hospital',
      address: 'Masaka, Kicukiro District',
      phone: '+250788345678',
      emergency: false,
      coordinates: 'Lat: -2.0789, Lng: 30.1265',
      services: ['General Medicine', 'Maternity', 'Pediatrics', 'Surgery']
    },
    {
      name: 'Muhima Hospital',
      address: 'KN 4 Ave, Kigali',
      phone: '+250788567890',
      emergency: true,
      coordinates: 'Lat: -1.9364, Lng: 30.0445',
      services: ['Emergency', 'Internal Medicine', 'Pediatrics', 'Surgery']
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getEmergencyColor = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 border-red-200 text-red-700'
      case 'orange': return 'bg-orange-50 border-orange-200 text-orange-700'
      case 'purple': return 'bg-purple-50 border-purple-200 text-purple-700'
      case 'blue': return 'bg-blue-50 border-blue-200 text-blue-700'
      default: return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-900 mb-2">
            Medical Emergency Services - Rwanda
          </h3>
          
          {!isExpanded ? (
            <div className="text-sm text-red-800 space-y-2">
              <p>
                In case of medical emergency, call emergency services immediately. 
                Save these numbers for quick access.
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center space-x-1"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>View Emergency Contacts</span>
                </button>
                <div className="flex items-center space-x-1 text-red-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-xs font-medium">Emergency: 912</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Emergency Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {emergencyServices.map((service) => {
                  const Icon = service.icon
                  return (
                    <div
                      key={service.id}
                      className={`${getEmergencyColor(service.color)} border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow`}
                      onClick={() => setActiveEmergency(service.id === activeEmergency ? null : service.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 ${getPriorityColor(service.priority)} rounded-full flex items-center justify-center`}>
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{service.name}</h4>
                          <div className="flex items-center space-x-2 mb-1">
                            <Phone className="h-3 w-3" />
                            <span className="font-bold text-lg">{service.number}</span>
                          </div>
                          <p className="text-xs opacity-80">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Major Hospitals */}
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3">Major Hospitals in Kigali</h4>
                <div className="space-y-3">
                  {majorHospitals.map((hospital, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <Building className="h-5 w-5 text-gray-600 mt-0.5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h5 className="font-semibold text-gray-900">{hospital.name}</h5>
                              {hospital.emergency && (
                                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                                  24/7 Emergency
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-sm text-gray-600">{hospital.address}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span className="text-sm text-gray-600">{hospital.phone}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {hospital.services.map((service, i) => (
                                <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Guidelines */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Emergency Guidelines</h4>
                <ul className="list-disc list-inside space-y-1 text-yellow-800 text-sm">
                  <li>Stay calm and speak clearly when calling emergency services</li>
                  <li>Provide your exact location and describe the situation</li>
                  <li>Follow the dispatcher's instructions carefully</li>
                  <li>Do not move the patient unless they are in immediate danger</li>
                  <li>Keep emergency numbers readily available at all times</li>
                </ul>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center space-x-1"
              >
                <X className="h-4 w-4" />
                <span>Hide Emergency Info</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MedicalEmergency
