import React from 'react'
import { useSelector } from "react-redux"
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { formatDistanceToNow } from 'date-fns';
import { MdOutlineDeleteOutline } from "react-icons/md";


const CommentCard = ({ comment }) => {
    // console.log("Comment : ", comment);
    const { user } = useSelector(state => state.user)

    const handleLikeComment = () => {
        console.log("comment liked")
    }

    return (
        <div className='py-3 flex gap-5'>
            <span>
                <img src={comment?.author?.image?.url} className='max-w-[50px] aspect-square object-cover rounded-full border' alt="" />
            </span>
            <span className='flex flex-col gap-2'>
                <span className='flex items-center gap-3'>
                    <p className='font-semibold tet-lg'>{comment?.author?.firstName} {comment?.author?.lastName}</p>
                    {
                        comment.createdAt &&
                        <>
                            <span>-</span>
                            <p className='text-night-300 text-sm'>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                        </>
                    }
                </span>
                <p>{comment?.description}</p>
                <span className='py-1 flex text-xl gap-3 items-center rounded-full w-max'>
                    <button onClick={handleLikeComment} className='flex gap-2 items-center transition-all duration-300 py-1 hover:text-night-25 hover:bg-blue-300 px-2 rounded-full'>
                        <span className=''>
                            {
                                user?.likedPosts.includes(comment._id)
                                    ? <AiFillLike />
                                    : <AiOutlineLike />
                            }
                        </span>
                        <p className='text-lg'>{comment?.likes?.length}</p>
                    </button>
                    {
                        comment?.author._id === user?._id &&
                        <button className='transition-all duration-300  hover:text-night-25 hover:bg-blue-300 p-2 rounded-full'>
                            <MdOutlineDeleteOutline />
                        </button>
                    }
                </span>
            </span>
        </div>
    )
}

export default CommentCard