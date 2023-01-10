import axios from 'axios';
import { SET_ROOM, SET_USERSIO } from '../types/types';

export const setRoom = (payload) => ({ type: SET_ROOM, payload });
export const setUsersioRoom = (payload) => ({ type: SET_USERSIO, payload });

export const getRoom = (e, event, emit) => async (dispatch) => {
  // console.log('EVENT', event.roomId);
  e.preventDefault();
  await axios.post('/room', event);
  emit();
  setTimeout(() => {
    axios.get(`/room/${event.roomId}`)
      .then((res) => { console.log('room users', res.data); dispatch(setUsersioRoom(res.data.users)); });
  }, 500);
  // axios.get(`/room/${event.roomId}`)
  //   .then((res) => setUsersioRoom(res.data.users));
  // .then((res) => console.log('DATA', res.data.users));
  // .then((res) => dispatch(setRoom(res.data)));
  dispatch(setRoom(event));
};
