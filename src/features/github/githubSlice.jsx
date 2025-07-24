import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoading: false,
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    fetchGithub: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    fetchGithubSuccess: (state, action) => {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    },
    fetchGithubError: (state, action) => ({
      ...state,
      list: action.payload,
      isLoading: false,
    }),
  },
});

export const { fetchGithub, fetchGithubSuccess, fetchGithubError } =
  githubSlice.actions;

export default githubSlice.reducer;
