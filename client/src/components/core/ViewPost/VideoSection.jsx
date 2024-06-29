import React, { useState } from 'react'
import ReactPlayer from "react-player"
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux'
import { BiLike, BiSolidLike } from "react-icons/bi";
import { IoBookmarkSharp, IoBookmarkOutline } from "react-icons/io5";
import { apiConnector } from '../../../services/apiConnector';
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from 'react-router-dom';

const VideoSection = ({ post, loading }) => {

    const [description, setDescription] = useState(false);
    const { user } = useSelector(state => state.user)

    const handleLikeVideo = () => {
        console.log("like")
        if (user?.likedPosts?.includes(post?._id)) {
            const response = apiConnector("POST",)
        } else {
            const response = apiConnector("POST",)
        }

    }

    const handleBookmarkVideo = () => {
        console.log("bookmark")
    }

    return (
        <section className='flex flex-col gap-3 md:py-3 w-full '>
            <Link to={".."} className='cursor-pointer text-base md:text-lg xl:text-xl p-2 border border-blue-300 text-blue-300 w-max rounded-full hover:bg-blue-300 hover:text-night-25 transition-all duration-300 flex justify-center items-center'>
                <TbArrowBackUp />
            </Link>
            <span className='bg-night-50 rounded-lg aspect-video w-full'>
                <ReactPlayer
                    style={{ minWidth: "100%", aspectRatio: "16/9", borderRadius: "5px", overflow: "hidden" }}
                    width={"100%"}
                    height={"auto"}
                    url={post?.video?.url}
                    controls
                />
            </span>
            {
                loading ?
                    // skeleton loading
                    <div className='w-full h-[300px] flex justify-center items-start'>
                        <div className='w-full flex flex-col gap-3 mt-3'>
                            <div className='py-3 w-full bg-night-50 animate-pulse'></div>
                            <div className='py-3 w-[40%] bg-night-50 animate-pulse'></div>
                            <div className='py-7 w-full bg-night-50 animate-pulse'></div>
                            <span className='flex justify-between items-center w-full'>
                                <div className='w-[30%] py-3 bg-night-50 animate-pulse'></div>
                                <span className='w-[20%] flex gap-3 mt-2'>
                                    <div className='w-[50%] py-4 bg-night-50 animate-pulse'></div>
                                    <div className='w-[50%] py-4 bg-night-50 animate-pulse'></div>
                                </span>
                            </span>
                            <div className='w-[40%] py-5 mt-5 bg-night-50 animate-pulse'></div>
                        </div>
                    </div> : <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-3 items-start'>
                            <span className='flex flex-col gap-1'>
                                <h4 className='text-xl md:text-2xl font-semibold '>{post?.title}</h4>
                                <p className='font-thin text-xs md:text-sm'>{post?.category?.title}</p>
                            </span>
                            <span className='bg-night-50 w-full text-sm sm:text-base px-3 rounded-lg py-2'>
                                {
                                    post?.createdAt &&
                                    <p>{formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}</p>
                                }
                                <span className={`${description ? "block" : "hidden"} py-3`}>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{post?.description}</p>
                                </span>
                                <button className='text-blue-300 font-semibold' onClick={() => setDescription(!description)}>{description ? "show less..." : "show more..."}</button>
                            </span>
                        </div>
                        <div className='border-b border-night-50 w-full flex justify-between items-center px-3 py-4'>
                            <span>
                                <p>{post?.likes?.length} Likes</p>
                            </span>
                            <span className='flex gap-3'>
                                <button
                                    onClick={handleLikeVideo}
                                    className='border-blue-300 border px-3 rounded-lg text-blue-300 hover:bg-blue-300  hover:text-night-25 transition-all duration-300 text-sm sm:text-base lg:text-lg py-1'
                                >
                                    {
                                        user?.likedPosts?.includes(post?._id) ?
                                            <BiSolidLike className='' /> :
                                            <BiLike className='' />
                                    }
                                </button>
                                <button
                                    onCanPlay={handleBookmarkVideo}
                                    className='border-blue-300 border px-3 rounded-lg text-blue-300 hover:bg-blue-300  hover:text-night-25 transition-all duration-300 text-sm sm:text-base lg:text-lg py-1'
                                >
                                    {
                                        user?.savedPosts?.includes(post?._id) ?
                                            <IoBookmarkSharp className='' /> :
                                            <IoBookmarkOutline className='' />
                                    }
                                </button>
                            </span>
                        </div>
                        <div className='flex items-center gap-3 py-3'>
                            <span>
                                <img loading='lazy' src={post?.author?.image?.url} className='w-[50px] rounded-full aspect-square border border-night-900' alt="" />
                            </span>
                            <span>
                                <p className='font-semibold text-base sm:text-lg'>{post?.author?.firstName} {post?.author?.lastName}</p>
                            </span>
                        </div>
                    </div>
            }
        </section>
    )
}

export default VideoSection