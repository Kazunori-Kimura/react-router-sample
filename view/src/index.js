import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers';
import saga from './sagas';

import './index.css';
import App from './App';

// sagaミドルウェアを作成
const sagaMiddleware = createSagaMiddleware();

// Storeにマウント
const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    sagaMiddleware
  )
);

// sagaを起動
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
