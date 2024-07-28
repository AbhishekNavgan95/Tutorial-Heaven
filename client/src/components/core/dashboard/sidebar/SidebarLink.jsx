import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const SidebarLink = ({children, to}) => {
    return (
        <NavLink to={to} className={
            ({ isActive }) => isActive 
                ? "w-full bg-blue-300 rounded-lg text-night-25 transition-all duraiton-300 text-center py-3 text-sm" 
                : "w-full hover:bg-blue-300 rounded-lg hover:text-night-25 transition-all duraiton-300 text-center py-3 text-sm"}>
            <span>{children}</span>
        </NavLink>
    )
}

export default SidebarLink