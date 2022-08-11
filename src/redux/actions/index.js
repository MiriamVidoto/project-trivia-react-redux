export const ADD_USER = 'ADD_USER';
export const GETAPI = 'GETAPI';
export const GETQUESTIONS = 'GETQUESTIONS';
export const STOP_TIME = 'STOP_TIME';
export const BUTTON_DISABLE = 'BUTTON_DISABLE';
export const REST_TIME = 'REST_TIME';
export const DIFICULT_QUEST = 'DIFICULT_QUEST';
export const GET_SCORE = 'GET_SCORE';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const getApi = (payload) => ({
  type: GETAPI,
  payload,
});

export const getQuestions = (payload) => ({
  type: GETQUESTIONS,
  payload,
});

export const restTime = (payload) => ({
  type: REST_TIME,
  payload,
});

export const dificultQuest = (payload) => ({
  type: DIFICULT_QUEST,
  payload,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export function fetchAPI(data) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const payload = await response.json();
      data = payload.token;
      const token = dispatch(getApi(data));
      return token;
    } catch (error) {
      console.error(error);
    }
  };
}

export const stopTime = (payload) => ({
  type: STOP_TIME,
  payload,
});

export const buttonDisable = (payload) => ({
  type: BUTTON_DISABLE,
  payload,
});
