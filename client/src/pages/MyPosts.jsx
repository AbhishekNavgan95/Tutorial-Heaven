import React, { useCallback, useEffect, useState } from 'react';
import { apiConnector } from "../services/apiConnector";
import { userEndpoints } from '../services/APIs';
import { useSelector } from "react-redux";
import PostCard from '../components/core/dashboard/myPosts/PostCard';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';
import Modal from '../components/common/Modal';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by creation date
    const { token } = useSelector((state) => state.auth);
    const [modalData, setModalData] = useState(null);

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


    return (
        <>
            <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14'>
                <div className='border-b border-blue-300 pb-3'>
                    <h4 className='text-xl text-center md:text-start font-semibold text-blue-300'>My Posts</h4>
                    <p className='text-blue-300 text-center md:text-start'>Manage your posts</p>
                </div>
                <div className='flex flex-col justify-start w-full'>
                    <div className='flex items-center justify-between gap-3 my-5'>
                        <span className='text-blue-300'>Page {currentPage} of {totalPages}</span>
                        <span className='flex gap-3 items-center'>
                            {currentPage > 1 && <Button styles={"w-max"} active action={handlePreviousPage}>Previous</Button>}
                            {currentPage < totalPages && <Button styles={"w-max"} active action={handleNextPage}>Next</Button>}
                        </span>
                    </div>
                    <div className='my-5 flex justify-center md:justify-start items-center gap-3'>
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
                                    <PostCard modalData={modalData} setModalData={setModalData} post={post} key={post._id} />
                                ))}
                            </div>
                    }
                    {
                        loading === false && posts.length === 0 && <p className='w-full min-h-[50vh] flex items-center justify-center text-blue-300'>No posts found</p>
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
