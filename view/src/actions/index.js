// --- action types ---
// ログインAPI 要求
export const SIGNIN_REQUESTED = 'SIGNIN_REQUESTED';
// ログインAPI 開始
export const SIGNIN_START = 'SIGNIN_START';
// ログインAPI 成功
export const SIGNIN_SUCCEEDED = 'SIGNIN_SUCCEEDED';
// ログインAPI 失敗
export const SIGNIN_FAILED = 'SIGNIN_FAILED';

// 認証トークン更新 要求
export const REFRESH_TOKEN_REQUESTED = 'REFRESH_TOKEN_REQUESTED';
// 認証トークン更新 開始
export const REFRESH_TOKEN_START = 'REFRESH_TOKEN_START';
// 認証トークン更新 成功
export const REFRESH_TOKEN_SUCCEEDED = 'REFRESH_TOKEN_SUCCEEDED';
// 認証トークン更新 失敗
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

// SIGN OUT
export const SIGNOUT = 'SIGNOUT';

// --- action creator ---

export const signIn = payload => ({
  type: SIGNIN_REQUESTED,
  payload,
});

export const signInStart = () => ({
  type: SIGNIN_START,
});

export const signInSucceeded = payload => ({
  type: SIGNIN_SUCCEEDED,
  payload,
});

export const signInFailed = payload => ({
  type: SIGNIN_FAILED,
  payload,
});

export const refreshToken = payload => ({
  type: REFRESH_TOKEN_REQUESTED,
  payload,
});

export const refreshTokenStart = () => ({
  type: REFRESH_TOKEN_START,
});

export const refreshTokenSucceeded = payload => ({
  type: REFRESH_TOKEN_SUCCEEDED,
  payload,
});

export const refreshTokenFailed = payload => ({
  type: REFRESH_TOKEN_FAILED,
  payload,
});

export const signOut = () => ({
  type: SIGNOUT,
});
