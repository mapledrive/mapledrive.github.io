import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoading: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    fetchSidebarNews: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    fetchSidebarNewsSuccess: (state, action) => {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    },
    fetchSidebarNewsError: (state, action) => ({
      ...state,
      list: action.payload,
      isLoading: false,
    }),
  },
});

export const {
  fetchSidebarNews,
  fetchSidebarNewsSuccess,
  fetchSidebarNewsError,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
