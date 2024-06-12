import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSideBar from '../components/common/DashboardSideBar'
import { useSelector } from 'react-redux'

const Dashboard = () => {

    return (
        <div className='text-night-900'>
            <div className='flex items-stretch'>
                <DashboardSideBar />
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard