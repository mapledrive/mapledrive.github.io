import { fetchNews, fetchNewsSuccess, fetchNewsError } from 'actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoading: false,
};

const newsReducer = createReducer(initialState, {
  [fetchNews]: (state, action) => ({
    ...state,
    isLoading: true,
  }),
  [fetchNewsSuccess]: (state, action) => {
    return {
      ...state,
      list: action.payload,
      isLoading: false,
    };
  },
  [fetchNewsError]: (state, action) => ({
    ...state,
    isLoading: false,
  }),
});

export default newsReducer;
