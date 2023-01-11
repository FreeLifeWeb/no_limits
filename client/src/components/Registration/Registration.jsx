import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormGroup, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { regUser } from '../../redux/actions/userAction';
import Switcher from '../UI/switcher/Switcher';

export default function Registration(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const err = useSelector((store) => store.err);
  const {
    getInputProps, checked, disabled, focusVisible,
  } = useSwitch(props);
  const [name, setForm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const changeNameHandler = (e) => setForm(e.target.value);
  const changeEmailHandler = (e) => setEmail(e.target.value);
  const changePasswordHandler = (e) => setPass(e.target.value);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

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
          name, email, password, status: checked,
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
