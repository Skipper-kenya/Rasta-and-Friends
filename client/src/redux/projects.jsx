import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },

  reducers: {
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },
    getProjects: (state) => {
      return state.projects;
    },
  },
});

export const { getProjects, updateProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
