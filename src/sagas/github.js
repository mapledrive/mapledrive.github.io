import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  fetchGithubSuccess,
  fetchGithubError,
} from 'features/github/githubSlice';
import { fetchGithubApi } from 'features/github/githubAPI';

function* fetchGithubList(action) {
  try {
    const data = action.payload;
    yield delay(4000);
    const response = yield call(fetchGithubApi, data);
    yield put(fetchGithubSuccess(response));
  } catch (error) {
    yield put(fetchGithubError());
  }
}

export function* watchGithub() {
  yield takeLatest('github/fetchGithub', fetchGithubList);
}
