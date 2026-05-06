import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  Search, 
  MapPin, 
  Pill, 
  Phone, 
  Clock, 
  Shield, 
  Star,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Activity,
  Stethoscope,
  Truck,
  FileText,
  CheckCircle
} from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium">✨ Trusted by 50,000+ Patients</span>
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Health,
                <span className="block text-blue-200">Our Priority</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Find medicines, locate pharmacies, and manage your healthcare needs with ease. 
                Fast, reliable, and available 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/search"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Search className="h-5 w-5" />
                  <span>Search Medicines</span>
                </Link>
                <Link
                  to="/pharmacies"
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Find Pharmacies</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4">
                    <Heart className="h-8 w-8 mb-2" />
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-sm text-blue-200">Medicines</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4">
                    <Users className="h-8 w-8 mb-2" />
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-blue-200">Pharmacies</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4">
                    <Clock className="h-8 w-8 mb-2" />
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-blue-200">Service</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4">
                    <Star className="h-8 w-8 mb-2" />
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-sm text-blue-200">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/search" className="group">
              <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-blue-100 rounded-xl p-4 w-16 h-16 mb-4 group-hover:bg-blue-200 transition-colors">
                  <Search className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Search Medicine</h3>
                <p className="text-sm text-gray-500 mt-1">Find any medicine</p>
              </div>
            </Link>
            
            <Link to="/pharmacies" className="group">
              <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-green-100 rounded-xl p-4 w-16 h-16 mb-4 group-hover:bg-green-200 transition-colors">
                  <MapPin className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Nearby Pharmacies</h3>
                <p className="text-sm text-gray-500 mt-1">Locate stores</p>
              </div>
            </Link>
            
            <Link to="/prescription" className="group">
              <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-purple-100 rounded-xl p-4 w-16 h-16 mb-4 group-hover:bg-purple-200 transition-colors">
                  <FileText className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Upload Prescription</h3>
                <p className="text-sm text-gray-500 mt-1">Order quickly</p>
              </div>
            </Link>
            
            <Link to="/emergency" className="group">
              <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-red-100 rounded-xl p-4 w-16 h-16 mb-4 group-hover:bg-red-200 transition-colors">
                  <Truck className="h-8 w-8 text-red-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Emergency</h3>
                <p className="text-sm text-gray-500 mt-1">Get help now</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Better Health
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare solutions designed to make your life easier and healthier
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 rounded-xl p-4 w-16 h-16 mb-6">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Medicine Search</h3>
            <p className="text-gray-600 mb-6">
              Search for any medicine by name, category, or manufacturer. Get detailed information including prices, availability, and alternatives.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Real-time stock information</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Price comparison</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Alternative suggestions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-100 rounded-xl p-4 w-16 h-16 mb-6">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pharmacy Locator</h3>
            <p className="text-gray-600 mb-6">
              Find nearby pharmacies with real-time stock information. Get directions, contact details, and operating hours instantly.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">GPS-based location</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Live stock updates</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">User reviews</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="bg-purple-100 rounded-xl p-4 w-16 h-16 mb-6">
              <Pill className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Ordering</h3>
            <p className="text-gray-600 mb-6">
              Buy medicines online and get them delivered to your doorstep. Multiple payment options and express delivery available.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Same-day delivery</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Secure payments</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Order tracking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who trust us for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Get Started Now</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              to="/search"
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200"
            >
              Browse Medicines
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
