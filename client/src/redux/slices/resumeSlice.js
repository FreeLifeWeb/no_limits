import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: [],

  reducers: {
    setResume: (state, action) => action.payload,
  },
});

export const { setResume } = resumeSlice.actions;

export const getResume = () => (dispatch) => {
  axios.post('/resume')
    .then((res) => dispatch(setResume(res.data)));
};

export default resumeSlice.reducer;
