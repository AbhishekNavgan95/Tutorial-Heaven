import React from 'react'
import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/view/${post?._id}`)} className='flex flex-col xl:flex-row gap-3 cursor-pointer text-night-900 transition-all duration-300 rounded-lg group'>
      <span className='w-full aspect-video bg-night-50 h-[180px] xl:h-auto flex items-center justify-center xl:max-w-[35%] xl:aspect-video overflow-hidden rounded-lg'>
        <img  loading='lazy'  className='w-full group-hover:scale-105 transition-all duration-300 object-cover rounded-lg' src={post?.thumbnail?.url} alt="" />
      </span>
      <span className='flex flex-col items-center md:items-start gap-1'>
        <h4 className='text-xl font-semibold line-clamp-1'>{post?.title}</h4>
        <span className='flex items-center gap-1 lg:gap-3 text-sm'>
          <p>{post?.category?.title}</p>
          -
          <p>{post?.likes?.length} likes</p>
        </span>
        <span className=' flex items-center gap-3'>
          <img  loading='lazy'  className='w-[35px] rounded-full aspect-square object-cover' src={post?.author?.image?.url} alt="" />
          <p className='text-sm'>{post?.author?.firstName} {post?.author?.lastName}</p>
        </span>
      </span>
    </div>
  )
}

export default Post