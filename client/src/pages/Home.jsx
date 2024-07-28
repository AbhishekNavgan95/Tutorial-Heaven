import React, { useState, useEffect, useCallback, useRef } from 'react'
import { apiConnector } from "../services/apiConnector"
import { dataEndpoints } from '../services/APIs'
import toast from "react-hot-toast"
import PostCard from '../components/core/Home/PostCard'
import Button from "../components/common/Button"
import { useDispatch } from "react-redux"
import { setProgress } from "../slices/loadingBarSlice"
import HomeScreenLoader from '../components/core/Home/HomeScreenLoader'
import { useSearchParams } from 'react-router-dom'
import { getCloudinaryUrl } from '../utils/getCloudinaryUrl'
import { IoIosArrowForward } from "react-icons/io";

const Home = () => {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState(searchParams.get('category') || 'All');
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [headingImage, setHeadingImage] = useState("");

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "All") {
      setSearchParams({});
      setCurrentCategory("All");
      return;
    }
    setCurrentCategory(selectedCategory);
    setSearchParams({ category: selectedCategory });
  }

  const fetchCategories = useCallback(async () => {
    setLoading(true);
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
    setLoading(true);
    dispatch(setProgress(60))
    const endpoint = currentCategory === "All"
      ? `${dataEndpoints.GET_ALL_POSTS}?page=${page}&limit=30`
      : `${dataEndpoints.GET_ALL_CATEGORY_POSTS}/${currentCategory}?page=${page}&limit=10`

    try {
      const response = await apiConnector("GET", endpoint);
      console.log("response : ", response);
      setPosts(response?.data?.data?.posts);
      setTotalPages(response?.data?.data?.totalPages)
    } catch (e) {
      console.log("post fetching failed : ", e);
      toast.error(e.response?.data?.message, {
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
    window.scrollTo(0, 0)
  }, [fetchPosts, page, currentCategory, searchParams])

  useEffect(() => {
    setPage(1);
  }, [currentCategory, searchParams])

  useEffect(() => {
    if (currentCategory) {
      const category = categories?.find((cat) => cat._id === currentCategory);
      if (category?.image?.url) {
        setHeadingImage(() => getCloudinaryUrl(category?.image?.url, 800, 400));
      } else {
        setHeadingImage("")
      }
    }
  }, [currentCategory, categories]);

  useEffect(() => {
    if (!searchParams.get("category")) {
      setCurrentCategory("All");
    }
  }, [searchParams])

  return (
    <div className='pt-[4rem] md:pt-[6rem] min-h-screen relative mx-auto max-w-maxContent'>
      <div className='flex justify-between items-center gap-3 px-3 overflow-auto'>

        <div className='mx-auto w-full max-w-maxContent flex items-center justify-between gap-3'>
          <span className=''>
            Page: {page} of {totalPages}
          </span>
        </div>

        <select
          className='bg-night-25 cursor-pointer text-sm md:text-md rounded-lg outline-none px-1 text-night-900'
          value={currentCategory}
          onChange={handleCategoryChange}
          name="category"
          id="category"
        >
          <option value="All">All</option>
          {
            categories?.map((category) => (
              category?.posts?.length > 0 &&
              <option key={category?._id} value={category?._id}>{category.title}</option>
            ))
          }
        </select>
      </div>

      {
        headingImage &&
        <section className='w-full rounded-lg overflow-hidden px-3 my-3'>
          <img src={currentCategory === "All" ? "" : headingImage} alt="" className='w-full h-[100px] md:h-[150px] lg:h-[200px] object-cover rounded-lg' />
        </section>
      }

      {loading ? (
        <div className="flex justify-center text-night-900 items-center text-3xl py-3 min-h-[80vh]">
          <HomeScreenLoader />
        </div>
      ) : !loading && posts?.length === 0 ? (
        <div className="flex justify-center text-blue-300 items-center text-3xl py-3 min-h-[60vh]">
          No posts found
        </div>
      ) : (
        <div className='px-3 grid py-3 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      <div className='px-3 mx-auto w-full max-w-maxContent flex items-center justify-between gap-3'>
        <span className='flex items-center justify-between gap-3 w-full py-3'>
          <span>
            {page > 1 && (
              <Button styles="w-max rotate-180" active action={() => setPage(page - 1)}>
                <IoIosArrowForward />
              </Button>
            )}
          </span>
          <span className=''>
            Page: {page} of {totalPages}
          </span>
          <span>
            {page < totalPages && (
              <Button styles="w-max" active action={() => setPage(page + 1)}>
                <IoIosArrowForward />
              </Button>
            )}
          </span>
        </span>
      </div>
    </div>
  );
};


export default Home;