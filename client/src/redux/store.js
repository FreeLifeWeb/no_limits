import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import errReduser from './reducer/errReducer';
import resumeSlice from './slices/resumeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    err: errReduser,
    resume: resumeSlice,
  },
});
