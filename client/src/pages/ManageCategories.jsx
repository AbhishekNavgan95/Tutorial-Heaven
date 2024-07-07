import { useDispatch } from 'react-redux'
import React, { useCallback, useEffect, useState } from 'react'
import { apiConnector } from '../services/apiConnector'
import { dataEndpoints } from '../services/APIs'
import CategoryCard from '../components/core/dashboard/ManageCategories/CategoryCard'
import Modal from '../components/common/Modal'
import { deleteCategory } from '../services/operations/categoryAPI'
import { useSelector } from 'react-redux'

const ManageCategories = () => {
    const { GET_ALL_CATEGORIES } = dataEndpoints

    const [categories, setCategories] = useState([])
    const [modalData, setModalData] = useState(null)
    const [loading, setLoading] = useState(true)
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const fetchCategories = useCallback(async () => {
        setLoading(true)
        try {
            const response = await apiConnector("GET", GET_ALL_CATEGORIES)
            console.log("response : ", response)
            setCategories(response?.data?.data)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }, [])

    const handleDeleteCategory = async (id) => {
        console.log("delete  : ", id)
        try {
            const response = await deleteCategory(id, token ,dispatch)
            console.log("response : ", response)
            if(response) {
                setCategories(categories.filter(category => category._id !== id))
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14'>
            <h4 className='text-lg lg:text-xl border-b border-blue-300 pb-3 text-center md:text-start font-semibold text-blue-300'>Manage Categories</h4>
            <div className='mt-5 w-full'>
                {
                    loading && (
                        <div className='flex flex-col gap-3'>
                                <div className='w-full min-h-[200px] bg-night-50 animate-pulse rounded-lg'></div>
                                <div className='w-full min-h-[200px] bg-night-50 animate-pulse rounded-lg'></div>
                                <div className='w-full min-h-[200px] bg-night-50 animate-pulse rounded-lg'></div>
                                <div className='w-full min-h-[200px] bg-night-50 animate-pulse rounded-lg'></div>
                                <div className='w-full min-h-[200px] bg-night-50 animate-pulse rounded-lg'></div>
                                <div className='w-full min-h-[200px] bg-night-50 animate-pulse rounded-lg'></div>
                                <div className='w-full min-h-[200px] bg-night-50 animate-pulse rounded-lg'></div>
                                <div className='w-full min-h-[200px] bg-night-50 animate-pulse rounded-lg'></div>
                        </div>
                    )
                }
                {
                    !loading && categories?.length > 0 ? (
                        <div className='flex flex-col gap-3'>
                            {
                                categories?.map((category) => (
                                    <CategoryCard handleDeleteCategory={handleDeleteCategory} setModalData={setModalData} category={category} key={category?._id} />
                                ))
                            }
                        </div>
                    ) : !loading && categories?.length === 0 && (
                        <p className='text-center'>No Categories Found</p>
                    )
                }
            </div>
            {
                modalData && <Modal modalData={modalData} />
            }
        </div >
    )
}

export default ManageCategories