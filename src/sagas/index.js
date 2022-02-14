import { fork, all } from 'redux-saga/effects';
import { watchAbonents } from 'sagas/abonents';
import { watchNews } from 'sagas/news';

export default function* rootSaga() {
  yield all([fork(watchAbonents), fork(watchNews)]);
}
