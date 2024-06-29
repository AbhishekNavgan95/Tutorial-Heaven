import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const PostCart = ({ post }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/view/${post?._id}`)} className='flex cursor-pointer gap-3 w-full'>
            <span className='bg-night-50 min-w-[200px] lg:min-w-[230px] aspect-video rounded-lg'>
                <img loading='lazy' src={post?.thumbnail?.url} className='max-w-[200px] lg:max-w-[230px] object-cover rounded-lg ' alt="" />
            </span>
            <span>
                <h3 className='font-semibold line-clamp-1'>{post?.title}</h3>
                <p className='line-clamp-1 text-sm font-thin'>{post?.author?.firstName} {post?.author?.lastName}</p>
                <span className='flex items-center text-sm font-thin flex-wrap gap-x-1 lg:gap-x-3'>
                    <p className=''>{post?.likes?.length} likes</p>
                    <span className=''> | </span>
                    <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                </span>
            </span>
        </div>
    )
}

export default PostCart