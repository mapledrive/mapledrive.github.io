import { fork, all } from 'redux-saga/effects';
import { watchSidebarNews } from 'sagas/sidebar';
import { watchNews } from 'sagas/news';
import { watchCurrency } from 'sagas/currency';

export default function* rootSaga() {
  yield all([fork(watchSidebarNews), fork(watchNews), fork(watchCurrency)]);
}
