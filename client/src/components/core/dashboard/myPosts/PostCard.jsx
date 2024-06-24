import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { setEdit, setPost } from '../../../../slices/postSlice'
import { MdDescription, MdOutlineArchive } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { POST_STATUS } from '../../../../services/constants';
import { FaStar } from "react-icons/fa";
import { changePostStatus } from '../../../../services/operations/userAPI';

const PostCard = ({ post, modalData, setModalData }) => {

  const [postStatus, setPostStatus] = useState("");

  useEffect(() => {
    setPostStatus(post?.status)
  }, [])

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth)

  return (
    <div className='flex flex-col gap-3'>
      <div onClick={() => navigate(`/view/${post?._id}`)} className='relative cursor-pointer overflow-hidden rounded-lg group w-full aspect-video'>
        <span className='relative w-full'>
          <img src={post?.thumbnail?.url} alt="" className='aspect-video' />
          <span
            className='md:flex hidden absolute text-xl inset-0 w-full top-0 gap-2 justify-between items-end text-night-25 
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
                    title: postStatus === POST_STATUS.ARCHIVED ? "Publish Post?" : "Archive Post?",
                    description: `Are you sure you want to ${postStatus === POST_STATUS.ARCHIVED? "Publish" : "Archive"} this post?`,
                    primaryButtonText: postStatus === POST_STATUS.PUBLISHED? "Archive" : "Publish",
                    primaryButtonHandler: () => changePostStatus(postStatus === POST_STATUS.PUBLISHED? POST_STATUS.ARCHIVED : POST_STATUS.PUBLISHED, token, post._id, dispatch),
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
          {
            postStatus === POST_STATUS.ARCHIVED &&
            <span className='text-blue-300 m-3 bg-night-25 rounded-full p-2 absolute text-sm top-0 right-0'>
              <FaStar />
            </span>
          }
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
              title: postStatus === POST_STATUS.ARCHIVED ? "Publish Post?" : "Archive Post?",
              description: `Are you sure you want to ${postStatus === POST_STATUS.ARCHIVED? "Publish" : "Archive"} this post?`,
              primaryButtonText: postStatus === POST_STATUS.PUBLISHED? "Archive" : "Publish",
              primaryButtonHandler: () => changePostStatus(postStatus === POST_STATUS.PUBLISHED? POST_STATUS.ARCHIVED : POST_STATUS.PUBLISHED, token, post._id, dispatch),
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