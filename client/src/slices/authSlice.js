import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
      localStorage.setItem("token", value.payload);
    },
    removeToken(state, value) {
      state.token = null;
      localStorage.removeItem("token")
      // console.log("token removed");
    }
  },
});

export const { setSignupData, setToken,removeToken } = authSlice.actions;

export default authSlice.reducer;
