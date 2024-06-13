import React from 'react'

const DangerButton = ({ children, type, action, styles, disabled }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={action}
            className={`bg-danger hover:bg-danger-dark text-night-5 
               px-5 text-nowrap transition-all hAover:shadow-night-600 
                hover:shadow-md shadow-sm shadow-night-300 duration-300 py-2
                 active:scale-[0.95] rounded-lg w-max ${styles}
        `}
        >
            {children}
        </button>
    )
}

export default DangerButton