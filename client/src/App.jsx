import { Route, Routes } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VarifyOtp from "./pages/VarifyOtp"
import LoadingBar from "react-top-loading-bar"
import { useDispatch, useSelector } from "react-redux"
import { setProgress } from "./slices/loadingBarSlice"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import PrivateRoute from "./components/common/PrivateRoute"
import DashboardPageLayout from "./components/common/DashboardPageLayout"
import MyPosts from "./pages/MyPosts"
import Bookmarks from "./pages/Bookmarks"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import ViewPost from "./pages/ViewPost"
import AdminRoutes from "./components/common/AdminRoutes"
import PublicRoute from "./components/common/PublicRoute"
import CreateCategory from "./pages/CreateCategory"
import ManageCategories from "./pages/ManageCategories"
import ManageAccounts from "./pages/ManageAccounts"
import ManagePosts from "./pages/ManagePosts"

function App() {

  const dispatch = useDispatch();
  const { progress } = useSelector(state => state.loadingBar);
  const { token, refreshToken } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user);

  // console.log("access token : ", token);
  // console.log("refresh token : ", refreshToken);
  // console.log("user : ", user);

  return (
    <div className="w-full min-h-screen text-night-900 bg-night-5">
      <LoadingBar
        color="#6EA3CE"
        height={4}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />

      {/* navbar  */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="varify-otp" element={<PublicRoute><VarifyOtp /></PublicRoute>} />
        <Route path="forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path="view/:id" element={<ViewPost />} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="profile" element={<DashboardPageLayout><Profile /></DashboardPageLayout>} />
          <Route path="create" element={<DashboardPageLayout><CreatePost /></DashboardPageLayout>} />
          <Route path="edit/:postId" element={<DashboardPageLayout><UpdatePost /></DashboardPageLayout>} />
          <Route path="posts" element={<DashboardPageLayout><MyPosts /></DashboardPageLayout>} />
          <Route path="bookmarks" element={<DashboardPageLayout><Bookmarks /></DashboardPageLayout>} />
          <Route path="settings" element={<DashboardPageLayout><Settings /></DashboardPageLayout>} />
          <Route path="create-category" element={<DashboardPageLayout><CreateCategory /></DashboardPageLayout>} />
          <Route path="edit-category/:id" element={<DashboardPageLayout><CreateCategory><CreateCategory /></CreateCategory></DashboardPageLayout>} />
          <Route path="categories" element={<DashboardPageLayout><ManageCategories /></DashboardPageLayout>} />
          <Route path="manage-posts" element={<DashboardPageLayout><ManagePosts /></DashboardPageLayout>} />
          <Route path="manage-accounts" element={<DashboardPageLayout><AdminRoutes><ManageAccounts /></AdminRoutes></DashboardPageLayout>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
