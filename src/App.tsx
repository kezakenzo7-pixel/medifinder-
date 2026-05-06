import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { NotificationProvider } from './contexts/NotificationContext'
import Layout from './components/Layout'
import Home from './pages/LandingPage'
import PrescriptionInput from './pages/PrescriptionInput'
import MedicineSearch from './pages/MedicineSearch'
import PharmacyFinder from './pages/PharmacyFinder'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Login from './pages/LoginBeautiful'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboardEnhanced'
import PharmacistDashboard from './pages/pharmacist/PharmacistDashboardEnhanced'
import AdminMedicineCRUD from './components/AdminMedicineCRUD'
import PharmacistMedicineCRUD from './components/PharmacistMedicineCRUD'
import PatientDashboard from './pages/patient/PatientDashboard'
import PatientProfile from './pages/patient/PatientProfile'
import PatientPrescriptions from './pages/patient/PatientPrescriptions'

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// Public Route Component (redirects authenticated users away from auth pages)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (user) {
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />
      case 'pharmacist':
        return <Navigate to="/pharmacist/dashboard" replace />
      case 'user':
        return <Navigate to="/patient/dashboard" replace />
      default:
        return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prescription" element={<PrescriptionInput />} />
      <Route path="/search" element={<MedicineSearch />} />
      <Route path="/pharmacies" element={<PharmacyFinder />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      
      {/* Unified Dashboard Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><AdminDashboard /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/pharmacist/dashboard" element={
        <ProtectedRoute allowedRoles={['pharmacist']}>
          <Layout><PharmacistDashboard /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Patient Portal Routes */}
      <Route path="/patient/dashboard" element={
        <ProtectedRoute allowedRoles={['patient', 'user']}>
          <Layout><PatientDashboard /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/patient/profile" element={
        <ProtectedRoute allowedRoles={['patient', 'user']}>
          <Layout><PatientProfile /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/patient/prescriptions" element={
        <ProtectedRoute allowedRoles={['patient', 'user']}>
          <Layout><PatientPrescriptions /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/medicines" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><AdminMedicineCRUD /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/medicines/add" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><AdminMedicineCRUD /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Pharmacist Routes */}
      <Route path="/pharmacist/medicines" element={
        <ProtectedRoute allowedRoles={['pharmacist']}>
          <Layout><PharmacistMedicineCRUD /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/pharmacist/medicines/add" element={
        <ProtectedRoute allowedRoles={['pharmacist']}>
          <Layout><PharmacistMedicineCRUD /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Protected Routes with Layout */}
      <Route path="/orders" element={
        <ProtectedRoute>
          <Layout><div className="p-6"><h1 className="text-2xl font-bold">Orders</h1></div></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <Layout><div className="p-6"><h1 className="text-2xl font-bold">Settings</h1></div></Layout>
        </ProtectedRoute>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
