import React, { useState, useRef } from 'react';
import Button from '../../../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../../../services/operations/userAPI';
import { useForm } from "react-hook-form";

const UpdateProfilePic = ({ user }) => {
    const [file, setFile] = useState(user?.image?.url);
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
        <form onSubmit={handleSubmit(submitHandler)} className='flex items-center justify-start gap-10 pt-10'>
            <img src={file} className='max-w-[150px] rounded-full border-4 aspect-square border-blue-300' alt="Profile" />
            <span className='flex gap-3 items-end justify-center flex-col'>
                <label
                    htmlFor="userImage"
                    className='border w-full px-10 rounded-lg py-2 border-blue-300 text-blue-300 shadow-sm shadow-night-300 hover:shadow-night-600 hover:shadow-md transition-all duration-300 active:scale-[0.95]'
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
    );
}

export default UpdateProfilePic;
