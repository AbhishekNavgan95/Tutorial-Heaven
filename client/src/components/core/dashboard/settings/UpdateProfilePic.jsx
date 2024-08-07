import React, { useState, useRef } from 'react';
import Button from '../../../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../../../services/operations/userAPI';
import { useForm } from "react-hook-form";
import { getCloudinaryUrl } from '../../../../utils/getCloudinaryUrl';

const UpdateProfilePic = ({ user }) => {
    const [file, setFile] = useState(() => getCloudinaryUrl(user?.image?.url, 150, 150));
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const submitHandler = async (data) => {
        // console.log("Data : ", data);
        setLoading(true);
        const res = await updateProfilePicture(data.userImage[0], token, dispatch);
        if (res) {
            setFile(user?.image?.url);
            setValue("userImage", null);
        }
        setLoading(false);
    };

    return (
        <div className=' flex flex-col gap-y-5 md:gap-y-10'>
            <h3 className='text-base md:text-lg xl:text-xl font-semibold text-blue-300 border-b pb-3'>Update Profile Picture</h3>
            <form onSubmit={handleSubmit(submitHandler)} className='w-10/12 lg:w-8/12 mx-auto flex flex-col md:flex-row items-center justify-start gap-5 md:gap-10'>
                <img  loading='lazy' src={file} className='max-w-[100px] md:max-w-[150px] min-w-[150px] bg-night-50 rounded-full object-cover border-4 aspect-square' alt="Profile" />
                <span className='flex gap-3 items-end justify-center flex-col'>
                    <label
                        htmlFor="userImage"
                        className='border text-blue-300 border-blue-300 hover:border-blue-400 w-full text-center py-1 rounded-lg shadow-sm hover:shadow-md shadow-night-50 hover:shadow-night-200 transition-all duration-300 active:scale-[0.95]'
                    >
                        Select
                    </label>
                    <input
                        type="file"
                        {...register("userImage", { required: true })}
                        accept="image/*"
                        className='hidden'
                        id='userImage'
                        name="userImage"
                    />
                    <Button type={"submit"} disabled={loading} styles={"w-max"} active>Update Image</Button>
                    {errors.userImage && <span className='font-semibold underline text-danger'>Image is required</span>}
                </span>
            </form>
        </div>
    );
}

export default UpdateProfilePic;
