import React from 'react'

function Table({ headers, children}) {
  return (
    <div>
      <table className="w-full border rounded-lg overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-3 text-left">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white text-black">{children}</tbody>
    </table>
    </div>
  )
}

export default Table
