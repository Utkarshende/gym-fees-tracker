import React from 'react'

function Input({...props}) {
  return (
    <div>

      <input 
      {...props}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"      
      />
       </div>

  )
}

export default Input
