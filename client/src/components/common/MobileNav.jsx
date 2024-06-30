import React, { useEffect } from 'react'
import { dropDownLinks } from '../../data/dropDownLinks'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import DangerButton from '../common/DangerButton'
import { useDispatch, useSelector } from 'react-redux'
import { USER_TYPES } from '../../services/constants'
import { logout } from "../../services/operations/authAPI"

const MobileNav = ({ mobileNavActive, setMobileNavActive, modalData, setModalData }) => {

    useEffect(() => {
        document.body.style.overflow = mobileNavActive ? "hidden" : "auto"
    }, [mobileNavActive])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user)
    const { token } = useSelector(state => state.auth)

    return (
        <div className={`${mobileNavActive ? "translate-x-0" : "translate-x-[-100%]"} absolute inset-0 transition-all duration-100 z-[10] h-screen`} onClick={() => setMobileNavActive(!mobileNavActive)}>
            <nav onClick={(e) => e.stopPropagation()} className={` ${mobileNavActive ? "" : ""} absolute top-0 z-[10] left-0 bg-blue-300 px-3 h-full min-w-[150px]`}>
                <section className='pt-[4rem] pb-3 flex flex-col text-xs sm:text-sm justify-between items-center h-full w-full'>
                    <div className='flex flex-col gap-1 w-full '>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) => isActive
                                ? "bg-night-25 w-full text-blue-300 py-2 px-4 text-center rounded-lg"
                                : "text-night-25 w-full bg-blue-300 hover:bg-night-25 hover:text-blue-300 py-2 px-4 text-center rounded-lg"
                            }
                        >
                            Home
                        </NavLink>
                        {
                            token && user && dropDownLinks.map((link) => (
                                user?.accountType === link?.access || link?.access === USER_TYPES?.ALL ? (
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) => isActive
                                            ? "bg-night-25 text-blue-300 py-2 px-4 text-center rounded-lg"
                                            : "text-night-25 bg-blue-300 hover:bg-night-25 hover:text-blue-300 py-2 px-4 text-center rounded-lg"
                                        }
                                        key={link.id}
                                    >
                                        {link.title}
                                    </NavLink>
                                ) : null
                            ))
                        }
                        {
                            !user && !token &&
                            <>
                                <NavLink
                                    to={"/login"}
                                    className={({ isActive }) => isActive
                                        ? "bg-night-25 text-blue-300 py-2 px-4 text-center rounded-lg"
                                        : "text-night-25 bg-blue-300 hover:bg-night-25 hover:text-blue-300 py-2 px-4 text-center rounded-lg"
                                    }
                                >Log in</NavLink>
                                <NavLink
                                    to={"/signup"}
                                    className={({ isActive }) => isActive
                                        ? "bg-night-25 text-blue-300 py-2 px-4 text-center rounded-lg"
                                        : "text-night-25 bg-blue-300 hover:bg-night-25 hover:text-blue-300 py-2 px-4 text-center rounded-lg"
                                    }
                                >Sign up</NavLink>
                            </>
                        }
                    </div>

                    {
                        user && token &&
                        <div className='w-full flex justify-center'>
                            <DangerButton action={() => setModalData({
                                title: "Log out?",
                                description: "You'll be logged out",
                                primaryButtonText: "Log out",
                                primaryButtonHandler: () => dispatch(logout(navigate)),
                                secondaryButtonText: "Cancel",
                                secondaryButtonHandler: () => setModalData(null)
                            })}> Log out</DangerButton>
                        </div>
                    }
                </section>
            </nav >
        </div>
    )
}

export default MobileNav