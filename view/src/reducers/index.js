import { combineReducers } from 'redux';
import authenticate from './authenticate';

const reducer = combineReducers({
  authenticate,
});

export default reducer;
