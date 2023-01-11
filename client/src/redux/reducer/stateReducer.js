import {
  SET_ROOM, SET_MESSAGE, SET_USERSIO, SET_DATA,
} from '../types/types';

export default function stateReducer(state = {
  roomId: null,
  userName: null,
  users: [],
  messages: [],
}, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ROOM:
      return {
        ...state,
        roomId: payload.roomId,
        userName: payload.userName,
      };
    case SET_USERSIO:
      return {
        ...state,
        users: payload,
      };
    case SET_DATA:
      return {
        ...state,
        users: payload.users,
        messages: payload.messages,
      };
    case SET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    default:
      return state;
  }
}
