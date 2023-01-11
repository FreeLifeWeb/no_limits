import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserVac } from '../../redux/slices/userVacSlice';
import OneVac from './OneVac';

export default function Employer() {
  const user = useSelector((store) => store.user);
  const userVac = useSelector((store) => store.userVac);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserVac(user.id));
  }, []);
  return (
    <Box>
      {user?.name}
      <NavLink to="/addVac">
        <Button size="small">Разместить вакансию</Button>
      </NavLink>
      {userVac.map((vac) => <OneVac key={vac.id} vacansy={vac} />)}
    </Box>
  );
}
