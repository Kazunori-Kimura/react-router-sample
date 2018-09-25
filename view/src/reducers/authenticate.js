import {
  SIGNIN_START,
  SIGNIN_SUCCEEDED,
  SIGNIN_FAILED,
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_SUCCEEDED,
  REFRESH_TOKEN_FAILED,
  SIGNOUT,
  REFRESH_TOKEN,
} from '../actions';

const initialState = {
  username: '',
  token: '',
  requesting: false,
  error: null,
  periodic: false, // 定期実行中かどうか
  valid: false, // tokenが有効かどうか
};

const authenticate = (state = initialState, action) => {
  if (action.type === SIGNIN_START) {
    // ログイン開始
    return {
      ...state,
      username: '',
      token: '',
      requesting: true,
      error: null,
      valid: false,
    };
  } else if (action.type === SIGNIN_SUCCEEDED) {
    // ログイン成功
    const { username, token } = action.payload;
    return {
      ...state,
      username,
      token,
      requesting: false,
      error: null,
      valid: true,
    };
  } else if (action.type === SIGNIN_FAILED) {
    // ログイン失敗
    const { error } = action.payload;
    return {
      ...state,
      username: '',
      token: '',
      requesting: false,
      error,
      valid: false,
    };
  } else if (action.type === REFRESH_TOKEN) {
    // 定期実行開始
    return {
      ...state,
      requesting: false,
      error: null,
      periodic: true,
    };
  } else if (action.type === REFRESH_TOKEN_START) {
    // トークン更新開始
    return {
      ...state,
      requesting: true,
      error: null,
    };
  } else if (action.type === REFRESH_TOKEN_SUCCEEDED) {
    // トークン更新成功
    const { token } = action.payload;
    return {
      ...state,
      token,
      requesting: false,
      error: null,
      valid: true,
    };
  } else if (action.type === REFRESH_TOKEN_FAILED) {
    // トークン更新失敗
    const { error } = action.payload;
    return {
      ...state,
      // TODO: 古いトークンを破棄すべき？
      requesting: false,
      error,
      valid: false,
    };
  } else if (action.type === SIGNOUT) {
    // ログアウト
    return {
      ...state,
      username: '',
      token: '',
      requesting: false,
      error: null,
      periodic: false,
      valid: false,
    };
  }

  return state;
};

export default authenticate;
