import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import news from 'reducers/news';
import authors from 'reducers/authors';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { news, authors },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
