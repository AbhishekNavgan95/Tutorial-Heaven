import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Button from '../../common/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from "../../../services/operations/authAPI"
import { useLocation } from 'react-router-dom';

const ResetPasswordForm = () => {

    const [loading, setLoading] = useState(false)
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const submitHandler = async (data) => {
        setLoading(true)
        const res = await resetPassword(data, token, dispatch);
        if (res) {
            navigate("/");
        } else {
            toast.error("try after sometime", {
                style: {
                    border: '1px solid #5252B7',
                    padding: '8px 16px',
                    color: '#DFE2E2',
                    background: "#5252B7"
                },
                iconTheme: {
                    primary: '#5252B7',
                    secondary: '#DFE2E2',
                },
            })
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex flex-col w-full gap-5 relative z-[2]'>
                <span className='flex flex-col gap-1'>
                    <span className='flex items-center text-xl border-b border-b-night-900'>
                        <input
                            {...register('password', { required: true })}
                            placeholder='Enter password'
                            className='w-full py-3 bg-transparent outline-none placeholder:text-night-900'
                            type={hidePassword ? "password" : "text"}
                        />
                        <button type='button' onClick={() => setHidePassword(!hidePassword)} className=''>
                            {
                                hidePassword
                                    ? <IoEyeOutline />
                                    : <IoEyeOffOutline />
                            }
                        </button>
                    </span>
                    {errors.password && <span className='font-semibold underline text-danger'>Password is required</span>}
                </span>
                <span className='flex flex-col gap-1'>
                    <span className='flex items-center text-xl border-b border-b-night-900'>
                        <input
                            {...register('confirmPassword', { required: true })}
                            placeholder='Confirm password'
                            className='w-full py-3 bg-transparent outline-none placeholder:text-night-900'
                            type={hideConfirmPassword ? "password" : "text"}
                        />
                        <button type='button' onClick={() => setHideConfirmPassword(!hideConfirmPassword)} className=''>
                            {
                                hideConfirmPassword
                                    ? <IoEyeOutline />
                                    : <IoEyeOffOutline />
                            }
                        </button>
                    </span>
                    {errors.confirmPassword && <span className='font-semibold underline text-danger'>Confirm Password is required</span>}
                </span>
                <Button disabled={loading} type={"submit"} active>Submit</Button>
                <Link to={"../login"} className='flex items-center self-center gap-3 cursor-pointer group'><span className='text-xl text-blue-300 transition-all duration-300 group-hover:-translate-x-2'><IoArrowBackOutline /></span> Back to Log in</Link>
            </div>
        </form>
    )
}

export default ResetPasswordForm