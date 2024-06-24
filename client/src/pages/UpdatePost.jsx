import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CreatePostForm from '../components/core/dashboard/CreatePost/CreatePostForm';

const UpdatePost = () => {

    const { edit, post } = useSelector(state => state.post);

    return (
        <div className='w-full lg:w-8/12 mx-auto py-10'>
            <div className='border-b border-blue-300 pb-3 w-full'>
                <h4 className='text-xl text-center md:text-start font-semibold text-blue-300'>{edit ? "Edit Your post" : "Create New Post"}</h4>
            </div>
            <div className='mt-5 '>
                <CreatePostForm edit={edit} post={post} />
            </div>
        </div >
    )
}

export default UpdatePost