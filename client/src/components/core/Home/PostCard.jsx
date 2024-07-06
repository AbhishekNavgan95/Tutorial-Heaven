import React, { useEffect, useRef, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from "react-router-dom"
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { savePost, unSavePost } from "../../../services/operations/userAPI"
import { getCloudinaryUrl } from '../../../utils/getCloudinaryUrl';

const PostCard = ({ post }) => {

    const [images, setImages] = useState({
        postThumbnail: null,
        authorImage: null
    })
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const { user } = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        videoRef.current?.play();
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeoutRef.current);
        videoRef.current?.pause();
    };

    useEffect(() => {

        if(post?.thumbnail?.url) {
            setImages({
                postThumbnail: getCloudinaryUrl(post?.thumbnail?.url, 600, 400),
                authorImage: getCloudinaryUrl(post?.author?.image?.url, 40, 40)
            })
        }

    }, [post])

    return (
        <div onClick={() => navigate(`/view/${post?._id}`)} className='cursor-pointer'>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className='flex flex-col items-start h-full gap-3 transition-all duration-300 rounded-lg group'
            >
                <span className='overflow-hidden rounded-lg relative aspect-video w-full '>
                    <img
                        src={images?.postThumbnail}
                        loading='lazy'
                        className='group-hover:opacity-0 transition-all delay-500 duration-100' alt=""
                    />
                    <video
                        muted
                        ref={videoRef}
                        className='absolute top-0 opacity-0 group-hover:opacity-100 delay-500 transition-all duration-100' src={post?.video?.url}
                    ></video>
                </span>
                <div className='flex items-start justify-center gap-3 w-full'>
                    <span className='mt-[5px] w-fitContent'>
                        <img loading='lazy' className='w-[40px] aspect-square rounded-full' src={images?.authorImage} alt="" />
                    </span>
                    <span className='flex justify-between w-full gap-3 items-start'>
                        <span>
                            <h2 className='text-lg line-clamp-2 font-semibold text-night-900'>{post.title}</h2>
                            <h3 className='text-md  text-night-600'>{post.author.firstName + " " + post.author.lastName}</h3>
                            <span className='flex justify-between items-center w-full'>
                                <span className='flex items-center gap-2 font-thin text-night-600'>
                                    <p className='flex items-center gap-1 text-md'>
                                        {
                                            post.likes.length
                                        }
                                        <span>
                                            likes
                                        </span>
                                    </p>
                                    |
                                    {
                                        post.createdAt && <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                                    }
                                </span>
                            </span>
                        </span>
                        <span onClick={(e) => e.stopPropagation()} className='relative group/menu flex justify-center p-2 '>
                            <button className=' text-xl '><BsThreeDotsVertical /></button>
                            <div className={`absolute bottom-[-80%]  bg-night-25 border border-night-900 hover:border-blue-300 right-[50%] rounded-lg transition-all duration-100 hidden group-hover/menu:block group-active/menu:block`}>
                                <button
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            if (user?.savedPosts?.includes(post._id)) {
                                                unSavePost(token, dispatch, post?._id)
                                            } else {
                                                savePost(token, dispatch, post?._id)
                                            }
                                        }
                                    }
                                    className='px-10 py-1 text-night-900 hover:bg-blue-300 hover:text-night-25 transition-all duration-300'
                                >
                                    {
                                        user?.savedPosts?.includes(post._id)
                                            ? <span className='flex items-center gap-2'><PiBookmarkSimpleFill /> Unsave</span>
                                            : <span className='flex items-center gap-2'><PiBookmarkSimpleLight /> Save</span>
                                    }
                                </button>
                            </div>
                        </span>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default PostCard
