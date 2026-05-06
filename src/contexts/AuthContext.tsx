import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types'
import { mockAuthService } from '../services/mockApi'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, phone: string, role: string) => Promise<boolean>
  updateUser: (userData: User) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const currentUser = mockAuthService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      console.log('Attempting login with:', { email, role })
      const result = await mockAuthService.signIn(email, password, role)
      console.log('Login result:', result)
      
      if (result.success && result.data) {
        setUser(result.data)
        console.log('User set in context:', result.data)
        return true
      }
      console.log('Login failed:', result.error)
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    mockAuthService.signOut()
    setUser(null)
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const register = async (name: string, email: string, password: string, phone: string, role: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      const result = await mockAuthService.signUp({
        name,
        email,
        password,
        phone,
        role,
        createdAt: new Date().toISOString()
      })
      
      if (result.success && result.data) {
        setUser(result.data)
        return true
      }
      return false
    } catch (error) {
      console.error('Registration error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    updateUser,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
