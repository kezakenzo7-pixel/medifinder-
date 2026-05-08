import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { User, Lock, Mail, Shield, Stethoscope, User as UserIcon, Eye, EyeOff, Loader2, Phone } from 'lucide-react'

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
      color: 'from-purple-500 to-purple-700',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      value: 'pharmacist',
      label: 'Pharmacist',
      icon: Stethoscope,
      description: 'Manage inventory and process orders',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      value: 'user',
      label: 'Customer',
      icon: UserIcon,
      description: 'Search and buy medicines',
      color: 'from-green-500 to-green-700',
      bgColor: 'from-green-50 to-green-100'
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
        
        // Test direct navigation for debugging
        if (email === 'admin@medicinefinder.com' && password === 'password' && selectedRole === 'admin') {
          console.log('Direct admin login detected')
          addNotification({
            title: 'Login Successful',
            message: 'Welcome Admin! Redirecting to dashboard...',
            type: 'success'
          })
          setTimeout(() => {
            window.location.href = '/admin/dashboard'
          }, 1000)
          return
        }
        
        if (email === 'pharmacist@medicinefinder.com' && password === 'password' && selectedRole === 'pharmacist') {
          console.log('Direct pharmacist login detected')
          addNotification({
            title: 'Login Successful',
            message: 'Welcome Pharmacist! Redirecting to dashboard...',
            type: 'success'
          })
          setTimeout(() => {
            window.location.href = '/pharmacist/dashboard'
          }, 1000)
          return
        }
        
        console.log('Starting login process...')
        const success = await login(email, password, selectedRole)
        console.log('Login result:', success)
        
        if (success) {
          console.log(`Login successful for ${selectedRole}, redirecting...`)
          setError('')
          
          // Add success notification
          addNotification({
            title: 'Login Successful',
            message: `Welcome back! You are logged in as ${selectedRole}`,
            type: 'success'
          })
          
          // Force navigation after a brief delay to ensure state is updated
          setTimeout(() => {
            switch (selectedRole) {
              case 'admin':
                console.log('Navigating to admin dashboard')
                navigate('/admin/dashboard', { replace: true })
                break
              case 'pharmacist':
                console.log('Navigating to pharmacist dashboard')
                navigate('/pharmacist/dashboard', { replace: true })
                break
              case 'user':
                console.log('Navigating to home')
                navigate('/', { replace: true })
                break
              default:
                navigate('/', { replace: true })
            }
          }, 500)
        } else {
          setError('Invalid credentials. Use demo credentials or register a new account')
          // Add error notification
          addNotification({
            title: 'Login Failed',
            message: 'Invalid credentials. Please check your email and password.',
            type: 'error'
          })
        }
      } else {
        // Registration logic
        if (!name || !email || !password || !confirmPassword || !phone) {
          setError('Please fill in all required fields')
          setIsLoading(false)
          return
        }
        
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        
        if (password.length < 6) {
          setError('Password must be at least 6 characters long')
          setIsLoading(false)
          return
        }
        
        const success = await register(name, email, password, phone, selectedRole)
        
        if (success) {
          setSuccess('Registration successful! Please login with your new account.')
          setIsLogin(true)
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            role: selectedRole
          })
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Branding */}
          <div className="flex flex-col justify-center space-y-6 animate-fade-in">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
                <div className="relative">
                  <Stethoscope className="h-12 w-12 text-blue-600 animate-float" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold gradient-text">MedicineFinder</h1>
                  <p className="text-gray-600">Your Health, Simplified</p>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Welcome Back
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Access your personalized dashboard and manage your healthcare needs efficiently.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Easy Access</h3>
                  <p className="text-gray-600">Quick and secure login process</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Role-Based Access</h3>
                  <p className="text-gray-600">Tailored experience for your role</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Lock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure Platform</h3>
                  <p className="text-gray-600">Your data is protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="card p-8 animate-slide-up">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isLogin
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !isLogin
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Register
                </button>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Sign In' : 'Register'}
              </h3>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Choose your role and enter your credentials' 
                  : 'Create a new account with your information'
                }
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Your Role</label>
              <div className="space-y-3">
                {roles.map((role) => {
                  const Icon = role.icon
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value as 'admin' | 'pharmacist' | 'user')}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedRole === role.value
                          ? 'border-blue-500 bg-gradient-to-r ' + role.bgColor
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900">{role.label}</h4>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                        {selectedRole === role.value && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Login/Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration Only Fields */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      className="input pl-10"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter your phone number"
                      className="input pl-10"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder={`Enter ${selectedRole} email`}
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter password"
                    className="input pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm password"
                      className="input pl-10 pr-10"
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{isLogin ? 'Signing in...' : 'Registering...'}</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>{isLogin ? 'Sign In' : 'Register'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-blue-700">
                <p>Admin: admin@medicinefinder.com or admin@medifender.com / password</p>
                <p>Pharmacist: pharmacist@medicinefinder.com / password</p>
                <p>User: user@medicinefinder.com / password</p>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-center text-sm text-gray-600">
                {isLogin 
                  ? "Don't have an account? Switch to Register above" 
                  : "Already have an account? Switch to Login above"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
