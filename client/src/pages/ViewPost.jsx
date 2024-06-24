import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { postEndpoints, dataEndpoints } from '../services/APIs';
import VideoSection from '../components/core/ViewPost/VideoSection';
import PostCard from '../components/core/ViewPost/PostCart';

const ViewPost = () => {

    const {
        GET_POST,
    } = postEndpoints

    const {
        GET_ALL_CATEGORY_POSTS
    } = dataEndpoints

    // get post id from url
    const { id } = useParams()
    const [postId, setPostId] = useState("");
    const [post, setPost] = useState([])
    const [similarPosts, setSimilarPosts] = useState([])
    const [comments, setComments] = useState([])
    const [similarPostsCurrentPage, setSimilarPostsCurrentPage] = useState(1);
    const [similarPostsTotalPages, setSimilarPostsTotalPages] = useState(1);

    useEffect(() => {
        setPostId(id)
        setSimilarPosts([])
    }, [id])

    const getPosts = useCallback(async () => {
        if (postId) {
            console.log("postId : ", postId)
            const respone = await apiConnector("GET", `${GET_POST}/${postId}`);
            console.log("current post: ", respone);
            setPost(respone.data.data)
        }
    }, [postId])

    const getCategoryPosts = useCallback(async () => {
        if (post.category) {
            const response = await apiConnector("GET", `${GET_ALL_CATEGORY_POSTS}/${post?.category?._id}?page=${similarPostsCurrentPage}&limit=10`);
            console.log("category posts: ", response);
            setSimilarPosts((prev) => [...prev, ...response.data.data.posts.filter((elem) => elem?._id !== post?._id)])
            setSimilarPostsTotalPages(response.data.data.totalPages)
        }
    }, [post, similarPostsCurrentPage])

    useEffect(() => {
        getPosts();
    }, [postId, getPosts])

    useEffect(() => {
        getCategoryPosts();
    }, [post, getCategoryPosts])

    return (
        <div className='pt-[5rem] min-h-screen px-3 relative mx-auto w-full max-w-maxContent text-night-900'>
            <div className='grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-x-5 w-full'>

                <section className='flex flex-wrap gap-3 h-max'>
                    <VideoSection post={post} />
                </section>

                <section className='flex flex-col items-start gap-3 py-3 row-span-2 w-full'>
                    <h2 className='text-sm w-max px-5 py-2 rounded-lg border bg-blue-300 text-night-25'>Similar from {post?.category?.title}</h2>
                    {
                        similarPosts.length > 0 && similarPosts.map((post) => (
                            <PostCard key={post?._id} post={post} />
                        ))
                    }
                    {
                        similarPostsCurrentPage < similarPostsTotalPages && (
                            <button
                                onClick={
                                    () => similarPostsCurrentPage < similarPostsTotalPages
                                        ? setSimilarPostsCurrentPage(similarPostsCurrentPage + 1)
                                        : null
                                }
                            >Load more</button>
                        )
                    }
                    {
                        similarPosts.length === 0 && (
                            <p className='px-3 w-full text-center self-center'>No similar posts found</p>
                        )
                    }
                </section>

                <section>
                    comments
                </section>
            </div>
        </div >
    )
}

export default ViewPost