import React from 'react'
import { dropDownLinks } from '../../data/dropDownLinks'
import SidebarLink from '../core/dashboard/sidebar/SidebarLink'
import { useSelector } from 'react-redux'
import { USER_TYPES } from '../../services/constants'

const DashboardSideBar = () => {

    const { user } = useSelector(state => state.user);

    return (
        <div className='pt-[6rem] fixed top-0 z-[9] left-0 h-screen w-[200px] translate-x-[-100%] md:translate-x-0 bg-night-5 border-r border-night-100'>
            <div className='flex flex-col px-3 items-center gap-1 text-blue-25'>
                {
                    user.accountType === USER_TYPES.USER && dropDownLinks.map((link) => (
                        user?.accountType === link?.access || link?.access === USER_TYPES.ALL ?
                            <SidebarLink key={link.id} to={link.path} > {link.title}</SidebarLink>
                            : null
                    ))
                }
                {
                    user.accountType === USER_TYPES.ADMIN && dropDownLinks.map((link) => (
                        user?.accountType === link?.access || link.access === USER_TYPES.USER || link.access === USER_TYPES.MOD || link?.access === USER_TYPES.ALL ?
                            <SidebarLink key={link.id} to={link.path} > {link.title}</SidebarLink>
                            : null
                    ))
                }
            </div>
        </div >
    )
}

export default DashboardSideBar