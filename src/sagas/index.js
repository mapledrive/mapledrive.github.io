import { fork, all } from 'redux-saga/effects';
import { watchSidebarNews } from 'sagas/sidebar';
import { watchNews } from 'sagas/news';

export default function* rootSaga() {
  yield all([fork(watchSidebarNews), fork(watchNews)]);
}
