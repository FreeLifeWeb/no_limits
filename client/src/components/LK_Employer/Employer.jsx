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
    <Box style={{
      marginLeft: '30%',
      marginRight: '30%',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
    }}
    >
      <br />
      <Box style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        {user?.name}
        <br />
        {user?.email}
        <br />
        <NavLink
          to="/addVac"
          style={{
            textDecoration: 'none',
            display: 'contents',
          }}
        >
          <Button size="small" style={{ marginLeft: 'auto' }}>Разместить вакансию</Button>
        </NavLink>
        <br />
      </Box>
      {userVac?.map((vac) => <OneVac key={vac.id} vacansy={vac} />)}
    </Box>
  );
}
