import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { fetchNewsSuccess, fetchNewsError } from 'actions';
import * as api from 'services/api/news';

function* fetchNewsList(action) {
  try {
    const data = action.payload;
    const response = yield call(api.fetchNews, data);
    yield delay(200);
    yield put(fetchNewsSuccess(response));
  } catch (error) {
    yield put(fetchNewsError());
  }
}

export function* watchNews() {
  yield takeLatest('FETCH_COMPENDIUM_REQUEST', fetchNewsList);
}
