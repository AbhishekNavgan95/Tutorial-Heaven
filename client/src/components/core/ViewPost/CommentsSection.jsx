import React from 'react'
import CommentCard from './CommentCard'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "../../common/Button"
import { useForm } from "react-hook-form"
import { addComment } from '../../../services/operations/postAPI';
import { useDispatch, useSelector } from 'react-redux';

const CommentsSection = ({
    post,
    comments,
    setComments,
    commentsTotalPages,
    setCommentsCurrentPage,
    commentsCurrentPage
}) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const submitHandler = async (data) => {
        const response = await addComment(data, post._id, dispatch, token);
        if (response) {
            setValue("comment", "")
            setComments(prev => [response, ...prev])
        }
    }

    return (
        <div className='py-5'>
            <h5 className='text-xl font-semibold border-b border-night-50 pb-3'>Comments</h5>
            <form onSubmit={handleSubmit(submitHandler)} className='pt-3 w-full flex flex-col items-end gap-3 border-b border-night-50 pb-3'>
                <textarea {...register("comment", { required: true })} placeholder='Add a commment...' rows={2} type="text" className='w-full py-2 resize-none bg-night-25 text-xl outline-none  border-b border-blue-300'></textarea>
                <span className='self-start'>
                    {
                        errors.comment && <p className='text-danger-dark underline font-semibold'>Comment is required</p>
                    }
                </span>
                <Button type={"submit"} active styles={"w-max"}>Submit</Button>
            </form>
            <div className='py-5'>
                {
                    comments.length > 0 ? (comments.map((comment) => (
                        <CommentCard key={comment?._id} comment={comment} />
                    ))) : <p>No comments yet</p>
                }
            </div>
            <div className='flex flex-col items-center'>
                {
                    commentsTotalPages > 1 && commentsCurrentPage < commentsTotalPages ? (
                        <button
                            className='flex items-center gap-2 text-sm font-semibold'
                            onClick={() => setCommentsCurrentPage(commentsCurrentPage + 1)}
                        >Load more <MdOutlineKeyboardArrowDown /></button>
                    ) : null
                }
            </div>
        </div>
    )
}

export default CommentsSection