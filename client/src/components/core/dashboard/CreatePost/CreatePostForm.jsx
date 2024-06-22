import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../common/Button';
import { apiConnector } from '../../../../services/apiConnector';
import { dataEndpoints } from '../../../../services/APIs';
import { toast } from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import placeHolder from "../../../../assets/placeHolders/imageUpload.png";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { createPost } from '../../../../services/operations/postAPI';
import TagInput from './TagInput';
import {useNavigate} from "react-router-dom"

const CreatePostForm = () => {
    const [image, setImage] = useState(placeHolder);
    const [videoUrl, setVideoUrl] = useState(null); // State for video URL
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const fetchCategories = useCallback(async () => {
        try {
            const res = await apiConnector("GET", dataEndpoints.GET_ALL_CATEGORIES);
            setCategories(res?.data?.data);
        } catch (error) {
            console.log("Error fetching categories : ", error);
            toast.error("Failed to load categories", {
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
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

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

    const handleSetVideo = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("video", file);
            trigger("video");

            const videoURL = URL.createObjectURL(file);
            setVideoUrl(videoURL);
            clearErrors("video")
        }
    }

    const submitHandler = async (data) => {
        if (!getValues("thumbnail")) {
            setError("thumbnail", { type: "required" });
            return
        }

        if (!getValues("video")) {
            setError("video", { type: "required" });
            return;
        }

        const response = await createPost(data, dispatch, token);
        if(response) {
            setValue("title", "");
            setValue("description", "");
            setValue("category", "");
            setImage(placeHolder);
            setVideoUrl(null);
            trigger();
            navigate("/dashboard/posts")
        }

    }

    return (
        <span>
            <form onSubmit={handleSubmit(submitHandler)} className='w-10/12 lg:w-8/12 mx-auto flex items-center justify-start gap-10'>
                <div className='flex flex-col w-full gap-5'>
                    <span className='flex flex-col gap-3 w-full'>
                        <input
                            {...register("title", { required: true })}
                            placeholder='Title'
                            type="text"
                            name='title'
                            id='title'
                            className='w-full py-3 text-xl bg-transparent focus:border-b-2 border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
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
                            className='w-full py-3 text-xl focus:border-b-2  bg-transparent border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
                        ></textarea>
                        {
                            errors.description && <span className='font-semibold underline text-danger'>Description is required</span>
                        }
                    </span>
                    <span className='flex flex-col gap-3 w-full'>
                        <select className='w-full py-3 outline-none focus:border-b-2  text-xl text-blue-300 bg-night-25 border-b border-blue-300' defaultValue="" {...register("category", { required: true })} name="category" id="category">
                            <option className='text-night-900' value="">Select a Category</option>
                            {
                                categories.length > 0 && categories.map(category => (
                                    <option key={category._id} className='bg-night-25 text-night-900' value={category._id}>{category.title}</option>
                                ))
                            }
                        </select>
                        {
                            errors.category && <span className='font-semibold underline text-danger'>Category is required</span>
                        }
                    </span>
                    <span className='flex flex-col items-start gap-3 w-full group'>
                        <span className='flex flex-col items-center w-full'>
                            <label htmlFor="thumbnail" className='relative self-stretch flex flex-col px-3 py-3 items-center justify-center cursor-pointer border rounded-lg border-blue-300'>
                                <img
                                    className='w-full aspect-video min-h-[150px] group-hover:scale-105 transition-all duration-300 rounded-lg object-cover'
                                    src={image}
                                    alt=""
                                />
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
                    <span className='flex flex-col items-start gap-3 w-full'>
                        <span className='w-full flex flex-col gap-3'>
                            <label htmlFor="video" className='relative self-stretch flex flex-col px-3 py-3 items-center justify-center cursor-pointer border rounded-lg border-blue-300'>
                                {
                                    videoUrl &&
                                    <video
                                        className='w-full aspect-video min-h-[150px] rounded-lg object-cover'
                                        src={videoUrl}
                                        autoPlay
                                        muted
                                    />
                                }
                                {
                                    !videoUrl &&
                                    <span className='text-blue-300 flex items-center gap-2 text-xl font-semibold'>Select a Video <MdOutlineOndemandVideo /></span>
                                }
                                <input
                                    type="file"
                                    name="video"
                                    id="video"
                                    className='absolute inset-0 opacity-0 cursor-pointer'
                                    onChange={handleSetVideo}
                                    accept="video/*,.mp4,.avi,.mov"
                                />
                            </label>
                            {
                                errors.video && <span className='font-semibold underline text-danger'>Video is required</span>
                            }
                        </span>
                        {
                            videoUrl && <button
                                type="button"
                                className='text-blue-300 self-center rounded-full flex items-center gap-1 justify-center '
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setVideoUrl(null);
                                    setValue("video", null);
                                    setError("video", { type: "required" });
                                    trigger("video");
                                }}
                            >
                                <RxCross2 />
                                Remove
                            </button>
                        }
                    </span>
                    <span className='flex flex-col items-start gap-3 w-full'>
                        <TagInput name={"tags"} control={control} setValue={setValue} getValues={getValues} trigger={trigger} />
                    </span>
                    <Button type={"submit"} styles={"w-max"} active>Submit</Button>
                </div>
            </form>
        </span>
    );
}

export default CreatePostForm;
