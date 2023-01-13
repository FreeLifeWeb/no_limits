import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormGroup, MenuItem, Select, TextField, OutlinedInput, InputLabel, FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSphereList } from '../../redux/slices/sphereListSlice';
import { getCategoryList } from '../../redux/slices/categoryListSlice';
import { addUserVac } from '../../redux/slices/userVacSlice';
// import { getVacancies } from '../../redux/slices/vacanciesSlice';

export default function AddVac() {
  const navigate = useNavigate();
  const sphereList = useSelector((store) => store.sphereList);
  const categoryList = useSelector((store) => store.categoryList);

  const [currSphere, setSphere] = useState('');

  const sphereHandler = (e) => {
    setSphere(e.target.value);
  };

  const [currCategory, setCategory] = useState('');

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addUserVac(Object.fromEntries(new FormData(e.target))));
    // axios.post('/api/vacansy', Object.fromEntries(new FormData(e.target)))
    // .then((res) => dispatch(addVac(res.data)))
    navigate('/LKemployer');
  };

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getSphereList());
  }, []);
  return (
    <Box
      style={{
        marginLeft: '30%',
        marginRight: '30%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
      }}
    >
      <br />
      <form style={{ lineHeight: 'normal' }} onSubmit={(e) => submitHandler(e)}>
        <FormGroup sx={{
          flexGrow: 1,
          borderRadius: '11px',
          marginTop: '12px',
          backgroundColor: 'white',
          padding: '14px',
        }}
        >
          <TextField
            id="name"
            label="Должность"
            name="title"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Компания"
            name="company"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Город"
            name="city"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Заработная плата"
            name="salary"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Режим работы"
            name="time"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Формат"
            name="format"
          />
          {' '}
          <br />
          <FormControl>
            <InputLabel id="sphere">Сфера деятельности</InputLabel>
            <Select
              name="sphere"
              labelId="sphere"
              id="sphe"
              input={<OutlinedInput id="sphe" label="Сфера деятельности" />}
              value={currSphere}
              onChange={sphereHandler}
            >
              {sphereList.map((el) => (
                <MenuItem
                  key={el.id}
                  value={el.title}
                >
                  {el.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl>
            <InputLabel id="category">Категория недееспособности</InputLabel>
            <Select
              name="category"
              id="cat"
              input={<OutlinedInput id="cat" label="Категория недееспособности" />}
              value={currCategory}
              onChange={categoryHandler}
            >
              {categoryList.map((el) => (
                <MenuItem
                  key={el.id}
                  value={el.title}
                >
                  {el.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Button
            type="submit"
            id="submit"
            variant="contained"
          >
            Сохранить
          </Button>
          <br />
        </FormGroup>
      </form>
    </Box>
  );
}
