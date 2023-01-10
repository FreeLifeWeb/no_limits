import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userAction';

export default function ButtonAppBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {user
            ? (
              <>
                <NavLink to="/" sx={{ decoration: 'none' }}>
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Home
                    </Typography>
                  </Button>
                </NavLink>
                <NavLink to="/vacancies">
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Vacancies
                    </Typography>
                  </Button>
                </NavLink>
                <NavLink to="/resume">
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Specialist
                    </Typography>
                  </Button>
                </NavLink>
                <NavLink to="/chat">
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Chat
                    </Typography>
                  </Button>
                </NavLink>
                <NavLink to="/">
                  <Button variant="text" onClick={() => dispatch(logoutUser())} sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Logout
                    </Typography>
                  </Button>
                </NavLink>
                <Typography>
                  {user?.email ? (
                    `Hello  ${user?.email}`
                  )
                    : (
                      'Hello user!'
                    )}
                </Typography>
              </>
            )
            : (
              <>
                <NavLink to="/" sx={{ decoration: 'none' }}>
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Home
                    </Typography>
                  </Button>
                </NavLink>
                <NavLink to="/vacancies">
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Vacancies
                    </Typography>
                  </Button>
                </NavLink>
                <NavLink to="reg">
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Registration
                    </Typography>
                  </Button>
                </NavLink>
                <NavLink to="/log">
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Login
                    </Typography>
                  </Button>
                </NavLink>
                <Typography>
                  {user?.email ? (
                    `Hello  ${user?.email}`
                  )
                    : (
                      'Hello user!'
                    )}
                </Typography>
              </>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
