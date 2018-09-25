// root saga
import { all } from 'redux-saga/effects';
import authenticateSaga from './authenticate';

export default function* rootSaga() {
  yield all([
    ...authenticateSaga,
  ]);
}
