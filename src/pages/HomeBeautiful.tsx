import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { 
  Search, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Shield, 
  Truck, 
  Users, 
  Heart, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Globe,
  HeadphonesIcon,
  MessageCircle,
  Stethoscope,
  Pill,
  Package,
  Sparkles,
  Activity,
  Target,
  BarChart3
} from 'lucide-react'

const Home = () => {
  const { user } = useAuth()
  const { state: cartState } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const featuredMedicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 4.99,
      originalPrice: 6.99,
      rating: 4.8,
      reviews: 324,
      image: '/api/placeholder/300/200',
      inStock: true,
      prescriptionRequired: false,
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.9,
      reviews: 256,
      image: '/api/placeholder/300/200',
      inStock: true,
      prescriptionRequired: true,
      badge: 'Prescription'
    },
    {
      id: 3,
      name: 'Vitamin D3 1000IU',
      category: 'Supplements',
      price: 8.99,
      originalPrice: 10.99,
      rating: 4.7,
      reviews: 189,
      image: '/api/placeholder/300/200',
      inStock: true,
      prescriptionRequired: false,
      badge: '20% OFF'
    },
    {
      id: 4,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      price: 6.99,
      originalPrice: 8.99,
      rating: 4.6,
      reviews: 412,
      image: '/api/placeholder/300/200',
      inStock: false,
      prescriptionRequired: false,
      badge: 'Low Stock'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Delivery',
      description: 'Get your medicines delivered within 30 minutes or less',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: '100% Authentic Products',
      description: 'All medicines are sourced from verified manufacturers',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Customer Support',
      description: 'Our healthcare experts are always here to help you',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Award,
      title: 'Trusted by 50,000+ Users',
      description: 'Join thousands of satisfied customers nationwide',
      color: 'from-purple-400 to-pink-500'
    }
  ]

  const stats = [
    { number: '50,000+', label: 'Happy Customers', icon: Users },
    { number: '1000+', label: 'Medicines Available', icon: Package },
    { number: '99.9%', label: 'Accuracy Rate', icon: Target },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      content: 'MediCare+ has been a lifesaver! The quick delivery and authentic products give me peace of mind.',
      rating: 5,
      avatar: '/api/placeholder/50/50'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Healthcare Professional',
      content: 'I recommend MediCare+ to all my patients. The quality and reliability are unmatched.',
      rating: 5,
      avatar: '/api/placeholder/50/50'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Mother of Two',
      content: 'The convenience of ordering medicines from home while taking care of my kids is invaluable.',
      rating: 5,
      avatar: '/api/placeholder/50/50'
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <Sparkles className="h-4 w-4" />
                  <span>Trusted by Healthcare Professionals</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Health,
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Delivered</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience the future of healthcare with our smart medicine delivery platform. 
                  Order authentic medicines from verified pharmacies, delivered to your doorstep in minutes.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-2xl">
                <div className="flex items-center bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="flex-1 flex items-center">
                    <Search className="h-5 w-5 text-gray-400 ml-4" />
                    <input
                      type="text"
                      placeholder="Search for medicines, health products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-4 focus:outline-none text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/search"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <Link
                  to="/prescription"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center space-x-2"
                >
                  <Stethoscope className="h-5 w-5" />
                  <span>Upload Prescription</span>
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Image/Animation */}
            <div className="relative">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {featuredMedicines.slice(0, 4).map((medicine, index) => (
                      <div
                        key={medicine.id}
                        className={`bg-white rounded-xl p-4 shadow-lg transition-all duration-300 ${
                          index === activeFeature ? 'scale-105 shadow-xl' : 'scale-100'
                        }`}
                      >
                        <div className="w-full h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                          <Package className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h4 className="font-semibold text-sm text-gray-900 truncate">{medicine.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-indigo-600 font-bold">${medicine.price}</span>
                          {medicine.inStock && (
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                  <span className="font-semibold">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MediCare+</span>
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
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Medicines</h2>
            <p className="text-xl text-gray-600">Popular healthcare products trusted by thousands</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    medicine.badge === 'Best Seller' ? 'bg-red-500 text-white' :
                    medicine.badge === 'Prescription' ? 'bg-blue-500 text-white' :
                    medicine.badge === '20% OFF' ? 'bg-green-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {medicine.badge}
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
                  <Package className="h-16 w-16 text-indigo-600" />
                  {!medicine.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{medicine.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{medicine.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {renderStars(Math.floor(medicine.rating))}
                    </div>
                    <span className="text-sm text-gray-600">({medicine.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${medicine.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${medicine.originalPrice}</span>
                    </div>
                    {medicine.prescriptionRequired && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    disabled={!medicine.inStock}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      medicine.inStock
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {medicine.inStock ? 'Buy' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real stories from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
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
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their healthcare experience with MediCare+
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Start Shopping</span>
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  )
}

export default Home
