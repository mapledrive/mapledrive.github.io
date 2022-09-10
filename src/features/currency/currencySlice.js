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
    fetchCurrency: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    fetchCurrencySuccess: (state, action) => {
      console.log(action, 'action');
      const cadValue = action.payload.cad;
      const usdValue = action.payload.usd;
      const rubValue = action.payload.rub;
      return {
        ...state,
        cad: cadValue,
        usd: usdValue,
        rub: rubValue,
        isLoading: false,
      };
    },
    fetchCurrencyError: (state, action) => ({
      ...state,
      isLoading: false,
    }),
    // changeCad: (state, action) => {
    //   console.log(action.payload, 'we');
    //   return {
    //     ...state,
    //     cad: action.payload,
    //     usd: usdValue,
    //     rub: rubValue,
    //   };
    // },
  },
});

export const {
  fetchCurrency,
  fetchCurrencySuccess,
  fetchCurrencyError,
  changeCad,
} = currencySlice.actions;

export default currencySlice.reducer;
