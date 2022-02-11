import { fork, all } from 'redux-saga/effects';
import { watchAbonents } from 'sagas/abonents';
import { watchDocflows } from 'sagas/docflows';

export default function* rootSaga(){
  yield all([
    fork(watchAbonents), 
    fork(watchDocflows),
  ]);
}