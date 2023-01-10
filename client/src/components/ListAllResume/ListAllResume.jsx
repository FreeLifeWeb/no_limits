import React from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getResume } from '../../redux/slices/resumeSlice';

export default function ListAllResume() {
  const resume = useSelector((store) => store.resume);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getResume());
  }, []);
  return (
    <Box>
      {resume.map((el) => <Box key={el.id}>{el.name}</Box>)}
    </Box>
  );
}
