import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import news from 'features/news/newsSlice';
import sidebar from 'features/sidebar/sidebarSlice';
import authors from 'features/authors/authorsSlice';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { news, authors, sidebar },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export default store;
