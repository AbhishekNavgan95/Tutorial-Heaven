import React from 'react'

const DashboardPageLayout = ({ children }) => {
    return (
        <div
            className='text-night-900 md:ml-48 mt-[4rem] mb-3 px-3 w-full'
        >
            <div className='rounded-lg bg-night-25 border border-night-100 px-3 md:m-10 min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-7rem)] flex items-start'>
                {children}
            </div>
        </div>
    )
}

export default DashboardPageLayout