import React from 'react'
import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/view/${post?._id}`)} className='flex flex-col xl:flex-row gap-3 cursor-pointer bg-blue-50 text-night-25  hover:bg-blue-300 transition-all duration-300 p-3 rounded-lg'>
      <span>
        <img className='w-full h-[150px] xl:h-auto xl:max-w-[300px] xl:aspect-video rounded-lg object-cover' src={post?.thumbnail?.url} alt="" />
      </span>
      <span className='flex flex-col items-center md:items-start gap-1'>
        <h4 className='text-xl font-semibold line-clamp-1'>{post?.title}</h4>
        <span className='flex items-center gap-3 text-sm'>
          <p>{post?.category?.title}</p>
          |
          <p>{post?.likes?.length} likes</p>
        </span>
        <span className='my-2 flex items-center gap-3'>
          <img className='w-[35px] rounded-full aspect-square object-cover' src={post?.author?.image?.url} alt="" />
          <p className='text-sm'>{post?.author?.firstName} {post?.author?.lastName}</p>
        </span>
      </span>
    </div>
  )
}

export default Post