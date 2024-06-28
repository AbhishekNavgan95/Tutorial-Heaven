import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../common/Button';
import { updatePassword } from '../../../../services/operations/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const UpdatePassword = () => {

    const [showPass, setShowPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmNewPass, setShowConfirmNewPass] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const submitHandler = async (data) => {
        const res = await updatePassword(data, token, dispatch);
        if (res) {
            setValue("oldPassword", "")
            setValue("newPassword", "")
            setValue("confirmPassword", "")
        }
    }
    return (

        <div className=' flex flex-col gap-y-3 md:gap-y-10'>
            <h3 className='text-base md:text-lg xl:text-xl font-semibold text-blue-300 border-b pb-3'>Update Password</h3>
            <form onSubmit={handleSubmit(submitHandler)} className='w-full sm:w-10/12 lg:w-8/12 mx-auto'>
                <div className='flex flex-col gap-y-5'>
                    <div className='flex flex-col w-full gap-y-3 md:gap-y-5'>
                        <span className='flex items-center text-base md:text-lg xl:text-xl border-b border-b-blue-300'>
                            <input
                                {...register('oldPassword', { required: true })}
                                placeholder='Old Password'
                                autoComplete="true"
                                className='w-full py-3 bg-transparent outline-none placeholder:text-blue-300'
                                type={!showPass ? "password" : "text"}
                            />
                            <button type='button' onClick={() => setShowPass(!showPass)} className='text-2xl text-blue-300'>
                                {
                                    showPass
                                        ? <IoEyeOffOutline />
                                        : <IoEyeOutline />
                                }
                            </button>
                        </span>
                        {errors.oldPassword && <span className='font-semibold underline text-danger'>Password is required</span>}

                        <span className='flex items-center text-base md:text-lg xl:text-xl border-b border-b-blue-300'>
                            <input
                                {...register('newPassword', { required: true })}
                                placeholder='New Password'
                                autoComplete="true"
                                className='w-full py-3 bg-transparent outline-none placeholder:text-blue-300'
                                type={!showNewPass ? "password" : "text"}
                            />
                            <button type='button' onClick={() => setShowNewPass(!showNewPass)} className='text-2xl text-blue-300'>
                                {
                                    showNewPass
                                        ? <IoEyeOffOutline />
                                        : <IoEyeOutline />
                                }
                            </button>
                        </span>
                        {errors.newPassword && <span className='font-semibold underline text-danger'>New Password is required</span>}

                        <span className='flex items-center text-base md:text-lg xl:text-xl border-b border-b-blue-300'>
                            <input
                                {...register('confirmPassword', {
                                    required: "Confirm Password is required",
                                    validate: value =>
                                        value === getValues("newPassword") || "Passwords do not match"
                                })}
                                placeholder='Confirm New Password'
                                autoComplete="true"
                                className='w-full py-3 bg-transparent outline-none placeholder:text-blue-300'
                                type={!showConfirmNewPass ? "password" : "text"}
                            />
                            <button type='button' onClick={() => setShowConfirmNewPass(!showConfirmNewPass)} className='text-2xl text-blue-300'>
                                {
                                    showConfirmNewPass
                                        ? <IoEyeOffOutline />
                                        : <IoEyeOutline />
                                }
                            </button>
                        </span>
                        {errors.confirmPassword && <span className='font-semibold underline text-danger'>{errors.confirmPassword.message}</span>}
                    </div>
                    <Button styles={"w-max"} active>Submit</Button>
                </div>
            </form >
        </div >
    )
}

export default UpdatePassword