import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import news from 'features/news/newsSlice';
import currency from 'features/currency/currencySlice';
import sidebar from 'features/sidebar/sidebarSlice';
import authors from 'features/authors/authorsSlice';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { news, authors, currency, sidebar },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);
