import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { DATA_FETCH_ERROR, DOCFLOW_NOT_FOUND } from 'constants/messages';
import * as actions from 'actions/monitoring';
import * as api from 'services/api/docflows';

function* fetchDocflows(action) {
  try {
    const data = action.payload;
    const response = yield call(api.fetchDocflows, data);
    yield delay(200);
    yield put(actions.fetchDocflowsSuccess(response));
  } catch (error) {
    yield put(actions.fetchDocflowsError());
  }
}

export function* watchDocflows() {
  yield takeLatest('FETCH_DOCFLOWS_REQUEST', fetchDocflows);
}
