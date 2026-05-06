import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Camera, FileText, Plus, X, Check, Sparkles, AlertCircle, Loader2, ScanLine } from 'lucide-react'

interface Medicine {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
}

const PrescriptionInput = () => {
  const navigate = useNavigate()
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'manual' | null>(null)
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [currentMedicine, setCurrentMedicine] = useState<Medicine>({
    id: '',
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setIsProcessing(true)
      
      // Simulate OCR processing with animation
      setTimeout(() => {
        // Mock extracted medicines
        setMedicines([
          {
            id: '1',
            name: 'Paracetamol 500mg',
            dosage: '1 tablet',
            frequency: '3 times daily',
            duration: '5 days'
          },
          {
            id: '2',
            name: 'Amoxicillin 250mg',
            dosage: '2 tablets',
            frequency: '2 times daily',
            duration: '7 days'
          }
        ])
        setIsProcessing(false)
      }, 3000)
    }
  }

  const addMedicine = () => {
    if (currentMedicine.name && currentMedicine.dosage && currentMedicine.frequency && currentMedicine.duration) {
      setMedicines([...medicines, { ...currentMedicine, id: Date.now().toString() }])
      setCurrentMedicine({ id: '', name: '', dosage: '', frequency: '', duration: '' })
    }
  }

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id))
  }

  const proceedToSearch = () => {
    if (medicines.length > 0) {
      navigate('/search', { state: { medicines } })
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">AI-Powered OCR Technology</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="gradient-text">Add Your Prescription</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload a prescription image or enter medicines manually to find the best prices
        </p>
      </div>

      {/* Upload Method Selection */}
      {!uploadMethod && (
        <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
          <button
            onClick={() => setUploadMethod('upload')}
            className="group card p-8 hover-lift text-left"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Upload Prescription</h3>
                <p className="text-gray-600">Smart & Fast</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Take a photo or upload an image of your prescription</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">AI Recognition</span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Instant Processing</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">99% Accuracy</span>
            </div>
          </button>

          <button
            onClick={() => setUploadMethod('manual')}
            className="group card p-8 hover-lift text-left"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Enter Manually</h3>
                <p className="text-gray-600">Full Control</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Type in your medicines manually from the prescription</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Precise Entry</span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Edit Anytime</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">Save Draft</span>
            </div>
          </button>
        </div>
      )}

      {/* Upload Interface */}
      {uploadMethod === 'upload' && (
        <div className="space-y-8 animate-fade-in">
          <div className="card p-8">
            <div className="border-3 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 opacity-50"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-white rounded-2xl shadow-lg mb-4">
                    <ScanLine className="h-12 w-12 text-blue-600 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Prescription Image</h3>
                <p className="text-gray-600 mb-6">Support JPG, PNG, PDF (Max 10MB)</p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={isProcessing}
                />
                <label
                  htmlFor="file-upload"
                  className={`btn btn-primary cursor-pointer px-8 py-4 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <span className="flex items-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Upload className="h-5 w-5" />
                      <span>Choose File</span>
                    </span>
                  )}
                </label>
                
                {uploadedFile && !isProcessing && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-bounce-in">
                    <div className="flex items-center justify-center space-x-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <p className="text-green-700 font-medium">{uploadedFile.name} uploaded successfully!</p>
                    </div>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                      <p className="text-blue-600 font-medium">Analyzing prescription...</p>
                    </div>
                    <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {medicines.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold gradient-text">Extracted Medicines</h3>
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 font-medium">{medicines.length} medicines found</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {medicines.map((medicine, index) => (
                  <div key={medicine.id} className="card p-6 hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{medicine.name}</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Dosage:</span>
                            <span>{medicine.dosage}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Frequency:</span>
                            <span>{medicine.frequency}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Duration:</span>
                            <span>{medicine.duration}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeMedicine(medicine.id)}
                        className="p-2 rounded-xl hover:bg-red-50 text-red-500 hover:text-red-700 transition-all duration-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual Entry Interface */}
      {uploadMethod === 'manual' && (
        <div className="space-y-8 animate-fade-in">
          <div className="card p-8">
            <h3 className="text-2xl font-bold gradient-text mb-6">Add Medicine</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  placeholder="e.g., Paracetamol 500mg"
                  value={currentMedicine.name}
                  onChange={(e) => setCurrentMedicine({...currentMedicine, name: e.target.value})}
                  className="input"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Dosage</label>
                <input
                  type="text"
                  placeholder="e.g., 1 tablet"
                  value={currentMedicine.dosage}
                  onChange={(e) => setCurrentMedicine({...currentMedicine, dosage: e.target.value})}
                  className="input"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Frequency</label>
                <input
                  type="text"
                  placeholder="e.g., 2 times daily"
                  value={currentMedicine.frequency}
                  onChange={(e) => setCurrentMedicine({...currentMedicine, frequency: e.target.value})}
                  className="input"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 7 days"
                  value={currentMedicine.duration}
                  onChange={(e) => setCurrentMedicine({...currentMedicine, duration: e.target.value})}
                  className="input"
                />
              </div>
            </div>
            <button
              onClick={addMedicine}
              className="mt-6 btn btn-primary flex items-center space-x-2 px-6 py-3"
            >
              <Plus className="h-5 w-5" />
              <span>Add Medicine</span>
            </button>
          </div>

          {medicines.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold gradient-text">Added Medicines ({medicines.length})</h3>
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                  <Check className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-700 font-medium">Ready to search</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {medicines.map((medicine, index) => (
                  <div key={medicine.id} className="card p-6 hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{medicine.name}</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Dosage:</span>
                            <span>{medicine.dosage}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Frequency:</span>
                            <span>{medicine.frequency}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Duration:</span>
                            <span>{medicine.duration}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeMedicine(medicine.id)}
                        className="p-2 rounded-xl hover:bg-red-50 text-red-500 hover:text-red-700 transition-all duration-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {uploadMethod && (
        <div className="flex justify-between items-center animate-fade-in">
          <button
            onClick={() => setUploadMethod(null)}
            className="btn btn-secondary flex items-center space-x-2 px-6 py-3"
          >
            <X className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          {medicines.length > 0 && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Ready to compare prices</p>
                <p className="text-lg font-bold gradient-text">{medicines.length} medicines</p>
              </div>
              <button
                onClick={proceedToSearch}
                className="btn btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
              >
                <Check className="h-5 w-5" />
                <span>Search for Medicines</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PrescriptionInput
