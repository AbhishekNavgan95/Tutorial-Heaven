import React from 'react'

const Button = ({ children, type, active, action, styles }) => {
    return (
        <button type={type} onClick={action}
            className={`
            ${active ? " bg-blue-300 hover:bg-blue-400 text-night-5" : "border text-blue-300 border-blue-300 hover:border-blue-400"}
            w-full px-4 transition-all duration-300  py-2 rounded-lg ${styles}
        `}
        >
            {children}
        </button>
    )
}

export default Button