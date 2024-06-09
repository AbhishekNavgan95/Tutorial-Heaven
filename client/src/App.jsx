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

function App() {

  const dispatch = useDispatch();
  const { progress } = useSelector(state => state.loadingBar);
  const { token } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user);
  console.log("token : ", token);
  console.log("user : ", user);

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/varify-otp" element={<VarifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
  )
}

export default App
