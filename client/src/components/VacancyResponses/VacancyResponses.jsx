import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getResponses } from '../../redux/slices/responsesSlice';

export default function VacancyResponses() {
  const responses = useSelector((store) => store.responses);
  const { id } = useParams();
  console.log(responses, id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResponses(id));
  }, []);
  return (
    <Box>{responses?.map((el) => <Box key={el.id}>{el.vacancyId}</Box>)}</Box>
  );
}
