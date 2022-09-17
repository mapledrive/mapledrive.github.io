import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  fetchSidebarNewsSuccess,
  fetchSidebarNewsError,
} from 'features/sidebar/sidebarSlice';
import { fetchSidebarApi } from 'features/sidebar/sidebarAPI';

function* fetchSidebarNews(action) {
  try {
    const response = yield call(fetchSidebarApi, action.payload);
    yield delay(2000);
    yield put(fetchSidebarNewsSuccess(response));
  } catch (error) {
    // yield delay(2000);
    yield put(fetchSidebarNewsError(response_failure));
  }
}

export function* watchSidebarNews() {
  yield takeLatest('sidebar/fetchSidebarNews', fetchSidebarNews);
}

const response_failure = [
  {
    title: 'Startup develops EV battery that can last for 20 years',
    content:
      'A Harvard-backed startup has developed a battery suitable for electric vehicles that is capable of fully charging in three minutes and can last for 20 years. Based on lithium-metal technology, the battery can charge over 10,000 cycles in a lifetime. Adden Energy has received $5.15 million in funding to further advance the technology and commercialise the battery. ',
  },
];
