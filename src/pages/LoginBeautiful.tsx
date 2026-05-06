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
  Star
} from 'lucide-react'

const Login = () => {
  const { login, register } = useAuth()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState('user')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { name, email, password, confirmPassword, phone } = formData

  const roles = [
    {
      value: 'admin',
      label: 'Administrator',
      icon: Shield,
      description: 'Full system control and management',
      color: 'from-violet-600 to-purple-600',
      bgColor: 'from-violet-50 to-purple-50',
      borderColor: 'border-violet-200',
      hoverBg: 'hover:from-violet-100 hover:to-purple-100',
      features: ['Complete Access', 'User Management', 'System Analytics']
    },
    {
      value: 'pharmacist',
      label: 'Pharmacist',
      icon: Stethoscope,
      description: 'Manage inventory and process orders',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:from-blue-100 hover:to-cyan-100',
      features: ['Medicine Management', 'Order Processing', 'Inventory Control']
    },
    {
      value: 'user',
      label: 'Customer',
      icon: UserIcon,
      description: 'Search and buy medicines',
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      hoverBg: 'hover:from-emerald-100 hover:to-teal-100',
      features: ['Browse Medicines', 'Quick Ordering', 'Home Delivery']
    }
  ]

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
        console.log('Login attempt:', { email, password: '***', selectedRole })
        
        const success = await login(email, password, selectedRole)
        console.log('Login success:', success)
        
        if (success) {
          console.log(`Login successful for ${selectedRole}`)
          setError('')
          
          // Add success notification
          addNotification({
            title: 'Login Successful',
            message: `Welcome back! You are logged in as ${selectedRole}`,
            type: 'success'
          })
          
          // Immediate navigation
          setTimeout(() => {
            switch (selectedRole) {
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
          setError('Invalid credentials. Please use the demo credentials shown below.')
          addNotification({
            title: 'Login Failed',
            message: 'Invalid credentials. Please check your email and password.',
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
        
        const success = await register(name, email, password, phone, selectedRole)
        
        if (success) {
          setSuccess('Registration successful! Please sign in.')
          setIsLogin(true)
          setError('')
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
                    ? 'Choose your role and enter your credentials' 
                    : 'Join our healthcare community today'
                  }
                </p>
              </div>

              {/* Enhanced Role Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Select Your Role</label>
                <div className="space-y-3">
                  {roles.map((role) => {
                    const Icon = role.icon
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setSelectedRole(role.value as 'admin' | 'pharmacist' | 'user')}
                        className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${role.borderColor} ${
                          selectedRole === role.value
                            ? `border-opacity-100 bg-gradient-to-r ${role.bgColor} shadow-lg`
                            : 'border-opacity-30 bg-white/50 hover:border-opacity-60'
                        } ${role.hoverBg}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${role.color} text-white shadow-md`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="font-bold text-gray-900 text-lg">{role.label}</h4>
                            <p className="text-gray-600 text-sm mb-2">{role.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {role.features.map((feature, index) => (
                                <span key={index} className="inline-flex items-center text-xs bg-white/60 px-2 py-1 rounded-full">
                                  <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          {selectedRole === role.value && (
                            <div className="ml-auto">
                              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
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
                      placeholder={`Enter ${selectedRole} email`}
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

              {/* Enhanced Demo Credentials */}
              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  <p className="text-sm font-semibold text-indigo-800">Demo Credentials:</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                    <span className="font-medium text-indigo-700">Admin:</span>
                    <span className="text-indigo-600">admin@medicinefinder.com / password</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                    <span className="font-medium text-indigo-700">Pharmacist:</span>
                    <span className="text-indigo-600">pharmacist@medicinefinder.com / password</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                    <span className="font-medium text-indigo-700">User:</span>
                    <span className="text-indigo-600">user@medicinefinder.com / password</span>
                  </div>
                </div>
                
                {/* Quick Login Buttons */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-indigo-700 mb-2">Quick Login:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          email: 'admin@medicinefinder.com',
                          password: 'password'
                        })
                        setSelectedRole('admin')
                      }}
                      className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-indigo-700"
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          email: 'pharmacist@medicinefinder.com',
                          password: 'password'
                        })
                        setSelectedRole('pharmacist')
                      }}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700"
                    >
                      Pharmacist
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          email: 'user@medicinefinder.com',
                          password: 'password'
                        })
                        setSelectedRole('user')
                      }}
                      className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-emerald-700"
                    >
                      User
                    </button>
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
