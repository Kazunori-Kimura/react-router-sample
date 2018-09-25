import {
  call, put, take, select, fork, cancel, join,
  takeLatest,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  REFRESH_TOKEN, REFRESH_TOKEN_REQUESTED, SIGNOUT,
  refreshToken,
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

/**
 * fetchを呼び出す
 */
function* verifyToken(action) {
  try {
    // storeから取得
    const state = yield select(state => state.authenticate);

    // 開始
    yield put(refreshTokenStart());
    // tokenを取得
    let { token } = action.payload;
    const valid = Boolean(token);
    if (!valid) {
      token = state.token;
    }

    // fetchする
    const data = yield call(fetchVerify, token);
    // 成功
    yield put(refreshTokenSucceeded(data));

    // localStorageにtokenをセット
    localStorage.setItem('mytoken', JSON.stringify(data));

    // 定期実行してる？
    if (!state.periodic) {
      // トークン定期更新処理をキック
      yield put(refreshToken());
    }
  } catch (err) {
    // 失敗
    yield put(refreshTokenFailed(err));
  }
}

/**
 * fetchを繰り返す
 */
function* refreshTokenTask() {
  while (true) {
    // 1h 待機
    yield call(delay, 60000 * 60);

    const task = yield fork(verifyToken);
    // 完了するまで待機
    yield join(task);
  }
}

/**
 * REFRESH_TOKENを受けて更新タスクをキックする
 */
function* handleRefreshToken() {
  while (yield take(REFRESH_TOKEN)) {
    // トークン更新を開始する
    const task = yield fork(refreshTokenTask);

    // サインアウトされたらトークンの更新をキャンセルする
    yield take(SIGNOUT);
    yield cancel(task);
  }
}

const sagas = [
  // 定期的にtokenを更新
  handleRefreshToken(),
  // 任意のタイミングでtokenを更新
  takeLatest(REFRESH_TOKEN_REQUESTED, verifyToken),
];

export default sagas;
