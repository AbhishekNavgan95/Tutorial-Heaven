import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';
import { getCloudinaryUrl } from '../../../../utils/getCloudinaryUrl';

const Post = ({ post }) => {

  const [images, setImages] = useState({
    postThumbnail: null,
    authorImage: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (post?.thumbnail?.url) {
      setImages({
        postThumbnail : getCloudinaryUrl(post?.thumbnail?.url, 600, 400),
        authorImage: getCloudinaryUrl(post?.author?.image?.url, 50, 50)
      })
    }
  }, [])

  return (
    <div onClick={() => navigate(`/view/${post?._id}`)} className='flex flex-col xl:flex-row gap-1 sm:gap-3 cursor-pointer text-night-900 transition-all duration-300 rounded-lg group'>
      <span className='w-full bg-night-50 max-h-[180px] xl:h-auto flex items-center justify-center xl:max-w-[35%] xl:aspect-video overflow-hidden rounded-lg'>
        <img src={images?.postThumbnail} loading='lazy' className='w-full group-hover:scale-105 transition-all duration-300 object-cover rounded-lg' alt="" />
      </span>
      <span className='flex flex-col items-center md:items-start gap-1'>
        <h4 className='text-base md:text-lg font-semibold line-clamp-1'>{post?.title}</h4>
        <span className='flex items-center gap-1 lg:gap-3 text-sm font-thin text-night-600'>
          <p>{post?.category?.title}</p>
          |
          <p>{post?.likes?.length} likes</p>
          |
          <p>{formatDistanceToNow(post?.createdAt, { addSuffix: true })}</p>
        </span>
        <span className=' flex items-center gap-1 md:gap-3 mt-1'>
          <img src={images?.authorImage}  loading='lazy' className='w-[20px] sm:w-[35px] rounded-full aspect-square object-cover' alt="" />
          <p className='text-sm font-thin text-night-600'>{post?.author?.firstName} {post?.author?.lastName}</p>
        </span>
      </span>
    </div>
  )
}

export default Post