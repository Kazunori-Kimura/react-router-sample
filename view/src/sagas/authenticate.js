import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SIGNIN_REQUESTED,
  signInStart, signInSucceeded, signInFailed,
} from '../actions';

const BASE_URL = 'http://localhost:8080';

/**
 * 認証
 * @param {*} param0 
 */
async function fetchSignIn({ username, password }) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      username, password
    })
  });
  const data = await response.json();

  return data;
}

/**
 * 認証
 * @param {*} action 
 */
function* signIn(action) {
  try {
    // 開始
    yield put(signInStart());
    // 認証
    const data = yield call(fetchSignIn, action.payload);
    // 成功
    yield put(signInSucceeded(data));
  } catch (err) {
    yield put(signInFailed({ error: err }));
  }
}

const sagas = [
  takeLatest(SIGNIN_REQUESTED, signIn),
];

export default sagas;
