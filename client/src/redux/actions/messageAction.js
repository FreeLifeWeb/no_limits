import { SET_MESSAGE } from '../types/types';

export const setMessage = (payload) => ({ type: SET_MESSAGE, payload });

export const getMessage = (message) => (dispatch) => {
  console.log('Message================', message);
  dispatch(setMessage(message));
};
