import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const SidebarLink = ({children, to}) => {
    return (
        <NavLink to={to} className={
            ({ isActive }) => isActive 
                ? "w-full bg-night-25 rounded-lg text-blue-300 transition-all duraiton-300 text-center py-3" 
                : "w-full hover:bg-night-25 rounded-lg hover:text-blue-300 transition-all duraiton-300 text-center py-3"}>
            <span>{children}</span>
        </NavLink>
    )
}

export default SidebarLink