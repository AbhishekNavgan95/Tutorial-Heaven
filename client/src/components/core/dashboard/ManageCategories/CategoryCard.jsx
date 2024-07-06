import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { getCloudinaryUrl } from '../../../../utils/getCloudinaryUrl'
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { setEdit, setPost } from '../../../../slices/postSlice';
import { deleteCategory } from '../../../../services/operations/categoryAPI';

const CategoryCard = ({ category, setModalData, handleDeleteCategory }) => {

    const categoryImage = getCloudinaryUrl(category?.image?.url, 800, 600)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleEditCategory = () => {
        dispatch(setEdit(true));
        dispatch(setPost(category))
        navigate(`/dashboard/edit-category/${category?._id}`)
    }

    return (
        <div className='rounded-lg overflow-hidden relative group'>
            <div className='w-full max-h-[200px] flex items-center overflow-hidden'>
                <img src={categoryImage} className=' object-cover w-full' alt="" />
            </div>
            <div className='text-night-25 absolute top-0 rounded-lg px-5 py-3 bg-opec group-hover:bg-transparent transition-all duration-300 inset-0'>
                <span className='flex flex-col justify-center items-center md:items-start md:justify-between h-full gap-3'>
                    <span>
                        <h5 className='text-center md:text-start text-sm md:text-base lg:text-xl font-semibold'>{category?.title}</h5>
                        <p className='text-center md:text-start text-base text-night-50 line-clamp-2'>{category?.description} </p>
                        <p className='text-center md:text-start text-base text-night-50 line-clamp-2'>Total Posts: {category?.posts?.length}</p>
                    </span>
                    <span className='flex gap-3 md:self-end text-xl'>
                        <button onClick={() => navigate(`/?category=${category?._id}`)} className='p-2 transition-all duration-300 hover:bg-blue-300 bg-night-25 text-blue-300 hover:text-night-25 rounded-full'><IoEyeOutline /></button>
                        <button onClick={handleEditCategory} className='p-2 transition-all duration-300 hover:bg-blue-300 bg-night-25 text-blue-300 hover:text-night-25 rounded-full'><IoSettingsSharp /></button>
                        <button onClick={() => setModalData({
                            title: "Delete Category?",
                            description: "Are you sure you want to delete this Category?",
                            primaryButtonText: "Delete",
                            primaryButtonHandler: () => handleDeleteCategory(category?._id),
                            secondaryButtonText: "Cancel",
                            secondaryButtonHandler: () => setModalData(null)
                        })} className='p-2 transition-all duration-300 hover:bg-blue-300 bg-night-25 text-blue-300 hover:text-night-25 rounded-full'><MdOutlineDeleteOutline /></button>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default CategoryCard