import { ADD_USER, BUTTON_DISABLE, GETAPI, STOP_TIME } from '../actions';

const INITIAL_STATE = {
  token: '',
  timeover: false,
  btnDisable: false,
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

  case ADD_USER:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
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
  default:
    return state;
  }
};

export default playReducer;
