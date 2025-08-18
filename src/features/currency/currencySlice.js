import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cad: 0,
  usd: 0,
  rub: 0,
  isLoading: false,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    fetchCurrency: state => {
      state.isLoading = true;
    },
    fetchCurrencySuccess: (state, action) => {
      const { cad, usd, rub } = action.payload;
      state.cad = cad;
      state.usd = usd;
      state.rub = rub;
      state.isLoading = false;
    },
    fetchCurrencyError: state => {
      state.isLoading = false;
    },
    changeCad: (state, action) => {
      state.cad = action.payload;
    },
  },
});

export const {
  fetchCurrency,
  fetchCurrencySuccess,
  fetchCurrencyError,
  changeCad,
} = currencySlice.actions;

export default currencySlice.reducer;
