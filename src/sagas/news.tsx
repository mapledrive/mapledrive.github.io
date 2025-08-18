// import { call, put, takeLatest, delay } from 'redux-saga/effects';
// import type { SagaIterator } from 'redux-saga';
// import { fetchNewsSuccess, fetchNewsError } from 'features/news/newsSlice';
// //import { fetchNewsApi } from 'features/news/newsAPI';

// // First, define types for your API response and action payload
// interface NewsApiResponse {
//   // Define the structure of your news API response
//   // Example:
//   id: string;
//   title: string;
//   content: string;
//   // ... other fields
// }

// interface FetchNewsAction {
//   type: string;
//   payload: {
//     // Define the structure of your action payload
//     // Example:
//     category?: string;
//     page?: number;
//     // ... other parameters
//   };
// }

// function* fetchNews(action: FetchNewsAction): SagaIterator {
//   try {
//     //const { payload } = action;
//     //const response: NewsApiResponse[] = yield call(fetchNewsApi, payload);
//     //yield delay(200);
//     //yield put(fetchNewsSuccess(response));
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : 'Unknown error occurred';
//     yield put(fetchNewsError(errorMessage));
//   }
// }

// export function* watchNews(): SagaIterator {
//   yield takeLatest('news/fetchNews', fetchNews);
// }
