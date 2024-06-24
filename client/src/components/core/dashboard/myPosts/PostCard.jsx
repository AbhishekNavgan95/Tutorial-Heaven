import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { CiSettings } from "react-icons/ci";
import { setEdit, setPost } from '../../../../slices/postSlice'
import { MdDescription, MdOutlineArchive } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

const PostCard = ({ post, modalData, setModalData }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col gap-3'>
      <div onClick={() => navigate(`/view/${post?._id}`)} className='relative cursor-pointer rounded-lg overflow-hidden group w-full aspect-video'>
        <span className=' '>
          <img src={post?.thumbnail?.url} alt="" />
          <span
            className='md:flex hidden absolute text-xl w-full bottom-0 gap-2 justify-between items-end text-night-25 
          px-3 pt-5 pb-3 bg-gradient-to-b from-transparent to-blue-300 translate-y-[100%] group-hover:translate-y-0 
          transition-translate duration-300'
          >
            <span className='flex flex-col gap-1'>
              <h4 className='line-clamp-1 font-semibold text-xl'>{post?.title}</h4>
              <p className='text-sm'>Category : {post?.category?.title}</p>
              <p className='text-sm'>likes : {post?.likes?.length | 0}</p>
            </span>
            <span className='flex gap-3 items-center'>
              <button
                onClick={(e) => {
                  e.stopPropagation(); setModalData({
                    title: "Delete Post",
                    description: "Are you sure you want to delete this post?",
                    primaryButtonText: "Delete",
                    primaryButtonHandler: () => deletePost(),
                    secondaryButtonText: "Cancel",
                    secondaryButtonHandler: () => setModalData(null)
                  })
                }}
                className='text-2xl hover:scale-[1.15] hover:bg-night-25 p-1 rounded-full hover:text-blue-300 aspect-square  transiion-all duration-300 w-max'
              >
                <MdOutlineDeleteOutline />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); setModalData({
                    title: "Archive Post?",
                    description: "Are you sure you want to Archive this post?",
                    primaryButtonText: "Archive",
                    primaryButtonHandler: () => archivePost(),
                    secondaryButtonText: "Cancel",
                    secondaryButtonHandler: () => setModalData(null)
                  })
                }}
                className='text-2xl hover:scale-[1.15] hover:bg-night-25 p-1 rounded-full hover:text-blue-300 aspect-square  transiion-all duration-300 w-max'
              >
                <MdOutlineArchive />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setEdit(true));
                  dispatch(setPost(post));
                  navigate(`/dashboard/edit/${post?._id}`)
                }}
                className='text-2xl hover:scale-[1.15] hover:bg-night-25 p-1 rounded-full hover:text-blue-300 aspect-square  transiion-all duration-300 w-max'
              >
                <CiSettings />
              </button>
            </span>
          </span>
        </span>
      </div>
      <span className='flex justify-between items-end md:hidden'>
        <span className='flex flex-col'>
          <h4 className='line-clamp-1 text-lg font-semibold'>{post?.title}</h4>
          <p className='text-sm'>Category : {post?.category?.title}</p>
          <p className='text-sm'>likes : {post?.likes?.length | 0}</p>
        </span>
        <span className='flex gap-3 items-center'>
          <button
            onClick={() => setModalData({
              title: "Delete Post?",
              description: "Are you sure you want to delete this post?",
              primaryButtonText: "Delete",
              primaryButtonHandler: () => deletePost(),
              secondaryButtonText: "Cancel",
              secondaryButtonHandler: () => setModalData(null)
            })}
            className='text-2xl rounded-full hover:text-night-25 aspect-square hover:bg-blue-300 p-2 transiion-all duration-300 w-max'
          >
            <MdOutlineDeleteOutline />
          </button>
          <button
            onClick={() => setModalData({
              title: "Archive Post?",
              description: "Are you sure you want to Archive this post?",
              primaryButtonText: "Archive",
              primaryButtonHandler: () => archivePost(),
              secondaryButtonText: "Cancel",
              secondaryButtonHandler: () => setModalData(null)
            })}
            className='text-2xl  hover:bg-blue-300 p-2 rounded-full hover:text-night-25 aspect-square  transiion-all duration-300 w-max'
          >
            <MdOutlineArchive />
          </button>
          <button
            onClick={() => { 
              dispatch(setEdit(true)); 
              dispatch(setPost(post)); 
              navigate(`/dashboard/edit/${post?._id}`) 
            }}
            className='text-2xl rounded-full hover:bg-blue-300 p-2 hover:text-night-25 aspect-square  transiion-all duration-300 w-max'
          >
            <CiSettings />
          </button>
        </span>
      </span>
    </div>
  )
}

export default PostCard