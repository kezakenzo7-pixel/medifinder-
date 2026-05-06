import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FileText, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Stethoscope,
  Pill,
  Bell,
  ChevronRight,
  X
} from 'lucide-react'

const PatientPrescriptions = () => {
  const { user } = useAuth()
  const [prescriptions, setPrescriptions] = useState([])
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState(null)

  useEffect(() => {
    loadPrescriptions()
  }, [])

  useEffect(() => {
    filterPrescriptions()
  }, [prescriptions, searchTerm, selectedStatus])

  const loadPrescriptions = () => {
    // Mock prescriptions data - in real app, this would come from API
    const mockPrescriptions = [
      {
        id: 'RX001',
        doctorName: 'Dr. Sarah Johnson',
        doctorSpecialty: 'General Physician',
        hospital: 'Kigali Central Hospital',
        date: '2024-01-15',
        expiryDate: '2024-04-15',
        status: 'active',
        medications: [
          {
            name: 'Paracetamol',
            dosage: '500mg',
            frequency: 'Twice daily',
            duration: '7 days',
            instructions: 'Take after meals'
          },
          {
            name: 'Amoxicillin',
            dosage: '250mg',
            frequency: 'Three times daily',
            duration: '5 days',
            instructions: 'Complete full course'
          }
        ],
        notes: 'For fever and bacterial infection',
        refills: 2,
        refillsUsed: 0
      },
      {
        id: 'RX002',
        doctorName: 'Dr. Michael Chen',
        doctorSpecialty: 'Cardiologist',
        hospital: 'Rwanda Medical Center',
        date: '2024-01-10',
        expiryDate: '2024-07-10',
        status: 'active',
        medications: [
          {
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            duration: '6 months',
            instructions: 'Take in the morning'
          }
        ],
        notes: 'For blood pressure management',
        refills: 5,
        refillsUsed: 1
      },
      {
        id: 'RX003',
        doctorName: 'Dr. Emily Wilson',
        doctorSpecialty: 'Dermatologist',
        hospital: 'Kigali Skin Clinic',
        date: '2023-12-20',
        expiryDate: '2024-03-20',
        status: 'expired',
        medications: [
          {
            name: 'Hydrocortisone Cream',
            dosage: '1%',
            frequency: 'Twice daily',
            duration: '14 days',
            instructions: 'Apply to affected area'
          }
        ],
        notes: 'For skin rash treatment',
        refills: 1,
        refillsUsed: 1
      }
    ]
    
    setPrescriptions(mockPrescriptions)
  }

  const filterPrescriptions = () => {
    let filtered = prescriptions
    
    if (searchTerm) {
      filtered = filtered.filter(prescription =>
        prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        prescription.notes.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(prescription => prescription.status === selectedStatus)
    }
    
    setFilteredPrescriptions(filtered)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'expired':
        return 'bg-red-100 text-red-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />
      case 'expired':
        return <AlertCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription)
  }

  const handleDownloadPrescription = (prescription) => {
    // In real app, this would download the prescription PDF
    console.log('Downloading prescription:', prescription.id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
              <p className="text-gray-600 mt-1">Manage your medical prescriptions</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Upload Prescription</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by doctor, medication, or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Prescriptions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPrescriptions.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">RX-{prescription.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(prescription.status)}`}>
                        {getStatusIcon(prescription.status)}
                        <span>{prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Dr. {prescription.doctorName}</span> • {prescription.doctorSpecialty}
                      </p>
                      <p className="text-sm text-gray-600">{prescription.hospital}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Issued: {new Date(prescription.date).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Expires: {new Date(prescription.expiryDate).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewPrescription(prescription)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadPrescription(prescription)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Medications</h4>
                  <div className="space-y-2">
                    {prescription.medications.map((med, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Pill className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{med.name}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600">{med.dosage}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600">{med.frequency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {prescription.notes && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes</h4>
                    <p className="text-sm text-gray-600">{prescription.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Refills: {prescription.refills - prescription.refillsUsed} of {prescription.refills}
                  </div>
                  {prescription.status === 'active' && (
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <Bell className="h-4 w-4" />
                      <span>Set Reminder</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'You haven\'t added any prescriptions yet'
              }
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Upload Prescription</span>
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Prescription</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload prescription image or PDF</p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  id="prescription-upload"
                />
                <label
                  htmlFor="prescription-upload"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Choose File</span>
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle upload logic
                    setShowUploadModal(false)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Detail Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Prescription Details</h3>
              <button
                onClick={() => setSelectedPrescription(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Prescription ID</p>
                  <p className="font-medium">RX-{selectedPrescription.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPrescription.status)}`}>
                    {getStatusIcon(selectedPrescription.status)}
                    <span>{selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1)}</span>
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-medium">Dr. {selectedPrescription.doctorName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialty</p>
                  <p className="font-medium">{selectedPrescription.doctorSpecialty}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hospital</p>
                  <p className="font-medium">{selectedPrescription.hospital}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date Issued</p>
                  <p className="font-medium">{new Date(selectedPrescription.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Medications</h4>
                <div className="space-y-3">
                  {selectedPrescription.medications.map((med, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{med.name}</p>
                          <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                          <p className="text-sm text-gray-600">Duration: {med.duration}</p>
                          <p className="text-sm text-gray-600 mt-1">{med.instructions}</p>
                        </div>
                        <Pill className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPrescription.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes</h4>
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-4">{selectedPrescription.notes}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleDownloadPrescription(selectedPrescription)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setSelectedPrescription(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientPrescriptions
