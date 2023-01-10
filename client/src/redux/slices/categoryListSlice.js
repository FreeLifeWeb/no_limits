import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: [],

  reducers: {
    setCategoryList: (state, action) => action.payload,
  },
});

export const { setCategoryList } = categoryListSlice.actions;

export const getCategoryList = () => (dispatch) => {
  axios.post('/api/category')
    .then((res) => dispatch(setCategoryList(res.data)));
};

export default categoryListSlice.reducer;
