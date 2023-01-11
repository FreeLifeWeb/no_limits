import React, { useEffect } from 'react';
import {
  Box, Button, FormGroup, TextField, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, setErr } from '../../redux/actions/userAction';

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const err = useSelector((store) => store.err);
  const navigate = useNavigate();

  useEffect(() => () => {
    dispatch(setErr(null));
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <form onSubmit={(e) => {
        dispatch(loginUser(e));
      }}
      >
        <FormGroup>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Login
          </Typography>
          <TextField
            name="name"
            required
            id="outlined-required"
            label="Name"
            type="text"
          />
          <TextField
            name="password"
            id="outlined-password-input"
            label="Password"
            type="password"
          />
          <Button type="submit" variant="contained">Sign in</Button>
          <div className="g-signin2" data-onsuccess="onSignIn" />
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
