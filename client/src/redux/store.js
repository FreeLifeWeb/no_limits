import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import errReduser from './reducer/errReducer';
import stateReducer from './reducer/stateReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    err: errReduser,
    state: stateReducer,
  },
});
