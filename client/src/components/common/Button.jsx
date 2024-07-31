import React from 'react'

const Button = ({ children, type, active, action, styles, disabled }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={disabled ? null : action}
            className={`
            ${disabled ? " bg-night-400 text-night-5 border border-night-400 cursor-not-allowed" : active ? " bg-blue-300 hover:bg-blue-400 text-night-5 border border-blue-300" : "border text-blue-300 border-blue-300 hover:border-blue-400"}
            w-full px-4 text-nowrap transition-all hover:shadow-night-200 hover:shadow-md shadow-sm shadow-night-50 duration-300 py-1 active:scale-[0.95] rounded-lg text-sm md:text-base  ${styles}
        `}
        >
            {children}
        </button>
    )
}

export default Button