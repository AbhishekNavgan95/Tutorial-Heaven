import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchSharp, IoSearchOutline } from "react-icons/io5";
import image from "../../assets/svg/logo-no-background.svg"
import ActionButton from './ActionButton';
import { useDispatch, useSelector } from "react-redux"
import { IoIosBookmark } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { dropDownLinks } from '../../data/dropDownLinks';
import Modal from './Modal';
import { logout } from "../../services/operations/authAPI"

const Navbar = () => {

    const [navActive, setNavActive] = useState(false);
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    const [modalData, setModalData] = useState(null);

    return (
        <>
            <header className='fixed w-full shadow-sm bg-night-25 shadow-night-300 z-[10]'>
                <nav className='mx-auto max-w-maxContent'>
                    <div className='flex items-center justify-between px-3 py-3'>

                        {/* logo */}
                        <span>
                            <Link to="/">
                                <img src={image} className='max-w-[230px]' alt="" />
                            </Link>
                        </span>

                        {/* search bar */}
                        <span className='flex overflow-hidden text-lg border rounded-md shadow-sm border-night-300 shadow-night-300'>
                            <span className='flex items-center'>
                                <span className={`${navActive ? "text-xl justify-center items-start flex" : "hidden"} pl-3 `}>
                                    <IoSearchOutline />
                                </span>
                                <input
                                    placeholder='Search'
                                    onFocus={() => setNavActive(true)}
                                    onBlur={() => setNavActive(false)}
                                    className='xl:min-w-[500px] bg-transparent py-2 px-3 outline-none' type="text"
                                />
                            </span>
                            <button className='px-3 text-xl transition-all duration-300 bg-blue-300 border border-night-300 hover:bg-blue-400 text-night-5'><IoSearchSharp /></button>
                        </span>

                        {/* action buttons */}
                        <span className='flex items-center gap-3'>
                            {
                                token === null && <ActionButton to={"/login"} >Log in</ActionButton>
                            }
                            {
                                token === null && <ActionButton active to={"/signup"} >Sign up</ActionButton>
                            }
                            {
                                user?.accountType === "user" &&
                                <Link to={"/dashboard/bookmarks"} className='border border-blue-300 p-2 shadow-sm shadow-night-300 transition-all duration-300 active:scale-[0.95] rounded-full text-xl text-blue-300' >
                                    <IoIosBookmark />
                                </Link>
                            }
                            {
                                token !== null &&
                                <ProfileDropDown setModalData={setModalData} />
                            }
                        </span>
                    </div>
                </nav>
            </header>
            {
                modalData && <Modal setModalData={setModalData} modalData={modalData} />
            }
        </>
    )
}

const ProfileDropDown = ({ setModalData }) => {

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='flex group items-center gap-1 relative bg-blue-300 py-2 px-3 rounded-full text-night-25'>
            <img src={user?.image?.url} className='w-[25px] h-[25px] border border-night-25 rounded-full' alt="" />
            <span className='text-xl'><IoMdArrowDropdown /></span>
            <span
                className={`bg-night-25 text-night-900 flex flex-col items-center rounded-lg overflow-hidden 
                absolute top-full right-0 my-2 border border-blue-300 w-[150px] shadow-sm shadow-night-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300`}
            >
                {
                    dropDownLinks.map((link, index) => (
                        user.accountType === link.access || link.access === "all" ?
                            <Link key={index} to={link.path} className='py-1 transition-all duration-300 hover:text-night-25 hover:bg-blue-300 w-full text-center'>
                                <span >{link.title}</span>
                            </Link>
                            : null
                    ))
                }
                <button onClick={() =>
                    setModalData({
                        title: "Log out?",
                        description: "You'll be logged out",
                        primaryButtonText: "Log out",
                        primaryButtonHandler: () => dispatch(logout(navigate)),
                        secondaryButtonText: "Cancel",
                        secondaryButtonHandler: () => setModalData(null)
                    })
                } className='bg-danger hover:bg-danger-dark w-full py-1 text-night-25 text-center transition-all duration-300'>Log out</button>
            </span>
        </div >
    )
}


export default Navbar