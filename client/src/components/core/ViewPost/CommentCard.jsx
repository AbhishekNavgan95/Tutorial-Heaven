import { useEffect, useState } from 'react';
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { formatDistanceToNow } from 'date-fns';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { likeComment, unlikeComment } from '../../../services/operations/commentAPI';


const CommentCard = ({ comment, setModalData, handleDeleteComment }) => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [likes, setLikes] = useState(comment?.likes);
    const [expandComment, setExpandComment] = useState(false);

    const handleLikeComment = async () => {
        const response = await likeComment(comment?._id, dispatch, token);
        if (response) {
            setLikes((prev) => [...prev, user?._id]);
        }
    }

    const handleUnlikeComment = async () => {
        const response = await unlikeComment(comment?._id, dispatch, token)
        if (response) {
            console.log("like count before : ", likes)
            setLikes((prev) => prev.filter((like) => like !== user?._id));
            console.log("like count after : ", likes)
        }
    }

    useEffect(() => {
        // useEffect to load comment again after like for rerender of corrousponding comment
    }, [likes?.length])

    return (
        <div className='py-3 flex gap-3 md:gap-5'>
            <span>
                <img src={comment?.author?.image?.url} className='max-w-[40px] min-w-[40px] sm:max-w-[50px] aspect-square object-cover rounded-full border' alt="" />
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
                <span>
                    <p className={`${expandComment ? "" : "line-clamp-3"} text-sm text-wrap sm:text-base`} style={{ whiteSpace: 'pre-wrap' }}>{comment?.description}</p>
                    {
                        comment?.description?.length > 100 &&
                        <button onClick={() => setExpandComment(!expandComment)} className='text-blue-300 text-sm mt-2'>{!expandComment ? "Show more..." : "Show less"}</button>
                    }
                </span>
                <span className='py-1 flex text-xl gap-3 items-center rounded-full w-max'>
                    <button
                        onClick={
                            !likes.includes(user?._id)
                                ? handleLikeComment
                                : handleUnlikeComment}
                        className='flex gap-2 items-center transition-all duration-300 py-1 hover:text-night-25 hover:bg-blue-300 px-3 rounded-full'>
                        <span className=''>
                            {
                                user?.likedComments.includes(comment._id)
                                    ? <AiFillLike />
                                    : <AiOutlineLike />
                            }
                        </span>
                        <p className='text-lg'>{likes?.length}</p>
                    </button>
                    {
                        comment?.author?._id === user?._id &&
                        <button onClick={() => setModalData({
                            title: "Delete Comment?",
                            description: "This comment will be deleted!",
                            primaryButtonText: "Delete",
                            primaryButtonHandler: () => handleDeleteComment(comment?._id),
                            secondaryButtonText: "Close",
                            secondaryButtonHandler: () => setModalData(null)
                        })} className='transition-all duration-300  hover:text-night-25 hover:bg-blue-300 p-2 rounded-full'>
                            <MdOutlineDeleteOutline />
                        </button>
                    }
                </span>
            </span>
        </div>
    )
}

export default CommentCard