import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userVacSlice = createSlice({
  name: 'userVac',
  initialState: [],

  reducers: {
    setUserVac: (state, action) => action.payload,
    addVac: (state, action) => [...state, action.payload],
  },
});

export const { setUserVac, addVac } = userVacSlice.actions;

export const getUserVac = (id) => (dispatch) => {
  axios.post(`/user/vacansy/${id}`)
    .then((res) => dispatch(setUserVac(res.data)));
};

export default userVacSlice.reducer;
