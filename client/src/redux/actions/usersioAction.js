import { SET_USERSIO } from '../types/types';

export const setUsersioRoom = (payload) => ({ type: SET_USERSIO, payload });

export const getUsersioRoom = (usersio) => (dispatch) => {
  console.log('usersio:', usersio);
  dispatch(setUsersioRoom(usersio));
};
