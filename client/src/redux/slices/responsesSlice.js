import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const responsesSlice = createSlice({
  name: 'responses',
  initialState: [],

  reducers: {
    setResponses: (state, action) => action.payload,
  },
});

export const { setResponses } = responsesSlice.actions;

export const getResponses = (id) => (dispatch) => {
  console.log(id, 'gettttttt');
  axios.post(`/api/vacancy/responses/${id}`)
    .then((res) => dispatch(setResponses(res.data)));
};

export default responsesSlice.reducer;
