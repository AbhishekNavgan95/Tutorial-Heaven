import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../common/Button'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { IoArrowBackOutline } from "react-icons/io5";
import { resetPasswordToken } from '../../../services/operations/authAPI'

const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register, handleSubmit, formState: { errors }
    } = useForm();

    const submitHandler = async (data) => {
        await resetPasswordToken(data, dispatch);
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex flex-col w-full gap-5 relative z-[2]'>
                <span className='flex flex-col w-full gap-1'>
                    <input
                        {...register('email', { required: true })}
                        placeholder='Email'
                        className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-night-900 text-night-900 border-b-night-300'
                        type="email"
                    />
                    {
                        errors.email && <span className='font-semibold underline text-danger'>Email is required</span>
                    }
                </span>
                <Button type={"submit"} active >Submit</Button>
                <Link to={"../login"} className='flex items-center self-center gap-3 cursor-pointer group'><span className='text-xl text-blue-300 transition-all duration-300 group-hover:-translate-x-2'><IoArrowBackOutline /></span> Back to Log in</Link>
            </div>
        </form>
    )
}

export default ForgotPasswordForm