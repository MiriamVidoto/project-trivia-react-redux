export const ADD_USER = 'ADD_USER';
export const GETAPI = 'GETAPI';
export const GETQUESTIONS = 'GETQUESTIONS';

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

let token = '';

export function fetchAPI(data) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const payload = await response.json();
      data = payload.token;
      token = dispatch(getApi(data));
      return token;
    } catch (error) {
      console.error(error);
    }
  };
}

export function fetchQuestions() {
  return async () => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const payload = await response.json();
      return (getQuestions(payload));
    } catch (error) {
      console.error(error);
    }
  };
}
