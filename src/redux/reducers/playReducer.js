// import { GETQUESTIONS } from '../actions';
import { ADD_USER, GETAPI } from '../actions';

const INITIAL_STATE = {
  token: 'mockedToken',
  player: {
    name: 'Player Name',
    gravatarEmail: 'player@email.com',
    score: 0,
    assertions: 0,
  },
};

const playReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case GETQUESTIONS:
  //   return {
  //     ...state,
  //     token: action.getQuestions.token,
  //   };
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
  default:
    return state;
  }
};

export default playReducer;
