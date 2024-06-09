import React, { useRef } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom"

const PostCard = ({ post }) => {

    const videoRef = useRef(null);
    const hoverTimeoutRef = useRef(null);

    const handleMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            videoRef.current?.play();
        }, 2000); // 2 seconds delay
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeoutRef.current);
        videoRef.current?.pause();
    };

    return (
        <Link>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className='flex flex-col items-start h-full gap-3 p-3 transition-all duration-300 border border-transparent rounded-lg group border-night-300 hover:border-night-300 hover:shadow-md hover:shadow-night-300'
            >
                <span className='overflow-hidden rounded-lg relative aspect-video w-full '>
                    <img
                        src={post?.thumbnail?.url}
                        className='group-hover:opacity-0 transition-all delay-500 duration-100' alt=""
                    />
                    <video
                        muted
                        ref={videoRef}
                        className='absolute top-0 opacity-0 group-hover:opacity-100 delay-500 transition-all duration-100' src={post?.video?.url}
                    ></video>
                </span>
                <div className='flex items-start justify-center gap-3'>
                    <span className='mt-[5px] w-fitContent'>
                        <img className='w-[40px] rounded-full' src={post?.author?.image?.url} alt="" />

                    </span>
                    <span className='flex flex-col w-full'>
                        <h2 className='text-xl font-semibold text-night-900'>{post.title}</h2>
                        <h3 className='text-lg text-night-600'>{post.author.firstName + " " + post.author.lastName}</h3>
                        <span className='flex items-center gap-2 text-night-900'>
                            <p className='flex items-center gap-1 text-lg'>
                                {
                                    post.likes.length
                                }
                                <span>
                                    likes
                                </span>
                            </p>
                            <span className='w-[3px] h-[3px] bg-night-900'></span>
                            {
                                post.createdAt && <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                            }
                        </span>
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default PostCard