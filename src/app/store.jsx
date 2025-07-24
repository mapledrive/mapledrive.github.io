import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import news from 'features/news/newsSlice';
import currency from 'features/currency/currencySlice';
import skeleton from 'features/skeleton/skeletonSlice';
import sidebar from 'features/sidebar/sidebarSlice';
import github from 'features/github/githubSlice';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { news, github, currency, skeleton, sidebar },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);
