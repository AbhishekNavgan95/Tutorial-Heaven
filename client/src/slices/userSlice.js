import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
      localStorage.setItem("user", JSON.stringify(value.payload));
    },
    removeUser(state, value) {
      state.user = null
      localStorage.removeItem("user");
      // console.log("user removed");
    }
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
