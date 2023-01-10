import React, { useEffect, useState } from 'react';
import {
  Button, FormGroup, MenuItem, Select, TextField, OutlinedInput,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSphereList } from '../../redux/slices/sphereListSlice';
import { getCategoryList } from '../../redux/slices/categoryListSlice';
import { addVac } from '../../redux/slices/userVacSlice';

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

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/vacansy', Object.fromEntries(new FormData(e.target)))
      // .then((data) => addVac(data.data));
    navigate('/LKemployer');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getSphereList());
  }, []);
  return (
    <div className="container">
      <br />
      <form onSubmit={(e) => submitHandler(e)}>
        <FormGroup>
          <TextField
            id="name"
            label="title"
            name="title"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="company"
            name="company"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="city"
            name="city"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="salary"
            name="salary"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="time"
            name="time"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="format"
            name="format"
          />
          {' '}
          <br />
          <Select
            name="sphere"
            label="Специальность"
            // type="text"
            id="sphere"
            input={<OutlinedInput label="Сфера деятельности" />}
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
          <br />
          <Select
            name="category"
            label="Категории"
            // type="text"
            id="category"
            input={<OutlinedInput label="Категория недееспособности" />}
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
    </div>
  );
}
