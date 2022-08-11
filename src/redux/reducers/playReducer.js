import {
  ADD_USER,
  BUTTON_DISABLE,
  DIFICULT_QUEST,
  GETAPI, GET_SCORE, REST_TIME,
  STOP_TIME } from '../actions';

const INITIAL_STATE = {
  token: '',
  timeover: false,
  btnDisable: false,
  restTime: 0,
  dificult: '',
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
  case STOP_TIME:
    return {
      ...state,
      timeover: action.payload,
    };
  case BUTTON_DISABLE:
    return {
      ...state,
      btnDisable: action.payload,
    };
  case REST_TIME:
    return {
      ...state,
      restTime: action.payload,
    };
  case DIFICULT_QUEST:
    return {
      ...state,
      dificult: action.payload,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default player;
