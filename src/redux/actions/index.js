export const ADD_USER = 'ADD_USER';
export const GETAPI = 'GETAPI';
export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});
export const getApi = (payload) => ({
  type: GETAPI,
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
