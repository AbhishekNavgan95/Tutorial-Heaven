import React from 'react'

const DashboardPageLayout = ({ children }) => {
    return (
        <div
            className='text-night-900 ml-52 mr-2 mt-[5rem] mb-5 w-full'
        >
            <div className='border-4 rounded-lg p-5 border-blue-300 m-10'>
                {children}
            </div>
        </div>
    )
}

export default DashboardPageLayout