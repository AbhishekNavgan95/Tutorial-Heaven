import React, { useState, useEffect, useCallback, useRef } from 'react'
import { apiConnector } from "../services/apiConnector"
import { dataEndpoints } from '../services/APIs'
import toast from "react-hot-toast"
import PostCard from '../components/core/Home/PostCard'
import Button from "../components/common/Button"
import { useDispatch } from "react-redux"
import { setProgress } from "../slices/loadingBarSlice"
import Spinner from '../components/common/Spinner'

const Home = () => {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await apiConnector("GET", dataEndpoints.GET_ALL_CATEGORIES);
      setCategories(res?.data?.data)
    } catch (e) {
      console.log("Error fetching categories : ", error);
      toast.error("Failed to load categories", {
        style: {
          border: '1px solid #5252B7',
          padding: '8px 16px',
          color: '#DFE2E2',
          background: "#5252B7"
        },
        iconTheme: {
          primary: '#5252B7',
          secondary: '#DFE2E2',
        },
      })
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    dispatch(setProgress(60))
    setLoading(true);
    const endpoint = currentCategory === "All"
      ? `${dataEndpoints.GET_ALL_POSTS}?page=${page}&limit=10`
      : `${dataEndpoints.GET_ALL_CATEGORY_POSTS}/${currentCategory}?page=${page}&limit=10`

    try {
      const response = await apiConnector("GET", endpoint);
      console.log("response : ", response);
      setPosts(response?.data?.data?.posts);
      setTotalPages(response?.data?.data?.totalPages)
    } catch (e) {
      console.log("post fetching failed : ", e);
      toast.error("Failed to load posts", {
        style: {
          border: '1px solid #5252B7',
          padding: '8px 16px',
          color: '#DFE2E2',
          background: "#5252B7"
        },
        iconTheme: {
          primary: '#5252B7',
          secondary: '#DFE2E2',
        },
      })
    } finally {
      setLoading(false);
      dispatch(setProgress(100))
    }
  }, [page, currentCategory, dispatch])

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories])

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, page, currentCategory])

  useEffect(() => {
    setPage(1);
  }, [currentCategory])

  return (
    <div className='pt-[6rem] min-h-screen relative mx-auto max-w-maxContent'>
      <div className='flex flex-wrap gap-3 px-3'>
        <CategoryButton
          isActive={currentCategory === "All"}
          onClick={() => setCurrentCategory("All")}
        >
          All
        </CategoryButton>
        {categories.map((category) => (
          <CategoryButton
            key={category._id}
            isActive={currentCategory === category._id}
            onClick={() => setCurrentCategory(category._id)}
          >
            {category.title}
          </CategoryButton>
        ))}
      </div>
      <div className='bg-night-25 -full'>
        <div className='px-3 mx-auto w-full max-w-maxContent flex items-center justify-between gap-3'>
          <span className='my-2 pt-3 text-blue-300'>
            Page: {page} of {totalPages}
          </span>
          <span className='flex items-start gap-3 py-2'>
            {page > 1 && (
              <Button styles="w-max" active action={() => setPage(page - 1)}>
                Previous
              </Button>
            )}
            {page < totalPages && (
              <Button styles="w-max" active action={() => setPage(page + 1)}>
                Next
              </Button>
            )}
          </span>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center text-night-900 items-center text-3xl py-3 min-h-[80vh]">
          <Spinner />
        </div>
      ) : (
        <div className='grid py-3 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 xl:gap-x-3 gap-y-3 xl:gap-y-3'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
      <div className='px-3 mx-auto w-full max-w-maxContent flex items-center justify-between gap-3'>
        <span className='my-2 py-3 text-blue-300'>
          Page: {page} of {totalPages}
        </span>
        <span className='flex items-start gap-3 py-2'>
          {page > 1 && (
            <Button styles="w-max" active action={() => setPage(page - 1)}>
              Previous
            </Button>
          )}
          {page < totalPages && (
            <Button styles="w-max" active action={() => setPage(page + 1)}>
              Next
            </Button>
          )}
        </span>
      </div>
    </div>
  );
};

const CategoryButton = ({ isActive, onClick, children }) => (
  <button
    className={`w-max px-4 py-1 rounded-lg border transition-all duration-300 ${isActive ? "bg-night-25 text-blue-300 border-blue-300" : "bg-blue-300 text-night-25 border-transparent hover:bg-blue-600"}`}
    onClick={onClick}
  >
    {children}
  </button>
);


export default Home;