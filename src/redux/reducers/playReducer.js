import { GETAPI } from '../actions';

const INITIAL_STATE = {
  token: '',
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
};

const playReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GETAPI:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default playReducer;
