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
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
      <AppBar
        position="static"
        sx={{
          width: '97%',
          height: '80px',
          borderRadius: '11px',
          marginTop: '10px',
          backgroundColor: '#4d603b',
        }}
      >
        <Toolbar sx={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'stretch', backgroundColor: '#4d603b',
        }}
        >
          <div>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Button variant="text" sx={{ color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '36px' }}>
                  Без ограничений
                </Typography>
              </Button>
            </NavLink>
          </div>
          <div>
            <NavLink to="/vacancies" style={{ textDecoration: 'none' }}>
              <Button variant="text" sx={{ color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '2rem' }}>
                  Вакансии
                </Typography>
              </Button>
            </NavLink>
            <NavLink to="/resume" style={{ textDecoration: 'none' }}>
              <Button variant="text" sx={{ color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '2rem' }}>
                  Специалисты
                </Typography>
              </Button>
            </NavLink>

            {user
              ? (
                <>
                  <NavLink to="/chat" style={{ textDecoration: 'none' }}>
                    <Button variant="text" sx={{ color: 'white' }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '2rem' }}>
                        Чат
                      </Typography>
                    </Button>
                  </NavLink>
                  <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="text" onClick={() => dispatch(logoutUser())} sx={{ color: 'white' }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '2rem' }}>
                        Выйти
                      </Typography>
                    </Button>
                  </NavLink>
                </>
              )
              : (
                <>
                  <NavLink to="reg" style={{ textDecoration: 'none' }}>
                    <Button variant="text" sx={{ color: 'white' }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '2rem' }}>
                        Регистрация
                      </Typography>
                    </Button>
                  </NavLink>
                  <NavLink to="/log" style={{ textDecoration: 'none' }}>
                    <Button variant="text" sx={{ color: 'white' }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '2rem' }}>
                        Войти
                      </Typography>
                    </Button>
                  </NavLink>
                </>
              )}

            {user?.email
              ? (
                <NavLink to={user.status === 'employer' ? '/lkEmployer' : `/lkCandidate/${user?.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="text" sx={{ color: 'white' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '2rem' }}>
                      Личный кабинет
                    </Typography>
                  </Button>
                </NavLink>
              )
              : <></>}
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
