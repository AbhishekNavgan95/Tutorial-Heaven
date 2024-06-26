import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { postEndpoints, dataEndpoints } from '../services/APIs';
import VideoSection from '../components/core/ViewPost/VideoSection';
import PostCard from '../components/core/ViewPost/PostCart';
import CommentsSection from '../components/core/ViewPost/CommentsSection';
import { toast } from "react-hot-toast"

const ViewPost = () => {

    const {
        GET_POST,
        GET_POST_COMMENTS
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
    const [similarPostsTotalPages, setSimilarPostsTotalPages] = useState(0);
    const [commentsTotalPages, setCommentsTotalPages] = useState(0);
    const [commentsCurrentPage, setCommentsCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0)
        setPostId(id)
        setSimilarPosts([])
    }, [id])

    const getPosts = useCallback(async () => {
        if (postId) {
            try {
                const respone = await apiConnector("GET", `${GET_POST}/${postId}`);
                setPost(respone?.data?.data)
            } catch (e) {
                console.log("error : ", e)
                toast.error("Could't get post", {
                    style: {
                        border: "1px solid #5252B7",
                        padding: "8px 16px",
                        color: "#DFE2E2",
                        background: "#5252B7",
                    },
                    iconTheme: {
                        primary: "#5252B7",
                        secondary: "#DFE2E2",
                    },
                });
            }
        }
    }, [postId])

    const getCategoryPosts = useCallback(async () => {
        if (post.category) {
            try {
                const response = await apiConnector("GET", `${GET_ALL_CATEGORY_POSTS}/${post?.category?._id}?page=${similarPostsCurrentPage}&limit=10`);
                // console.log("response : ", response);
                setSimilarPosts((prev) => [...prev, ...response?.data?.data?.posts?.filter((elem) => elem?._id !== post?._id)])
                setSimilarPostsTotalPages(response?.data?.data?.totalPages)
            } catch (e) {
                console.log("error : ", e);
                toast.error("Could't get related posts", {
                    style: {
                        border: "1px solid #5252B7",
                        padding: "8px 16px",
                        color: "#DFE2E2",
                        background: "#5252B7",
                    },
                    iconTheme: {
                        primary: "#5252B7",
                        secondary: "#DFE2E2",
                    },
                });
            }
        }
    }, [post, similarPostsCurrentPage])

    const getPostComments = useCallback(async () => {
        if (postId) {
            try {
                const response = await apiConnector("GET", `${GET_POST_COMMENTS}/${postId}?page=${commentsCurrentPage}&limit=50`);
                // console.log("comments response : ", response)
                setComments(prev => [...prev, ...response?.data?.data?.comments])
                setCommentsTotalPages(response?.data?.data?.totalPages)
            } catch (e) {
                console.log("comments error : ", e)
            }
        }
    }, [postId, commentsCurrentPage])

    useEffect(() => {
        getPosts();
        setComments([]);
        setCommentsCurrentPage(1);
        setCommentsTotalPages(0);
    }, [postId, getPosts])

    useEffect(() => {
        getCategoryPosts();
    }, [post, getCategoryPosts])

    useEffect(() => {
        getPostComments();
    }, [postId, getPostComments])

    return (
        <div className='pt-[5rem] min-h-[calc(100vh-6rem)] px-3 relative mx-auto w-full max-w-maxContent text-night-900'>
            <div className='grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-x-5 w-full'>

                <section className='flex flex-wrap gap-3 h-max w-full'>
                    <VideoSection post={post} />
                </section>

                <section className='lg:sticky top-[4rem] h-max flex flex-col items-start gap-3 py-3 row-span-2 w-full lg:min-w-[500px] lg:max-w-[500px] '>
                    <h5 className='text-xl font-semibold border-b border-night-50 pb-3 text-wrap w-full'>Related Posts from {post?.category?.title} </h5>
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

                <section className='w-full '>
                    <CommentsSection post={post} comments={comments} setComments={setComments} commentsCurrentPage={commentsCurrentPage} setCommentsCurrentPage={setCommentsCurrentPage} commentsTotalPages={commentsTotalPages} />
                </section>
            </div>
        </div >
    )
}

export default ViewPost