import { useEffect, useState } from 'react'
import React from 'react'
import { dataEndpoints } from '../services/APIs'
import { apiConnector } from '../services/apiConnector'

const ManagePosts = () => {

    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchCategories = async () => {
        try {
            const response = await apiConnector("GET", dataEndpoints.GET_ALL_CATEGORIES)
            console.log("response : ", response)
            setCategories(response?.data?.data)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    console.log("categories : ", categories)

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14'>
            <h4 className='text-lg lg:text-xl border-b border-blue-300 pb-3 text-center md:text-start font-semibold text-blue-300'>Manage Posts</h4>
            <div className='mt-5 w-full'>
                
            </div>
        </div>
    )
}

export default ManagePosts