import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { regUser } from '../../redux/actions/userAction';
import Switcher from '../UI/switcher/Switcher';
import { getCategoryList } from '../../redux/slices/categoryListSlice';

export default function Registration(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const err = useSelector((store) => store.err);
  const categoryList = useSelector((store) => store.categoryList);
  const {
    getInputProps, checked, disabled, focusVisible,
  } = useSwitch(props);
  const [name, setForm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [currCategory, setCategory] = useState('');

  const changeNameHandler = (e) => setForm(e.target.value);
  const changeEmailHandler = (e) => setEmail(e.target.value);
  const changePasswordHandler = (e) => setPass(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      display="flex"
      noValidate
      autoComplete="off"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        dispatch(regUser({
          name, email, password, status: checked, categoryId: currCategory,
        }));
      }}
      >
        <FormGroup>
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Регистрация
          </Typography>
          <TextField
            value={name}
            onChange={changeNameHandler}
            name="name"
            label="Логин"
            type="text"
          />
          <TextField
            value={email}
            onChange={changeEmailHandler}
            name="email"
            label="Почта"
            type="email"
          />
          <TextField
            value={password}
            onChange={changePasswordHandler}
            name="password"
            label="Пароль"
            type="password"
          />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Switcher
              getInputProps={getInputProps}
              checked={checked}
              disabled={disabled}
              focusVisible={focusVisible}
            />
            <div style={{ textAlign: 'center', paddingTop: '9px' }}>Я работодатель</div>
          </div>
          {checked
            ? (<></>)
            : (
              <FormControl sx={{ margin: ' 20px 0' }}>
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
                      value={el.id}
                    >
                      {el.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            )}
          <Button type="submit" variant="contained">Sign up</Button>
        </FormGroup>
      </form>

      <div>
        {' '}
        {err && (<span>{err.message}</span>)}
        {' '}
      </div>
    </Box>
  );
}
