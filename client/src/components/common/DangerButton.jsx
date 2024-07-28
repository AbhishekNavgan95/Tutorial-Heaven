import React from 'react'

const DangerButton = ({ children, type, action, styles, disabled }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={action}
            className={`bg-danger hover:bg-danger-dark text-night-900 
               px-4 text-nowrap transition-all hAover:shadow-night-600 
                hover:shadow-md shadow-sm shadow-night-300 duration-300 py-1 md:py-2
                 active:scale-[0.95] rounded-lg w-max text-sm md:text-base ${styles}
        `}
        >
            {children}
        </button>
    )
}

export default DangerButton