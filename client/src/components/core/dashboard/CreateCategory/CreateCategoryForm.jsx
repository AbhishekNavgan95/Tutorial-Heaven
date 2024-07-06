import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import placeHolder from '../../../../assets/placeHolders/imageUpload.png'
import { useForm } from 'react-hook-form';
import Button from '../../../common/Button';
import { RxCross2 } from 'react-icons/rx';
import { createCategory, updateCategory } from '../../../../services/operations/categoryAPI';
import { setEdit, setPost } from '../../../../slices/postSlice';

const CreateCategoryForm = ({ edit, category }) => {
    const [image, setImage] = useState(placeHolder);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        trigger,
        setError,
        clearErrors,
        control
    } = useForm();

    const handleSetImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(file);

            setValue("thumbnail", file);
            trigger("thumbnail");
            clearErrors("thumbnail")
        }
    }

    const submitHandler = async (data) => {
        console.log("data : ", data);
        setLoading(true)
        if (edit) {
            const response = await updateCategory(data, category?._id, token, dispatch);
            if (response) {
                setValue("title", "");
                setValue("description", "");
                setImage(placeHolder);
                trigger();
                dispatch(setEdit(false));
                dispatch(setPost(null));
                navigate("/dashboard/categories")
            }
            return
        }

        if (!getValues("thumbnail")) {
            setError("thumbnail", { type: "required" });
            return
        }

        const response = await createCategory(data, token, dispatch);
        if (response) {
            setValue("title", "");
            setValue("description", "");
            setImage(placeHolder);
            trigger();
            navigate("/dashboard/categories")
        }

        setLoading(false)
    }

    useEffect(() => {
        if (edit) {
            setValue("title", category?.title);
            setValue("description", category?.description);
            setImage(category?.image?.url);
        } else {
            setValue("title", "");
            setValue("description", "");
            setImage(placeHolder);
        }

        if (edit === false && location.pathname.includes("edit")) {
            navigate("/dashboard/categories")
        }

        if(edit && location?.pathname.includes("create-category")) {
            dispatch(setEdit(false));
            dispatch(setPost(null));
            setValue("title", "");
            setValue("description", "");
            setImage(placeHolder);
        }
    }, [edit])

    return (

        <span>
            <form onSubmit={handleSubmit(submitHandler)} className='w-full md:w-10/12 lg:w-8/12 mx-auto '>
                <div className='flex flex-col w-full gap-3 md:gap-5'>
                    <span className='flex flex-col gap-3 w-full'>
                        <input
                            {...register("title", { required: true })}
                            placeholder='Title'
                            type="text"
                            name='title'
                            id='title'
                            className='w-full pb-2 md:py-3 text-sm sm:text-lg lg:text-xl bg-transparent focus:border-b-2 border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
                        />
                        {
                            errors.title && <span className='font-semibold underline text-danger'>Title is required</span>
                        }
                    </span>
                    <span className='flex flex-col gap-3 w-full'>
                        <textarea
                            {...register("description", { required: true })}
                            placeholder='Description'
                            name='description'
                            rows={3}
                            id='description'
                            className='w-full pb-2 md:py-3 text-sm sm:text-lg lg:text-xl focus:border-b-2  bg-transparent border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
                        ></textarea>
                        {
                            errors.description && <span className='font-semibold underline text-danger'>Description is required</span>
                        }
                    </span>
                    <span className='flex flex-col items-start gap-3 w-full group'>
                        <span className='flex flex-col items-center w-full'>
                            <label htmlFor="thumbnail" className='relative self-stretch flex flex-col px-3 py-3 items-center justify-center cursor-pointer border rounded-lg border-blue-300'>
                                <span className='w-full rounded-lg overflow-hidden'>
                                    <img
                                        loading='lazy'
                                        className='w-full aspect-video min-h-[150px] group-hover:scale-105 transition-all duration-300 rounded-lg object-cover'
                                        src={image}
                                        alt=""
                                    />
                                </span>
                                <input
                                    type="file"
                                    name="thumbnail"
                                    id="thumbnail"
                                    className='absolute inset-0 opacity-0 cursor-pointer'
                                    onChange={handleSetImage}
                                    accept="image/*,.jpeg,.jpg,.png"
                                />
                            </label>
                            {
                                image !== placeHolder && <button
                                    type="button"
                                    className='text-blue-300 self-center p-2 rounded-full flex items-center gap-1 justify-center '
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImage(placeHolder);
                                        setValue("thumbnail", null);
                                        setError("thumbnail", { type: "required" });
                                        trigger("thumbnail");
                                    }}
                                >
                                    <RxCross2 />
                                    Remove
                                </button>
                            }
                        </span>
                        {
                            errors.thumbnail && <span className='font-semibold underline text-danger'>Thumbnail is required</span>
                        }
                    </span>
                    <span className='flex gap-3'>
                        <Button disabled={loading} type={"submit"} styles={"w-max"} active>Submit</Button>
                        <Button action={() => {
                            dispatch(setEdit(false));
                            dispatch(setPost(null));
                            navigate("/dashboard/categories")
                        }} styles={"w-max"} >Cancel</Button>
                    </span>
                </div>
            </form>
        </span>
    )
}

export default CreateCategoryForm