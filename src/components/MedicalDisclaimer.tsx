import React, { useState } from 'react'
import { AlertTriangle, Info, X, Shield, Heart, Phone } from 'lucide-react'

const MedicalDisclaimer = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Important Medical Information & Safety Notice
          </h3>
          
          {!isExpanded ? (
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                This platform provides pharmaceutical information and services. All medications should be used 
                under the guidance of qualified healthcare professionals.
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1"
                >
                  <Info className="h-4 w-4" />
                  <span>Read Full Disclaimer</span>
                </button>
                <div className="flex items-center space-x-1 text-blue-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-xs font-medium">Emergency: 912</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-blue-800 space-y-3">
              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-900 mb-2">Medical Disclaimer</h4>
                <p className="mb-2">
                  The information provided on this platform is for educational purposes only and should not 
                  replace professional medical advice, diagnosis, or treatment.
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Always consult with qualified healthcare professionals before starting any medication</li>
                  <li>Do not self-medicate or use prescription drugs without proper medical supervision</li>
                  <li>Inform your doctor about all medications, supplements, and medical conditions</li>
                  <li>Follow dosage instructions exactly as prescribed by your healthcare provider</li>
                  <li>Report any adverse reactions to your healthcare provider immediately</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-900 mb-2">Emergency Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="font-medium text-red-700">Emergency Medical Services</p>
                      <p className="text-sm">Dial 912 (Rwanda)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-pink-600" />
                    <div>
                      <p className="font-medium text-pink-700">Poison Control</p>
                      <p className="text-sm">Dial 114 (Rwanda)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-900 mb-2">Medication Safety Guidelines</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Store medications in a cool, dry place away from children</li>
                  <li>Check expiration dates before use</li>
                  <li>Do not share prescription medications with others</li>
                  <li>Complete the full course of antibiotics as prescribed</li>
                  <li>Keep a list of all medications you are currently taking</li>
                </ul>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1"
              >
                <X className="h-4 w-4" />
                <span>Show Less</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MedicalDisclaimer
