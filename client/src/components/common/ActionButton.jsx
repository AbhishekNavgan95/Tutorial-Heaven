import React, { Children } from 'react'
import { Link } from 'react-router-dom'

const ActionButton = ({ children, to, active, styles }) => {
  return (
    <Link to={to}>
      <button
        className={` ${active
          ? "bg-blue-300 hover:bg-blue-400 text-night-5"
          : "border border-blue-300 text-blue-300"
          } px-4 py-1 rounded-md transition-all duration-300 active:scale-[0.95]  hover:shadow-night-600 hover:shadow-md shadow-sm shadow-night-300 text-sm md:text-base lg:text-lg `}>
        {children}
      </button>
    </Link>
  )
}

export default ActionButton