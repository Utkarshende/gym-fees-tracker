import React from 'react'

function Button({ children, onClick, className = "" }) {
  return (
    <div>
    <button
      onClick={onClick}
      className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg ${className}`}
    >
      {children}
    </button>
    </div>
  )
}

export default Button
