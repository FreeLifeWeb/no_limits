import React, { useEffect, useState } from 'react';
import {
  Button, FormGroup, MenuItem, Select, TextField, OutlinedInput, InputLabel, FormControl,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSphereList } from '../../redux/slices/sphereListSlice';
import { getCategoryList } from '../../redux/slices/categoryListSlice';
import { createUserVac } from '../../redux/slices/userVacSlice';

export default function CreateVac({ vacansy, setIsEdit }) {
  const sphereList = useSelector((store) => store.sphereList);
  const categoryList = useSelector((store) => store.categoryList);
  const [input, setInput] = useState(vacansy);

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [currSphere, setSphere] = useState(input.Sphere);

  const sphereHandler = (e) => {
    setSphere((prev) => ({ ...prev, title: e.target.value }));
  };

  const [currCategory, setCategory] = useState(input.Category);

  const categoryHandler = (e) => {
    setCategory((prev) => ({ ...prev, title: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e, id) => {
    e.preventDefault();
    dispatch(createUserVac(id, Object.fromEntries(new FormData(e.target))));
    setIsEdit(false);
  };

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getSphereList());
  }, []);
  return (
    <div className="container">
      <br />
      <form onSubmit={(e) => submitHandler(e, input.id)}>
        <FormGroup>
          <TextField
            id="name"
            label="Должность"
            value={input.title}
            onChange={(e) => changeHandler(e)}
            name="title"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Компания"
            value={input.company}
            onChange={(e) => changeHandler(e)}
            name="company"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Город"
            value={input.city}
            onChange={(e) => changeHandler(e)}
            name="city"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Заработная плата"
            value={input.salary}
            onChange={(e) => changeHandler(e)}
            name="salary"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Режим работы"
            value={input.time}
            onChange={(e) => changeHandler(e)}
            name="time"
          />
          {' '}
          <br />
          <TextField
            id="name"
            label="Формат"
            value={input.format}
            onChange={(e) => changeHandler(e)}
            name="format"
          />
          {' '}
          <br />
          <FormControl>
            <InputLabel id="sphereid">Сфера деятельности</InputLabel>
            <Select
              name="sphere"
              labelId="sphereid"
              id="sphe"
              input={<OutlinedInput id="sphe" label="Сфера деятельности" />}
              value={currSphere.title}
              onChange={(e) => sphereHandler(e)}
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
              value={currCategory.title}
              onChange={(e) => categoryHandler(e)}
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
    </div>
  );
}
