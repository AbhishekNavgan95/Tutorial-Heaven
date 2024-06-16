import React from 'react'
import { dropDownLinks } from '../../data/dropDownLinks'
import SidebarLink from '../core/dashboard/sidebar/SidebarLink'
import { useSelector } from 'react-redux'

const DashboardSideBar = () => {

    const { user } = useSelector(state => state.user);

    return (
        <div className='pt-[6rem] fixed z-[9] left-0 h-screen w-[200px] translate-x-[-92%] hover:translate-x-0 ease-in-out duration-300 md:translate-x-0 bg-blue-300 border'>
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