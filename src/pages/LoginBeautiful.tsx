import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { 
  User, 
  Lock, 
  Mail, 
  Shield, 
  Stethoscope, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Loader2, 
  Phone,
  Sparkles,
  Heart,
  Zap,
  ShieldCheck,
  Users2,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Star,
  UserPlus,
  CheckCircle
} from 'lucide-react'

const Login = () => {
  const { login, register } = useAuth()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  // Remove role selection - auto-detect based on credentials
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { name, email, password, confirmPassword, phone } = formData

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)
    
    try {
      if (isLogin) {
        // Login logic
        if (!email || !password) {
          setError('Please fill in all required fields')
          setIsLoading(false)
          return
        }
        
        // Add debugging
        console.log('Login attempt:', { email, password: '***' })
        
        const success = await login(email, password)
        console.log('Login success:', success)
        
        if (success && typeof success === 'object' && success.role) {
          console.log(`Login successful for ${success.role}`)
          setError('')
          
          // Add success notification
          addNotification({
            title: 'Login Successful',
            message: `Welcome back! You are logged in as ${success.role}`,
            type: 'success'
          })
          
          // Immediate navigation - auto-detect role from login response
          setTimeout(() => {
            const userRole = success.role
            switch (userRole) {
              case 'admin':
                console.log('Navigating to admin dashboard')
                navigate('/admin/dashboard')
                break
              case 'pharmacist':
                console.log('Navigating to pharmacist dashboard')
                navigate('/pharmacist/dashboard')
                break
              case 'user':
                console.log('Navigating to patient dashboard')
                navigate('/patient/dashboard')
                break
              default:
                navigate('/')
            }
          }, 500)
        } else {
          setError('Invalid email or password. Please check your credentials or register for a new account.')
          addNotification({
            title: 'Login Failed',
            message: 'Invalid credentials. Please check your email and password or register for a new account.',
            type: 'error'
          })
        }
      } else {
        // Registration logic
        if (!name || !email || !password || !phone) {
          setError('Please fill in all required fields')
          setIsLoading(false)
          return
        }
        
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        
        const success = await register(name, email, password, phone, 'user') // Default role, will be overridden by auto-detection
        
        if (success && typeof success === 'object' && success.role) {
          setSuccess('Registration successful! You are now logged in.')
          setError('')
          
          // Add success notification with role
          addNotification({
            title: 'Registration Successful',
            message: `Your account has been created successfully! You are logged in as ${success.role}`,
            type: 'success'
          })
          
          // Navigate to appropriate dashboard based on detected role
          setTimeout(() => {
            const userRole = success.role
            switch (userRole) {
              case 'admin':
                console.log('Navigating to admin dashboard after registration')
                navigate('/admin/dashboard')
                break
              case 'pharmacist':
                console.log('Navigating to pharmacist dashboard after registration')
                navigate('/pharmacist/dashboard')
                break
              case 'user':
                console.log('Navigating to patient dashboard after registration')
                navigate('/patient/dashboard')
                break
              default:
                console.log('Default navigation to patient dashboard')
                navigate('/patient/dashboard')
            }
          }, 1000)
        } else {
          setError('Registration failed. Please try again.')
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Static Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Enhanced Branding */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Stethoscope className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      MediCare+
                    </h1>
                    <p className="text-gray-600 text-lg">Your Health, Our Priority</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {isLogin ? 'Welcome Back' : 'Join MediCare+'}
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {isLogin 
                      ? 'Access your personalized healthcare dashboard and manage your wellness journey efficiently.'
                      : 'Start your healthcare journey with us and experience the future of medicine management.'
                    }
                  </p>
                </div>
              </div>
              
              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Lightning Fast</h3>
                      <p className="text-gray-600">Quick and seamless access</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Secure Platform</h3>
                      <p className="text-gray-600">Your data is protected</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Users2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Role-Based Access</h3>
                      <p className="text-gray-600">Tailored experience</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Healthcare First</h3>
                      <p className="text-gray-600">Your wellness matters</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"MediCare+ has revolutionized how I manage my pharmacy. The interface is intuitive and the features are exactly what I needed."</p>
                <p className="text-sm text-gray-600 mt-2 font-medium">- Dr. Sarah Johnson, Pharmacist</p>
              </div>
            </div>

            {/* Right Side - Enhanced Login Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
              {/* Tab Switcher */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    isLogin
                      ? 'bg-white text-indigo-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    !isLogin
                      ? 'bg-white text-indigo-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Register
                </button>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Sign In to Your Account' : 'Create Your Account'}
                </h3>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Enter your credentials to access your account' 
                    : 'Join our healthcare community today'
                  }
                </p>
              </div>

              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Registration Only Fields */}
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="Enter your phone number"
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Enter password"
                      className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        placeholder="Confirm password"
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                        required={!isLogin}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{success}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>{isLogin ? 'Signing in...' : 'Registering...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Register'}</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* User Registration Info */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center space-x-2 mb-3">
                  <UserPlus className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-800">New to Medicine Finder?</p>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Create your account to access our complete healthcare platform. Register as a patient to browse medicines, manage prescriptions, and connect with pharmacies.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700">Free registration</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700">Instant access</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700">Secure account</span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  {isLogin 
                    ? "Don't have an account? " 
                    : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold"
                  >
                    {isLogin ? 'Register now' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
