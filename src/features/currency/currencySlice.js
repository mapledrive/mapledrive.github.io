import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoading: false,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    fetchCurrency: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    fetchCurrencySuccess: (state, action) => {
      const objectValues = Object.values(action.payload);
      return {
        ...state,
        list: objectValues,
        isLoading: false,
      };
    },
    fetchCurrencyError: (state, action) => ({
      ...state,
      isLoading: false,
    }),
  },
});

export const { fetchCurrency, fetchCurrencySuccess, fetchCurrencyError } =
  currencySlice.actions;

export default currencySlice.reducer;
