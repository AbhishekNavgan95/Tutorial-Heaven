import { toast } from 'react-hot-toast';
import React, { useState, useCallback, useEffect } from 'react'
import { userEndpoints } from '../services/APIs'
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/apiConnector'
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import Post from '../components/core/dashboard/Bookmarks/Post';

const Bookmarks = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const { token } = useSelector((state) => state.auth);

    const fetchSavedPosts = useCallback(async (page, sort) => {
        setLoading(true);
        try {
            const res = await apiConnector(
                "GET",
                `${userEndpoints.GET_USER_SAVED_POSTS}?page=${page}&limit=10&sortBy=${sort}`,
                null,
                { Authorization: `Bearer ${token}` }
            );

            setPosts(res.data?.data?.savedPosts);
            setTotalPages(res.data?.data?.totalPages);
        } catch (error) {
            console.log("Error fetching categories : ", error);
            toast("could't get saved posts", {
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

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    }

    useEffect(() => {
        fetchSavedPosts(currentPage, sortBy);
        window.scrollTo(0, 0)
    }, [currentPage, sortBy, fetchSavedPosts]);

    return (
        <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14'>
            <h4 className='text-lg lg:text-xl border-b border-blue-300 text-center md:text-start pb-3 font-semibold text-blue-300'>Bookmarks</h4>
            <div className='mt-5'>
                <div className='flex items-center justify-between gap-3 my-5 text-sm sm:text-base'>
                    <span className='text-blue-300'>Page {currentPage} of {totalPages}</span>
                    <span className='flex gap-3 items-center'>
                        {currentPage > 1 && <Button styles={"w-max"} active action={handlePreviousPage}>Previous</Button>}
                        {currentPage < totalPages && <Button styles={"w-max"} active action={handleNextPage}>Next</Button>}
                    </span>
                </div>
                <div className='my-5 flex items-center justify-center md:justify-start gap-3 text-xs sm:text-base'>
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
                        : <div className='flex flex-col gap-5'>
                            {posts.map(post => (
                                <Post key={post?._id} post={post} />
                            ))}
                        </div>
                }
                {
                    loading === false && posts.length === 0 && <p className='w-full min-h-[50vh] flex items-center justify-center text-blue-300'>No posts found</p>
                }
            </div>
        </div>
    )
}

export default Bookmarks