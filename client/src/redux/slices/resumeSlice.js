import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {},
  reducers: {
    setResume: (state, action) => action.payload,
  },
});

export const { setResume } = resumeSlice.actions;

// export const getResume = (resume) => (dispatch) => {
//   axios.post(`candidate/resume/${user.id}`, resume)
//     .then(() => {
//       window.location.href = '/lkCandidate';
//       console.log('done');
//     });
//   axios('https://api.thecatapi.com/v1/images/search?size=full ')
//     .then((res) => dispatch(setResume(res.data[0].url)))
//     .catch(console.log);
// };

export default resumeSlice.reducer;
