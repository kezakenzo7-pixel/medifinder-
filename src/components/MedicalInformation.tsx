import React, { useState } from 'react'
import { 
  AlertTriangle, 
  Info, 
  Shield, 
  Clock, 
  Thermometer, 
  Pill, 
  Heart, 
  Brain,
  Activity,
  Eye,
  Ear,
  Bone,
  Baby,
  Users,
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin
} from 'lucide-react'

interface MedicalInformationProps {
  medicine: {
    name: string
    genericName: string
    description: string
    dosage: string
    form: string
    sideEffects: string[]
    contraindications: string[]
    storageConditions: string
    expiryDate: string
    prescriptionRequired: boolean
    category: string
  }
}

const MedicalInformation: React.FC<MedicalInformationProps> = ({ medicine }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const getSeverityColor = (severity: 'mild' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'mild': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'moderate': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'severe': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pain-relief': return <Brain className="h-5 w-5" />
      case 'heart-health': return <Heart className="h-5 w-5" />
      case 'stomach': return <Activity className="h-5 w-5" />
      case 'eye-care': return <Eye className="h-5 w-5" />
      case 'ear-nose-throat': return <Ear className="h-5 w-5" />
      case 'bone-health': return <Bone className="h-5 w-5" />
      case 'children': return <Baby className="h-5 w-5" />
      case 'womens-health': return <Users className="h-5 w-5" />
      default: return <Pill className="h-5 w-5" />
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'dosage', label: 'Dosage & Administration', icon: Pill },
    { id: 'side-effects', label: 'Side Effects', icon: AlertTriangle },
    { id: 'precautions', label: 'Precautions', icon: Shield },
    { id: 'storage', label: 'Storage', icon: Thermometer }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            {getCategoryIcon(medicine.category)}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">{medicine.name}</h2>
            <p className="text-blue-100 text-sm mb-2">Generic Name: {medicine.genericName}</p>
            <div className="flex items-center space-x-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                {medicine.form}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                {medicine.dosage}
              </span>
              {medicine.prescriptionRequired && (
                <span className="bg-red-500 px-3 py-1 rounded-full text-xs font-medium">
                  Prescription Required
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Medical Description</h3>
              <p className="text-gray-700 leading-relaxed">{medicine.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Drug Classification</h4>
                <p className="text-gray-700 capitalize">{medicine.category.replace('-', ' ')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Administration Form</h4>
                <p className="text-gray-700 capitalize">{medicine.form}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Medical Advisory</h4>
                  <p className="text-blue-800 text-sm">
                    This medication should only be used under medical supervision. 
                    Consult your healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dosage' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Dosage Information</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Important Dosage Warning</h4>
                    <p className="text-yellow-800 text-sm">
                      Dosage must be determined by a qualified healthcare professional based on 
                      patient condition, age, weight, and other factors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Standard Dosage</h4>
                <p className="text-gray-700">{medicine.dosage}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Administration Instructions</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Take with or without food as directed by your healthcare provider</li>
                  <li>Swallow tablets whole with a full glass of water</li>
                  <li>Do not crush or chew extended-release formulations</li>
                  <li>Take at the same time(s) each day for best results</li>
                  <li>Do not double dose if you miss a dose</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Missed Dose</h4>
                <p className="text-gray-700">
                  If you miss a dose, take it as soon as you remember. However, if it's almost 
                  time for your next dose, skip the missed dose and continue with your regular schedule.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'side-effects' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Potential Side Effects</h3>
              <div className="space-y-4">
                {medicine.sideEffects.map((effect, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Side Effect {index + 1}</h4>
                        <p className="text-gray-700">{effect}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-2">When to Seek Medical Attention</h4>
                  <p className="text-red-800 text-sm">
                    Contact your healthcare provider immediately if you experience severe side effects, 
                    allergic reactions (difficulty breathing, swelling, rash), or any unusual symptoms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'precautions' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Medical Precautions</h3>
              <div className="space-y-4">
                {medicine.contraindications.map((contraindication, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-1">Contraindication {index + 1}</h4>
                        <p className="text-red-800">{contraindication}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Precautions</h4>
                  <ul className="list-disc list-inside space-y-2 text-yellow-800">
                    <li>Inform your doctor about all medical conditions</li>
                    <li>Disclose all medications, supplements, and allergies</li>
                    <li>Avoid alcohol unless specifically approved by your doctor</li>
                    <li>Do not drive or operate machinery until you know how this medication affects you</li>
                    <li>Elderly patients may require dosage adjustments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'storage' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Storage Instructions</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Thermometer className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Storage Conditions</h4>
                    <p className="text-blue-800">{medicine.storageConditions}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Expiry Date</h4>
                <p className="text-gray-700">{medicine.expiryDate}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Storage Location</h4>
                <p className="text-gray-700">Store in a cool, dry place away from direct sunlight</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Storage Notes</h4>
                  <ul className="list-disc list-inside space-y-2 text-yellow-800">
                    <li>Keep out of reach of children and pets</li>
                    <li>Do not store in bathroom or kitchen where moisture is high</li>
                    <li>Do not use medication after expiration date</li>
                    <li>Properly dispose of expired or unused medication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>Emergency: 912 | Poison Control: 114</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Nearest Hospital: Kigali University Teaching Hospital</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicalInformation
