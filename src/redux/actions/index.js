export const ADD_USER = 'ADD_USER';
export const GETAPI = 'GETAPI';
export const GETQUESTIONS = 'GETQUESTIONS';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

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

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const getAssertions = (payload) => ({
  type: GET_ASSERTIONS,
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
