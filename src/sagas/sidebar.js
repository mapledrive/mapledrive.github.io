import { call, put, takeLatest } from "redux-saga/effects";

import {
  fetchSidebarNewsSuccess,
  fetchSidebarNewsError,
} from "features/sidebar/sidebarSlice";
import * as api from "services/api/sidebar";

function* fetchSidebarNews(action) {
  try {
    const response = yield call(api.fetchSidebarApi, action.payload);
    yield put(fetchSidebarNewsSuccess(response));
  } catch (error) {
    yield put(fetchSidebarNewsError());
  }
}

export function* watchSidebarNews() {
  yield takeLatest("sidebar/fetchSidebarNews", fetchSidebarNews);
}
