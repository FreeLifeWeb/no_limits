import React from 'react';
import {
  Box, Button, FormGroup, TextField, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userAction';

export default function Login() {
  const dispatch = useDispatch();
  const err = useSelector((store) => store.err);

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
      <form onSubmit={(e) => dispatch(loginUser(e))}>
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
