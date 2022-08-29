import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { fetchNewsSuccess, fetchNewsError } from 'features/news/newsSlice';
import { fetchNewsApi } from 'features/news/newsAPI';

function* fetchNews(action) {
  try {
    const data = action.payload;
    const response = yield call(fetchNewsApi, data);
    yield delay(200);
    yield put(fetchNewsSuccess(response));
  } catch (error) {
    yield put(fetchNewsError());
  }
}

export function* watchNews() {
  yield takeLatest('news/fetchNews', fetchNews);
}
