import React, { useState } from 'react'
import ReactPlayer from "react-player"
import { formatDistanceToNow } from 'date-fns';

const VideoSection = ({ post }) => {

    const [description, setDescription] = useState(false);
    // console.log("post : ", post)

    return (
        <section className='flex flex-col gap-3 py-3 w-full'>
            <span className='bg-night-50 rounded-lg aspect-video w-full'>
                <ReactPlayer
                    style={{ minWidth: "100%", aspectRatio: "16/9", borderRadius: "10px", overflow: "hidden" }}
                    width={"100%"}
                    height={"auto"}
                    url={post?.video?.url}
                    controls
                />
            </span>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-3 items-start'>
                    <span className='flex flex-col gap-1'>
                        <h4 className='text-2xl font-semibold '>{post?.title}</h4>
                        <p className='font-thin text-sm'>{post?.category?.title}</p>
                    </span>
                    <span className='bg-night-50 w-full text-sm sm:text-base px-3 rounded-lg py-2'>
                        {
                            post?.createdAt &&
                            <p>{formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}</p>
                        }
                        <span className={`${description ? "block" : "hidden"} py-3`}>
                            <p  style={{ whiteSpace: 'pre-wrap' }}>{post?.description}</p>
                        </span>
                        <button className='text-blue-300 font-semibold' onClick={() => setDescription(!description)}>{description ? "show less..." : "show more..."}</button>
                    </span>
                </div>
                <div className='border-b border-night-50 w-full flex justify-between items-center px-3 py-4'>
                    <span>
                        <p>{post?.likes?.length} Likes</p>
                    </span>
                    <span className='flex gap-3'>
                        <button className='border-blue-300 border px-3 rounded-lg text-blue-300 hover:bg-blue-300  hover:text-night-25 transition-all duration-300 text-sm sm:text-base lg:text-lg py-1'>Like</button>
                        <button className='border-blue-300 border px-3 rounded-lg text-blue-300 hover:bg-blue-300  hover:text-night-25 transition-all duration-300 text-sm sm:text-base lg:text-lg py-1'>Save</button>
                    </span>
                </div>
                <div className='flex items-center gap-3 py-3'>
                    <span>
                        <img src={post?.author?.image?.url} className='w-[50px] rounded-full aspect-square border border-night-900' alt="" />
                    </span>
                    <span>
                        <p className='font-semibold text-base sm:text-lg'>{post?.author?.firstName} {post?.author?.lastName}</p>
                    </span>
                </div>
            </div>
        </section>
    )
}

export default VideoSection