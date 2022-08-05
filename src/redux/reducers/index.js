import { combineReducers } from 'redux';
import playReducer from './playReducer';

const rootReducer = combineReducers({
  playReducer,
});

export default rootReducer;
