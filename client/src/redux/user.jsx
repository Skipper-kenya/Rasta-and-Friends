import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    details: {},
    profile: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    updateDetails: (state, action) => {
      state.details = action.payload;
    },

    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { getUser, updateDetails, updateProfile } = userSlice.actions;
export default userSlice.reducer;
