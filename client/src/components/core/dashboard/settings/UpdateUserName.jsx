import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../common/Button';
import { updateUserName } from '../../../../services/operations/userAPI';
import { useDispatch, useSelector } from 'react-redux';

const UpdateUserName = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const submitHandler = async (data) => {
        console.log("data : ", data);
        const res = await updateUserName(data, token, dispatch);
        if (res) {
            setValue("firstName", "");
            setValue("lastName", "");
        }
    }

    return (
        <div className=' flex flex-col gap-y-3 md:gap-y-10'>
            <h3 className='text-base md:text-lg font-semibold text-blue-300 border-b pb-3'>Update Username</h3>
            <form onSubmit={handleSubmit(submitHandler)} className='w-full sm:w-10/12 lg:w-8/12 mx-auto'>
                <div className='flex flex-col w-full gap-5'>
                    <div className='flex flex-col xl:flex-row gap-y-3 gap-x-5 w-full'>
                        <span className='flex flex-col gap-3 w-full'>
                            <input
                                {...register("firstName", { required: true })}
                                placeholder='firstName'
                                type="text"
                                name='firstName'
                                id='firstName'
                                className='w-full py-3 text-base md:text-lg bg-transparent border-b outline-none text-night-700 '
                            />
                            {
                                errors.firstName && <span className='font-semibold underline text-danger'>First name is required</span>
                            }
                        </span>
                        <span className='flex flex-col gap-3 w-full'>
                            <input
                                {...register("lastName", { required: true })}
                                placeholder='lastName'
                                type="text"
                                name='lastName'
                                id='lastName'
                                className='w-full py-3 text-base md:text-lg bg-transparent border-b outline-none text-night-700 '
                            />
                            {
                                errors.lastName && <span className='font-semibold underline text-danger'>Last name is required</span>
                            }
                        </span>
                    </div>
                    <Button styles={"w-max"} active>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUserName