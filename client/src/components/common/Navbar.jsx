import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoSearchSharp, IoSearchOutline } from "react-icons/io5";
import image from "../../assets/svg/logo-no-background.svg"
import ActionButton from './ActionButton';

const Navbar = () => {

    const [navActive, setNavActive] = useState(false);

    return (
        <header className='fixed w-full shadow-sm bg-night-25 shadow-night-300 z-[5]'>
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
                        <ActionButton to={"/login"} >Log in</ActionButton>
                        <ActionButton active to={"/signup"} >Sign up</ActionButton>
                    </span>


                </div>
            </nav>
        </header>
    )
}

export default Navbar