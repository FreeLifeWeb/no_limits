import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const sphereListSlice = createSlice({
  name: 'sphereList',
  initialState: [],

  reducers: {
    setSphereList: (state, action) => action.payload,
  },
});

export const { setSphereList } = sphereListSlice.actions;

export const getSphereList = () => (dispatch) => {
  axios.post('/api/sphere')
    .then((res) => dispatch(setSphereList(res.data)));
};

export default sphereListSlice.reducer;
