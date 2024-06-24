import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const PostCart = ({ post }) => {

    console.log("post : ", post);
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/view/${post?._id}`)}  className='flex cursor-pointer gap-3 w-full'>
            <span>
                <img src={post?.thumbnail?.url} className='max-w-[200px] lg:max-w-[250px] object-cover rounded-lg border-2 border-night-900' alt="" />
            </span>
            <span>
                <h3 className='font-semibold line-clamp-1'>{post?.title}</h3>
                <p className='line-clamp-1 text-sm'>{post?.description}</p>
                <span className='flex items-center flex-wrap gap-x-1 lg:gap-x-3'>
                    <p className='text-sm'>{post?.likes?.length} likes</p>
                    <span className='min-w-[3px] rounded-full min-h-[3px] aspect-square bg-night-900'></span>
                    <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                </span>
            </span>
        </div>
    )
}

export default PostCart