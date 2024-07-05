import React from 'react'
import CreateCategoryForm from '../components/core/dashboard/CreateCategory/CreateCategoryForm'
import { useSelector } from 'react-redux'

const CreateCategory = () => {

    const { edit, post } = useSelector(state => state.post)

    return (
        <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14'>
            <h4 className='text-lg lg:text-xl border-b border-blue-300 pb-3 text-center md:text-start font-semibold text-blue-300'>{edit ? "Edit Category" : "Create Category"}</h4>
            <div className='mt-5 '>
                <CreateCategoryForm edit={edit} category={post} />
            </div>
        </div >
    )
}

export default CreateCategory