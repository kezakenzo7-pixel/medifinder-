import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Shield, 
  Truck, 
  Users, 
  Heart, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  TrendingUp,
  Package,
  Stethoscope,
  FileText,
  ChevronRight
} from 'lucide-react'
import { theme } from '../styles/theme'
import { rwandanMedicines } from '../data/rwandaMedicines'

const LandingPage = () => {
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: Shield,
      title: '100% Authentic',
      description: 'All medicines are sourced from verified manufacturers and pharmacies',
      color: '#00897B'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your medicines delivered within 30 minutes or less',
      color: '#546E7A'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our healthcare experts are available 24/7 to help you',
      color: '#FF6B6B'
    },
    {
      icon: Heart,
      title: 'Health First',
      description: 'Your health and wellness is our top priority',
      color: '#4CAF50'
    }
  ]

  const stats = [
    { number: '50,000+', label: 'Happy Customers', icon: Users },
    { number: '1000+', label: 'Medicines Available', icon: Package },
    { number: '99.9%', label: 'Accuracy Rate', icon: Shield },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      content: 'MediCare+ has been a lifesaver! The quick delivery and authentic products give me peace of mind.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Healthcare Professional',
      content: 'I recommend MediCare+ to all my patients. The quality and reliability are unmatched.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Mother of Two',
      content: 'The convenience of ordering medicines from home while taking care of my kids is invaluable.',
      rating: 5,
      avatar: 'ER'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.primary }}>
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold" style={{ color: theme.colors.textPrimary }}>
                  MediCare+
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="#home" className="text-gray-700 hover:text-teal-700 transition-colors">Home</a>
                <a href="#features" className="text-gray-700 hover:text-teal-700 transition-colors">Features</a>
                <a href="#medicines" className="text-gray-700 hover:text-teal-700 transition-colors">Medicines</a>
                <a href="#about" className="text-gray-700 hover:text-teal-700 transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-teal-700 transition-colors">Contact</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-teal-700 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Your Health,
                  <span className="block" style={{ color: theme.colors.primary }}>
                    Delivered Fast
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience the convenience of ordering authentic medicines from verified pharmacies, 
                  delivered to your doorstep within minutes.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-2xl">
                <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="flex-1 flex items-center">
                    <Search className="h-5 w-5 text-gray-400 ml-4" />
                    <input
                      type="text"
                      placeholder="Search for medicines, health products..."
                      className="w-full px-4 py-4 focus:outline-none text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <button 
                    style={{ backgroundColor: theme.colors.primary }}
                    className="text-white px-8 py-4 font-semibold hover:bg-teal-800 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/search"
                  className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: theme.colors.primary, color: 'white' }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <Link
                  to="/prescription"
                  className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 bg-white"
                >
                  <FileText className="h-5 w-5" />
                  <span>Upload Prescription</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-teal-700" />
                  <span className="text-sm text-gray-600">Verified Pharmacies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-teal-700" />
                  <span className="text-sm text-gray-600">Authentic Medicines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-teal-700" />
                  <span className="text-sm text-gray-600">Expert Support</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative">
                <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {rwandanMedicines.slice(0, 4).map((medicine) => (
                      <div
                        key={medicine.id}
                        className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="w-full h-20 bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg mb-3 flex items-center justify-center">
                          <Package className="h-8 w-8 text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-sm text-gray-900 truncate">{medicine.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-teal-700 font-bold">RWF {medicine.priceRWF.toLocaleString()}</span>
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="font-semibold">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span style={{ color: theme.colors.primary }}>MediCare+</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing healthcare delivery with cutting-edge technology and unmatched service quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <Icon
                      className="h-8 w-8"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${theme.colors.primary}20` }}>
                    <Icon className="h-8 w-8" style={{ color: theme.colors.primary }} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real stories from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.colors.primary}20` }}>
                    <span className="font-bold" style={{ color: theme.colors.primary }}>
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: theme.colors.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their healthcare experience with MediCare+
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="bg-white text-teal-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Start Shopping</span>
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-teal-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.primary }}>
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MediCare+</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for authentic medicines and healthcare products.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#medicines" className="hover:text-white transition-colors">Medicines</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Medicine Delivery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Prescription Upload</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Consultation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Services</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+250 788 123 456</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@medicare.rw</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Kigali, Rwanda</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
