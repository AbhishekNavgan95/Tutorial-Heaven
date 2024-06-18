import React from 'react'

const DashboardPageLayout = ({ children }) => {
    return (
        <div
            className='text-night-900 md:ml-52 md:mr-2 mt-[5rem] mb-5 w-full'
        >
            <div className='border-4 rounded-lg p-5 border-blue-100 mx-5 md:m-10 min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-10rem)] flex items-start'>
                {children}
            </div>
        </div>
    )
}

export default DashboardPageLayout