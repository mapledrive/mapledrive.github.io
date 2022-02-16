import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { fetchNewsSuccess, fetchNewsError } from 'actions';
import * as api from 'services/api/news';

function* fetchNews(action) {
  try {
    const data = action.payload;
    const response = yield call(api.fetchNewsApi, data);
    yield delay(200);
    yield put(fetchNewsSuccess(response));
  } catch (error) {
    yield put(fetchNewsError());
  }
}

export function* watchNews() {
  yield takeLatest('FETCH_NEWS_REQUEST', fetchNews);
}
