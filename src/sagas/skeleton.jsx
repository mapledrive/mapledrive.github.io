import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  fetchSkeletonSuccess,
  fetchSkeletonError,
} from 'features/skeleton/skeletonSlice';
import { fetchSkeletonApi } from 'features/skeleton/skeletonAPI';

function* fetchSk() {
  try {
    const response = yield call(fetchSkeletonApi);
    yield delay(4000);
    yield put(fetchSkeletonSuccess(response));
  } catch (error) {
    yield put(fetchSkeletonError());
  }
}

export function* watchSkeleton() {
  yield takeLatest('skeleton/fetchSkeleton', fetchSk);
}
