import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const resumesSlice = createSlice({
  name: 'resumes',
  initialState: [],

  reducers: {
    setResumes: (state, action) => action.payload,
  },
});

export const { setResumes } = resumesSlice.actions;

export const getResumes = () => (dispatch) => {
  axios.post('/api/resumes')
    .then((res) => dispatch(setResumes(res.data)));
};

export default resumesSlice.reducer;
