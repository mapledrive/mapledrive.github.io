import { call, put, takeLatest, throttle, delay } from 'redux-saga/effects';

// import * as actions from 'actions/abonents';
// import * as api from 'services/api/abonents';

function* fetchMostActiveAbonents(action) {
  // try {
  //   const response = yield call(api.fetchMostActiveAbonents, action.payload);
  //   yield put(actions.fetchMostActiveAbonentsSuccess(response));
  // } catch (error) {
  //   yield put(actions.fetchMostActiveAbonentsError());
  //   message.error(DATA_FETCH_ERROR);
  // }
}

export function* watchAbonents() {
  yield takeLatest(
    'FETCH_MOST_ACTIVE_ABONENTS_REQUEST',
    fetchMostActiveAbonents,
  );
}
