import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  edit: false,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    resetPost: (state) => {
      state.post = null;
      state.edit = false;
    },
  },
});

export const { setPost, setEdit, resetPost } = postSlice.actions;

export default postSlice.reducer;
