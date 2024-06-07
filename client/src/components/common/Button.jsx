import React from 'react'

const Button = ({ children, type, active, action }) => {
    return (
        <button type={type} onClick={action}
            className={`
            ${active ? "bg-blue-300 hover:bg-blue-400 text-night-5" : "bg-secondary-700 hover:bg-secondary-800 text-t-primary"}
            w-full transition-all duration-300  py-2 rounded-lg
        `}
        >
            {children}
        </button>
    )
}

export default Button