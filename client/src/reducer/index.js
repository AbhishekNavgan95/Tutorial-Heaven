import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import loadingBarReducer from "../slices/loadingBarSlice";
import userReducer from "../slices/userSlice";
import postReducer from "../slices/postSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  loadingBar: loadingBarReducer,
  user: userReducer,
  post: postReducer
});

export default rootReducer;
