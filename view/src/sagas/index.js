// root saga
import { all } from 'redux-saga/effects';
import authenticateSaga from './authenticate';
import refreshSaga from './refreshToken';

export default function* rootSaga() {
  yield all([
    ...authenticateSaga,
    ...refreshSaga,
  ]);
}
