import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userVacSlice = createSlice({
  name: 'userVac',
  initialState: [],

  reducers: {
    setUserVac: (state, action) => action.payload,
    addVac: (state, action) => [...state, action.payload],
    deleteVac: (state, action) => state.filter((el) => el.id !== action.payload),
    createVac: (state, action) => {
      const vac = state.find((el) => el.id === action.payload.id);
      vac.title = action.payload.title;
      vac.company = action.payload.company;
      vac.city = action.payload.city;
      vac.sphereId = action.payload.sphereId;
      vac.categoryId = action.payload.categoryId;
      vac.salary = action.payload.salary;
      vac.time = action.payload.time;
      vac.format = action.payload.format;
    },
  },
});

export const {
  setUserVac, addVac, deleteVac, createVac,
} = userVacSlice.actions;

export const getUserVac = (id) => (dispatch) => {
  axios.post(`/user/vacansy/${id}`)
    .then((res) => dispatch(setUserVac(res.data)));
};

export default userVacSlice.reducer;
