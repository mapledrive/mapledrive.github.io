import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: false,
};

export const skeletonSlice = createSlice({
  name: 'skeleton',
  initialState,
  reducers: {
    fetchSkeleton: state => ({
      ...state,
      isLoading: true,
    }),
    fetchSkeletonSuccess: (state, action) => {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    },
    fetchSkeletonError: state => ({
      ...state,
      isLoading: false,
    }),
  },
});

export const { fetchSkeleton, fetchSkeletonSuccess, fetchSkeletonError } =
  skeletonSlice.actions;

export default skeletonSlice.reducer;
