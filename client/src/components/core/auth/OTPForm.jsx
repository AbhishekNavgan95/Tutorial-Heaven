import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../common/Button'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../../services/operations/authAPI'
import toast from 'react-hot-toast'
import { setSignupData } from '../../../slices/authSlice'

const OTPForm = () => {

    const [loading, setLoading] = useState(false)
    const { signupData } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register, handleSubmit, formState: { errors }
    } = useForm();

    const submitHandler = async (data) => {
        setLoading(true)
        data = { ...data, ...signupData };

        const response = await signup(data, dispatch);

        if (response) {
            navigate("../login");
            dispatch(setSignupData(null))

        }
        
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='w-full'>
            <div className='flex flex-col w-full gap-3 md:gap-5 relative z-[2]'>
                <span className='flex flex-col w-full gap-1'>
                    <input
                        {...register('otp', { required: true })}
                        placeholder='OTP'
                        className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
                        type="number"
                    />
                    {
                        errors.otp && <span className='font-semibold underline text-danger'>OTP is required</span>
                    }
                </span>
                <Button disabled={loading} type={"submit"} active >Submit</Button>
                <p className='self-center transition-all text-center duration-300'>Already have an Account? <Link to={"/login"} className='font-semibold text-blue-300 cursor-pointer hover:text-blue-400'>Log in</Link></p>
            </div>
        </form>
    )
}

export default OTPForm