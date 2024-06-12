import React from 'react'
import { dropDownLinks } from '../../data/dropDownLinks'
import SidebarLink from '../core/dashboard/sidebar/SidebarLink'
import { useSelector } from 'react-redux'

const DashboardSideBar = () => {

    const { user } = useSelector(state => state.user);
    console.log("user : ", user)

    return (
        <div className=' pt-[6rem] fixed left-0 h-screen w-[200px] bg-blue-300 border'>
            <div className='flex flex-col px-3 items-center gap-1 text-night-25'>
                {
                    dropDownLinks.map(link => (
                        user.accountType === link.access || link.access === "all" ?
                            <SidebarLink key={link.id} to={link.path} > {link.title}</SidebarLink>
                            : null
                    ))
                }
            </div>
        </div >
    )
}

export default DashboardSideBar