import React from 'react'
import { useSelector } from 'react-redux'
import CreatePostForm from '../components/core/dashboard/CreatePost/CreatePostForm';

const CreatePost = () => {

    const {edit, course} = useSelector(state => state.post);
    console.log("edit state : ", edit);

    return (
        <div className='w-full lg:w-8/12 mx-auto py-10'>
        <div className='border-b border-blue-300 pb-3 w-full'>
            <h4 className='text-xl text-center md:text-start font-semibold text-blue-300'>{edit? "Edit Your Existing post" : "Create New Post"}</h4>
        </div>
            <div className='mt-5 '>
                <CreatePostForm />    
            </div>
        </div >
    )
}

export default CreatePost