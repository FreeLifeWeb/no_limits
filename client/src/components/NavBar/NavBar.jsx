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
          <div>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Button variant="text" sx={{ color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Без ограничений
                </Typography>
              </Button>
            </NavLink>
          </div>
          <div>
            <NavLink to="/vacancies" style={{ textDecoration: 'none' }}>
              <Button variant="text" sx={{ color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
                  Вакансии
                </Typography>
              </Button>
            </NavLink>
            <NavLink to="/resume" style={{ textDecoration: 'none' }}>
              <Button variant="text" sx={{ color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
                  Специалисты
                </Typography>
              </Button>
            </NavLink>

            {user
              ? (
                <>
                  <NavLink to="/chat" style={{ textDecoration: 'none' }}>
                    <Button variant="text" sx={{ color: 'white' }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
                        Чат
                      </Typography>
                    </Button>
                  </NavLink>
                  <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="text" onClick={() => dispatch(logoutUser())} sx={{ color: 'white' }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
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
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
                        Регистрация
                      </Typography>
                    </Button>
                  </NavLink>
                  <NavLink to="/log" style={{ textDecoration: 'none' }}>
                    <Button variant="text" sx={{ color: 'white' }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
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
