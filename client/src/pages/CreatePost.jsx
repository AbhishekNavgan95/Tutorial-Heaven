import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CreatePostForm from '../components/core/dashboard/CreatePost/CreatePostForm';
import { setPost, setEdit } from '../slices/postSlice';

const CreatePost = () => {

    const { edit, post } = useSelector(state => state.post);

    const dispatch = useDispatch()
    useEffect(() => {
        window.scrollTo(0, 0)
        if (edit) {
            dispatch(setEdit(false))
            dispatch(setPost(null))
        }
    }, [])

    return (
        <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14'>
            <h4 className='text-lg lg:text-xl border-b border-blue-300 pb-3 text-center md:text-start font-semibold text-blue-300'>{edit ? "Edit Your Video" : "Create New Video"}</h4>
            <div className='mt-5 '>
                <CreatePostForm edit={edit} post={post} />
            </div>
        </div >
    )
}

export default CreatePost