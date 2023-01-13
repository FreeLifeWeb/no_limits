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
    if (!userVac.length) { dispatch(getUserVac(user.id)); }
  }, []);

  return (
    <Box style={{
      marginTop: '5%',
      marginLeft: '30%',
      marginRight: '30%',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
      border: '3px solid #78866b',
      padding: '10px',
      flexGrow: 1,
      borderRadius: '11px',
      backgroundColor: 'white',
    }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        className="vacName"

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
          <Button variant="contained" size="small" style={{ marginLeft: 'auto' }}>Разместить вакансию</Button>
        </NavLink>
        <br />
      </Box>
      {userVac?.map((vac) => <OneVac key={vac.id} vacansy={vac} />)}
    </Box>
  );
}
