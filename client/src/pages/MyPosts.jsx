import React, { useCallback, useEffect, useState } from 'react';
import { apiConnector } from "../services/apiConnector";
import { userEndpoints } from '../services/APIs';
import { useDispatch, useSelector } from "react-redux";
import PostCard from '../components/core/dashboard/myPosts/PostCard';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';
import Modal from '../components/common/Modal';
import { deletePost } from '../services/operations/postAPI';
import { changePostStatus } from '../services/operations/userAPI';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/common/ActionButton';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by creation date
    const { token } = useSelector((state) => state.auth);
    const [modalData, setModalData] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const fetchPosts = useCallback(async (page, sort) => {
        setLoading(true);
        try {
            const res = await apiConnector(
                "GET",
                `${userEndpoints.GET_ALL_USER_POSTS}?page=${page}&limit=10&sortBy=${sort}`,
                null,
                { Authorization: `Bearer ${token}` }
            );

            // console.log("Res: ", res);
            setPosts(res.data?.data?.posts);
            setTotalPages(res.data?.data?.totalPages);
        } catch (e) {
            console.log("error fetching user posts : ", e);
            setPosts([]);
            setTotalPages(0);
            toast("could't get posts", {
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
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchPosts(currentPage, sortBy);
        window.scrollTo(0, 0)
    }, [currentPage, sortBy, fetchPosts]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleDeletePost = async (postId) => {
        const response = await deletePost(postId, dispatch, token);
        if (response) {
            console.log("post deleted ")
            setPosts(posts.filter((post) => post._id !== postId))
        }
    }

    const handleChangePostStatus = async (status, postId) => {

        // console.log("status : ", status);
        const response = await changePostStatus(status, token, postId, dispatch);
        if (response) {
            // console.log("post : ", posts);
            setPosts(posts.map((post) => {
                if (post._id === postId) {
                    post.status = status;
                }
                return post;
            }))
        }
    }

    return (
        <>
            <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14'>
                <h4 className='text-lg lg:text-xl border-b border-blue-300 text-center md:text-start pb-3 font-semibold text-blue-300'>My Videos</h4>
                <div className='flex flex-col justify-start w-full text-sm sm:text-base'>
                    <div className='flex items-center justify-between gap-3 my-5'>
                        <span className='text-blue-300'>Page {currentPage} of {totalPages}</span>
                        <span className='flex gap-3 items-center'>
                            {currentPage > 1 && <Button styles={"w-max"} active action={handlePreviousPage}>Previous</Button>}
                            {currentPage < totalPages && <Button styles={"w-max"} active action={handleNextPage}>Next</Button>}
                        </span>
                    </div>
                    <div className='mb-5 flex justify-center md:justify-start items-center gap-3 text-xs sm:text-base'>
                        <span className='text-blue-300 font-semibold'>Sort By: </span>
                        <span className='flex gap-7 rounded-full py-1 border border-blue-300 relative px-3 overflow-hidden '>
                            <button onClick={() => setSortBy("createdAt")} className={`relative z-[2] transition-all duration-300  ${sortBy === "createdAt" ? "text-night-25" : "text-blue-300"}`}>Created At</button>
                            <button onClick={() => setSortBy("name")} className={`relative z-[2] transition-all duration-300   ${sortBy === "name" ? "text-night-25" : "text-blue-300"}`}>Name</button>
                            <span className={`inset-0 rounded-full z-[1] bg-blue-300 absolute transition-all duration-300  ${sortBy === "createdAt" ? "translate-x-[-38%]" : "translate-x-[59%]"}`}></span>
                        </span>
                    </div>
                    {
                        loading
                            ? <span className='w-full min-h-[50vh] flex items-center justify-center'>
                                <Spinner />
                            </span>
                            : <div className='grid xl:grid-cols-2 gap-5'>
                                {posts.map(post => (
                                    <PostCard handleChangePostStatus={handleChangePostStatus} handleDeletePost={handleDeletePost} modalData={modalData} setModalData={setModalData} post={post} key={post._id} />
                                ))}
                            </div>
                    }
                    {
                        loading === false && posts.length === 0 && (
                            <div className='w-full min-h-[50vh] flex flex-col gap-3 items-center justify-center'>
                                <h2 className='text-lg text-blue-300 font-semibold'>No Posts Found</h2>
                                <ActionButton to={"/dashboard/create"} active> Create New Video</ActionButton>
                            </div>)
                    }
                </div>
            </div>
            {
                modalData && <Modal modalData={modalData} />
            }
        </>
    );
};

export default MyPosts;
