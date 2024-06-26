import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../common/Button'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { IoArrowBackOutline } from "react-icons/io5";
import { resetPasswordToken } from '../../../services/operations/authAPI'

const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, formState: { errors }
    } = useForm();

    const submitHandler = async (data) => {
        setLoading(true)
        await resetPasswordToken(data, dispatch);
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='w-full'>
            <div className='flex flex-col w-full gap-3 md:gap-5 relative z-[2]'>
                <span className='flex flex-col w-full gap-1'>
                    <input
                        {...register('email', { required: true })}
                        placeholder='Email'
                       className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
                        type="email"
                    />
                    {
                        errors.email && <span className='font-semibold underline text-danger'>Email is required</span>
                    }
                </span>
                <Button disabled={loading} type={"submit"} active >Submit</Button>
                <Link to={"../login"} className='flex items-center self-center gap-3 cursor-pointer group'><span className='text-xl text-blue-300 transition-all duration-300 group-hover:-translate-x-2'><IoArrowBackOutline /></span> Back to Log in</Link>
            </div>
        </form>
    )
}

export default ForgotPasswordForm