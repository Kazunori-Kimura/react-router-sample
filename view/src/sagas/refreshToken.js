import {
  call, put, take, select, fork, cancel,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  REFRESH_TOKEN, SIGNOUT,
  refreshTokenStart, refreshTokenSucceeded, refreshTokenFailed,
} from '../actions';
import { BASE_URL, headers } from '../commons';

// fetch
async function fetchVerify(token) {
  const response = await fetch(`${BASE_URL}/verify`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      token,
    }),
  });
  const data = await response.json();

  return data;
}

// fetchを繰り返す
function* refreshToken() {
  while (true) {
    try {
      // 待機
      yield call(delay, 60000); // 1分待機

      // 開始
      yield put(refreshTokenStart());
      // tokenを取得
      const { token } = yield select(state => state.authenticate);
      // fetchする
      const data = yield call(fetchVerify, token);
      // 成功
      yield put(refreshTokenSucceeded(data));
    } catch (err) {
      // 失敗
      yield put(refreshTokenFailed(err));
    }
  }
}

// キャンセルを受け付ける
function* handleRefreshToken() {
  while (yield take(REFRESH_TOKEN)) {
    // トークン更新を開始する
    const task = yield fork(refreshToken);

    // サインアウトされたらトークンの更新をキャンセルする
    yield take(SIGNOUT);
    yield cancel(task);
  }
}

const sagas = [
  handleRefreshToken(),
];

export default sagas;
