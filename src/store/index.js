import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import newsReducer from 'reducers/news';
import sidebar from 'reducers/sidebar';
import authors from 'reducers/authors';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { newsReducer, authors, sidebar },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export default store;
