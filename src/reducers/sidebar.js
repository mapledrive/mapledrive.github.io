import { createReducer } from '@reduxjs/toolkit';
import {
  fetchSidebarNews,
  fetchSidebarNewsSuccess,
  fetchSidebarNewsError,
} from 'actions';

const initialState = {
  list: [],
  isLoading: false,
};

const sidebarReducer = createReducer(initialState, {
  [fetchSidebarNews]: (state, action) => ({
    ...state,
    isLoading: true,
  }),
  [fetchSidebarNewsSuccess]: (state, action) => {
    return {
      ...state,
      list: action.payload,
      isLoading: false,
    };
  },
  [fetchSidebarNewsError]: (state, action) => ({
    ...state,
    isLoading: false,
  }),
});

export default sidebarReducer;
