import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchSidebarNewsSuccess,
  fetchSidebarNewsError,
} from 'features/sidebar/sidebarSlice';
import { fetchSidebarApi } from 'features/sidebar/sidebarAPI';

function* fetchSidebarNews(action) {
  try {
    const response = yield call(fetchSidebarApi, action.payload);
    yield put(fetchSidebarNewsSuccess(response));
  } catch (error) {
    yield put(fetchSidebarNewsError());
  }
}

export function* watchSidebarNews() {
  yield takeLatest('sidebar/fetchSidebarNews', fetchSidebarNews);
}
