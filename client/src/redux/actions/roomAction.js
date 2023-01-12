import axios from 'axios';
import { SET_ROOM, SET_DATA } from '../types/types';

export const setRoom = (payload) => ({ type: SET_ROOM, payload });
export const setDataRoom = (payload) => ({ type: SET_DATA, payload });

export const getRoom = (e, event, emit) => async (dispatch) => {
  // console.log('EVENT', event.roomId);
  e.preventDefault();
  await axios.post('/room', event);
  emit();
  setTimeout(() => {
    axios.get(`/room/${event.roomId}`)
      .then((res) => { console.log('room data', res.data); dispatch(setDataRoom(res.data)); });
  }, 500);
  // axios.get(`/room/${event.roomId}`)
  //   .then((res) => setUsersioRoom(res.data.users));
  // .then((res) => console.log('DATA', res.data.users));
  // .then((res) => dispatch(setRoom(res.data)));
  dispatch(setRoom(event));
};
