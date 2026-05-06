import React from 'react'

const LoadingSkeleton = ({ type = 'card' }: { type?: 'card' | 'text' | 'button' | 'avatar' }) => {
  switch (type) {
    case 'card':
      return (
        <div className="card p-6">
          <div className="space-y-4">
            <div className="skeleton h-4 w-3/4 rounded"></div>
            <div className="skeleton h-4 w-1/2 rounded"></div>
            <div className="skeleton h-4 w-2/3 rounded"></div>
            <div className="flex justify-between items-center pt-4">
              <div className="skeleton h-8 w-20 rounded"></div>
              <div className="skeleton h-8 w-8 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    
    case 'text':
      return (
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded"></div>
          <div className="skeleton h-4 w-3/4 rounded"></div>
          <div className="skeleton h-4 w-1/2 rounded"></div>
        </div>
      )
    
    case 'button':
      return <div className="skeleton h-12 w-32 rounded-xl"></div>
    
    case 'avatar':
      return <div className="skeleton h-12 w-12 rounded-full"></div>
    
    default:
      return <div className="skeleton h-4 w-full rounded"></div>
  }
}

export default LoadingSkeleton
