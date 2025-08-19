import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import news from 'features/news/newsSlice';
import currency from 'features/currency/currencySlice';
import sidebar from 'features/sidebar/sidebarSlice';
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
