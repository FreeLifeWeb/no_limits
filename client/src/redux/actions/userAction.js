import axios from 'axios';
import {
  LOGOUT, SET_EMPTY_USER, SET_ERROR, SET_USER,
} from '../types/types';

export const setUser = (payload) => ({ type: SET_USER, payload });
export const setErr = (payload) => ({ type: SET_ERROR, payload });

export const regUser = (e) => (dispatch) => {
  e.preventDefault();
  axios.post('/user/reg', Object.fromEntries(new FormData(e.target)))
    .then((res) => dispatch(setUser(res.data)))
    .catch((err) => dispatch(setErr(err.response.data)));
};

export const loginUser = (e) => (dispatch) => {
  e.preventDefault();
  // console.log('FFFFFF', Object.fromEntries(new FormData(e.target)));
  axios.post('/user/login', Object.fromEntries(new FormData(e.target)))
    .then((res) => dispatch(setUser(res.data)))
    .catch((err) => dispatch(setErr(err.response.data)));
};

export const logoutUser = () => (dispatch) => {
  axios.get('/user/logout')
    .then(() => dispatch({ type: LOGOUT }));
};

export const checkAuth = () => (dispatch) => {
  axios.post('/user/check')
    .then((res) => dispatch(setUser(res.data)))
    .catch(() => dispatch({ type: SET_EMPTY_USER }));
};
