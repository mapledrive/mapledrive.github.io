import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import news from 'features/news/newsSlice';
import currency from 'features/currency/currencySlice';
import skeleton from 'features/skeleton/skeletonSlice';
import sidebar from 'features/sidebar/sidebarSlice';
import github from 'features/github/githubSlice';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    news,
    currency,
    sidebar,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

// Типы для работы с хранилищем
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Хуки с правильными типами
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
