import React, { Children } from 'react'
import { Link } from 'react-router-dom'

const ActionButton = ({ children, to, active }) => {
  return (
    <Link to={to}>
      <button 
      className={`${active 
        ? "bg-blue-300 hover:bg-blue-400 shadow-sm shadow-night-300" 
        : " bg-night-500 hover:bg-night-600 shadow-sm shadow-night-300"} 
      px-8 py-2 rounded-md transition-all  text-night-5 duration-300 `}>
        {children}
      </button>
    </Link>
  )
}

export default ActionButton