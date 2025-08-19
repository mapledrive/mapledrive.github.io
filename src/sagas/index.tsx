import { fork, all } from 'redux-saga/effects';
import { watchSidebarNews } from 'features/sidebar/sidebarSaga';
import { watchCurrency } from 'sagas/currency';
import { watchSkeleton } from 'sagas/skeleton';
import { watchGithub } from 'sagas/github';

export default function* rootSaga() {
  yield all([
    fork(watchSidebarNews),
    fork(watchCurrency),
    fork(watchSkeleton),
    fork(watchGithub),
  ]);
}
