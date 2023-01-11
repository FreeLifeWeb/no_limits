import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResponses } from '../../redux/slices/responsesSlice';

export default function VacancyResponses() {
  const responses = useSelector((store) => store.responses);
  console.log(responses);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getResponses());
  // }, []);
  return (
    <Box>{responses?.map((el) => <Box key={el.id}>{el.vacancyId}</Box>)}</Box>
  );
}
