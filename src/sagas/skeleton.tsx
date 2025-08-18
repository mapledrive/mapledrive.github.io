import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  fetchSkeletonSuccess,
  fetchSkeletonError,
} from 'features/skeleton/skeletonSlice';
import { fetchSkeletonApi } from 'features/skeleton/skeletonAPI';
import type { SagaIterator } from 'redux-saga';

// Type for your API response (replace with actual structure)
interface SkeletonApiResponse {
  // Define the structure of your API response here
  data: any;
}

function* fetchSk(): SagaIterator {
  try {
    const response: SkeletonApiResponse = yield call(fetchSkeletonApi);
    yield delay(4000);
    yield put(fetchSkeletonSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchSkeletonError(error.message));
    } else {
      yield put(fetchSkeletonError('Unknown error occurred'));
    }
  }
}

export function* watchSkeleton(): SagaIterator {
  yield takeLatest('skeleton/fetchSkeleton', fetchSk);
}
