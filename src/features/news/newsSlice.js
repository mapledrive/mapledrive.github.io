import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetchNews: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    fetchNewsSuccess: (state, action) => {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    },
    fetchNewsError: (state, action) => ({
      ...state,
      isLoading: false,
    }),
  },
});

export const { fetchNews, fetchNewsSuccess, fetchNewsError } =
  newsSlice.actions;

export default newsSlice.reducer;
