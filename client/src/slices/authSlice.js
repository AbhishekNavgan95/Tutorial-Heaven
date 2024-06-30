import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  refreshToken: localStorage.getItem("refreshToken")
    ? localStorage.getItem("refreshToken")
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setTokens(state, value) {
      state.token = value.payload.accessToken;
      state.refreshToken = value.payload.refreshToken;
      localStorage.setItem("token", value.payload.accessToken);
      localStorage.setItem("refreshToken", value.payload.refreshToken);
    },
    removeTokens(state, value) {
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setSignupData, setTokens, removeTokens } = authSlice.actions;

export default authSlice.reducer;
