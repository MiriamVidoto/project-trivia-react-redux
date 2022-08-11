import { combineReducers } from 'redux';
import player from './playReducer';

const rootReducer = combineReducers({
  player,
});

export default rootReducer;
