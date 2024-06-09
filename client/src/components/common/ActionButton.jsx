import React, { Children } from 'react'
import { Link } from 'react-router-dom'

const ActionButton = ({ children, to, active }) => {
  return (
    <Link to={to}>
      <button
        className={`${active
          ? "bg-blue-300 hover:bg-blue-400 hover:shadow-night-600 hover:shadow-md shadow-sm shadow-night-300 text-night-5"
          : "border border-blue-300 hover:shadow-night-600 hover:shadow-md text-blue-300  shadow-sm shadow-night-300"
        } px-8 py-2 rounded-md transition-all duration-300 active:scale-[0.95]`}>
        {children}
      </button>
    </Link>
  )
}

export default ActionButton