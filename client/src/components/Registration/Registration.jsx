import React, { useEffect } from 'react';
import {
  Box, Button, FormGroup, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { regUser } from '../../redux/actions/userAction';

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const err = useSelector((store) => store.err);

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
          dispatch(regUser(e));
        }}
        >
          <FormGroup>
            <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
              Registration
            </Typography>
            <TextField
                name="name"
                label="Name"
                type="text"
            />
            <TextField
                name="email"
                label="Email"
                type="email"
            />
            <TextField
                name="password"
                label="Password"
                type="password"
            />
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
