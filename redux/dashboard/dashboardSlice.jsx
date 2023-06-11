import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getPosts: (state, { payload }) => ({
      ...state,
      posts: payload,
    }),
  },
});

export const dashboardReducer = dashboardSlice.reducer;

export const { getPosts } = dashboardSlice.actions;
