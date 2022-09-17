import { createSlice, createAction } from '@reduxjs/toolkit';

const incrementBy = createAction('incrementBy');

const initialState = {
  list: [],
  isLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
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
  extraReducers: {
    [incrementBy]: (state, action) => ({
      ...state,
      isLoading: false,
    }),
    'some/other/action': (state, action) => {},
  },
});

export const { fetchNews, fetchNewsSuccess, fetchNewsError } =
  newsSlice.actions;

export default newsSlice.reducer;

// Как реагировать на приблудный акшен. не родной для этого слайса
// Наверно типа чтобы изменить этот кусок состояния
// One of the key concepts of Redux is that each slice reducer "owns" its slice of state,
// and that many slice reducers can independently respond to the same action type.
// extraReducers allows createSlice to respond to other action types besides the types it has generated.

// As case reducers specified with extraReducers are meant to reference "external" actions,
// they will not have actions generated in slice.actions.

// As with reducers, these case reducers will also be passed to createReducer and may "mutate" their state safely.

// If two fields from reducers and extraReducers happen to end up with the same action type string,
// the function from reducers will be used to handle that action type.

// Like reducers, extraReducers can be an object containing Redux case reducer functions.
// However, the keys should be other Redux string action type constants, and createSlice will not
// auto-generate action types or action creators for reducers included in this parameter.

// Action creators that were generated using createAction may be used directly as the keys here, using computed property syntax.
