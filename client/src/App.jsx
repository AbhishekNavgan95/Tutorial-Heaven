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

function App() {

  const dispatch = useDispatch();
  const { progress } = useSelector(state => state.loadingBar);
  const { token, refreshToken } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user);

  // console.log("access token : ", token);
  // console.log("refresh token : ", refreshToken);
  // console.log("user : ", user);

  return (
    <div className="w-full min-h-screen text-night-900 bg-night-25">
      <LoadingBar
        color="#5252B7"
        height={4}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />

      {/* navbar  */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="varify-otp" element={<VarifyOtp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="view/:id" element={<ViewPost />} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="profile" element={<DashboardPageLayout><Profile /></DashboardPageLayout>} />
          <Route path="create" element={<DashboardPageLayout><CreatePost /></DashboardPageLayout>} />
          <Route path="edit/:postId" element={<DashboardPageLayout><UpdatePost /></DashboardPageLayout>} />
          <Route path="posts" element={<DashboardPageLayout><MyPosts /></DashboardPageLayout>} />
          <Route path="bookmarks" element={<DashboardPageLayout><Bookmarks /></DashboardPageLayout>} />
          <Route path="settings" element={<DashboardPageLayout><Settings /></DashboardPageLayout>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
