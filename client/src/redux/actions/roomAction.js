import axios from 'axios';
import { SET_ROOM, SET_USERSIO } from '../types/types';

export const setRoom = (payload) => ({ type: SET_ROOM, payload });
export const setUsersioRoom = (payload) => ({ type: SET_USERSIO, payload });

export const getRoom = (e, event) => (dispatch) => {
  console.log('EVENT', event.roomId);
  e.preventDefault();
  axios.post('/room', event);
  // axios.get(`/room/${event.roomId}`)
  //   .then((res) => setUsersioRoom(res.data.users));
  // .then((res) => console.log('DATA', res.data))
  // .then((res) => dispatch(setRoom(res.data)));
  dispatch(setRoom(event));
};
