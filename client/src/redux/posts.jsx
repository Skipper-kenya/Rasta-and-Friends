import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },

  reducers: {
    updatePosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { updatePosts } = postsSlice.actions;

export default postsSlice.reducer;
