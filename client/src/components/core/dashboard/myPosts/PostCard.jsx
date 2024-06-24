import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { CiSettings } from "react-icons/ci";
import { setEdit, setPost } from '../../../../slices/postSlice'

const PostCard = ({ post }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div onClick={() => navigate(`/view/${post?._id}`)} className='relative cursor-pointer rounded-lg overflow-hidden group w-full aspect-video'>
      <span className=' '>
        <img src={post?.thumbnail?.url} alt="" />
        <span
          className='absolute text-xl w-full bottom-0 flex flex-col gap-2 justify-start text-night-25 
          px-3 pt-5 pb-3 bg-gradient-to-b from-transparent to-blue-300 translate-y-[100%] group-hover:translate-y-0 
          transition-translate duration-300'
        >
          <h4 className='line-clamp-1 text-xl'>{post?.title}</h4>
          <p className='text-sm'>Category : {post?.category?.title}</p>
          <span className='flex items-center justify-between'>
            <p className='text-sm'>likes : {post?.likes?.length | 0}</p>
            <button onClick={(e) => { e.stopPropagation(); dispatch(setEdit(true)); dispatch(setPost(post)); navigate(`/dashboard/edit/${post?._id}`) }} className='text-2xl hover:scale-[1.15] hover:rotate-[45deg] transiion-all duration-300 w-max'><CiSettings /></button>
          </span>
        </span>
      </span>
    </div>
  )
}

export default PostCard