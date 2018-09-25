import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SIGNIN_REQUESTED, refreshToken,
  signInStart, signInSucceeded, signInFailed,
} from '../actions';
import { BASE_URL, headers } from '../commons';

/**
 * /signin に fetch する
 * @param {*} param0 
 */
async function fetchSignIn({ username, password }) {
  // fetch
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

    // トークン更新処理をキック
    yield put(refreshToken());
  } catch (err) {
    // 失敗
    yield put(signInFailed({ error: err }));
  }
}

const sagas = [
  takeLatest(SIGNIN_REQUESTED, signIn),
];

export default sagas;
