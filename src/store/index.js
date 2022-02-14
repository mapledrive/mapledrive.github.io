import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import newsReducer from 'reducers/news';
import authors from 'reducers/authors';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { newsReducer, authors },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export default store;
