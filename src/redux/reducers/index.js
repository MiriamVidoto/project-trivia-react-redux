import { combineReducers } from 'redux';
import playReducer from './play';

const rootReducer = combineReducers({
  playReducer,
});

export default rootReducer;
