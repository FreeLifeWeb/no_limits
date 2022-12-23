import {
  LOGOUT, SET_EMPTY_USER, SET_USER,
} from '../types/types';

export default function userReducer(state = { isFetching: true }, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload;
    case SET_EMPTY_USER:
      return null;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
