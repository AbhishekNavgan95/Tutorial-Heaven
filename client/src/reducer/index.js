import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import loadingBarReducer from "../slices/loadingBarSlice";
import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  loadingBar: loadingBarReducer,
  user: userReducer,
});

export default rootReducer;
