import { ADD_USER, GETAPI, GET_ASSERTIONS, GET_SCORE } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GETAPI:
    return {
      ...state,
      token: action.payload,
    };
  case ADD_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
