import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  fetchCurrencySuccess,
  fetchCurrencyError,
} from 'features/currency/currencySlice';
import { fetchCurrencyApi } from 'features/currency/currencyAPI';

function* fetchCurrency(action) {
  try {
    const data = action.payload;
    const response = yield call(fetchCurrencyApi, data);
    yield delay(200);
    yield put(fetchCurrencySuccess(response));
  } catch (error) {
    yield put(fetchCurrencyError());
  }
}

export function* watchCurrency() {
  yield takeLatest('currency/fetchCurrency', fetchCurrency);
}
