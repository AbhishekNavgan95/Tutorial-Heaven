import React from 'react'
import CommentCard from './CommentCard'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "../../common/Button"
import { useForm } from "react-hook-form"
import { addComment } from '../../../services/operations/postAPI';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "../../common/Modal"
import { deleteComment } from '../../../services/operations/commentAPI';
import Spinner from '../../common/Spinner'

const CommentsSection = ({
    post,
    comments,
    setComments,
    commentsTotalPages,
    setCommentsCurrentPage,
    commentsCurrentPage,
    loading
}) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [modalData, setModalData] = React.useState(null);

    const submitHandler = async (data) => {
        const response = await addComment(data, post._id, dispatch, token);
        if (response) {
            setValue("comment", "")
            setComments(prev => [response, ...prev])
        }
    }

    const handleDeleteComment = (commentId) => {
        const response = deleteComment(commentId, dispatch, token)
        if (response) {
            setComments(prev => prev.filter((c) => c?._id !== commentId))
        }
    }

    return (
        <div className='pb-5 w-full '>
            <div className='bg-night-5 w-full lg:sticky top-[4rem] pt-5 border-b border-night-50'>
                <h5 className='text-xl font-semibold border-b border-night-50 pb-3'>Comments</h5>
                <form onSubmit={handleSubmit(submitHandler)} className='pt-3 w-full flex flex-col items-end gap-3 pb-3'>
                    <textarea {...register("comment", { required: true })} placeholder='Add a commment...' rows={2} type="text" className='w-full py-2 text-sm sm:text-base lg:text-lg resize-none bg-night-5 outline-none  border-b border-blue-300'></textarea>
                    <span className='self-start'>
                        {
                            errors.comment && <p className='text-danger-dark underline font-semibold'>Comment is required</p>
                        }
                    </span>
                    <Button type={"submit"} active styles={"w-max"}>Submit</Button>
                </form>
            </div>
            <div className='py-5 w-full'>
                {
                    comments.length > 0 && !loading ? (comments?.map((comment) => (
                        <CommentCard handleDeleteComment={handleDeleteComment} setModalData={setModalData} key={comment?._id} comment={comment} />
                    ))) : loading ? <div className='flex justify-center'><Spinner /></div> : <div className='flex justify-center'><p>No comments found</p></div>
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
            {
                modalData && <Modal modalData={modalData} setModalData={setModalData} />
            }
        </div>
    )
}

export default CommentsSection