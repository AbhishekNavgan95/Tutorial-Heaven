import { useState } from 'react'
import React, { useEffect } from 'react'
import { dataEndpoints } from '../../../../services/APIs'
import { apiConnector } from '../../../../services/apiConnector'
import PostCard from '../myPosts/PostCard'
import Spinner from '@/components/common/Spinner'
import { deletePost } from '@/services/operations/postAPI'
import { useDispatch, useSelector } from 'react-redux'

const CategoryPosts = ({ category, setModalData }) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const fetchCategoryPosts = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("GET", `${dataEndpoints.GET_CATEGORY_POSTS}/${category._id}`)
            setPosts(response?.data?.data)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const handleDeletePost = async (postId) => {
        // console.log("delete post");
        const response = await deletePost(postId, dispatch, token);
        if (response) {
            console.log("post deleted ")
            setPosts(posts.filter((post) => post._id !== postId))
        }
    }

    useEffect(() => {
        fetchCategoryPosts();
    }, [])

    return (
        <div>
            {
                loading
                    ? <div className='flex justify-center items-center py-5'><Spinner /></div>
                    : !loading && posts.length === 0
                        ? <p className='flex justify-center items-center py-5'>No videos found</p>
                        : (
                            <div className='grid xl:grid-cols-2 gap-5'>
                                {
                                    posts?.map(post => (
                                        <div key={post._id}>
                                            <PostCard setModalData={setModalData} handleDeletePost={() => handleDeletePost(post._id)} post={post} />
                                        </div>
                                    ))
                                }
                            </div>
                        )
            }
        </div>
    )
}

export default CategoryPosts