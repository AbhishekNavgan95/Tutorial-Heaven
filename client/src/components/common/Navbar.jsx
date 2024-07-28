import React, { useCallback, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoSearchSharp, IoSearchOutline } from "react-icons/io5";
import image from "../../assets/svg/logo-no-background.svg"
import ActionButton from './ActionButton';
import { useDispatch, useSelector } from "react-redux"
import { IoIosBookmark } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { dropDownLinks } from '../../data/dropDownLinks';
import Modal from './Modal';
import { logout } from "../../services/operations/authAPI"
import { USER_TYPES } from "../../services/constants"
import { CiMenuFries } from "react-icons/ci";
import { RiMenuFold4Fill } from "react-icons/ri";
import MobileNav from './MobileNav';
import { getCloudinaryUrl } from '../../utils/getCloudinaryUrl';

const Navbar = () => {

    const [navActive, setNavActive] = useState(false);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    const [modalData, setModalData] = useState(null);

    return (
        <>
            <header className='fixed w-full z-[10]  bg-night-5 '>
                <nav className='mx-auto  border-b border-night-50 bg-night-5 relative z-[11]'>
                    <div className='flex items-center justify-between px-3 py-3'>

                        {/* logo */}
                        <span>
                            <Link to="/">
                                <img loading='lazy' src={image} className='max-w-[150px] md:max-w-[190px] lg:max-w-[210px]' alt="" />
                            </Link>
                        </span>

                        {/* search bar */}
                        <span className='hidden md:flex overflow-hidden text-sm md:text-base xl:text-xl border rounded-md border-night-300'>
                            <span className='flex items-center'>
                                <span className={`${navActive ? "text-xl justify-center items-start flex" : "hidden"} pl-3 `}>
                                    <IoSearchOutline />
                                </span>
                                <input
                                    placeholder='Search'
                                    onFocus={() => setNavActive(true)}
                                    onBlur={() => setNavActive(false)}
                                    className='md:min-w-[300px] xl:min-w-[500px] bg-transparent py-2 px-3 outline-none' type="text"
                                />
                            </span>
                            <button className='px-3 text-xl transition-all duration-300 bg-blue-300 border border-night-300 hover:bg-blue-400 text-night-5'><IoSearchSharp /></button>
                        </span>

                        <span onClick={() => setMobileNavActive(!mobileNavActive)} className='md:hidden text-lg px-2 py-1 text-blue-300'>
                            <p className='cursor-pointer'>
                                <RiMenuFold4Fill />
                            </p>
                        </span>

                        {/* action buttons */}
                        <span className='md:flex hidden items-center gap-3'>
                            {
                                token === null && <ActionButton to={"/login"} >Log in</ActionButton>
                            }
                            {
                                token === null && <ActionButton active to={"/signup"} >Sign up</ActionButton>
                            }
                            {
                                token !== null &&
                                <Link to={"/dashboard/bookmarks"} className='bg-blue-300 border border-transparent hover:bg-night-25 hover:text-blue-300 hover:border-blue-300 p-2 transition-all duration-300  rounded-full text-xl text-night-25' >
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
                <MobileNav modalData={modalData} setModalData={setModalData} mobileNavActive={mobileNavActive} setMobileNavActive={setMobileNavActive} />
            </header>
            {
                modalData && <Modal setModalData={setModalData} modalData={modalData} />
            }
        </>
    )
}

const ProfileDropDown = ({ setModalData }) => {

    const { user } = useSelector(state => state.user);
    const [userImage, setUserImage] = useState(() => getCloudinaryUrl(user?.image?.url, 50, 50));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='flex group items-center gap-1 relative bg-night-25 py-2 px-3 rounded-full text-night-900'>
            <img loading='lazy' src={userImage} className='w-[25px] h-[25px] border border-night-25 rounded-full' alt="" />
            <span className='text-xl'><IoMdArrowDropdown /></span>
            <span
                className={`bg-night-25 text-night-900 flex flex-col items-center rounded-lg overflow-hidden 
                absolute top-full right-0 my-2 border border-night-300 min-w-[150px] shadow-sm shadow-night-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300`}
            >
                {
                    user.accountType === USER_TYPES.USER && dropDownLinks.map((link) => (
                        user?.accountType === link?.access || link?.access === USER_TYPES.ALL ?
                            <NavLink key={link?.id} to={link?.path} className={({ isActive }) => !isActive ? "py-1 transition-all duration-300 hover:text-night-25 hover:bg-blue-300 w-full text-center px-4 text-nowrap " : " px-4 text-nowrap py-1 transition-all duration-300 text-night-25 bg-blue-300 w-full text-center"}>
                                <span >{link?.title}</span>
                            </NavLink>
                            : null
                    ))
                }
                {
                    user.accountType === USER_TYPES.ADMIN && dropDownLinks.map((link) => (
                        user?.accountType === link?.access || link.access === USER_TYPES.USER || link?.access === USER_TYPES.ALL ?
                            <NavLink key={link?.id} to={link?.path} className={({ isActive }) => !isActive ? "py-1 transition-all duration-300 hover:text-night-25 hover:bg-blue-300 w-full text-center px-4 text-nowrap " : " px-4 text-nowrap py-1 transition-all duration-300 text-night-25 bg-blue-300 w-full text-center"}>
                                <span >{link?.title}</span>
                            </NavLink>
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
                } className='bg-danger hover:bg-danger-dark w-full py-1 text-night-900 text-center transition-all duration-300'>Log out</button>
            </span>
        </div >
    )
}


export default Navbar