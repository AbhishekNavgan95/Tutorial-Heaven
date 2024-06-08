import React, { useState, useEffect, useCallback, useRef } from 'react'
import { apiConnector } from "../services/apiConnector"
import { dataEndpoints } from '../services/APIs'
import toast from "react-hot-toast"
import PostCard from '../components/core/Home/PostCard'
import Button from "../components/common/Button"
import { useDispatch } from "react-redux"
import { setProgress } from "../slices/loadingBarSlice"

const Home = () => {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await apiConnector("GET", dataEndpoints.GET_ALL_CATEGORIES);
      setCategories(res?.data?.data)
    } catch (e) {
      console.log("Error fetching categories : ", error);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    dispatch(setProgress(60))
    const endpoint = currentCategory === "All"
      ? `${dataEndpoints.GET_ALL_POSTS}?page=${page}&limit=5`
      : `${dataEndpoints.GET_ALL_CATEGORY_POSTS}/${currentCategory}?page=${page}&limit=5`

    try {
      const response = await apiConnector("GET", endpoint);
      console.log("response : ", response);
      setPosts(response?.data?.data?.posts);
      setTotalPages(response?.data?.data?.totalPages)
    } catch (e) {
      console.log("post fetching failed : ", e);
    }

    dispatch(setProgress(100))
  }, [page, currentCategory])

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories])

  useEffect(() => {
    fetchPosts();
  }, [page, currentCategory])

  useEffect(() => {
    setPage(1);
  }, [currentCategory])

  return (
    <>
      <div className='pt-[6rem] min-h-screen relative mx-auto max-w-maxContent'>
        <div className='flex flex-wrap gap-3 px-3'>
          <span
            className={`px-4 py-2 shadow-sm shadow-night-600 rounded-lg cursor-pointer text-night-5 ${currentCategory === "All" ? "bg-blue-500 shadow-md" : "bg-blue-300 "} transition-all duration-300`}
            onClick={() => setCurrentCategory("All")}
          >
            All
          </span>
          {
            categories.map((category, index) => (
              <span
                key={index}
                className={`px-4 py-2  shadow-sm shadow-night-600 rounded-lg cursor-pointer text-night-5 ${currentCategory === category._id ? "bg-blue-500 shadow-md" : "bg-blue-300 "} transition-all duration-300`}
                onClick={() => setCurrentCategory(category._id)}
              >
                {category.title}
              </span>
            ))
          }
        </div>
        <div className='grid py-3 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 xl:gap-x-3 gap-y-3 xl:gap-y-5'>
          {
            posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))
          }
        </div>
      </div>
      <div className='bg-night-25 fixed bottom-0 w-full'>
        <div className=' px-3 mx-auto w-full max-w-maxContent flex items-center justify-between gap-3 '>
          <span>
            Page : <span className='font-bold text-blue-300'>{page}</span> of <span className='font-bold text-blue-300'>{totalPages}</span>
          </span>
          <span className='flex items-start gap-3 py-2'>
            {
              page > 1 && (<Button styles={"w-max"} active action={() => setPage(page - 1)}>Prev</Button>)
            }
            {
              page < totalPages && (<Button styles={"w-max"} action={() => setPage(page + 1)}>Next</Button>)
            }
          </span>
        </div>
      </div>
    </>
  )
}

export default Home