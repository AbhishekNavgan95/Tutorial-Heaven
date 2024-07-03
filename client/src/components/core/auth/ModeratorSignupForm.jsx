import React, { useState } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Button from '../../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux"
import { setSignupData } from "../../../slices/authSlice"
import { sendOtp } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';

const ModeratorSignupForm = ({ token }) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const { register, setValue, getValues, formState: { errors }, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (data) => {

        data = {
            ...data,
            token
        }

        setLoading(true)

        dispatch(setSignupData(data));

        const res = await sendOtp(data, dispatch);
        if (res) {
            toast.success("OTP sent!", {
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
            });
            navigate("../varify-otp")
        } else {
            toast.error("OTP cannot be sent", {
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
            });
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='w-full'>
            <div className='flex flex-col w-full gap-3 relative z-[2]'>
                <div className='flex gap-3 md:gap-5'>
                    <span className='flex flex-col w-full gap-1'>
                        <input
                            {...register('firstName', { required: true })}
                            placeholder='First Name'
                            autoComplete="true"
                            className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
                            type="text"
                        />
                        {
                            errors.firstName && <span className='font-semibold underline text-danger'>First Name is required</span>
                        }
                    </span>
                    <span className='flex flex-col w-full gap-1'>
                        <input
                            {...register('lastName', { required: true })}
                            placeholder='Last Name'
                            autoComplete="true"
                            className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
                            type="text"
                        />
                        {
                            errors.lastName && <span className='font-semibold underline text-danger'>Last Name is required</span>
                        }
                    </span>
                </div>
                <span className='flex flex-col w-full gap-1'>
                    <input
                        {...register('email', { required: true })}
                        placeholder='Email'
                        autoComplete="true"
                        className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
                        type="email"
                    />
                    {
                        errors.email && <span className='font-semibold underline text-danger'>Email is required</span>
                    }
                </span>
                <span className='flex flex-col w-full gap-1'>
                    <span className='flex items-center text-xl border-b border-b-blue-300'>
                        <input
                            {...register('password', { required: true })}
                            placeholder='Password'
                            autoComplete="true"
                            className='w-full py-3 bg-transparent outline-none placeholder:text-blue-300'
                            type={hidePassword ? "password" : "text"}
                        />
                        <button type='button' onClick={() => setHidePassword(!hidePassword)} className='text-2xl text-blue-300'>
                            {
                                hidePassword
                                    ? <IoEyeOutline />
                                    : <IoEyeOffOutline />
                            }
                        </button>
                    </span>
                    {
                        errors.password && <span className='font-semibold underline text-danger'>Password is required</span>
                    }
                </span>
                <span className='flex flex-col w-full gap-1'>
                    <span className='flex items-center text-xl border-b border-b-blue-300'>
                        <input
                            {...register('confirmPassword', {
                                required: "Confirm Password is required",
                                validate: value =>
                                    value === getValues("password") || "Passwords do not match"
                            })}
                            placeholder='Confirm Password'
                            autoComplete="true"
                            className='w-full py-3 bg-transparent outline-none placeholder:text-blue-300'
                            type={hideConfirmPassword ? "password" : "text"}
                        />
                        <button type='button' onClick={() => setHideConfirmPassword(!hideConfirmPassword)} className='text-2xl text-blue-300'>
                            {
                                hideConfirmPassword
                                    ? <IoEyeOutline />
                                    : <IoEyeOffOutline />
                            }
                        </button>
                    </span>
                    {errors.confirmPassword && <span className='font-semibold underline text-danger'>{errors.confirmPassword.message}</span>}
                </span>
                <Button disabled={loading} type={"submit"} active >Submit</Button>
                <p className='self-center text-center transition-all duration-300'>Already have an Account? <Link to={"/login"} className='font-semibold text-blue-300 cursor-pointer hover:text-blue-400'>Log in</Link></p>
            </div>
        </form>
    )
}

export default ModeratorSignupForm