import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import errReduser from './reducer/errReducer';
import resumeSlice from './slices/resumeSlice';
import userVacSlice from './slices/userVacSlice';
import sphereListSlice from './slices/sphereListSlice';
import categoryListSlice from './slices/categoryListSlice';
import stateReducer from './reducer/stateReducer';
import vacanciesSlice from './slices/vacanciesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    err: errReduser,
    resume: resumeSlice,
    userVac: userVacSlice,
    sphereList: sphereListSlice,
    categoryList: categoryListSlice,
    state: stateReducer,
    vacancies: vacanciesSlice,
  },
});
