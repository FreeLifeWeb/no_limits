import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState: [],

  reducers: {
    setVacancies: (state, action) => action.payload,
  },
});

export const { setVacancies } = vacanciesSlice.actions;

export const getVacancies = () => (dispatch) => {
  axios.post('/api/vacancies')
    .then((res) => dispatch(setVacancies(res.data)));
};

export default vacanciesSlice.reducer;
