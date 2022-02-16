import { call, put, takeLatest, throttle, delay } from 'redux-saga/effects';

import { fetchSidebarNewsSuccess, fetchSidebarNewsError } from 'actions';
import * as api from 'services/api/sidebar';

function* fetchSidebarNews(action) {
  try {
    const response = yield call(api.fetchSidebarApi, action.payload);
    yield put(fetchSidebarNewsSuccess(response));
  } catch (error) {
    yield put(fetchSidebarNewsError());
  }
}

export function* watchSidebarNews() {
  yield takeLatest('FETCH_SIDEBAR_REQUEST', fetchSidebarNews);
}
