import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../common/Button';
import { apiConnector } from '../../../../services/apiConnector';
import { dataEndpoints } from '../../../../services/APIs';
import { toast } from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import placeHolder from "../../../../assets/placeHolders/imageUpload.png";
import { createPost, updatePost } from '../../../../services/operations/postAPI';
import TagInput from './TagInput';
import { useLocation, useNavigate } from "react-router-dom"
import { setEdit, setPost } from "../../../../slices/postSlice"

const CreatePostForm = ({ edit, post }) => {

    const [image, setImage] = useState(placeHolder);
    const [videoUrl, setVideoUrl] = useState(null); // State for video URL
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const location = useLocation()

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
    }, [fetchCategories])

    useEffect(() => {

        if (edit) {
            setValue("title", post?.title);
            setValue("description", post?.description);
            setValue("category", post?.category._id);
            setValue("tags", post?.tags?.split(","));
            setImage(post?.thumbnail?.url);
            setVideoUrl(post?.video?.url);
        } else {
            setValue("title", "");
            setValue("description", "");
            setValue("category", "");
            setValue("tags", []);
            setImage(placeHolder);
            setVideoUrl("");
        }

        if (edit === false && location.pathname.includes("edit")) {
            navigate("/dashboard/posts")
        }

    }, [categories, edit]);

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
        const maxFileSize = 100 * 1024 * 1024;

        if (file && file.size > maxFileSize) {
            toast.error("File size exceeds 100 MB!", {
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
            return;
        }

        if (file) {
            setValue("video", file);
            trigger("video");

            const videoURL = URL.createObjectURL(file);
            setVideoUrl(videoURL);
            clearErrors("video")
        }
    }

    const submitHandler = async (data) => {
        setLoading(true)
        if (edit) {
            const response = await updatePost(data, post?._id, dispatch, token);
            if (response) {
                setValue("title", "");
                setValue("description", "");
                setValue("category", "");
                setImage(placeHolder);
                setVideoUrl(null);
                trigger();
                dispatch(setEdit(false));
                dispatch(setPost(null));
                navigate("/dashboard/posts")
            }
            return
        }

        if (!getValues("thumbnail")) {
            setError("thumbnail", { type: "required" });
            return
        }

        if (!getValues("video")) {
            setError("video", { type: "required" });
            return;
        }

        if (getValues("tags")?.length === 0) {
            setError("tags", { type: "required" });
            return;
        }

        const response = await createPost(data, dispatch, token);
        if (response) {
            setValue("title", "");
            setValue("description", "");
            setValue("category", "");
            setImage(placeHolder);
            setVideoUrl(null);
            trigger();
            navigate("/dashboard/posts")
        }

        setLoading(false)
    }

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
                            className='w-full pb-2 md:py-3 text-sm sm:text-lg bg-transparent border-b outline-none text-night-700'
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
                            className='w-full pb-2 md:py-3 text-sm sm:text-lg bg-transparent border-b outline-none text-night-700'
                        ></textarea>
                        {
                            errors.description && <span className='font-semibold underline text-danger'>Description is required</span>
                        }
                    </span>
                    <span className='flex flex-col gap-3 w-full'>
                        <select className='w-full pb-2 md:py-3 text-night-700 outline-nonetext-sm sm:text-lg bg-transparent border-b ' defaultValue="" {...register("category", { required: true })} name="category" id="category">
                            <option className=' bg-night-25' value="">Select a Category</option>
                            {
                                categories.length > 0 && categories.map(category => (
                                    <option key={category._id} className='bg-night-25 text-night-700' value={category._id}>{category.title}</option>
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
                                <span className='w-full rounded-lg overflow-hidden'>
                                    <img
                                        loading='lazy'
                                        className='w-full aspect-video min-h-[120px] group-hover:scale-105 transition-all duration-300 rounded-lg object-cover'
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
                                    className=' self-center p-2 rounded-full flex items-center gap-1 justify-center '
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
                                        loop
                                    />
                                }
                                {
                                    !videoUrl &&
                                    <span
                                        className=' flex flex-col items-center gap-2 text-sm sm:text-lg text-night-700 text-center font-semibold'
                                    >
                                        Select or Drag and drop a video
                                        <span className='font-light text-sm'>(maximum size - 100mb)</span>
                                    </span>
                                }
                                {
                                    !edit &&
                                    <input
                                        type="file"
                                        name="video"
                                        id="video"
                                        className='absolute inset-0 opacity-0 cursor-pointer'
                                        onChange={handleSetVideo}
                                        accept="video/*,.mp4,.avi,.mov"
                                    />
                                }
                            </label>
                            {
                                errors.video && <span className='font-semibold underline text-danger'>Video is required</span>
                            }
                        </span>
                        {
                            !edit && videoUrl && <button
                                type="button"
                                className=' self-center rounded-full flex items-center gap-1 justify-center '
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
                        <TagInput setError={setError} clearErrors={clearErrors} name={"tags"} errors={errors} setValue={setValue} getValues={getValues} trigger={trigger} />
                    </span>
                    <span className='flex gap-3'>
                        <Button disabled={loading} type={"submit"} styles={"w-max"} active>Submit</Button>
                        <Button action={() => {
                            dispatch(setEdit(false));
                            dispatch(setPost(null));
                            navigate("/dashboard/posts")
                        }} styles={"w-max"} >Cancel</Button>
                    </span>
                </div>
            </form>
        </span>
    );
}

export default CreatePostForm;
