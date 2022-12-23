import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import errReduser from './reducer/errReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    err: errReduser,
  },
});
